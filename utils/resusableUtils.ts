import { Dimensions } from "react-native";

export const windowWidth = Dimensions.get("window").width - 100;
export const windowHeight = Dimensions.get("window").height - 350;

export const getBillStatus = (status: string) => {
  switch (status) {
    case "processing":
      return "This bill is currently in processing, it can take approx. 1-2 hours depending on the time of day.";
    case "scheduled":
      return "This bill is scheduled to be paid and will be paid on the due date, you're in good hands!";
    default:
      return "";
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
