import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';

const startServer = () => {
  let gateway: ApolloGateway;
  gateway = new ApolloGateway({
    serviceList: [
      {
        name: 'books',
        url: 'http://localhost:4001',
      },
      {
        name: 'authors',
        url: 'http://localhost:4002',
      },
    ],
  });

  const server = new ApolloServer({
    gateway,
  });

  server
    .listen({
      port: 4000,
    })
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}graphql`);
    })
    .catch((err) => console.log('Error launching server', err));
};

startServer();
