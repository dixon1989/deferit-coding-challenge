import React from "react";
import { getDataResults } from "../api";

export function useBillsData() {
  const [page, setPage] = React.useState(1);
  // default this to true to kick the initial effect hook to
  // fetch the first page
  const [shouldFetch, setShouldFetch] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
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
        setIsLoading(true);

        setTimeout(() => {
          // set the should fetch call to false to prevent fetching
          // on page number update
          setShouldFetch(false);
          setBillsData((oldBillData: any) => [...oldBillData, ...newBillsData]);

          //increment page for the next call
          setPage(page + 1);
          setIsLoading(false);
        }, 1500);
      };

      fetch();
    },
    // prevent fetching for other state changes
    [page, shouldFetch]
  );

  return [billsData, fetchMore, isLoading];
}
