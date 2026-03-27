async function getSchema() {
  const url = 'https://lzaarthhaxxmznypvobu.supabase.co/rest/v1/';
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'apikey': 'sb_publishable_CbXP9rYQl4p8z6dR_8xzGQ_7XYtV7eE',
      'Authorization': 'Bearer sb_publishable_CbXP9rYQl4p8z6dR_8xzGQ_7XYtV7eE'
    }
  });
  if (res.ok) {
    const data = await res.json();
    console.log(JSON.stringify(data.definitions.leads.properties, null, 2));
  } else {
    console.error(res.status, await res.text());
  }
}
getSchema();
