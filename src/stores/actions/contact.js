import {
  getContactApi,
  deleteContactApi,
  createContactApi,
  updateContactApi,
  getDetailContactApi,
} from '../../api/contactApi';

export function getContact() {
  return async dispatch => {
    dispatch({
      type: 'GET_CONTACT_REQUEST',
    });

    try {
      const result = await getContactApi();

      if (!result) {
        throw result.message;
      }
      dispatch({
        type: 'GET_CONTACT_SUCCESS',
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: 'GET_CONTACT_FAILED',
        error,
      });
    }
  };
}

export function refreshingContact() {
  return async dispatch => {
    dispatch({
      type: 'REFRESHING_CONTACT_REQUEST',
    });

    try {
      const result = await getContactApi();

      if (!result) {
        throw result.message;
      }
      dispatch({
        type: 'REFRESHING_CONTACT_SUCCESS',
        payload: result.data,
      });
    } catch (error) {
      dispatch({
        type: 'REFRESHING_CONTACT_FAILED',
        error,
      });
    }
  };
}

export function deleteContact(id) {
  return async dispatch => {
    dispatch({
      type: 'DELETE_CONTACT_REQUEST',
    });
    try {
      const result = await deleteContactApi(id);
      if (!result) {
        throw result.message;
      }

      dispatch({
        type: 'DELETE_CONTACT_SUCCESS',
      });
    } catch (error) {
      dispatch({
        type: 'DELETE_CONTACT_FAILED',
        error,
      });
    }
  };
}

export function createContact(payload) {
  return async dispatch => {
    dispatch({
      type: 'CREATE_CONTACT_REQUEST',
    });
    try {
      const result = await createContactApi(payload);
      if (result.status !== 201) {
        throw result.message;
      }
      dispatch({
        type: 'CREATE_CONTACT_SUCCESS',
      });
    } catch (error) {
      dispatch({
        type: 'CREATE_CONTACT_FAILED',
        error,
      });
    }
  };
}

export function updateContact(payload) {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_CONTACT_REQUEST',
    });
    try {
      const result = await updateContactApi(payload);
      if (result.status !== 201) {
        throw result.message;
      }
      dispatch({
        type: 'UPDATE_CONTACT_SUCCESS',
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_CONTACT_FAILED',
        error,
      });
    }
  };
}
