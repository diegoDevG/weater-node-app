const fs = require('fs');
const axios = require('axios');

class Search {
    history = [];
    dbPath = './db/database.json'

    constructor() {
        //TODO: leer DB
        this.readDB()
    }
    
    async city(place = '') {
        try {
            // peticion http

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: {
                    'proximity': 'ip',
                    'types': 'place',
                    'language': 'es',
                    'access_token': process.env.MAPBOX_KEY
                }
            });

            const response = await instance.get()
            
            return response.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }))
        } catch (e) {
            return []
        }

    }

    async getWeather(lat, lon) {
        try {

            const instance = axios.create({
                baseURL: `http://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat,
                    lon,
                    lang: 'es',
                    appid: process.env.OPEN_WEATHER,
                    units: 'metric'
                }
            });

            const response = await instance.get()

            const { weather, main } = response.data
            
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }
        } catch (e) {
            console.log(e)
        }

    }


    addToHistory(place = '') {
        if (this.history.includes(place)) return
        
        this.history = this.history.splice(0,5)
        this.history.unshift(place)

        this.saveOnDB()
    }

    saveOnDB() {

        const payload = {
            history: this.history
        }
        fs.writeFileSync( this.dbPath, JSON.stringify(payload))
    }

    readDB() {
        if (!fs.existsSync(this.dbPath)) return

        const dataFile = fs.readFileSync(this.dbPath, { encoding: 'utf8' })
        const data = JSON.parse(dataFile)
        this.history = data.history
    }
}

module.exports = { Search }