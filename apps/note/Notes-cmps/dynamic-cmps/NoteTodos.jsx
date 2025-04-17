const {useState} = React 

export function NoteTodos({info: {todos}}){
    const [currTodos, setCurrTodos] = useState(todos)

    function onToggleTodo(idx){
        
    }


    return (
        <section className="note-todo">
            {todos.map((todo, idx) => (
                
                <p key={idx} onClick={() => onToggleTodo(idx)}>{todo.txt}</p>

            ))}
        </section>
    )
}