const { useState } = React

export function NoteTodos({ info }) {
  const [currTodos, setCurrTodos] = useState(info.todos)

  function onToggleTodo(idx) {
    const newTodos = [...currTodos]
    newTodos[idx].doneAt = newTodos[idx].doneAt ? null : Date.now()
    setCurrTodos(newTodos)
  }

  return (
    <section className="note-todo">
      {(info.txt || info.title) && <h2>{info.txt || info.title}</h2>}
      {currTodos.map((todo, idx) => (
        <p key={idx} onClick={() => onToggleTodo(idx)} className={todo.doneAt ? 'done' : ''}>
          {todo.txt}

        </p>
      ))}
    </section>
  )
}
