import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import axios from "axios";

const WebsiteUsersCounter = () => {
  const [numWebsiteUsers, setNumWebsiteUsers] = useState(null);

  useEffect(() => {
    async function getNumWebsiteUsers() {
      try {

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/getWebsiteUsers/getNum`
        );

        setNumWebsiteUsers(response.data.numUsers);
      } catch (error) {
        console.log(error);
      }
    }

    getNumWebsiteUsers();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
    {numWebsiteUsers?
    <div className="text-2xl font-mono">{numWebsiteUsers} Developers Are Using GITnalysis</div>
    : null}
    </div>
  
  );
};

export default WebsiteUsersCounter;