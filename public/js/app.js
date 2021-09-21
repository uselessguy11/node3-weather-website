// console.log('Client side javascript file is loaded!')
//
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
//

//
// fetch('http://localhost:3000/weather?address=kos').then( (response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From JavaScript'
messageTwo.textContent = ''

console.log('dani')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    fetch('/weather?address='+location).then( (response) => {
        response.json().then((data) => {
            console.log(data)
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                messageOne.textContent = data.location
                messageTwo.textContent  =  data.weather_descriptions +
                    '. Temperature: '+ data.temperature + ' Feels like: ' +data.feelslike +
                    '. Wind Speed: ' +data.wind_speed + '. Humidity: ' + data.humidity
            }
        })
    })
    //messageTwo.textContent = location
})
