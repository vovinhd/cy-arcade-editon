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
    const { challengeTitle, challengeText } = challengeData;

    const reply = `Hallo, 

    danke, dass Du dir eine unserer Challenges vorgenommen hattest. 

    ${challengeTitle}
    ${challengeText}

    Herzliche Grüße vom climactivity-Team`;
    return reply;
};

const sendAcknowledgement = async (email, challenge) => {
    let htmlToSend,
        textToSend = '';
    if (challenge) {
        htmlToSend = mailMainTemplate(challenge);
        textToSend = mailTextTemplate(challenge);
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

        const mailResult = sendAcknowledgement(email, challengeData);
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
