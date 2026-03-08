import { ChartBarIcon } from "@heroicons/react/24/outline";
import NotificationsBell from "./Notificationbell";
function Header({notifications, setNotifications, tasks}) {
  return ( 
    <div className="p-4 flex justify-between items-center bg-white shadow-2xl " >
      <div className="text-4xl font-bold flex items-center gap-2 text-blue-600">
        <ChartBarIcon className="w-10 h-10 bg-blue-500 text-white mb-3 rounded-lg shadow-md shadow-blue-300" />
      <h1 className="text-4xl font-bold " >InsightBoard</h1>
      </div>      
      <div className="ml-auto">
        <NotificationsBell notifications={notifications} setNotifications={setNotifications} tasks={tasks}/>
      </div>
    </div>
   );
}

export default Header;