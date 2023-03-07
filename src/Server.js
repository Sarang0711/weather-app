import React,{useState, useEffect} from "react";

const App = () => {
  const [weather, setWeather] = useState({
      icon: '',
      city: '',
      description: ''
      });
  const [search, setSearch] = useState('Pune');
  let icon;
  function handleChange(e) {
    setSearch(e.target.value);
    // console.log(e.target.value);
  }
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

    }

    fetchApi();
  }, [search]);

  return(
    <div className="main">
      <div>
        <form>
          <input type="text" 
            value={search}
            onChange = {handleChange}
          />
          <button 
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            // console.log(search);
            setSearch(search);
          }}
          >Search</button>
        </form>
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