// eslint-disable-next-line
import React, { useState } from "react";
import { View, Image, Text, TextInput, Pressable } from "react-native";

const Header = (props) => {
  const [city, setCity] = useState("");

  return (
    <View style={{ marginTop: 0 }}>
      <View
        style={{
          gap: "10px",
          fontSize: "30px",
        }}
      >
        <Image
          style={{ width: 100, height: 100, margin: "auto" }}
          source={{
            uri: "https://www.feirox.com/rivu/2016/04/Klara-1-1.png",
          }}
        />
        <Text style={{ color: "black", fontSize: 40 }}>Current Weather</Text>
      </View>

      <View
        className="align-center"
        style={{
          gap: "20px",
          flexDirection: "row",
          margin: 20,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: "30px", height: "30px" }}
          source={{
            uri: "https://img.icons8.com/ios-filled/50/000000/marker.png",
          }}
          alt="location access"
        />
        <TextInput
          style={{
            borderRadius: "7px",
            padding: "5px",
            borderWidth: 2,
          }}
          onChangeText={(text) => setCity(text)}
          value={city}
          placeholder="city..."
        />
      </View>
      <Pressable
        style={{
          backgroundColor: "#7D7C7C",
          width: 100,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          borderRadius: 5,
        }}
        title="Search"
        onPress={() => props.getLocation(city)}
      >
        <Text> Search</Text>
      </Pressable>
      <Text>{props.errorLoading ? "Ops, something went wrong" : null}</Text>
    </View>
  );
};

export default Header;
