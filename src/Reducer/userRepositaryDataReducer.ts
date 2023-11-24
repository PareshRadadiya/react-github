// Define initial state
const initialState = {
    userRepositaryData: null,
    userNameData: null,
    userOrganizationData: null,
  };
  
  // Create the reducer
  const userRepositaryReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'USER_REPOSITARY_DATA':
        return {
          ...state,
          userRepositaryData: action.payload,
        };
      case 'GET_USERNAME':
        return{
          ...state,
          userNameData: action.payload,
        }
      case 'USER_ORGANIZATION':
          return {
            ...state,
          userOrganizationData: action.payload,
        };
      
      default:
        return state;
    }
  };
  
  export default userRepositaryReducer;