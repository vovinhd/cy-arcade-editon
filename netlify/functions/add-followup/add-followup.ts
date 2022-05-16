import { Handler } from '@netlify/functions'
import { createClient } from '@supabase/supabase-js'

let {SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY, API_SECRET} = process.env

// Provide a custom schema. Defaults to "public".
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY)


export const handler: Handler = async (event, context) => {
  const { apikey, email, challengeBase64 } = event.queryStringParameters
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
    let challengeJson = atob(challengeBase64); 
    let challengeData = JSON.parse(challengeJson);
    let {challenge, delay} = challengeData; 
    let remind_at = Date.now() + (delay * 24* 60 *60); 
    let {data, error} = await supabase.from('FollowUps').insert({
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
    console.error(error, `${challengeBase64} invalid base64 data`);
    return {
      statusCode: 400,
      body:JSON.stringify({
        message: `Can't unmarschal challengeBase64`
      })
    }
  }
}
