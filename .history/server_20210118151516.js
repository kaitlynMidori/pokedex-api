const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))

// app.use((req, res) => {
//   res.send('Hello, world!')
// })

//use the app.get method to construct our endpoint and create 
//a separate middleware function to handle the request. For the 
//endpoint, we can pass the path of /types as the first argument 
//and our handleGetTypes middleware function as the second argument. 
//This second argument is a callback - a function passed into 
//another function as an argument.
function handleGetTypes(req, res) {

}
app.get('/types', handleGetTypes)
const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
