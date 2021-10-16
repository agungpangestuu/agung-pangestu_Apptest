import Config from 'react-native-config';

export async function fetchJson(method, path, data) {
  try {
    const response = await fetch(
      `https://simple-contact-crud.herokuapp.com/${path}`,
      {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    if (!(response.status >= 200 && response.status <= 209)) {
      throw result;
    } else {
      return {...result, status: response.status};
    }
  } catch (error) {
    throw error;
  }
}
