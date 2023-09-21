// eslint-disable-next-line
import React from "react";
import { View, Text, Switch } from "react-native";

const SwitchButton = (props) => {
  return (
    <View>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ marginRight: 10, fontSize: 22 }}>°C</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={props.degreeFormat ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={props.toggleFormat}
            value={props.degreeFormat}
          />
          <Text style={{ marginLeft: 10, fontSize: 22 }}>°F</Text>
        </View>
      </View>
    </View>
  );
};

export default SwitchButton;
