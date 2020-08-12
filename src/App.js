import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { set } from 'object-path';


// Most commonly we write a query within variable
// Name variable in uppercase so I know this variable is never going to be updated again
const GET_TODOS = gql`
query getQuery {
      todos {
        done
        id
        text
      }
    }
    `;

const TOGGLE_TODO = gql`
    mutation ToggleTodo($id:uuid, $done: Boolean!) {
      update_todos(where: {id: {_eq: $id }}, _set: {done: $done}) {
        returning {
          done
          id
          text
        }
      }
    }
    `;

const ADD_TODO = gql`
    mutation addTodo($text: String!) {
      insert_todos(objects: {text: $text}) {
        returning {
          done
          id
          text
        }
      }
    }
    `;

// add todos
// toggle todos
// delete todos
// list todos

function App() {
  const [todoText, setTodoText] = useState('');
  const { data, loading, error } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [addTodo] = useMutation(ADD_TODO);



  // Before executing mutation run it in hasura console first

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching todos...</div>;

  async function handleAddTodo(e) {
    e.preventDefault();
    if (!todoText.trim()) return;
    const data = await addTodo({ 
      variables: { text: todoText },
      refetchQueries: [
        {query: GET_TODOS }
      ]
     })
    console.log("added todo", data);
    setTodoText('');
  }

  function handleInputChange(e) {
    setTodoText(e.target.value);
  }

  async function handleToggleTodo({ id, done }) {
    const data = await toggleTodo({ variables: { id, done: !done, } });
    console.log("toggled todo", data)
  }

  return (
    <div className="vh-100 code flex flex-column items-center bg-purple pa4 fl-1">
      <h1 className="f2-l">GraphQL checklist <span role="img" aria-label="Checkmark">✅</span></h1>
      {/* Todo form */}
      <form action="" className="mb3" onSubmit={handleAddTodo}>
        <input className="pa2 f4 b--dashed" type="text" placeholder='Write your todo' onChange={handleInputChange} value={todoText} />
        <button className="pa2 f4 bg-green" type="submit">Create</button>
      </form>
      {/* Todo list  */}
      <div className="flex items-center justify-center flex-column">
        {data.todos.map(todo => (
          <p onDoubleClick={() => handleToggleTodo(todo)} key={todo.id} >
            <span className={`pointer list pa1 f3" ${todo.done && "strike"}`} style={{ listStyle: 'none' }}>{todo.text}</span>
            <button className="bg-transparent bn f4">
              <span className="red">
                &times;
              </span>
            </button>
          </p>
        ))
        }
      </div>
    </div>
  );
}

export default App;
