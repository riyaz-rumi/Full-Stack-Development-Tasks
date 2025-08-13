const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const PORT = 3000
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (request, response) => {
    response.redirect('signup')
})

app.get('/signup', (request, response) => {
    response.render('signup', {error: null})
})

let credentials = {};

app.post('/dashboard', (request, response) => {
    const data = request.body;
    
    if (credentials[data.email]) 
        return response.render('signup', {error : data.email + ' email already exists!'})
    
    credentials[data.email] = {
        username: data.username,
        email: data.email,
        password: data.password
    };
    response.render('dashboard', {data, credentials})    
})

app.listen(PORT, () => {
    console.log(`server's running on http://localhost:${PORT}`)
})