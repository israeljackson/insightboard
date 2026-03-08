import { Routes, Route } from "react-router-dom"
import DashboardLayout from "./components/DashboardLayout"

import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Reports from "./pages/Reports"
import ImportData from "./pages/ImportData"
import Login from "./pages/login";
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

  

  return (
    <Routes>
      {/* Login Page only */}
      <Route path="/" element= {<Login/>} />

      <Route
        element={
          <DashboardLayout
            notifications={notifications}
            setNotifications={setNotifications}
            tasks={tasks}
          />
        }
      >

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<Products />} />
        <Route path="/report" element={<Reports />} />
        <Route path="/import" element={<ImportData />} />
        <Route
          path="/todo"
          element={
            <Tasks
              tasks={tasks}
              setTasks={setTasks}
              setNotifications={setNotifications}
            />
          }
        />

      </Route>
    </Routes>


    
  )
}

export default App
