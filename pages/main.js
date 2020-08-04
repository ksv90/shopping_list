// import { Text, View } from 'react-native';
import { useState, useEffect, useReducer } from 'react';
import styles from '../style/main.module.css';
import MyCheckboxList from '../components/MyCheckboxList';
import MyField from '../components/MyField';
import Context from '../appFolder/context';
import reducer from '../appFolder/reducer';

export default () => {
  useEffect(() => setListItems(storage.get()), []);
  useEffect(() => (listItems ? storage.set(listItems) : undefined), [listItems]);
  const [listItems, setListItems] = useState(null);
  const [value, setValue] = useReducer(reducer, '');

  const addItem = (value) => {
    const item = {
      id: Date.now(),
      value
    };
    setListItems([...listItems, item]);
  };

  return (
    <Context.Provider value={{ setValue }}>
      <div className={styles.container}>
        <h1 className={styles.header}>Cписок покупок</h1>
        <p>Сортировка и фильтр</p>
        <div>
          <MyField value={value} addItem={addItem} />
          <MyCheckboxList listItems={listItems} />
        </div>
      </div>
    </Context.Provider>
  );
};

const storage = {
  get() {
    let data = localStorage.getItem('listItems');
    if (data) data = JSON.parse(data);
    else data = [];
    return data;
  },
  set(data = []) {
    if (!Array.isArray(data)) return console.warn('Переданы некорректные данные');
    let value = JSON.stringify(data);
    localStorage.setItem('listItems', value);
  }
};
