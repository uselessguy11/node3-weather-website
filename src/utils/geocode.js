const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?country=gr&limit=1&access_token=pk.eyJ1IjoidXNlbGVzc2d1eTExIiwiYSI6ImNrdGU4M2tybjAyNTAycHFyb285OXBucjYifQ.xx6bXldsdwaay8BUo_GJRw'
    request({url , json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(body.features.length === 0 ){
            callback('Unable to find location.Try another search',undefined)
        }else {
            callback(undefined,body.features[0])
        }
    })
}

module.exports = geocode
