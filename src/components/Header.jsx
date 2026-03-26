import { Bars3Icon, ChartBarIcon } from "@heroicons/react/24/outline";
import NotificationsBell from "./Notificationbell";
function Header({notifications, setNotifications, tasks, onToggleSidebar}) {
  return ( 
    <div className="p-4 flex justify-between items-center bg-white shadow-2xl " >
      <div className="flex items-center gap-2 text-blue-600">
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-blue-600 hover:bg-blue-50"
        >
          <Bars3Icon className="h-8 w-8" />
        </button>
        <ChartBarIcon className="w-10 h-10 bg-blue-500 text-white rounded-lg shadow-md shadow-blue-300 md:mb-3" />
        <h1 className="hidden md:block text-4xl font-bold" >InsightBoard</h1>
      </div>      
      <div className="ml-auto">
        <NotificationsBell notifications={notifications} setNotifications={setNotifications} tasks={tasks}/>
      </div>
    </div>
   );
}

export default Header;
