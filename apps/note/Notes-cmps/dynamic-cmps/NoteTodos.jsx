const { useState } = React

export function NoteTodos({ info: { todos } }) {
  const [currTodos, setCurrTodos] = useState(todos)

  function onToggleTodo(idx) {
    const updatedTodos = currTodos.map((todo, i) => {
      if (i !== idx) return todo
      if (i === idx)
        return {
          ...todo,
          doneAt: todo.doneAt ? null : Date.now(),
        }
    })
    setCurrTodos(updatedTodos)
  }

  return (
    <section className="note-todo">
      {currTodos.map((todo, idx) => (
        <p key={idx} onClick={() => onToggleTodo(idx)} className={todo.doneAt ? 'done' : ''}>
          {todo.txt}
        </p>
      ))}
    </section>
  )
}
