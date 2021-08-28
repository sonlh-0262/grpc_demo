import './App.css';
import { useState, useEffect } from 'react'
import { PrefecturesRequest, ShopsByPrefectureRequest, CalendarsRequest } from './shoppb/shop_pb'
import { ShopClient } from './shoppb/shop_grpc_web_pb'

var client = new ShopClient('http://localhost:8000')

function App() {
  const [prefectures, setPrefectures] = useState([])
  const [selectedPrefecture, setSelectedPrefecture] = useState("")
  const [shops, setShops] = useState([])
  const [selectedShop, setSelectedShop] = useState("")
  const [calendars, setCalendars] = useState([])

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

  useEffect(() => {
    const getShopsByPrefecture = () => {
      console.log('called shop API')

      const shopRequest = new ShopsByPrefectureRequest()
      shopRequest.setId(selectedPrefecture)

      client.shopsByPrefectureList(shopRequest, {}, function(err, response) {
        setShops(response.array[0])
      })
    }

    getShopsByPrefecture()
  }, [selectedPrefecture])

  const handleChangePrefecture = (event) => {
    setSelectedPrefecture(event.target.value)
  }

  const handleChangeShop = (event) => {
    setSelectedShop(event.target.value);
  }

  const getCalendarsByShop = () => {
    console.log('called calendar API')

    const calendarRequest = new CalendarsRequest()
    calendarRequest.setStoreSfid(selectedShop);
    calendarRequest.setStartTime("20210828");

    client.calendarsList(calendarRequest, {}, function(err, response) {
      console.log(response.array[0]);
      setCalendars(response.array[0]);
    })
  }

  const handleClickCalendar = () => {
    getCalendarsByShop();
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
          <select onChange={handleChangeShop} value={selectedShop}>
            {
              shops.map((shop, index) => {
                return <option key={index} value={shop[7]}>{shop[1]}</option>
              })
            }
          </select>
        )
      }
      {
        selectedShop && <button onClick={handleClickCalendar}>Calendar</button>
      }
    </div>
  );
}

export default App;
