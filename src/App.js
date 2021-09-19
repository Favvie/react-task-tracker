import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    
    getTasks()
  }, []) 



// fetch returns a promise so you want to await that promise
// fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  
  // Add Task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = {id, ...task }
    // setTasks([...tasks, newTask])

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST', 
      headers: {
        'Content-type':'application/json'},
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])
    
  }

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE',})
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  //toggle reminder 
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(tasks.map((task) => 
    task.id === id ? {...task, reminder: data.reminder} : task))
  }


  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        
        <Route path='/' exact render={(props) => 
          (
            <>
              {showAddTask && <AddTask onAdd={addTask}/>}
              {tasks.length > 0 ? (
              <Tasks 
              tasks={tasks} 
              onDelete={deleteTask} 
              onToggle={toggleReminder}
              />) : ('No Tasks to show')}
            </>
          )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
    
  )

  
}

// to pass in a boolean or a number as a prop value, use curly braces
// useStatem/states are to be stored in the app.js so it can be accessed by other components
export default App;
