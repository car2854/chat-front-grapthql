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
      token,
      uid_profile
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
      token,
      uid_profile
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
      token,
      uid_profile
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

const CREARTE_GROUP = gql`
  mutation CreateChat($title: String!, $users: [UserInput!]!, $description: String){
    createGroup(newGroupInput: {
      title: $title,
      users: $users,
      description: $description,
    }){
      id,
      title,
      description,
      create_at,
      allow_image
    }
  }
`;

const CREARTE_CHAT_GROUP = gql`
  mutation CreateChatGroup($message: String!, $groupTo: String!){
    createChatGroup(newChatGroupInput:{
      message: $message,
      groupTo: $groupTo,
    }){
      id,
      message,
      create_at,
      user_from{
        id,
        name
      },
      group_to{
        id,
        title
      },
    }
  }
`;

const NEW_MODETAROR = gql`
  mutation NewModerator($id: Int!){
    
    newModerator(id: $id){
      id,
      role,
      user_to{
        id,
        name,
        email
      },
      group_from{
        id,
        title,
        description
      }
    }
    
  }

`;

const CLEAR_ROLE = gql`
  mutation ClearRole($id: Int!){
    
    clearRole(id: $id){
      id,
      role,
      user_to{
        id,
        name,
        email
      },
      group_from{
        id,
        title,
        description
      }
    }
    
  }
`;


export {LOGIN, REGISTER, RENEWTOKEN, LOQUED_USER, CLEAR_STATUS_USER, CREARTE_CHAT, CREARTE_GROUP, CREARTE_CHAT_GROUP, NEW_MODETAROR, CLEAR_ROLE}