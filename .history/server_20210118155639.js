require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))

// app.use((req, res) => {
//   res.send('Hello, world!')
// })

//hardcode the array of valid types into the application and 
//send it back as JSON within the request handler for GET /types
const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]


//use the app.get method to construct our endpoint and create 
//a separate middleware function to handle the request. For the 
//endpoint, we can pass the path of /types as the first argument 
//and our handleGetTypes middleware function as the second argument. 
//This second argument is a callback - a function passed into 
//another function as an argument.
function handleGetTypes(req, res) {
    res.json(validTypes)
}
app.get('/types', handleGetTypes)
//put the GET /pokemon endpoint in place with a Hello, Pokemon! 
//response so we can see it working. This will let us test the 
//validation for requests to both the intended endpoints.

//Add the endpoint
function handleGetPokemon(reg, res) {
    res.send('Hello, Pokemon!')
}

app.get('/pokemon', handleGetPokemon)

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
