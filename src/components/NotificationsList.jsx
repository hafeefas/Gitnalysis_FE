import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { VscBell } from "react-icons/vsc";

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/notifications/${page}`);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [page]);

  return (
    <div>
      <div className="flex text-3xl text-white p-5 justify-center items-center">
        <div>Your Notifications</div>
        <div className="ml-4">
          <VscBell style={{ color: "green" }} />
        </div>
      </div>
      <div style={{ backgroundColor: "#171C2Eff" }}>
        <ul
          className="h-full w-fit text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white "
          style={{ backgroundColor: "#171C2Eff" }}
        >
          {notifications.map((notification, index) => (
            <li
              key={index}
              className="w-1/3 py-2 pl-4 border-b border-gray-200 dark:border-gray-600 inline-block items-center text-white hover:bg-gradient-to-br from-lime-400 to-green-500 hover:text-black"
            >
              {notification.type} - {notification.title} - {notification.timeAgo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsList;
