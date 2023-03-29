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
        status,
        id_section,
        created_at,
        image{
          id,
          name,
          dir,
          created_at
        }
      },
      user_to{
        id,
        name,
        email,
        status,
        created_at,
        id_section,
        image{
          id,
          name,
          dir,
          created_at
        }
      },
      group_from{
        id,
        title,
        description,
        created_at,
        image{
          id,
          name,
          dir,
          created_at
        }
      }
    }
  }
`;

const USER_INTERACTION = gql`

query FindUserInteraction($id: Int!){
    findUserInteraction(id: $id) {
      id,
      status_from,
      status_to,
      user_from {
        id,
        name,
        email,
        id_section,
        status,
        password,
        image{
          id,
          name,
          dir,
          created_at
        }
      }
      user_to {
        id,
        name,
        email,
        status,
        id_section,
        password,
        image{
          id,
          name,
          dir,
          created_at
        }
      }
    }
  }
`;

const USER_INTERACTION_BY_UID_PROFILE = gql`

  query FindUserInteractionByUidUser($uid_profile: String!){
    findUserInteractionByUidUser(uid_profile: $uid_profile) {
      id,
      status_from,
      status_to,
      user_from {
        id,
        name,
        email,
        id_section,
        status,
        password
      }
      user_to {
        id,
        name,
        status,
        email,
        id_section,
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
        email,
        id_section,
        status
      },
      group_from{
        id,
        title,
        description,
        created_at,
        allow_image,
        only_mod_host,
        image{
          id,
          name,
          dir,
          created_at
        }
      }
    }
  }`
;

const USER_CHAT_GROUP = gql`
  query GetChatsGroup($id:String!){
    getChatsGroup(id: $id){
      id,
      message,
      user_from{
        id,
        name
      },
      group_to{
        id,
        title
      }
    }
  }
`;

const All_USER_WITHIN_GROUP = gql`
  query GetAllUsersWithinGroup($id:String!){
    getAllUsersWithinGroup(id: $id){
      id,
      role,
      user_to{
        id,
        name,
        email,
        id_section,
        status
      },
      status_from,
      status_to
    }
  }
`;

const GET_GROUP_INTERACTIONS = gql`
  query GetGroupInteractions{
    
    getGroupInteraction{
      id,
      group_from{
        id,
        title
      },
      user_to{
        id,
        name
      }
    }
    
  }
`;





export { GET_GROUP_INTERACTIONS, USERS_INTERACTION, USER_INTERACTION, USER_CHAT, USER_INTERACTION_BY_UID_PROFILE, FIND_GROUP, USER_CHAT_GROUP, All_USER_WITHIN_GROUP }