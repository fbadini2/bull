import {db} from '../database/connection.db.js'

const create = async({email, password, username}) => {
    const query = {
        text: `INSERT INTO Users (email, password, username) VALUES ($1, $2, $3) RETURNING UID, EMAIL, USERNAME`,
        values: [email, password, username]
    }

    const {rows} = await db.query(query)
    return rows[0]
}


const findOneByEmail = async(email) => {
    const query = {
        text: `SELECT * FROM Users WHERE EMAIL = $1`,
        values: [email]
    }
    console.log(query)
    const {rows} = await db.query(query)
    return rows[0]
}

export const UserModel = {
    create,
    findOneByEmail
}