import React from "react";
import moment from "moment";
import { StyleSheet, TouchableOpacity, FlatList, Image } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { useBillsData } from "../api";
import { Text, View } from "./Themed";
import { ListItem, Avatar, Overlay } from "react-native-elements";
import { billStatus, getBillStatus, windowWidth, windowHeight } from "../utils";

export default function BillList() {
  const [visible, setVisible] = React.useState(false);
  const [showStatus, setShowStatus] = React.useState(false);
  const [statusInfo, setStatusInfo] = React.useState("");
  const [viewBills, setViewBills] = React.useState("");
  const [billsData, fetchMore] = useBillsData();

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleStatusInfo = () => {
    setShowStatus(!showStatus);
  };

  const keyExtractor = (item: any, index: number) => index.toString();

  const renderItem = ({ item }: any) => (
    <>
      <ListItem bottomDivider>
        <Avatar source={{ uri: item.logo }} />
        <ListItem.Content>
          <ListItem.Title>{item.company}</ListItem.Title>
          <ListItem.Subtitle>
            {moment(item.billDate).format("LLL")}
          </ListItem.Subtitle>
          <ListItem.Subtitle>{item.id}</ListItem.Subtitle>
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
        <TouchableOpacity
          onPress={() => {
            setViewBills(item.receipt);
            toggleOverlay();
          }}
        >
          <MaterialCommunityIcons name="receipt" size={25} />
        </TouchableOpacity>
      </ListItem>
    </>
  );

  return (
    <View>
      <FlatList
        keyExtractor={keyExtractor}
        data={billsData}
        renderItem={renderItem}
        onEndReachedThreshold={0.9}
        onEndReached={fetchMore}
      />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View>
          <Image
            style={styles.imageWidth}
            resizeMode="stretch"
            source={{
              uri: viewBills,
            }}
          />
        </View>
      </Overlay>
      <Overlay isVisible={showStatus} onBackdropPress={toggleStatusInfo}>
        <View style={styles.statusPopupContainer}>
          <Text>{statusInfo}</Text>
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
    width: "80%",
  },
  imageWidth: { width: windowWidth, height: windowHeight },
});
