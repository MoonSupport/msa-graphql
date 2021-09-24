import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { Author, initDB } from 'entities-practice';
import 'reflect-metadata';
import { Connection } from 'typeorm';
import { Resolvers } from './graphql/generated/graphql';
const port = 4002;

const typeDefs = gql`
  type Author @key(fields: "id") {
    id: ID!
    name: String
  }

  extend type Query {
    author(id: ID!): Author
    authors: [Author]
  }
`;

const resolvers: Resolvers = {
  Author: {
    async __resolveReference(ref, { connection }) {
      const authorRepository = connection.getRepository(Author);
      const author = await authorRepository.findOne({
        id: ref.id,
      });
      return author;
    },
  },

  Query: {
    async author(_, { id }, { connection }) {
      console.log('hit2');

      const authors = await connection.manager.find(Author);
      return authors[0];
    },
    async authors(_, {}, { connection }) {
      console.log('hit3');
      const authors = await connection.manager.find(Author);
      return authors;
    },
  },
};

export interface AppContext {
  connection: Connection;
}

const init = async () => {
  const connection = await initDB({
    //@ts-ignore
    entities: [Author],
  });

  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    context: {
      connection,
    },
  });

  server.listen({ port }).then(({ url }) => {
    console.log(`✍️ Author service ready at ${url}`);
  });
};

init();
