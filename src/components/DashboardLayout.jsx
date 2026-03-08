import { Outlet } from "react-router-dom";
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useState } from "react"

function DashboardLayout({notifications, setNotifications, tasks}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () =>
    setIsCollapsed(!isCollapsed)

  return ( 
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header notifications={notifications} setNotifications={setNotifications} tasks={tasks}/>

      {/* Sidebar + Main */}
      <div className="flex flex-1">

        <aside className={`bg-white text-black  h-full px-4 py-6 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>

          {/* Collapse icon */}
          <button onClick= {toggleSidebar}>
            {isCollapsed ? (
              <PanelLeftOpen size={24} />
            ) : (
              <PanelLeftClose size={24} />
            )}
          </button>

          <Sidebar collapsed={isCollapsed} />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-3">
          <Outlet />
        </main>
      </div>  
    </div>
   );
}

export default DashboardLayout;