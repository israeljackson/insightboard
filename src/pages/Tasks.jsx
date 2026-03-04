import { useState } from "react";
import TaskCard from "../components/TaskCard";
import Title from "../components/Title";


function Tasks({tasks, setTasks, setNotifications}) {

  // State for new task inputs
    const [newTask, setNewTask] = useState("");
    // State for new task description input
    const [newTaskDesc, setNewTaskDesc] = useState("");

    // Function to handle adding a new task to the quick actions list
    const handleAddTask = () => {
      if (newTask.trim() === "") return;

      // Create a new task object with a unique ID, title, description, and default completed status
      const taskToAdd = {
        id: Date.now(),
        title: newTask,
        description: newTaskDesc,
        completed: false
      }

      // Update the tasks state by adding the new task to the existing list of tasks
      setTasks(prevTasks => [...prevTasks, taskToAdd]);
      // Reset the new task input fields after adding the task
      setNewTask("");
      // Reset the new task description input field after adding the task
      setNewTaskDesc("");

      // Handle adding a new notification when a task is added
      const notification = {
        id: Date.now() + Math.random(), // Ensure unique ID for notification
        message: `New task added: ${taskToAdd.title}`,
        read: false,
        taskId: taskToAdd.id
      }
      setNotifications(prev => [...prev, notification]);
    }

    // Handle delete 
    const handleDeleteTask = (id) => {
      // Update the tasks state by filtering out the task with the specified ID
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));

      // Update the notifications state by filtering out notifications related to the deleted task
      setNotifications(prev => prev.filter(n => n.taskId !== id));
    }

    // Handle toggle task completion status
    const handleToggleTask = (id) => {
      // find current task to toggle
      const taskToToggle = tasks.find(task => task.id === id);
      const willBeCompleted = !taskToToggle.completed;

      // Update the tasks state by toggling the completed status of the task with the specified ID
      setTasks(prevTasks => prevTasks.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task
      ));

      // Remove completed tasks from notifications
      if (willBeCompleted) {
        setNotifications(prev => prev.filter(n => n.taskId !== id));
      }
    }
  

  return ( 
    <>
      <Title />

      <div>
          <h1 className="font-bold text-xl mb-4">Quick Actions</h1>
          {/* Render a add task input and button */}
          <div className="mb-4 p-4 bg-white rounded-lg shadow">

            {/* Task title input */}
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task title..."
              className="w-full border p-2 mb-2 rounded" />

              {/* Task description input */}
            <input 
              type="text" 
              placeholder="Enter task description..." 
              value={newTaskDesc} 
              onChange={(e) => setNewTaskDesc(e.target.value)} 
              className="w-full border p-2 mb-2 rounded" />

            {/* Add task button */}
            <button onClick={handleAddTask}
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>

          {/* Render each task card in the tasks list */}
          {tasks.map(task => (
            // Render a TaskCard component for each task, passing the task's title, description, and completed status as props
            <TaskCard
              key={task.id}
              title={task.title}
              id={task.id}
              description={task.description}
              onDelete={handleDeleteTask}
              completed={task.completed}
              onToggle={handleToggleTask}
            />
          ))}
        </div>
    </>
   );
}

export default Tasks;