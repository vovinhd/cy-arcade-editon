import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

let {SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY, API_SECRET} = process.env

// Provide a custom schema. Defaults to "public".
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY)

const dateToStr = (date: Date) => {
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - (offset*60*1000))
  return date.toISOString().split('T')[0]
}

export const handler: Handler = async (event, context) => {
  const { apikey } = event.queryStringParameters
  let email, challengeBase64
  try {
    let body = JSON.parse(event.body)
    email = body?.email
    challengeBase64 = body?.challengeBase64 
  } catch (e) {
    return {
      statusCode: 400
    }
  }
  console.log(apikey, email, challengeBase64)

  if (apikey !== API_SECRET) {
    return {
      statusCode: 401,
      body: JSON.stringify({
          message: "Unauthorized"
      })
    }
  }  
  try {
    if (challengeBase64 === undefined) {
      let {data, error} = await supabase.from('follow_ups').insert({
        email, challenge: undefined, delay: 0, remind_at: dateToStr(new Date()) 
      }); 
  
      if (error) {
        console.error(error);
        return {
          statusCode: 500,
          body:JSON.stringify({
            message: `DB error: ${error}`
          })
        }
      }
      console.log("Success!", data); 
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Record added"
        })
      }
    }
    let challengeJson = Buffer.from(challengeBase64, "base64").toString(); 
    let challengeData = JSON.parse(challengeJson);
    console.log(challengeData)
    let {challenge, delay} = challengeData; 
    let remind_at = dateToStr(new Date(Date.now() + (delay * 24* 60 *60 *1000))); 
    let {data, error} = await supabase.from('follow_ups').insert({
      email, challenge, delay, remind_at
    }); 
    if (error) {
      console.error(error);
      return {
        statusCode: 500,
        body:JSON.stringify({
          message: `DB error: ${error}`
        })
      }
    }
    console.log("Success!", data); 
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Record added"
      })
    }
  } catch (error) {
    console.error(error, `${challengeBase64}, invalid base64 data`);
    return {
      statusCode: 400,
      body:JSON.stringify({
        message: `Can't unmarschal challengeBase64`
      })
    }
  }
}
