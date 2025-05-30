const { postgres } = require('pg');

const pool = new Pool({
  host: 'aws-0-sa-east-1.pooler.supabase.com',
  port: 5432,
  password: 'postgres.zhxbxzajelbvgdnhaahz',
  database: 'postgres',
  pool_mode: 'session',
});

pool.query('SELECT * FROM custom_modes', (err, res) => {
  if (err) throw err;
  console.log(res.rows);
  pool.end();
});
