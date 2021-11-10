import { Dimensions } from "react-native";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const getBillStatus = (status: string) => {
  switch (status) {
    case "processing":
      return {
        logo: "🚚",
        text: "This bill is currently in processing, it can take approx. 1-2 hours depending on the time of day.",
      };
    case "scheduled":
      return {
        logo: "📅",
        text: "This bill is currently in processing, it can take approx. 1-2 hours depending on the time of day.",
      };
    default:
      return {
        logo: "",
        text: "",
      };
  }
};

export const billStatus = (status: string) => {
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
