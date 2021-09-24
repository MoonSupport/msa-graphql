"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const federation_1 = require("@apollo/federation");
const entities_practice_1 = require("entities-practice");
require("reflect-metadata");
const graphql_import_1 = require("graphql-import");
const port = 4001;
const typeDefs = (0, apollo_server_1.gql)((0, graphql_import_1.importSchema)('book.graphql'));
const resolvers = {
    Author: {
        books(author, {}, { connection }) {
            return __awaiter(this, void 0, void 0, function* () {
                const bookRepository = connection.getRepository(entities_practice_1.Book);
                const books = yield bookRepository.find({
                    authorID: author.id,
                });
                return books;
            });
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
        book(_, { id }, { connection }) {
            return __awaiter(this, void 0, void 0, function* () {
                const books = yield connection.manager.find(entities_practice_1.Book);
                return books[0];
            });
        },
        books(_, {}, { connection }) {
            return __awaiter(this, void 0, void 0, function* () {
                const books = yield connection.manager.find(entities_practice_1.Book);
                return books;
            });
        },
    },
};
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const connection = yield (0, entities_practice_1.initDB)({ entities: [entities_practice_1.Author, entities_practice_1.Book] });
    const server = new apollo_server_1.ApolloServer({
        schema: (0, federation_1.buildFederatedSchema)([{ typeDefs, resolvers }]),
        context: {
            connection,
        },
    });
    server.listen({ port }).then(({ url }) => {
        console.log(`📚 Book service ready at ${url}`);
    });
});
init();
