import { useContext, useState } from 'react';
import Context from '../../app/context';
import Menu from './Menu';
import Item from './Item';
import Confirm from './Confirm';
import Info from './Info';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import CheckBoxIconChecked from '@material-ui/icons/CheckBoxOutlineBlank';

const useStyles = makeStyles(() => ({
  root: {
    width: '95%',
    margin: '0 auto'
  },
  item: {
    border: '2px solid #3dda0c',
    borderRadius: 10,
    margin: '10px auto',
    minHeight: 50,
    padding: '4px 0'
  },
  icon: {
    justifyContent: 'center'
  }
}));

const customMenu = {
  info: { name: 'Информация', icon: <InfoIcon color="primary" fontSize="small" /> },
  switch: { name: 'Переключить', icon: <CheckBoxIcon color="secondary" fontSize="small" /> },
  change: { name: 'Изменить', icon: <EditIcon fontSize="small" /> },
  delete: { name: 'Удалить', icon: <DeleteIcon color="error" fontSize="small" /> }
  // {name: , icon: , handler: null},
};

export default ({ listItems, menu: menuItems }) => {
  const classes = useStyles();
  const { A_delete, A_update } = useContext(Context);
  const [menu, setMenu] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [info, setInfo] = useState(null);

  menuItems = createMenu(menuItems);

  const completedToggle = (id) => {
    const { completed } = getItemById(id, listItems);
    A_update({ id, completed: !completed });
  };

  const openConfirm = (id) => setConfirm(id);
  const closeConfirm = () => setConfirm(null);
  const confirmHandler = (id) => {
    closeConfirm();
    A_delete(id);
  };

  const openInfo = (id) => {
    const item = getItemById(id, listItems);
    setInfo(item);
  };
  const closeInfo = () => setInfo(null);

  const openMenu = (anchor) => setMenu(anchor);
  const closeMenu = () => setMenu(null);

  const menuClickHandler = ({ name, id }) => {
    closeMenu();
    switch (name) {
      case 'Удалить':
        return openConfirm(id);
      case 'Переключить':
        return completedToggle(id);
      case 'Информация':
        return openInfo(id);
      default:
        console.warn('Компонент MyList | Обработчик меню: Неизвестное имя');
    }
  };

  let element;
  if (!listItems.length) element = <ListItemText primary="Пока задач нет" />;
  else
    element = listItems.map((item, i) => (
      <Item
        key={item.id}
        actionClick={completedToggle}
        mainClick={openMenu}
        icon={item.completed ? <CheckBoxIcon color="secondary" /> : <CheckBoxIconChecked />}
        data={{ ...item, index: i + 1 }}
      />
    ));

  return (
    <>
      <List className={classes.root}>{element}</List>
      {menu ? <Menu anchor={menu} onClick={menuClickHandler} onClose={closeMenu} items={menuItems} /> : ''}
      {confirm ? <Confirm id={confirm} yes={confirmHandler} no={closeConfirm} /> : ''}
      {info ? <Info item={info} onClose={closeInfo} /> : ''}
    </>
  );
};

const createMenu = (menu) => {
  if (!Array.isArray(menu)) {
    console.log('В компонент меню передан неизвестный параметр');
    return Object.values(customMenu);
  } else if (!menu.length) {
    console.log('В компонент меню передан параметр пустого массива');
    return Object.values(customMenu);
  }
  return menu.map((key) => customMenu[key]);
};

const getItemById = (id, items) => ({ ...items.find(({ id: itemId }) => itemId === id) });
