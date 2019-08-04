import * as express from 'express'
import * as bodyParser from 'body-parser'
import {addQuestion, filterQuestions, makeConstraints} from './data/questions'

const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

/**
 * GET Questions based on search criteria
 * I used POST here even for GET because I was too lazy to pass arguments from query string
 */
app.post('/questions', (req, res) => {
  const params = req.body
  const result = filterQuestions(params.filters, params.page || 1, params.perPage || 5, params.sort)
  res.send(result)
})

app.post('/questions/add', (req, res) => {
  const questions = req.body
  addQuestion(questions)
  res.status(201).end()
})



app.get('/filters', (req, res) => {
  const result = makeConstraints()
  res.send(result)
})

app.listen(3000)
console.log('listening on port 3000')
