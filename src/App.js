import React from 'react';
import { useQuery, gql } from '@apollo/client';


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

// add todos
// toggle todos
// delete todos
// list todos

function App() {
  const { data, loading, error } = useQuery(GET_TODOS);
  console.log(data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching todos...</div>;


  return (
    <div className="vh-100 code flex flex-column items-center bg-purple white pa4 fl-1">
      <h1 className="f2-l">GraphQL checklist <span role="img" aria-label="Checkmark">✅</span></h1>
      {/* Todo form */}
      <form action="" className="mb3">
        <input className="pa2 f4 b--dashed" type="text" placeholder='Write your todo' />
        <button className="pa2 f4 bg-green" type="submit">Create</button>
      </form>
      {/* Todo list  */}
      <div className="flex items-center justify-center flex-column">
        {data.todos.map(todo => (
          <p key={todo.id} >
            <span className="pointer list pa1 f3" style={{ listStyle: 'none' }}>{todo.text}</span>
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
