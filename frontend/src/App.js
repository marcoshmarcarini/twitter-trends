import logo from './twitter.png';
import './App.css';
import {FaCrosshairs} from 'react-icons/fa'
import {useState, useEffect} from 'react'
import axios from 'axios'
import conte from '../src/conte.png'

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
        <div>
        <div className="espaco-lista">
            <ul className="lista desktop">
            {trends.map((trend,index) => {
              if(index <= 30 && trend.tweet_volume != null){
                switch (trend.tweet_volume != 0){
                  case (trend.tweet_volume < 15000 && trend.tweet_volume != null):
                    return (
                      <a href={trend.url} className="link-lista">
                        <li key={index} className="item-lista-menos-dez" onMouseover="trocarItem()">
                          <p className="txt-nome">{trend.name}</p>
                          <p className="txt-tt">{trend.tweet_volume}</p>
                        </li>
                      </a>
                    )
                  break
                  case (trend.tweet_volume > 15001 && trend.tweet_volume < 30000):
                    return (
                      <a href={trend.url} className="link-lista">
                        <li key={index} className="item-lista" onMouseover="trocarItem()">
                          <p className="txt-nome">{trend.name}</p>
                          <p className="txt-tt">{trend.tweet_volume}</p>
                        </li>
                      </a>
                    )
                  break
                  case (trend.tweet_volume > 30001 && trend.tweet_volume < 50000):
                    return (
                      <a href={trend.url} className="link-lista">
                        <li key={index} className="item-lista-trinta" onMouseover="trocarItem()">
                          <p className="txt-nome">{trend.name}</p>
                          <p className="txt-tt">{trend.tweet_volume}</p>
                        </li>
                      </a>
                    )
                  break
                  case (trend.tweet_volume > 50001 && trend.tweet_volume < 80000):
                    return (
                      <a href={trend.url} className="link-lista">
                        <li key={index} className="item-lista-cincum" onMouseover="trocarItem()">
                          <p className="txt-nome">{trend.name}</p>
                          <p className="txt-tt">{trend.tweet_volume}</p>
                        </li>
                      </a>
                    )
                  break
                  case (trend.tweet_volume > 80001 && trend.tweet_volume < Infinity ):
                    return (
                      <a href={trend.url} className="link-lista">
                        <li key={index} className="item-lista-six" onMouseover="trocarItem()">
                          <p className="txt-nome">{trend.name}</p>
                          <p className="txt-tt">{trend.tweet_volume}</p>
                        </li>
                      </a>
                    )
                  break
                  default:                              
                }
              }})}
            </ul>
            <ul className="lista mobile">
            {trends.map((trend,index) => {
              if(index < 10){
                  return (
                    <a href={trend.url} className="link-lista">
                      <li key={index} className="item-lista">
                        <p className="txt-nome">{trend.name}</p>
                        <p className="txt-tt">{trend.tweet_volume}</p>
                      </li>
                    </a>
                  )}
              })}
            </ul>
          </div>
          </div>
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
      <div className="footer"><p className="texto-footer">Poweready By</p><img src={conte} className="logo-conte" /></div>
    </div>
  );
}

export default App;
