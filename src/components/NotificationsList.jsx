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

  const handlePrevious = () => {
    if (notifications.length <= 30) {
      alert('No older notifications');
    } else {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl text-white p-5">
        <div className="flex items-center justify-center">
          <div>Your Notifications</div>
          <div className="ml-4">
            <VscBell style={{ color: "green" }} />
          </div>
          <button onClick={handlePrevious} className="ml-4 py-1 px-2 text-sm rounded bg-gradient-to-br from-lime-400 to-green-500 text-white hover:opacity-90">
            Previous 30
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white overflow-hidden" style={{ width: '33%' }}>
        <ul className="text-sm font-medium">
          {notifications.map((notification, index) => (
            <li
              key={index}
              className={`py-2 border-b border-gray-200 dark:border-gray-600 text-center text-white hover:bg-gradient-to-br from-lime-400 to-green-500 hover:text-black ${index === notifications.length - 1 ? 'border-b-0' : ''}`}
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
