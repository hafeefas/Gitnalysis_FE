import axios from "axios";
axios.defaults.withCredentials = true;

// Modify the authenticateWithGitHub function to accept an additional 'repo' parameter
export const getAuthenticatedUser = async () => {
  try {
    // const response = await axios.get(
    //   `${process.env.REACT_APP_BACKEND_URL}/api/users/me`,
    //   {},
    //   { withCredentials: true }
    // );
    const response = await axios.get(`http://localhost:8080/api/users/me`,
    {},
    {withCredentials: true }
    );
    console.log("Authenticated User:", response.data);
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
  }
};

export const getUserRepos = async () => {
  try {
    // const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/me/repos`,
    // {},
    // {withCredentials:true});
    const response = await axios.get(
      `http://localhost:8080/api/users/me/repos`,
      {},
      { withCredentials: true }
    );
    console.log("Authenticated User Repos:", response.data);
    //Creates an object of full_name name and repo.name
    const repoNames = response.data.map((repo) => {
      return { full_name: repo.full_name, name: repo.name };
    });
    console.log(repoNames);
    return repoNames;
  } catch (error) {
    console.error("Error fetching authenticated user:", error);
  }
};

export const logoutGitHubUser = async () => {
  try {
    // const response = await axios.get(
    //   `${process.env.REACT_APP_BACKEND_URL}/github/logout`
    // );
    const response = await axios.get(`http://localhost:8080/github/logout`);
    console.log("Logout response:", response);
  } catch (error) {
    console.error("Error logging out authenticated user:", error);
  }
};
