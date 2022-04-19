import { createPool } from 'mysql2/promise'

export async function connect() {

  const connection = await createPool({
    host:'localhost',
    user:'root',
    password: '',
    database: "clients_db_test",
    connectionLimit: 10,
    ssl:  {
      rejectUnauthorized: false
    }
  })

  return connection;
}