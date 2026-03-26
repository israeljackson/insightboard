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
  const [tasks, setTasks] = useState([])

  // state for managing notifications 
  const [notifications, setNotifications] = useState([])

  

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
