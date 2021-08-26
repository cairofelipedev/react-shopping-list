import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

interface Origem {
  id: number;
  razaoSocial: string;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [origem, setOrigem] = useState<Origem[]>([]);
  const [newRazaoSocial, setNewRazaoSocial] = useState('');

  function handleNewOrigem() {

    const newOrigem = {
      id: Math.random(),
      razaoSocial: newRazaoSocial
    }
    setOrigem(oldState => [...oldState, newOrigem]);
    setNewRazaoSocial('');
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return;

    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    setTasks(oldState => [...oldState, newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const newTasks = tasks.map(task => task.id == id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const filteredTask = tasks.filter(task => task.id != id);
    setTasks(filteredTask);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas compras</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar compra"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>
      <header>
        <h2>Origem da Compra</h2>

        <div className="input-group-select">
          <select
            onChange={(f) => setNewRazaoSocial(f.target.value)}
            value={newRazaoSocial}
          >
            <option value="A">Shopping</option>
            <option value="B">Online</option>
            <option value="C">Mercado</option>
          </select>
          <button type="submit" data-testid="add-task-button" onClick={handleNewOrigem}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>
      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
        <ul>
          {origem.map(origs => (
            <li key={origs.id}>
              <div data-testid="origem" >
              <p>{origs.razaoSocial}</p>
              </div>
             
              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(origs.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}