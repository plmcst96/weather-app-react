import { useState } from "react"
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap"
import "./cardWeather.css"
import {
  WiCloud,
  WiDayHaze,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiThermometer,
  WiThunderstorm,
} from "weather-icons-react"
import "./cardWeather.css"

import rain from "../assets/bg-img/rain.jpeg"
import fog from "../assets/bg-img/fog.jpeg"
import clear from "../assets/bg-img/clear.jpeg"
import cloud from "../assets/bg-img/cloud.jpeg"
import thunderstorm from "../assets/bg-img/thunderstorm.jpeg"
import snow from "../assets/bg-img/snow.jpeg"

const Geolocation = () => {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    } else {
      console.log("Geolocation not supported")
    }
  }

  const success = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    setLocation({ latitude, longitude })
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)

    // Make API call to OpenWeatherMap
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f81723a09ef08ea2122c7f28725ef97d&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data)
        setIsLoading(false)
        console.log("dati", data)
      })
      .catch((error) => {
        setIsLoading(false)
        setIsError(true)
        console.log(error)
      })
  }

  function error() {
    console.log("Unable to retrieve your location")
  }

  return (
    <div>
      <Row className="d-flex justify-content-center text-center">
        <Col xs={4}>
          {isLoading ? (
            <Spinner
              animation="border"
              variant="info"
              className={location ? "d-flex" : "d-none"}
            />
          ) : null}
          {isError && (
            <Alert variant="danger" className="text-center">
              Errore nel recupero dei dati meteo😥
            </Alert>
          )}
          {!location ? (
            <button
              onClick={handleLocationClick}
              className="text-center bg-white text-black-50 btn"
              style={{ border: "1px solid #fd7486", borderRadius: "0" }}
            >
              PRESS TO START
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </button>
          ) : null}
        </Col>
      </Row>
      {weather ? (
        <Container fluid className="mt-5">
          <Row className="d-flex justify-content-center flex-column align-items-center">
            <Col xs={12}>
              <Card
                className="d-flex justify-content-center align-items-center p-3 border-white rounded-2"
                style={{ zIndex: "100" }}
              >
                {weather.weather[0].main
                  .toLowerCase()
                  .includes("snow".toLowerCase()) ? (
                  <img
                    src={snow}
                    alt=""
                    className="bgImg rounded-5"
                    style={{ zIndex: "-100" }}
                  />
                ) : "" ||
                  weather.weather[0].main
                    .toLowerCase()
                    .includes("fog".toLowerCase()) ? (
                  <img
                    src={fog}
                    alt=""
                    className="bgImg rounded-5"
                    style={{ zIndex: "-100" }}
                  />
                ) : "" ||
                  weather.weather[0].main
                    .toLowerCase()
                    .includes("rain".toLowerCase()) ? (
                  <img
                    src={rain}
                    alt=""
                    className="bgImg rounded-5"
                    style={{ zIndex: "-100" }}
                  />
                ) : "" ||
                  weather.weather[0].main
                    .toLowerCase()
                    .includes("thunderstorm".toLowerCase()) ? (
                  <img
                    src={thunderstorm}
                    alt=""
                    className="bgImg rounded-5"
                    style={{ zIndex: "-100" }}
                  />
                ) : "" ||
                  weather.weather[0].main
                    .toLowerCase()
                    .includes("clear".toLowerCase()) ? (
                  <img
                    src={clear}
                    alt=""
                    className="bgImg rounded-5"
                    style={{ zIndex: "-100" }}
                  />
                ) : "" ||
                  weather.weather[0].main
                    .toLowerCase()
                    .includes("cloud".toLowerCase()) ? (
                  <img
                    src={cloud}
                    alt=""
                    className="bgImg rounded-5"
                    style={{ zIndex: "-100" }}
                  />
                ) : "" ||
                  weather.weather[0].main
                    .toLowerCase()
                    .includes("haze".toLowerCase()) ? (
                  <img
                    src={fog}
                    alt=""
                    className="bgImg rounded-5"
                    style={{ zIndex: "-100" }}
                  />
                ) : (
                  ""
                )}
                <h3 className="fw-bold text-white">{weather.name}</h3>
                <p>{/* <em>{`${day} | ${month} | ${year}`}</em> */}</p>
                <h1 className="fw-bold text-white" style={{ fontSize: "55px" }}>
                  {Math.trunc(weather.main.temp)}°
                </h1>
                {weather.weather[0].main
                  .toLowerCase()
                  .includes("snow".toLowerCase()) ? (
                  <WiSnow className="text-info" style={{ fontSize: "100px" }} />
                ) : "" ||
                  weather.weather[0].main
                    .toLowerCase()
                    .includes("fog".toLowerCase()) ? (
                  <WiFog
                    className="text-secondary"
                    style={{ fontSize: "100px" }}
                  />
                ) : "" ||
                  weather.weather[0].main
                    .toLowerCase()
                    .includes("rain".toLowerCase()) ? (
                  <WiRain
                    className="text-primary"
                    style={{ fontSize: "100px" }}
                  />
                ) : "" ||
                  weather.weather[0].main
                    .toLowerCase()
                    .includes("clear".toLowerCase()) ? (
                  <WiDaySunny
                    style={{ fontSize: "100px", color: "rgb(255, 212, 102)" }}
                  />
                ) : "" ||
                  weather.weather[0].main
                    .toLowerCase()
                    .includes("cloud".toLowerCase()) ? (
                  <WiCloud
                    className="text-secondary"
                    style={{ fontSize: "100px" }}
                  />
                ) : "" ||
                  weather.weather[0].main
                    .toLowerCase()
                    .includes("thunderstorm".toLowerCase()) ? (
                  <WiThunderstorm
                    className="text-black"
                    style={{ fontSize: "100px" }}
                  />
                ) : "" ||
                  weather.weather[0].main
                    .toLowerCase()
                    .includes("haze".toLowerCase()) ? (
                  <WiDayHaze
                    className="text-secondary"
                    style={{ fontSize: "100px" }}
                  />
                ) : (
                  ""
                )}

                <Card.Body className="border-bottom border-white w-75 text-center text-white fw-bold">
                  <Card.Text>{weather.weather[0].main}</Card.Text>
                </Card.Body>
                <Card.Body className="w-75 text-center text-white">
                  <Row>
                    <Col>
                      <span>
                        Max {Math.trunc(weather.main.temp_max)}°
                        <WiThermometer className="fs-3" />
                      </span>
                    </Col>
                    <Col>
                      <span>
                        Min {Math.trunc(weather.main.temp_min)}°{" "}
                        <WiThermometer className="fs-3" />
                      </span>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : null}
    </div>
  )
}

export default Geolocation
