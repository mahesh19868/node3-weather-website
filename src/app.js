const path = require('path');
const express = require('express');
const geocode = require('./utils/geoCode');
const forecast = require('./utils/forecast');
const hbs = require('hbs');
const app = express();

const port = process.env.PORT || 3000;



//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

//Setup handlebar engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Subramaniam Ananthakrishnan'
    });
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About Us',
        name:'Subramaniam Ananthakrishnan'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help Links',
        name:'Subramaniam Ananthakrishnan'
    })
})



app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error:error
            })
        }

        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })        
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'Please enter a search term'
        })
    }

    console.log(req.query);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('error',{
        errorMessage:'Help article not found',
        title:'Error',
        name:'Subu'    
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        errorMessage:'Page not Found',
        title:'Error',
        name:'Subu'
    })
})

app.listen(port,() => {
    console.log('Server is up on port ' + port);
})
