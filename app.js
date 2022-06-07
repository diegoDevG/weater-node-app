require('dotenv').config()

const { readInput, inquirerMenu, pausa, placesList } = require('./helpers/inquirer')
const { Search } = require('./models/search')

console.clear()


const main = async () => {

    const search = new Search()

    
    let opt

    do {
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const searchFor = await readInput('Ciudad: ')

                //Buscar lugares
                const placesResult = await search.city(searchFor)

                //Seleccionar el lugar
                const seletedId = await placesList(placesResult)
                if (seletedId === '0') continue
                
                const placeSelected = placesResult.find(p => p.id === seletedId)
                
                //Guardar en historial
                search.addToHistory(placeSelected.name)

                //Clima
                const weather = await search.getWeather(placeSelected.lat, placeSelected.lng)

                //Mostrar resultados
                console.log('\n Informacion de la ciudad\n'.green)
                console.log('Ciudad: ', placeSelected.name)
                console.log('Lat: ', placeSelected.lat)
                console.log('Long: ', placeSelected.lng)
                console.log('Temperatura: ', weather.temp)
                console.log('Maxima: ', weather.max)
                console.log('Minima: ', weather.min)
                console.log('Clima: ', weather.desc)


                break;
            case 2:
                search.history.forEach((place, index) => {
                    const idx = `${index + 1}.`.green
                    console.log(`${idx} ${place}`)
                })
                break;
            case 0:
                console.log('Seleccionaste la opcion ', opt)
                break;
        }

       
        await pausa()
    } while (opt !== 0)
}

main()