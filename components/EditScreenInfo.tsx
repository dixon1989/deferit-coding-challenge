import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import moment from "moment";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import { getDataResults } from "../api";
import { RootTabParamList } from "../types";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import { ListItem, Avatar, Overlay } from "react-native-elements";

const windowWidth = Dimensions.get("window").width - 100;
const windowHeight = Dimensions.get("window").height - 350;

export default function EditScreenInfo({ navigation }: any) {
  const [mockData, setMockData] = React.useState<any>();
  const [visible, setVisible] = React.useState(false);
  const [showStatus, setShowStatus] = React.useState(false);
  const [statusInfo, setStatusInfo] = React.useState("");
  const [viewBills, setViewBills] = React.useState("");
  const [page, setPage] = React.useState(0);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const toggleStatusInfo = () => {
    setShowStatus(!showStatus);
  };

  const billStatus = (status: string) => {
    switch (status) {
      case "processing":
        return "#FF963C";
      case "scheduled":
        return "#81C3D7";
      case "unable to pay":
        return "#E63B2E";
      case "paid":
        return "#ADC76F";
      default:
        return "#000000";
    }
  };

  const getBillStatus = (status: string) => {
    switch (status) {
      case "processing":
        return "This bill is currently in processing, it can take approx. 1-2 hours depending on the time of day.";
      case "scheduled":
        return "This bill is scheduled to be paid and will be paid on the due date, you're in good hands!";
      default:
        return "";
    }
  };

  const loadMore = () => {
    setPage(page + 1)
  }

  React.useEffect(() => {
    // Should Start grabbing data from webServices API
    const load = async () => {
      setMockData(await getDataResults());
    };
    load();
  }, []);

  console.log("zzzzzzzzzzzzz", mockData);

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
        data={mockData}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={100}
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
      <TouchableOpacity onPress={() => navigation.navigate("BillInfo")}>
        <Text>Click Test</Text>
      </TouchableOpacity>
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
