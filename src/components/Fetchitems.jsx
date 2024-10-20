import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"; // Make sure axios is imported
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchDone = useSelector((store) => store.fetchStatus.fetchDone); // Only use `fetchDone` for dependency
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchDone) return; // Prevent re-fetching if already done

    const fetchData = async () => {
      try {
        dispatch(fetchStatusActions.markFetchingStarted());
        const res = await axios.get("http://localhost:8080/products");
        dispatch(itemsActions.addInitialItems(res.data));
        dispatch(fetchStatusActions.markFetchDone());
      } catch (error) {
        console.error("Error fetching items:", error);
        // Handle fetch error if necessary
      } finally {
        dispatch(fetchStatusActions.markFetchingFinished());
      }
    };

    fetchData();
  }, [fetchDone, dispatch]); // `dispatch` and `fetchDone` in dependencies

  return null; // Return null instead of an empty fragment
};

export default FetchItems;
