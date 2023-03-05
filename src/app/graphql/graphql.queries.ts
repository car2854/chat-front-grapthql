import { gql } from 'apollo-angular';

const USERS_INTERACTION = gql`

  query GetUsersInteractions{
    getUsersInteractions{
      id,
      status_from,
      status_to,
      user_from{
        id,
        name,
        email,
        create_at
      },
      user_to{
        id,
        name,
        email,
        create_at
      },
    }
  }`;

const USER_INTERACTION = gql`

  query FindUserInteraction($id: Int!){
    findUserInteraction(id: $id) {
      id,
      status_from,
      status_to,
      user_from {
        id
        name
        email
        password
      }
      user_to {
        id
        name
        email
        password
      }
    }
  }`;

const USER_CHAT = gql`

  query GetChat($id: Int!){
    getChats(id: $id){
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
  }`;




export { USERS_INTERACTION, USER_INTERACTION, USER_CHAT }