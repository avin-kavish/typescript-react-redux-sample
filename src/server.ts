import * as express from 'express'
import * as bodyParser from 'body-parser'
import {filterQuestions, questions, makeConstraints} from './data/questions'

const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.post('/questions', (req, res) => {
  const params = req.body
  const result = filterQuestions(params.filters, params.page || 1, params.perPage || 5)
  res.send(result)
})

app.get('/filters', (req, res) => {
  const result = makeConstraints()
  res.send(result)
})

app.listen(3000)
console.log('listening on port 3000')
