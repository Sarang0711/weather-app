import React,{useState, useEffect} from "react";

const App = () => {
  const [weather, setWeather] = useState({
      icon: '',
      city: '',
      description: ''
      });
  const [search, setSearch] = useState('Pune');
  let icon;
  useEffect(()=> {
    const fetchApi = async() => {
      const API_KEY = "88608d1d4cd10a45130946268ca36b0b";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${API_KEY}`;
      const response = await fetch(url);
      // console.log(response)
      const resJson = await response.json();
      // console.log(resJson);
      setWeather({
        city: resJson.main,
        icon: resJson.weather[0].icon,
        description: resJson.weather[0].description
      }
        );

      // ? useEffect is called when it observes some changes in the search. onClick and useEffect cannot be used at same time
    }

    fetchApi();
  }, [search]);

  return(
    <div className="main">
      <div>
        <input 
          type="search"
          name="search"
          id = "search"
          spellCheck = {false}
          onChange={(event) => {
            setSearch(event.target.value);
          }} 
        />
      </div>
            {!weather ? <h2>Not Found</h2> : (
              <div className="info">
                <p>Location: {search}</p>
                <div className="img-weather">
                <p>Weather: {weather.description}</p>
                <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
                </div>
                <p>Temperature: {weather.city.temp}</p>
                <p>Min-temp: {weather.city.temp_min}</p>
                <p>Max-temp: {weather.city.temp_max}</p>
              </div>
            )}
    </div>
  )
}
export default App;