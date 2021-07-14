import Header from './components/Header.js';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask.js';
import Footer from './components/Footer.js';
import About from './components/About.js';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  const [showAddTask, setAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {

    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //This function will fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //This function will fetch a Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  //This function will add a Task
  const addTask = async (task) => {
   const res = await fetch('http://localhost:5000/tasks',{
     method: 'POST',
     headers: {
       'Content-type': 'application/json'
     },
     body: JSON.stringify(task)
   })

   const data = await res.json()

   setTasks([...tasks, data])
  }

  //This function will delete a Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })


    setTasks(tasks.filter((task) => task.id !== id))
  }

  //This function will toggle the remainder
   const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => 
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
   }

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setAddTask(!showAddTask)}
          showAdd={!showAddTask}
        />
        <Route path='/' exact render={(props)=>(
          <> 
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ?
              (<Tasks tasks={tasks}
                onDelete={deleteTask}
                onToggle={toggleReminder}
              />) : ('Nothing left')}
          </>
        )}
        />
        <Route path='/about' component={About}/>
        <Footer />
        </div>
    </Router>
  );
}

export default App;
