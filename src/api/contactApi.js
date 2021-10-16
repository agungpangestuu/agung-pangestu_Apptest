import {fetchJson} from '../utils/fetchJson';

export async function getContactApi() {
  try {
    const result = await fetchJson('GET', 'contact');

    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteContactApi(id) {
  try {
    const result = await fetchJson('DELETE', `contact/${id}`);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function getDetailContactApi(id) {
  try {
    const result = await fetchJson('GET', `contact/${id}`);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function createContactApi(payload) {
  try {
    const result = await fetchJson('POST', 'contact', payload);

    return result;
  } catch (error) {
    throw error;
  }
}

export async function updateContactApi(payload) {
  const {id, ...data} = payload;
  try {
    const result = await fetchJson('PUT', `contact/${id}`, data);

    return result;
  } catch (error) {
    throw error;
  }
}
