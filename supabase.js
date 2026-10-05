const { createClient } = require("@supabase/supabase-js");

console.log("URL exists:", !!process.env.SUPABASE_URL);
console.log("KEY exists:", !!process.env.SUPABASE_KEY);

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

module.exports = supabase;