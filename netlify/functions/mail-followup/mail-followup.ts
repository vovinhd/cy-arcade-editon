import { schedule } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js'
import { createTransport } from 'nodemailer';
import type { ChallengeData, FollowUp } from './types';
import { compile} from 'handlebars'; 
import {template} from './templates/challenge-reminder.hbs'
let { SUPABASE_URL,
    SUPABASE_PUBLIC_ANON_KEY,
    NODEMAILER_SMTP,
    NODEMAILER_PORT,
    NODEMAILER_USESSL,
    NODEMAILER_AUTH_USERNAME,
    NODEMAILER_AUTH_PASSWORD,
    NODEMAILER_FROM_ADDRESS
} = process.env

const subject = "Erinnerung an deine Challenge"
const challengeData: {[key: string]: ChallengeData} = require("./templates/challenges.json")
const mailMainTemplate = compile(template)
const mailTransport = createTransport({
    host: NODEMAILER_SMTP,
    port: NODEMAILER_PORT,
    secure: NODEMAILER_USESSL,
    auth: {
        user: NODEMAILER_AUTH_USERNAME,
        pass: NODEMAILER_AUTH_PASSWORD
    }
})

// Provide a custom schema. Defaults to "public".
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY)

const handle = async (event) => {
    let { data, error } = await supabase.from('follow_ups').select("*").eq("reminder_sent", false)

    if (error) {
        console.error(error)
        return {
            statusCode: 500
        }
    }

    let updates = 0;
    data.map((followup: FollowUp) => {
        let htmlToSend, textToSend = ""
        if (followup.challenge) {
            htmlToSend = mailMainTemplate({
                ...challengeData[followup.challenge]
            })

            textToSend = `Erinnerung an: ${challengeData[followup.challenge].challengeTitle} ${challengeData[followup.challenge].challengeText} yeet`
        }

        const mailOptions = {
            from: NODEMAILER_FROM_ADDRESS,
            to: followup.email,
            subject,
            html: htmlToSend,
            text: textToSend
        }

        mailTransport.sendMail(mailOptions, async(err, res) => {
            if (err) {
                console.error(err)
                return {
                    statusCode: 500,
                }
            } else {
                followup.reminder_sent = true
                console.log("Mail send 📧")
                const {data, error} = await supabase.from("follow_ups").upsert(followup, {returning: "minimal"} )
                if (error) {
                    console.error(err)
                    return {
                        statusCode: 500,
                    }    
                } else {
                    updates += 1
                }
            }
        })

    })


    return {
        statusCode: 200,
    }
} 

export const handler = schedule("0 15 * * *", (event) => handle(event));
