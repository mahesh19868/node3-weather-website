const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

const getForecast = (location) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent =  data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent =  data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
}


weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading....';
    messageTwo.textContent = '';
    getForecast(search.value);
})