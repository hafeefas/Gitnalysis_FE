import axios from "axios";
axios.defaults.withCredentials = true;
export const getLeadTimeMetrics = async (username, repo) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/lead_time/running_average/${username}/${repo}`,
      {},
      // `http://localhost:8080/api/lead_time/running_average/${username}/${repo}`, {},
      { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
  }
};
