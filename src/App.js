// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import LocationInfo from "./components/LocationInfo";
import SwitchButton from "./components/SwitchButton";

import { View, Text, SafeAreaView, StatusBar } from "react-native";

function App() {
  const [location, setLocation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [degreeFormat, setDegreeFormat] = useState(false);
  const [deviceLocation, setDeviceLocation] = useState([]);
  const [errorLoading, setErrorLoading] = useState(false);

  const api = (v) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${v}&appid=3069ae2718e40f8dc1998b7250e16f10&units=metric`;

  const myInit = { mode: "cors" };

  const myRequest = (v) => new Request(api(v), myInit);

  const toggleFormat = () => setDegreeFormat(!degreeFormat);

  // Adding Time does re-rendering. Need to solve this problem.
  // setInterval(() => {
  //   var date = new Date();
  //   setHour(
  //     date.toLocaleTimeString(navigator.language, {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit"
  //     })
  //   );
  // }, 1000);

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const ps = [
        Math.round(position.coords.latitude),
        Math.round(position.coords.longitude),
      ];
      setDeviceLocation(ps);
    });
  }

  useEffect(() => {
    if (deviceLocation.length !== 0) {
      fetchResults();
    }
  }, [deviceLocation]);

  async function fetchResults() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${deviceLocation[0]}&lon=${deviceLocation[1]}&appid=3069ae2718e40f8dc1998b7250e16f10&units=metric`,
        myInit,
      );
      if (!response.ok) {
        throw new Error("bad network request");
      }
      const data = await response.json();
      setLocation(data);
      setErrorLoading(false);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setErrorLoading(true);
      console.error(e);
    }
  }

  async function getLocation(value) {
    setIsLoading(true);
    try {
      const response = await fetch(myRequest(value));
      if (!response.ok) {
        throw new Error("bad network request");
      }
      const data = await response.json();
      setLocation(data);
      value = "";
      setIsLoading(false);
      setErrorLoading(false);
    } catch (e) {
      setErrorLoading(true);
      setIsLoading(false);
      console.error(e);
    }
  }

  async function getInitialLocation() {
    setIsLoading(true);
    try {
      const response = await fetch(api("london"), myInit);
      if (!response.ok) {
        throw new Error("bad network request");
      }
      const data = await response.json();
      setErrorLoading(false);
      setLocation(data);
      setIsLoading(false);
    } catch (e) {
      setErrorLoading(true);
      setIsLoading(false);
      console.error(e);
    }
  }

  useEffect(() => {
    getInitialLocation();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <StatusBar animated={true} backgroundColor="black" />
      <View style={{ height: "100%" }}>
        <View
          style={{
            padding: 30,
            alignItems: "center",
            backgroundColor: "#F5FCCD",
            height: "100%",
          }}
        >
          <Header
            errorLoading={errorLoading}
            getUserLocation={getUserLocation}
            getLocation={getLocation}
          />
          {isLoading ? (
            <Text style={{ fontSize: 40 }}> Loading... </Text>
          ) : (
            <View>
              <LocationInfo degreeFormat={degreeFormat} location={location} />
              <SwitchButton
                toggleFormat={() => toggleFormat()}
                degreeFormat={degreeFormat}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;
