import { ChartBarSquareIcon } from "@heroicons/react/16/solid";
import NotificationsBell from "./Notificationbell";
function Header({notifications, setNotifications, tasks}) {
  return ( 
    <div className="p-4 flex justify-between items-center bg-white shadow-2xl" >
      <div className="text-4xl font-bold flex items-center gap-2 text-blue-600">
        <ChartBarSquareIcon className="h-9 w-9" />
      <h1 className="text-4xl font-bold " >InsightBoard</h1>
      </div>
      
      <div className="ml-auto">
        <NotificationsBell notifications={notifications} setNotifications={setNotifications} tasks={tasks}/>
      </div>
    </div>
   );
}

export default Header;