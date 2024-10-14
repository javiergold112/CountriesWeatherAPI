import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './reset.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'https://graphql.country/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
