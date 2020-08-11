import React from 'react';
import { useQuery, gql } from '@apollo/client';

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
  const { data, loading } = useQuery(GET_TODOS);
  console.log(data);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <ul>
      {data.todos.map(todo => (
        <>
          <li key={todo.id}>{todo.text}</li>
          <button>&times;</button>
        </>
      ))}
    </ul>
  );
}

export default App;
