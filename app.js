const express = require('express')
const city = require('./weather.js')
const Port = process.env.PORT || 3000
const app = express()


app.get('/city', function (req, res) {
    if (!req.query.search) {
        return res.send({
            error: "Debes enivar el query search"
        })
    } 
        city.city(req.query.search, function (error, cityData) {
            if (error) {
                return res.send({
                    error: error
                })
            }
            return res.send({
                summary: cityData.summary,
                temperature: cityData.temperature,
                precipitation: cityData.precipProbability
            })
        })
    
})



app.get('/', function (req, res) {
    res.send({
        greeting: 'Bienvendio a la waether app!'
    })
})



// no section found
app.get('*', function (req, res) {
    res.send({
        error: 'Ruta no valida!'
    })
})

app.listen(Port, function () {
    console.log('up and running!')
})
