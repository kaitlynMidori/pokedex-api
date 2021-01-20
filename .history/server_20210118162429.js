require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))
//We can add new stations (middleware) before individual or multiple 
//other stations to check for valid bearer tokens.
//add a new middleware to validate requests for both .get('/types') 
//and .get('/pokemon'). Let's call the new station validateBearerToken
//validateBearerToken middleware will take 3 parameters instead of 2. 
//In addition to req and res, validateBearerToken will also take a 
//callback function as the third parameter. The callback function is 
//what we can call if we want to move to the next station in the factory 
//line. We'll name this callback parameter next, which is a convention in Express.
//add our validateBearerToken middleware before the conveyor-belt tracks split. 
//That would mean every request gets validated before we move onto the next station.
//we're adding the validate middleware only 1 time and validating every request 
//before it gets to the next handler middlewares.



// app.use((req, res) => {
//   res.send('Hello, world!')
// })

//hardcode the array of valid types into the application and 
//send it back as JSON within the request handler for GET /types
const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

//add the app.use above both of the app.gets so that we can add a 
//middleware to the "factory-line" before them. We need the validate 
//middleware to move onto the next middleware down in the conveyor belt, 
//so we need to use the 3rd parameter, the callback that we called next. 
//Let's also add a console.log so we can see this middleware being used.
app.use(function validateBearerToken(req, res, next) {
    const bearerToken = req.get('Authorization').split(' ')
    const apiToken = process.env.API_TOKEN
    console.log('validate bearer token middleware')

    if (bearerToken !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request'})
    }
    // debugger
    //move to the next middleware
    next()
})

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

//Add the endpoint. The validation should happen before either 
//handleGetTypes or handleGetPokemon request handlers. These 
//request handlers are called middleware and Express allows us 
//to "compose" multiple middlewares in different sequences and configurations
function handleGetPokemon(reg, res) {
    res.send('Hello, Pokemon!')
}

app.get('/pokemon', handleGetPokemon)

const PORT = 8000

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
