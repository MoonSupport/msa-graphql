"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gateway_1 = require("@apollo/gateway");
const apollo_server_1 = require("apollo-server");
const startServer = () => {
    let gateway;
    gateway = new gateway_1.ApolloGateway({
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
    const server = new apollo_server_1.ApolloServer({
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
