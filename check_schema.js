import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://lzaarthhaxxmznypvobu.supabase.co', 'sb_publishable_CbXP9rYQl4p8z6dR_8xzGQ_7XYtV7eE')

async function check() {
  const { data, error } = await supabase.from('leads').insert({ 
    name: 'test', 
    email: 'test@test.com', 
    message: 'test message'
  })
  console.log('Result:', JSON.stringify({ data, error }, null, 2))
}
check()
