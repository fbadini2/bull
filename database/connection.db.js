import 'dotenv/config'
// import { Signer } from "@aws-sdk/rds-signer";
import pg from 'pg'


const {Pool} = pg

const connectionString = process.env.DATABASE_URI

export const db = new Pool({
    allowExitOnIdle: true,
    connectionString
})



try{ 
    await db.query('SELECT NOW()')
    console.log('Connected')
}catch (error) {
    console.log(error)
}