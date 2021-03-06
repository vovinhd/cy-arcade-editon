import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

import { createTransport } from 'nodemailer';
import type { ChallengeData, FollowUp } from './types';
import { compile } from 'handlebars';
import { template } from './templates/challenge-reminder.hbs';
let {
    API_SECRET,
    SUPABASE_URL,
    SUPABASE_PUBLIC_ANON_KEY,
    NODEMAILER_SMTP,
    NODEMAILER_PORT,
    NODEMAILER_USESSL,
    NODEMAILER_AUTH_USERNAME,
    NODEMAILER_AUTH_PASSWORD,
    NODEMAILER_FROM_ADDRESS,
} = process.env;

const challengeTemplates: {
    [key: string]: ChallengeData;
} = require('./templates/challenges.json');

// Provide a custom schema. Defaults to "public".
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY);

const mailMainTemplate = compile(template);
const mailTransport = createTransport({
    host: NODEMAILER_SMTP,
    port: NODEMAILER_PORT,
    secure: NODEMAILER_USESSL,
    auth: {
        user: NODEMAILER_AUTH_USERNAME,
        pass: NODEMAILER_AUTH_PASSWORD,
    },
});

const mailTextTemplate = (challengeData) => {
    const {
        challengeTitle,
        challengeText,
        duration,
        weeks,
        plural,
    } = challengeData;
    const reply = `Hallo, 

    danke, dass Du dir eine unserer Challenges für ${weeks} Woche${plural} vorgenommen hast. 

    ${challengeTitle}
    ${challengeText}

    Herzliche Grüße vom climactivity-Team`;
    return reply;
};

const sendAcknowledgement = async (email, challenge) => {
    const challengeData = {
        ...challengeTemplates[challenge.ch],
        duration: challenge.opt,
        weeks: Math.floor(challenge.opt / 7),
        plural: Math.floor(challenge.opt / 7) === 1 ? '' : 'n',
    };
    if (challengeData.weeks === 1) {
        challengeData.weeks = 'eine';
    }
    let htmlToSend,
        textToSend = '';
    if (challengeData) {
        htmlToSend = mailMainTemplate(challengeData);
        textToSend = mailTextTemplate(challengeData);
    }

    const subject = 'Erinnerung an deine Challenge';

    const mailOptions = {
        from: NODEMAILER_FROM_ADDRESS,
        to: email,
        subject,
        html: htmlToSend,
        text: textToSend,
    };

    const mailResult = await mailTransport.sendMail(mailOptions);
    return mailResult;
};

const dateToTZStr = (date) => {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    try {
        let dateStr = date.toISOString().split('T')[0];
        return dateStr;
    } catch (e) {
        console.error(e, date);
        throw e;
    }
};

const remindAfter = (delay) => {
    let date = new Date();
    date.setDate(date.getDate() + delay);
    return date;
};

export const handler: Handler = async (event, context) => {
    const { apikey } = event.queryStringParameters;
    let email, challengeBase64;
    try {
        let body = JSON.parse(event.body);
        email = body?.email;
        challengeBase64 = body?.challenge;
    } catch (e) {
        return {
            statusCode: 400,
        };
    }

    if (apikey !== API_SECRET) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: 'Unauthorized',
            }),
        };
    }
    try {
        if (challengeBase64 === undefined) {
            let { error } = await supabase.from('follow_ups').insert({
                email,
                challenge: undefined,
                delay: 0,
                remind_at: dateToTZStr(new Date()),
            });

            if (error) {
                return {
                    statusCode: 500,
                    body: JSON.stringify({
                        message: `DB error: ${error}`,
                    }),
                };
            }
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Record added',
                    challenge: { challengeBase64 },
                }),
            };
        }
        let challengeJson = Buffer.from(challengeBase64, 'base64').toString();
        let challengeData = JSON.parse(challengeJson);
        let { ch: challenge, opt: delay } = challengeData;
        console.log(
            'Adding with params (challenge, delay): ',
            challenge,
            delay
        );
        let remind_at = dateToTZStr(remindAfter(delay));
        let { data, error } = await supabase.from('follow_ups').insert({
            email,
            challenge,
            delay,
            remind_at,
        });
        if (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: `DB error: ${error}`,
                }),
            };
        }

        const mailResult = await sendAcknowledgement(email, challengeData);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Record added',
                mail_ack_send: mailResult,
            }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `Can't unmarschal challengeBase64`,
            }),
        };
    }
};
