import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key'

const tokenSign = (user)=>{
    return jwt.sign(
        {
            EMAIL: user.EMAIL
        }, // payload (carga util)
        JWT_SECRET, // clave privada
        {
            expiresIn: '1h' // tiempo de vida
        }
    )
}

const verifyToken = (token) => {
    try{
        return jwt.verify(token, TOKEN_KEY)
    }catch(e){
        return null
    }
}

export const UserToken = {
    tokenSign,
    verifyToken
}