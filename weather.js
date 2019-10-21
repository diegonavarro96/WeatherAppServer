const credentials = require('./credentials.js')

const request = require('request')

if(process.env.NODE_ENV === 'production'){
    var MAPBOX_TOKEN = process.env.API_KEYMapBox
    var DARK_SKY_SECRET_KEY = process.env.API_KEYDarkSky
  
  }
  else{
    const credentials = require('./credentials')
    var MAPBOX_TOKEN = credentials.MAPBOX_TOKEN
    var DARK_SKY_SECRET_KEY = credentials.DARK_SKY_SECRET_KEY
  }


//const weather = function(longitud,latitude,callback){
    

//}

const city = function(city,callback){
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+city+'.json?access_token='+ MAPBOX_TOKEN
                //console.log(url)

    request({ url, json: true}, function(error, response){

        if(error){
            callback('No se pudo establecer conexion con el servidor de mapbox',undefined)
        }
        else{
            const dataCity = response.body
            if (dataCity.message){
                callback('invalid mapbox key',undefined)
            }
            else if(dataCity.features.length == 0)
            {
                callback('No existe este lugar',undefined)
            }
            else{
        const infoCity = {
            latitud : dataCity.features[0].center[0],
            longitud : dataCity.features[0].center[1]
    }
    //console.log('lat = '+ infoCity.latitud+' longitud = '+ infoCity.longitud)

  //  weather(infoCity.latitud,infoCity.longitud)
//////////////////WEATHER////////////////////

const url ='https://api.darksky.net/forecast/'+ DARK_SKY_SECRET_KEY +
                '/'+ infoCity.longitud + ',' + infoCity.latitud
                //console.log(url)

    request({ url, json: true}, function(error, response){
        if (error){
            callback('No se pudo establecer conexcion con el servidor de darksky',undefined)
        }
        else{
        const data = response.body
        if(data.code == 403){
            callback('Invalid darsky key',undefined)
        }
        else if(data.code==400){
            callback('El lugar no existe',undefined)
        }
        else{
        const info = {
            precipProbability : data.currently.precipProbability,
            temperature : data.currently.temperature,
            summary : data.currently.summary
    }
    var celcius = (info.temperature-32)* 5 / 9;
    celcius = celcius.toFixed(2);
    //console.log(info.summary +'. Currently '+celcius+'°C '+ 'and ' + info.precipProbability +'% of rain')
    callback(undefined,info)      
}
    }    
    })



////////////TERMINA WEATHER/////////




    }
    }
    })
}



module.exports = {
 //   weather : weather,
    city : city
}
