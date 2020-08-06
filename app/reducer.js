export default (state, { type, payload, key }) => {
  switch (type) {
    case GET.type:
      return getState(key);
    case SET.type:
      const data = payload || [];
      if (data === state) return state; // Если состояние не изменилость, не нужно перезаписывать state
      return setState(key, data);
    case ADD.type:
      return setState(key, [...state, { id: Date.now(), value: payload }]);
    case DELETE.type:
      return setState(
        key,
        state.filter(({ id }) => id !== payload)
      );
    case UPDATE.type:
      return setState(
        key,
        state.map((element) => (element.id !== payload.id ? element : { ...element, ...payload }))
      );
    default:
      return state;
  }
};

const getState = (key) => {
  let newState = localStorage.getItem(key);
  if (newState) newState = JSON.parse(newState);
  else {
    console.warn('В базе данных нет информации по данному ключу');
    newState = [];
  }
  return newState;
};

const setState = (key, data) => {
  try {
    let value = JSON.stringify(data);
    localStorage.setItem(key, value);
  } catch (err) {
    console.warn('Записать в базу данных не удалась!', err);
  }
  return data;
};

export const UPDATE = {
  type: 'UPDATE'
};

export const GET = {
  type: 'GET'
};

export const SET = {
  type: 'SET'
};

export const ADD = {
  type: 'ADD'
};

export const DELETE = {
  type: 'DELETE'
};
