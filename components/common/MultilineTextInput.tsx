import React from "react";

import { Text, View,TextInput } from "react-native";

export const MultilineTextInput = (props: any) => {
    return (
      <View
        style={{
          backgroundColor: props.value,
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderTopColor: "#000000",
          borderTopWidth: 1,
          margin: 10,
          maxWidth:props.maxWidth
        }}>
        <TextInput
          {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          editable
          maxLength={10000}
          style={{ padding: 10}}
        />
      </View>
    );
  }
