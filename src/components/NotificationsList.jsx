import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <h1>Notifications</h1>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
            {notification.type} - {notification.title} - {notification.timeAgo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsList;
