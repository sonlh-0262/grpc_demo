import './App.css';
import { useState, useEffect } from 'react'
import { PrefecturesRequest } from './shoppb/shop_pb'
import { ShopClient } from './shoppb/shop_grpc_web_pb'

var client = new ShopClient('http://localhost:8000')

function App() {
  const [prefectures, setPrefectures] = useState([])

  const getPrefectures = () => {
    console.log('called prefecture')

    const prefectureRequest = new PrefecturesRequest()
    client.prefectureList(prefectureRequest, {}, function(err, response) {
      setPrefectures(response.array[0])
    })
  }

  useEffect(() => {
    getPrefectures()
  }, [])

  return (
    <div className="App">
      <select>
        { prefectures.map((p, index) => {
          return <option key={index} value={p}>{p}</option>
        }) }
      </select>
    </div>
  );
}

export default App;
