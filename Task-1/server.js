const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3000

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res)=> {
    res.redirect('index')
})
app.get('/index', (req, res)=> {
    res.render('index')
})

app.post('/result', (req, res)=> {
    const data = req.body;
    res.render('result', {data})
})

app.listen(PORT, ()=> {
    console.log(`express server is running on port number: ${PORT}`)
})