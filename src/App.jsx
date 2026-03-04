import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Reports from "./pages/Reports"
import ImportData from "./pages/ImportData"

import { useState } from "react"
import Tasks from "./pages/Tasks"


function App() {
  // State for managing tasks in the quick actions section
  const [tasks, setTasks] = useState([
    {id: 1, title: "Restock AirPods Pro", description: "Restock 10 units of AirPods Pro", completed: false},
    {id: 2, title: "Update product descriptions", description: "Update descriptions for all products", completed: true},
    {id: 3, title: "Run sales report", description: "Generate monthly sales report", completed: false},
  ])

  // state for managing notifications 
  const [notifications, setNotifications] = useState([
    {id: 1, message: "New order received: Order #1234", read: false},
    {id: 2, message: "Product low in stock: AirPods Pro", read: true},
    {id: 3, message: "Monthly sales report is ready", read: false},
  ])

  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () =>
    setIsCollapsed(!isCollapsed)
  

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header notifications={notifications} setNotifications={setNotifications} tasks={tasks}/>

      {/* Sidebar + Main */}
      <div className="flex flex-1">

        <aside className={`bg-blue-950 text-white  h-full px-4 py-6 transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>

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

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<Products />} />
            <Route path="/report" element={<Reports />} />
            <Route path="/import" element={<ImportData />} />
            <Route path="/todo" element={<Tasks tasks={tasks} setTasks={setTasks} setNotifications={setNotifications} />} />
          </Routes>
        </main>
      </div>  
    </div>
  )
}

export default App
