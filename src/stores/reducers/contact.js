const defaultState = {
  contactList: [],
  isLoading: false,
  error: {},
  isError: false,
  isRefreshing: false,
  contactId: '',
  createSuccess: false,
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'REFRESHING_CONTACT': {
      return {
        ...state,
        isRefreshing: true,
      };
    }
    case 'GET_CONTACT_REQUEST': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'REFRESHING_CONTACT_SUCCESS':
    case 'GET_CONTACT_SUCCESS': {
      return {
        ...state,
        contactList: action.payload.reverse(),
        isLoading: false,
        isRefreshing: false,
      };
    }
    case 'REFRESHING_CONTACT_FAILED':
    case 'GET_CONTACT_FAILED': {
      return {
        ...state,
        error: action.error,
        isLoading: false,
        isRefreshing: false,
      };
    }
    case 'UPDATE_CONTACT_REQUEST':
    case 'CREATE_CONTACT_REQUEST':
      return {
        ...state,
        createSuccess: false,
        isLoading: true,
      };
    case 'DELETE_CONTACT_SUCCESS':
      return {
        ...state,
        isRefreshing: true,
        isLoading: false,
      };
    case 'UPDATE_CONTACT_SUCCESS':
    case 'CREATE_CONTACT_SUCCESS':
      return {
        ...state,
        isRefreshing: true,
        createSuccess: true,
        isLoading: false,
      };
    case 'UPDATE_CONTACT_FAILED':
    case 'CREATE_CONTACT_FAILED':
    case 'DELETE_CONTACT_FAILED':
      return {
        ...state,
        createSuccess: false,
        isLoading: false,
        isError: true,
        error: action.error,
      };
    case 'SET_CONTACT_ID':
      return {
        ...state,
        contactId: action.payload,
        createSuccess: false,
        error: {},
        isError: false,
      };
    case 'RESET_STATUS':
      return {
        ...state,
        createSuccess: action.payload,
        error: {},
        isError: false,
      };
    default:
      return state;
  }
};
