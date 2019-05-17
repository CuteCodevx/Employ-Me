const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2ludHl4IiwiYSI6ImNqdTQyaWNydTByM3k0OW1uY2VmODBycWQifQ.hwSNNBraq7HO672LGGUAKw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', {latitude: null,longitude: null})
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', {latitude: null,longitude: null})
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
            })
        }
    })
}

module.exports = geocode;