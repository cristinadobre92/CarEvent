import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ImageBackground, StyleSheet, View } from "react-native";
import { TabNavigator } from "./src/navigation/TabNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require("./assets/car.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >

        {/* Content layer above overlay */}
        <View style={styles.content}>
          <NavigationContainer>
            <TabNavigator />
            <StatusBar style="light" />
          </NavigationContainer>
        </View>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
});
