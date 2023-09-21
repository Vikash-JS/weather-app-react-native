// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

const LocationInfo = (props) => {
  const [sunSetRise, setSunSetRise] = useState([]);

  useEffect(
    () =>
      convertFromEcho(props.location.sys.sunrise, props.location.sys.sunset),
    [props.location],
  );

  const getDegreeFormat = () => (props.degreeFormat ? "°F" : "°C");

  const converToFarenheit = (v) => Math.round((v * 9) / 5) + 32;

  const convertFromEcho = (rise, set) => {
    setSunSetRise([
      new Date(rise * 1000).toLocaleDateString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      new Date(set * 1000).toLocaleDateString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    ]);
  };

  return (
    <View>
      <View
        style={{
          gap: "20px",
          fontSize: "40px",
          margin: "0px",
        }}
      >
        <Text style={{ fontSize: 16, marginVertical: 5 }}>
          {props.location.name}, {props.location.sys.country}
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 26, marginVertical: 5 }}>
          {props.degreeFormat
            ? converToFarenheit(Math.round(props.location.main.temp))
            : Math.round(props.location.main.temp)}
          {props.degreeFormat ? "°F" : "°C"}

          <Image
            source={{
              uri: `http://openweathermap.org/img/wn/${props.location.weather[0].icon}@2x.png`,
            }}
          />
        </Text>
        <Text style={{ fontSize: 16, marginVertical: 5 }}>
          Feels Like{" "}
          {props.degreeFormat
            ? converToFarenheit(Math.round(props.location.main.feels_like))
            : Math.round(props.location.main.feels_like)}
          {getDegreeFormat()} | {props.location.weather[0].description} |
          Humidity: {props.location.main.humidity}%
        </Text>
        <Text style={{ fontSize: 16, marginVertical: 5 }}>
          Sunrise: {sunSetRise[0]} | Sunset: {sunSetRise[1]}
        </Text>
      </View>
    </View>
  );
};

export default LocationInfo;
