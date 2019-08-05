import * as express from 'express'
import * as bodyParser from 'body-parser'
import {addQuestion, filterQuestions, makeConstraints, questions} from './data/questions'

const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
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

app.delete('/questions/:id', (req, res) => {
  const id = +req.params.id
  if (id) {
    const index = questions.findIndex(q => q.id === id)
    if (index > -1)
      questions.splice(index, 1)
    else
      res.status(400).end()
  }

  res.status(200).end()
})


app.get('/filters', (req, res) => {
  const result = makeConstraints()
  res.send(result)
})

app.listen(3000)
console.log('listening on port 3000')
