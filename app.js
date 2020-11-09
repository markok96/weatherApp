const form = document.querySelector('.form');
const input = document.querySelector('.form input');
const errormsg = document.querySelector('.error-msg');
const list = document.querySelector('.cities');

const apiKey = "f81a040bf6483bed52c36dcc287ea13a";


function setQuery(e){
  const inputValue = input.value;
  getData(inputValue);
  errormsg.textContent = "";
  form.reset();
  e.preventDefault();
}

function getData(query){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
  fetch(url)
  .then(response => response.json())
  .then(displayData)
  .catch(() => {
    errormsg.textContent = "Please search for a valid city";
  })
}

function displayData(response){
  const { main, name, sys, weather } = response
  const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
    weather[0]["icon"]
  }.svg`;

  const li = document.createElement("li");
  li.classList.add("city");
  const markup = `
    <h2 class="city-name" data-name="${name}, ${sys.country}"> 
      <span>${name}</span>
      <sup>${sys.country}</sup>
    </h2>
    <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
    <figure>
      <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
      <figcaption>${weather[0]["description"]}</figcaption>
    </figure>
  `;

  li.innerHTML = markup;
  list.appendChild(li);
}

form.addEventListener('submit', setQuery);