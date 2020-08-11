import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://intent-raccoon-42.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
});

// client.query({
//   query: gql`
//   query getQuery {
//     todos {
//       done
//       id
//       text
//     }
//   }
//   `
// }).then(data => console.log(data));



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

