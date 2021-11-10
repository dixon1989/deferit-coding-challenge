import axios from "axios";

// Using Axios as mock retrieving json data
export const getDataResults = async (page: number) => {
  try {
    /* Only use local data for further presentation */
    const req = await axios.get(
      `https://my-json-server.typicode.com/LifepayDickson/mockjsondata/posts`,
      {
        params: {
          _page: page,
          _limit: 10,
        },
      }
    );
    if (req.status === 200) {
      let data = req.data;
      return data;
    }
  } catch (error) {
    console.log("Couldnt Retrieve Data: ", error);
  }
};
