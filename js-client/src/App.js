import './App.css';
import { useState, useEffect } from 'react'
import { PrefecturesRequest, ShopsByPrefectureRequest } from './shoppb/shop_pb'
import { ShopClient } from './shoppb/shop_grpc_web_pb'

var client = new ShopClient('http://localhost:8000')

function App() {
  const [prefectures, setPrefectures] = useState([])
  const [selectedPrefecture, setSelectedPrefecture] = useState("")
  const [shops, setShops] = useState([])

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

  const getShopsByPrefecture = () => {
    console.log('called shop API')

    const shopRequest = new ShopsByPrefectureRequest()
    shopRequest.setId(selectedPrefecture)

    client.shopsByPrefectureList(shopRequest, {}, function(err, response) {
      setShops(response.array[0])
    })
  }

  useEffect(() => {
    getShopsByPrefecture()
  }, [selectedPrefecture])

  const handleChangePrefecture = (event) => {
    setSelectedPrefecture(event.target.value)
  }

  return (
    <div className="App">
      <select onChange={handleChangePrefecture} value={selectedPrefecture}>
        { prefectures.map((p, index) => {
          return <option key={index} value={p}>{p}</option>
        }) }
      </select>

      {
        shops && (
          <select>
            {
              shops.map((shop, index) => {
                return <option key={index} value={shop[7]}>{shop[1]}</option>
              })
            }
          </select>
        )
      }
    </div>
  );
}

export default App;
