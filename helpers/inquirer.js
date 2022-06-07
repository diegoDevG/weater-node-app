const inquirer = require('inquirer');
require('colors')

const inquirerMenu = async () => {
    
    const questions = [{
        type: 'list',
        name: 'option',
        message: 'Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }]

    console.clear()
    console.log('==================================='.green)
    console.log('     SELECCIONE UNA OPCION         '.green)
    console.log('==================================\n'.green)

    const { option } = await inquirer.prompt(questions)
    return option
}

const pausa = async () => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.green} para continuar\n`,
        }
    ]
    await inquirer.prompt(question)
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message, 
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc

}

placesList = async (places = []) => {
    const choices = places.map((place, index) => {
        const idx = `${index + 1}.`.green

        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione el lugar a mostrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions)
    return id
}


module.exports = {
    inquirerMenu,
    pausa,
    readInput,
    placesList,
}