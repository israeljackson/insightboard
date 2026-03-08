import { createContext, useState } from "react";

export const ActivityContext = createContext();

export function ActivityProvider({ children }) {

  const [activities, setActivities] = useState([]);

  const logActivity = (type, message) => {

    const newActivity = {
      id: Date.now(),
      message,
      type: type,
      time: new Date().toLocaleTimeString()
    };

    setActivities(prev => [newActivity, ...prev]);
  };

  return (
    <ActivityContext.Provider value={{ activities, logActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}