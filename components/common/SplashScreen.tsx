import React from "react";
import { ActivityIndicator, Text, View, } from "react-native";

export default function SplashScreen({ flex }: { flex?: any }) {
  return (
    <View style={{ flex: flex ?? 0, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Getting data...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

