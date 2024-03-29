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
      status,
      created_at,
      token,
      uid_profile,
      id_section,
      image{
        id,
        name,
        dir,
        created_at
      }
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
      status,
      password,
      created_at,
      token,
      uid_profile,
      id_section,
      image{
        id,
        name,
        dir,
        created_at
      }
    }
  }
`;

const RENEWTOKEN = gql`
  mutation RenewToken{
    renewToken{
      id,
      name,
      email,
      status,
      created_at,
      token,
      uid_profile,
      id_section,
      image{
        id,
        name,
        dir,
        created_at
      }
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
        name,
        id_section
      },
      user_to{
        id,
        name,
        id_section
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
      created_at,
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
      created_at,
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
        email,
        status,
        id_section,
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
        email,
        status,
        id_section,
      },
      group_from{
        id,
        title,
        description
      }
    }
    
  }
`;
const ADD_NEW_USER_GROUP = gql`
  mutation AddNewUserGroup($idGroup: String!, $uidUser: String!){
    addNewUserGroup(idGroup: $idGroup, uidUser: $uidUser){
      id,
      status_from,
      status_to,
      role,
      user_to{
        id,
        name
      },
      group_from{
        id,
        title,
        description
      }
    }
}
`;

const REMOVE_FROM_GROUP = gql`
  mutation RemoveFromGroup($idGroup: String!, $idUser: Int!){
    removeFromGroup(idGroup:$idGroup, idUser:$idUser){
      id,
      user_to{
        id,
        name
      },
      group_from{
        id,
        title
      }
    }
  }
`;

const UPDATE_GROUP = gql`
  mutation UpdateGroup($idGroup: String!, $title: String, $description: String, $allow_image: Boolean, $only_mod_host: Boolean){
    updateGroup(updateGroupInput:{
      idGroup: $idGroup,
      title: $title,
      description: $description,
      allow_image: $allow_image,
      only_mod_host: $only_mod_host
    }){
      id,
      title,
      description,
      created_at,
      allow_image,
      only_mod_host
    }
  }
`;

const UPDATE_UID_PROFILE = gql`
  mutation UpdateUidProfile{
    updateUidProfile{
      id,
      name,
      email,
      status,
      id_section,
      created_at,
      uid_profile
    }
  }
`;

const UPDATE_STATUS_PROFILE = gql`
  mutation UpdateStatusUser($status: String!){
    updateStatusUser(status: $status){
      id,
      name,
      status,
      email,
      id_section,
      created_at,
      uid_profile
    } 
  }
`;

const UPDATE_ID_SECTION = gql`
  mutation UpdateIdSection($idSection: String!){
    updateIdSection(idSection: $idSection){
      id,
      name,
      status,
      email,
      id_section,
      created_at,
      uid_profile
    } 
  }
`;



export {UPDATE_ID_SECTION, UPDATE_STATUS_PROFILE, UPDATE_UID_PROFILE, UPDATE_GROUP, LOGIN, REGISTER, RENEWTOKEN, LOQUED_USER, CLEAR_STATUS_USER, CREARTE_CHAT, CREARTE_GROUP, CREARTE_CHAT_GROUP, NEW_MODETAROR, CLEAR_ROLE, ADD_NEW_USER_GROUP, REMOVE_FROM_GROUP}