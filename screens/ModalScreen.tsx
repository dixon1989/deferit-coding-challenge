import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { View, Text } from "../components/Themed";
import { windowWidth, windowHeight } from "../utils";

export default function ModalScreen({ route, navigation }: any) {
  const { viewBills, billName } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: billName,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Text>{billName}</Text>
        <Image
          style={styles.imageWidth}
          resizeMode="contain"
          source={{
            uri: viewBills,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageWidth: { width: windowWidth, height: windowHeight },
});
