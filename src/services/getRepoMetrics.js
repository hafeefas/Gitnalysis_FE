import axios from "axios"
axios.defaults.withCredentials=true;
export const getRepoMetrics = async (full_name) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/lead_time/running_average/${full_name}`,{},
      {withCredentials:true}
      );;
      // const response = await axios.get(`http://localhost:8080/api/lead_time/running_average/${full_name}`);
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error fetching authenticated user:', error);
    }
  };