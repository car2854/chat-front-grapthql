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

const LOQUED_USER = gql`
  mutation LoquedUser($id: Int!){
    lockedUser(id: $id){
      id,
      status_from,
      status_to,
      user_from{
        id,
        name
      },
      user_to{
        id,
        name
      }
    }
  }
`;

const CLEAR_STATUS_USER = gql`
  mutation ClearStatusUser($id: Int!){
    clearStatusUser(id: $id){
      id,
      status_from,
      status_to,
      user_from{
        id,
        name
      },
      user_to{
        id,
        name
      }
    }
  }
`;

const CREARTE_CHAT = gql`
  mutation CreateChat($message: String!, $userTo: Int!){
    createChat(newChatInput: {
      message: $message,
      userTo: $userTo
    }){
      id,
      message,
      user_from{
        id,
        name
      },
      user_to{
        id,
        name
      }
    }
  }
`;


export {LOGIN, REGISTER, RENEWTOKEN, LOQUED_USER, CLEAR_STATUS_USER, CREARTE_CHAT}