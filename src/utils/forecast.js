const request = require('request')

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=413bd4cf875b5202075537cb77f2f0b1&query='+lat+','+long+'&units=m'
    request( {url ,json:true},(error,{body}) => {
        if(error){
            callback("Unable to connect to weather service",undefined)
        }else if (body.error){
            callback('Unable to find location',undefined)
        }else {
            callback(undefined,body.current)
        }
    })
}

module.exports = forecast
