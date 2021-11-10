import * as React from "react";
import { StyleSheet } from "react-native";

import BillList from "../components/BillList";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <View style={styles.container}>
      <BillList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
