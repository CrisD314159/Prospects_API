import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import { CreateRouter } from './routes/router.js'
import { ProspectModel } from './model/model.js'

const app = express()

const port = process.env.PORT ?? 3001

app.disable('x-powered-by')

app.use(json())
app.use('/', CreateRouter({ model: ProspectModel }))

app.use(cors())
app.listen(port, () => {
  console.log('listening on port ' + port)
})
