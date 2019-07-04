/*const request = require('request');
//const fs = require('fs');
const chalk = require('chalk');

const geoLocationWithWeatherUpdate = (searchPlace, callback) => {
    const url1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchPlace)}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2F0eWFtbzMiLCJhIjoiY2p4ZWdwbGpjMDJyaDNwbWRidmtjN3kwYSJ9.UqSdMgXTAaVzfKra7eFoMQ&limit=1`;
    request({ url: url1, json: true }, (error, response) => {
        if (error) {
            console.log(chalk.red('error'), error);
            return { error: chalk.red('error') + error }
        } else if (response.body.error) {
            return { error: chalk.red('error message : ') + response.body.error };
        } else {
            const url = `https://api.darksky.net/forecast/8f3989ebc02664c39ef9b68af59907db/${response.body.features[0].center[1]},${response.body.features[0].center[0]}?units=si`;
            try {
                if (response.body.features.length != 0) {
                    //console.log('Longitude :', response.body.features[0].center[0]);
                    //console.log('Latitude :', response.body.features[0].center[1]);
                    //console.log(weatherUpdate(url));
                    callback(undefined, {
                        Longitude: response.body.features[0].center[0],
                        Latitude: response.body.features[0].center[1],
                        Place: response.body.features[0].place_name
                    });
                    let a = weatherUpdate(url, callback);
                    return a;
                }
                else {
                    console.log(chalk.red('address is not correct'));
                    return { error: chalk.red('error message 3 ') + 'address is not correct' };
                }
            } catch (e) {
                console.log(chalk.red('error message 4 '), e); //response.body.message);
                return { error: chalk.red('error message 5') + e };//response.body.message };
            }

        }
    })
}

const weatherUpdate = (url, callback) => {
     return request({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log(chalk.red('error'), error);
            return { error : chalk.red('error') + error}
        } else if (response.body.error) {
            return { error: chalk.red('error message : ') + response.body.error};
        } else {
            try {
                //console.log(response.body.currently.temperature);
                console.log({ temperature: response.body.currently.temperature, summary: response.body.daily.data[0].summary });
                let result = { temperature: response.body.currently.temperature, summary: response.body.daily.data[0].summary };
                callback(undefined, result);
                return result;
            } catch (e) {
                console.log(chalk.red('error message 1 '), e); //response.body.message);
                return { error: chalk.red('error message 2 ') + response.body.message};
            }

        }
    });
}

const logValues = (error, data) => {
    if(error) { 
        console.log('error : ' , error);
    }
    else if (data) {
        console.log('data : ', data);
    }
    else {
        console.log(chalk.blue('nothing to print'));
    }
}
geoLocationWithWeatherUpdate('jaipur, india', logValues); */


const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location }) => {
        if (error) {
            return console.log(error)
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(location)
            console.log(forecastData)
        })
    })
}

