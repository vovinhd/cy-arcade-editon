import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

let { SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY, API_SECRET } = process.env;

// Provide a custom schema. Defaults to "public".
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY);

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
        challengeBase64 = body?.challengeBase64;
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
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Record added',
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
