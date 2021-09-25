import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { Book, initDB } from 'entities-practice';
import 'reflect-metadata';
import { Connection } from 'typeorm';
import { importSchema } from 'graphql-import';
import { Resolvers } from './graphql/generated/graphql';

const port = 4001;

const typeDefs = gql(importSchema('book.graphql'));

const resolvers: Resolvers = {
  Author: {
    async books(author, {}, { connection }) {
      const bookRepository = connection.getRepository(Book);
      const books = await bookRepository.find({
        authorID: author.id,
      });
      return books;
    },
  },
  Book: {
    author(book) {
      return {
        id: book.author.id,
        __typename: 'Author',
      };
    },
  },
  Query: {
    async book(_, { id }, { connection }) {
      const books = await connection.manager.find(Book);
      return books[0];
    },
    async books(_, {}, { connection }) {
      const books = await connection.manager.find(Book);
      return books;
    },
  },
};

export interface AppContext {
  connection: Connection;
}

const init = async () => {
  //@ts-ignore
  const connection = await initDB({ entities: [Book] });
  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    context: {
      connection,
    },
  });

  server.listen({ port }).then(({ url }) => {
    console.log(`📚 Book service ready at ${url}`);
  });
};

init();
