const request = require('request');


const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/be4ad2dc881947090eaab05df0c49827/' + latitude + ',' + longitude + '?units=si';
    request({url,json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the weather service', undefined);
        } else if(body.error) {
            callback('Unable to find the location',undefined)
        } else {
            const currentData = body.currently;
            const summary = body.daily.data[0].summary;
            callback(undefined,summary + ' It is currently ' + currentData.temperature + ' degrees out. There is a ' + currentData.precipProbability + '% chance of rain');            
        }
    })
}

module.exports = forecast;