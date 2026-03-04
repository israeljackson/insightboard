import { useState, useEffect } from "react";

// Custom hook to fetch data from a local JSON file and manage loading and error states
const useFetchFake = () => {

  // State for storing fetched data, loading status, and any errors that occur during fetching
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch data when the component using this hook mounts
  useEffect(() => {

    // Asynchronous function to fetch data from the local JSON file
    const fetchData = async () => {

      // Set loading to true before starting the fetch operation
      setLoading(true);

      // Try-catch block to handle potential errors during the fetch operation
      try {

        // Fetch data from the local JSON file
        const response = await fetch("/fakeData.json");
        // Convert fetched raw data to json
        const jsonData = await response.json();
        // Update the data state with the fetched data
        setData(jsonData);
      } catch (err) {
        // setError(err.message)
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function to initiate the data fetching process
    fetchData();
  }, 
  []);
  // Return the fetched data, loading status, and any errors to the component that uses this hook
  return { data, loading, error };
}

// Export the custom hook for use in other components
  export default useFetchFake;