import { useEffect, useState } from "react"
import { Alert, Col, Row, Spinner } from "react-bootstrap"
import {
  WiCloud,
  WiDayHaze,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "weather-icons-react"

import "./cardWeather.css"
import { format, parseISO } from "date-fns"

const ForecastWeather = ({ city }) => {
  const [forecast, setForecast] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const url = `https://api.openweathermap.org/data/2.5/forecast/${city}&appid=f81723a09ef08ea2122c7f28725ef97d&units=metric`

  const getForecast = async () => {
    try {
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        console.log(data)
        setForecast(data.list)
        setIsLoading(false)
      } else {
        throw new Error("Le previsioni future non ci sono!")
      }
    } catch (error) {
      console.log("errore", error)
      setIsError(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (forecast) {
      getForecast()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log("eccoli", forecast)

  return (
    <Row>
      {isLoading && (
        <div className="text-center mb-2">
          <Spinner animation="border" variant="info" />
        </div>
      )}
      {isError && (
        <Alert variant="danger" className="text-center">
          Errore nel recupero dei dati meteo😥
        </Alert>
      )}
      {forecast.slice(0, 5).map((days, i) => {
        const dateString = days.dt_txt
        const dateObj = parseISO(dateString, "yyy-MM-dd HH:mm:ss", new Date())
        const formatData = format(dateObj, "dd/MM HH:mm")
        return (
          <Col
            xs={11}
            md={6}
            className="col-2 d-flex flex-column align-items-center forweather"
            key={i}
            style={{ backgroundColor: "#87B3BA" }}
          >
            <p className="text-center text-white">{formatData}</p>
            {days.weather[0].main
              .toLowerCase()
              .includes("snow".toLowerCase()) ? (
              <WiSnow className="text-info" style={{ fontSize: "50px" }} />
            ) : "" ||
              days.weather[0].main
                .toLowerCase()
                .includes("fog".toLowerCase()) ? (
              <WiFog className="text-secondary" style={{ fontSize: "50px" }} />
            ) : "" ||
              days.weather[0].main
                .toLowerCase()
                .includes("rain".toLowerCase()) ? (
              <WiRain className="text-primary" style={{ fontSize: "50px" }} />
            ) : "" ||
              days.weather[0].main
                .toLowerCase()
                .includes("clear".toLowerCase()) ? (
              <WiDaySunny
                style={{ fontSize: "50px", color: "rgb(255, 212, 102)" }}
              />
            ) : "" ||
              days.weather[0].main
                .toLowerCase()
                .includes("cloud".toLowerCase()) ? (
              <WiCloud
                className="text-secondary"
                style={{ fontSize: "50px" }}
              />
            ) : "" ||
              days.weather[0].main
                .toLowerCase()
                .includes("thunderstorm".toLowerCase()) ? (
              <WiThunderstorm
                className="text-black"
                style={{ fontSize: "50px" }}
              />
            ) : "" ||
              days.weather[0].main
                .toLowerCase()
                .includes("haze".toLowerCase()) ? (
              <WiDayHaze
                className="text-secondary"
                style={{ fontSize: "50px" }}
              />
            ) : (
              ""
            )}
            <span className="text-white">
              {Math.trunc(days.main.temp_min)}°
            </span>
            <span className="text-white">
              {Math.trunc(days.main.temp_max)}°
            </span>
          </Col>
        )
      })}
    </Row>
  )
}

export default ForecastWeather
