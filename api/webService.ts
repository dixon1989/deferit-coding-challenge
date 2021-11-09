import axios from "axios";
import React from "react";

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

export function useBillsData() {
  const [page, setPage] = React.useState(1);
  // default this to true to kick the initial effect hook to
  // fetch the first page
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [billsData, setBillsData] = React.useState<any>([]);

  // return this function for Flatlist to call onEndReached
  const fetchMore = React.useCallback(() => setShouldFetch(true), []);

  React.useEffect(
    () => {
      // prevent fetching for other state changes
      if (!shouldFetch) {
        return;
      }

      const fetch = async () => {
        const newBillsData = await getDataResults(page);

        // set the should fetch call to false to prevent fetching
        // on page number update
        setShouldFetch(false);
        setBillsData((oldBillData: any) => [...oldBillData, ...newBillsData]);

        //increment page for the next call
        setPage(page + 1);
      };
      fetch();
    },
    // prevent fetching for other state changes
    [page, shouldFetch]
  );

  return [billsData, fetchMore];
}
