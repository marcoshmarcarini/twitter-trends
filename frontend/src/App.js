import logo from './twitter.png';
import './App.css';
import {FaCrosshairs} from 'react-icons/fa'
import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [trends, setTrends] = useState ([])
  const [woeid, setWoeid] = useState('1')

  useEffect(() => getTrends(), [woeid])

  function getTrends(){
    // O axios irá importar o conteúdo do backend e trazer para o front
    axios
    .get('/api/trends', {
      params: {
        woeid, 
      },
    })
    .then(response => {
      console.log(response.data)
      setTrends(response.data[0].trends)
    })
    .catch(error => console.log(error.message))
  }

  function handleLocation(){
   if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(
       position => {
         axios.get('/api/near-me', {
           params: {
             lat: position.coords.latitude,
             long: position.coords.longitude,
            },
         })
         .then(response => {console.log(response.data[0].woeid)
        })
        .catch(error => console.log(error.message))
       }, error => {
       console.log(error.message)
     }
    )

   }else{
     alert(`Geolocalização não suportada!`)
   }
  }
  function listTrends(){

      return (
            <ul className="lista">
            {trends.map((trend,index) => {
                return (
                 
                  <li key={index} className="item-lista">
                    <a href={trend.url} className="link-lista">{trend.name}</a>
                    {trend.tweet_volume && ( 
                      <span className="tweet_volume">{trend.tweet_volume}</span>
                    )}
                  </li>
                )
              })}
            </ul>
        
        )
  
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h4>Twitter Trends</h4>
      </header>
      <div className="menu">
        <select name="trending-place" className="seletor-localizacao" onChange={e => setWoeid(e.target.value)}>
          <option value='1'>Mundo</option>
          <option value='23424768'>Brasil</option>
        </select>
        <div className="location" onclick={handleLocation()}>
            <FaCrosshairs />
        </div>
      </div>
      <div className="content">{listTrends()}</div>
    </div>
  );
}

export default App;
