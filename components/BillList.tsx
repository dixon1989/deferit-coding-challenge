import React from "react";
import moment from "moment";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { Text, View } from "./Themed";
import { ListItem, Avatar, Overlay } from "react-native-elements";
import { billStatus, getBillStatus, useBillsData } from "../utils";

export default function BillList({ navigation }: any) {
  const [showStatus, setShowStatus] = React.useState(false);
  const [statusInfo, setStatusInfo] = React.useState({ logo: "", text: "" });
  const [billsData, fetchMore, isLoading] = useBillsData();

  const toggleStatusInfo = () => {
    setShowStatus(!showStatus);
  };

  const keyExtractor = (item: any, index: number) => index.toString();

  const renderFooter = () => {
    return (
      <>
        {isLoading ? (
          <ActivityIndicator
            style={styles.centerStyle}
            size="small"
            color="#000000"
          />
        ) : null}
      </>
    );
  };

  const renderItem = ({ item }: any) => (
    <>
      <ListItem bottomDivider>
        <Avatar source={{ uri: item.logo }} />
        <ListItem.Content>
          <ListItem.Title>{item.company}</ListItem.Title>
          <ListItem.Subtitle>
            {moment(item.billDate).format("LLL")}
          </ListItem.Subtitle>
          <ListItem.Subtitle>
            <View
              style={{
                flex: 1,
                flexDirection:
                  item.status === "processing" || item.status === "scheduled"
                    ? "row"
                    : "column",
              }}
            >
              <Text style={{ color: billStatus(item.status) }}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Text>
              {item.status === "processing" || item.status === "scheduled" ? (
                <TouchableOpacity
                  onPress={() => {
                    setStatusInfo(getBillStatus(item.status));
                    toggleStatusInfo();
                  }}
                >
                  <FontAwesome
                    name="info-circle"
                    size={20}
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content right>
          <ListItem.Subtitle>$ {item.amount.toFixed(2)}</ListItem.Subtitle>
        </ListItem.Content>
        <Pressable
          onPress={async () => {
            navigation.navigate("Modal", {
              billName: item.company,
              viewBills: item.receipt,
            });
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <MaterialCommunityIcons name="receipt" size={25} />
        </Pressable>
      </ListItem>
    </>
  );

  return (
    <View>
      <FlatList
        keyExtractor={keyExtractor}
        data={billsData}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.9}
        onEndReached={fetchMore}
      />
      <Overlay isVisible={showStatus} onBackdropPress={toggleStatusInfo}>
        <View style={styles.statusPopupContainer}>
          <Text>{statusInfo.logo}</Text>
          <Text>{statusInfo.text}</Text>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    width: "100%",
  },
  statusPopupContainer: {
    margin: 15,
    width: "80%",
  },
  centerStyle: {
    alignSelf: "center",
  },
});
