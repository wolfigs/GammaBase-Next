import { gql } from '@apollo/client'
// const { gql } = require('apollo-server');

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    status: String!
  }
  
  
  
  
  
  input UserInput {
    name: String!
    status: String!
  }
  
  input EditUserInput {
    name: String
  }
  
  
  
  

  type Query {
    viewer(ID: ID!): User!
    getUsers: [User]
  }
  
  type Mutation {
    createUser(userInput: UserInput): User!
    deleteUser(ID: ID!): Boolean
    editUser(ID: ID!, editUserInput: EditUserInput): Boolean
  }
`
