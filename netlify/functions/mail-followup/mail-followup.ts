import { schedule } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js'

let {SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY} = process.env

// Provide a custom schema. Defaults to "public".
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY)

// To learn about scheduled functions and supported cron extensions, 
// see: https://ntl.fyi/sched-func
export const handler = schedule("@hourly", async (event) => {
    const eventBody = JSON.parse(event.body);
    console.log(`Next function run at ${eventBody.next_run}.`);

    return {
        statusCode: 200
    };
});
