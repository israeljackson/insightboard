import { BellIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotificationsBell({notifications, setNotifications, tasks}) {

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const buttonRef = useRef();

  // Count pending tasks
  const pendingCount = tasks.filter(task => !task.completed).length;


  // Handle click outside to close dropdown
  useEffect(( ) => {
    const handleClickOutside = (event) => {
      if(
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ){
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, []);


  return ( 
    <div className="relative">
      {/* Render bell icon to show notifications */}
      <button ref={buttonRef} className="relative" onClick={() => setIsOpen(!isOpen)}>
        <BellIcon className="h-6 w-6 cursor-pointer" />

          {/* Render unread count badge */}
         {pendingCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {pendingCount}
          </span>
        )}

        {/* Render dropdown with notifications when bell icon is clicked */}
        {isOpen && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-lg z-10 border-blue-300 border-2 px-1">
            <h3 className="font-bold text-lg p-2 ">Notifications</h3>

            {/* Render notifications list */}
            {notifications.length === 0 ? (
              <p className="p-2 text-gray-600">No notifications</p>
            ) : (
              <ul>
              {notifications.map((notification) => ( 
                <li key={notification.id} 
                  onClick={() => {
                    // Mark notification as read when clicked
                    setNotifications(prev => 
                      prev.map(n => 
                        n.id === notification.id ? {...n, read: true} : n
                      )
                    )
                    // Navigate to the tasks page when a notification is clicked
                    navigate(`/todo/`, { state: { taskId: notification.taskId } });
                  }} 
                  className={`p-2  ${notification.read ? "bg-blue-200" : "bg-yellow-200"} cursor-pointer mb-1 rounded-lg hover:bg-gray-200`}>
                  {notification.message}
                  
                </li>
              ))}
            </ul>)}
            
          </div>
        )
      }
      </button>
    </div>
    
   );
}

export default NotificationsBell;


       