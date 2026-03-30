const key = `Your_API_Key_HereS`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")

const getWeather = async(city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`
    const response = await fetch(url);
    const data = await response.json()
    return showWeather(data)
}

const showWeather = (data) => {
    if (data.error )
 {
        if(data.error.code === 1006) {
            weather.textContent = "";

            const h2 = document.createElement("h2");
            h2.textContent = "City not found";

            weather.appendChild(h2);

            return;
        }
    }
weather.textContent = "";

const div1 = document.createElement("div");

const img = document.createElement("img");
img.src =  "https:"+data.current.condition.icon;
img.alt = "Weather Icon";

div1.appendChild(img);

const div2 = document.createElement("div");

const h2 = document.createElement("h2");
h2.textContent = data.current.temp_c + " ℃";

const h4 = document.createElement("h4");
h4.textContent =data.current.condition.text;

div2.appendChild(h2);
div2.appendChild(h4);

weather.appendChild(div1);
weather.appendChild(div2);


}

form.addEventListener(
    "submit",
    function(event) {
        getWeather(search.value)
        event.preventDefault();
    }
)