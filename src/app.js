const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define paths for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
//set views directory
app.set('views',viewsPath)
//set hbs as template engine
app.set('view engine','hbs')
//set partials path
hbs.registerPartials(partialsPath)



//Setup static directory to serve
app.use(express.static(publicDirectory))

//upload index.hbs to browser
app.get('',(req,res) => {
    //res.render('name in the views folder')
    res.render('index',{
        title: 'Weather App',
        name: 'Chuck Norris'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Chuck Norris'
    })
})


app.get('/help',(req,res) => {
    res.render('help',{
        helpText: 'This is some help text',
        title:'Help',
        name: 'Chuck Norris'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error,{center,place_name} = {}) => {
        if(error){
            return res.send({error})
        }
        //center[0] = latitude && center[1] = longitude
        forecast(center[0], center[1], (error,{
            weather_descriptions:description, temperature, feelslike}) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location:place_name,
                weather_descriptions:description[0],
                temperature,
                feelslike
            })
        })
    })
})

app.get('/products',(req,res) => {
    //if search is not provided
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        error_message:'Help article not found.',
        name: 'Chuck Norris'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        error_message: 'Page not found.',
        name: 'Chuck Norris'
    })
})

app.listen(3000,()  => {
    console.log('Server is up on port 3000.')
})
