import { gql } from 'apollo-angular';

const USERS_INTERACTION = gql`

  query GetUsersInteractions($userName: String){
    getUsersInteractions(userName: $userName) {
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
      group_from{
        id,
        title,
        description,
        create_at
      }
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
  }`
;

const USER_INTERACTION_BY_UID_PROFILE = gql`

  query FindUserInteractionByUidUser($uid_profile: String!){
    findUserInteractionByUidUser(uid_profile: $uid_profile) {
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
  }`
;

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
  }`
;

const FIND_GROUP = gql`
  query FindGroupInteraction($id: String!){
    findGroupInteraction(id: $id){
      id,
      status_from,
      status_to,
      user_to{
        id,
        name,
        email
      },
      group_from{
        id,
        title,
        description,
        create_at,
        allow_image
      }
    }
  }`
;





export { USERS_INTERACTION, USER_INTERACTION, USER_CHAT, USER_INTERACTION_BY_UID_PROFILE, FIND_GROUP }