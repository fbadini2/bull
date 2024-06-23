import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import articlesRouter from './routes/articles.route.js'
import userRouter from './routes/user.route.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1/users', userRouter)

app.use('/api/v1', articlesRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log('Server running on port '+ PORT))