import { gql } from "apollo-angular";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!){
    login(loginUserInput: {
      email: $email,
      password: $password
    }){
      id,
      name,
      email,
      create_at,
      token
    }
  }
`;

const REGISTER = gql`
  mutation Register($name: String!, $email: String!, $password: String!){
    register(userInput: {
      name: $name,
      email: $email,
      password: $password
    }){
      id,
      name,
      email,
      password,
      create_at,
      token
    }
  }
`;

const RENEWTOKEN = gql`
  mutation RenewToken{
    renewToken{
      id,
      name,
      email,
      create_at,
      token
    }
  }
`;


export {LOGIN, REGISTER, RENEWTOKEN}