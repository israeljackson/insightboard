import { Outlet } from "react-router-dom";
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useEffect, useState } from "react"

function DashboardLayout({notifications, setNotifications, tasks}) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false
    }
    return window.innerWidth < 768
  })

  const toggleSidebar = () =>
    setIsCollapsed(!isCollapsed)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return ( 
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header
        notifications={notifications}
        setNotifications={setNotifications}
        tasks={tasks}
        onToggleSidebar={toggleSidebar}
      />

      {/* Sidebar + Main */}
      <div className="flex flex-1">
        {!isCollapsed && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            aria-hidden="true"
            onClick={toggleSidebar}
          />
        )}

        <aside
          className={`bg-white text-black h-full px-4 py-6 transition-all duration-300 fixed inset-y-0 left-0 z-40 w-64 transform shadow-2xl md:relative md:translate-x-0 md:shadow-none ${isCollapsed ? "-translate-x-full md:w-16" : "translate-x-0 md:w-64"}`}
        >

          {/* Collapse icon */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="hidden md:inline-flex"
          >
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
