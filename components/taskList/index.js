import { useContext, useState, useRef, useEffect } from 'react';
import Context from '../../app/context';
import Menu from './Menu';
import Item from './Item';
import Input from './Input';
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
import CancelIcon from '@material-ui/icons/Cancel';

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
  },
  default: {
    border: '2px solid #556cd6'
  },
  completed: {
    border: '2px solid #3dda0c',
    background: 'rgba(162,162,162, .4)'
  }
}));

const customMenu = {
  info: { name: 'Информация', icon: <InfoIcon color="primary" /> },
  switch: { name: 'Переключить', icon: <CheckBoxIcon color="secondary" /> },
  change: { name: 'Изменить', icon: <EditIcon /> },
  delete: { name: 'Удалить', icon: <DeleteIcon color="error" /> }
  // {name: , icon: , handler: null},
};

export default ({ listItems, menu: menuItems }) => {
  const classes = useStyles();
  const { A_delete, A_update } = useContext(Context);
  const [menu, setMenu] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [info, setInfo] = useState(null);
  const [mutableElement, setMutableElement] = useState(null);
  const [newValue, setNewValue] = useState(null);
  const link = useRef(null);

  // useEffect(() => {
  //   if (!mutableElement) return;
  //   const { blurHandler } = mutableElement;
  //   document.addEventListener('click', blurHandler);
  //   return () => document.removeEventListener('click', blurHandler);
  // });

  menuItems = createMenu(menuItems);

  const completedToggle = (id) => {
    const { completed } = getItemById(id, listItems);
    A_update?.({ id, completed: !completed });
  };

  const onMutableElement = (id) => {
    const { value } = getItemById(id, listItems);
    setNewValue(value);
    setMutableElement({ id });
  };
  const valueChange = (id) => {
    if (!newValue) return;
    A_update?.({ id, value: newValue });
    setMutableElement(null);
    setNewValue(null);
  };
  const handleValueChange = () => {
    setNewValue(event.target.value);
  };

  const handleRender = (id) => {
    const $input = link.current;
    $input.focus();
    // const blurHandler = openConfirmSave(id);
    // setMutableElement({ id, $input, blurHandler });
  };

  const openConfirmDelete = (id) =>
    setConfirm({ id, type: 'delete', title: 'Вы действительно хотите удалить элемент?' });
  const openConfirmSave = (id) => () => {
    setConfirm({ id, type: 'save', title: 'Вы хотите сохранить изменения?' });
  };

  const closeConfirm = () => {
    setConfirm(null);
    setMutableElement(null);
    setNewValue(null);
  };
  const confirmHandler = ({ id, type }) => {
    closeConfirm();
    switch (type) {
      case 'delete':
        return A_delete?.(id);
      case 'save':
        return valueChange(id);
      default:
        console.warn('taskList | Неизвестный тип');
    }
  };

  const openInfo = (id) => {
    const item = getItemById(id, listItems);
    setInfo(item);
  };
  const closeInfo = () => setInfo(null);

  const openMenu = (anchor) => {
    setMenu(anchor);
  };
  const closeMenu = () => setMenu(null);

  const menuClickHandler = ({ name, id }) => {
    closeMenu();
    switch (name) {
      case 'Удалить':
        return openConfirmDelete(id);
      case 'Переключить':
        return completedToggle(id);
      case 'Информация':
        return openInfo(id);
      case 'Изменить':
        return onMutableElement(id);
      default:
        console.warn('Компонент MyList | Обработчик меню: Неизвестное имя');
    }
  };

  let element;
  if (!listItems.length)
    element = <ListItemText primary="Пока задач нет (Создайте задачу нажав на кнопку в правом нижнем углу)" />;
  else
    element = listItems.map((item, i) =>
      item.id === mutableElement?.id ? (
        <Item
          key={item.id}
          actionClick={valueChange}
          action2Click={closeConfirm}
          icon={<EditIcon />}
          icon2={<CancelIcon />}
          data={{ ...item, index: i + 1 }}
          className={item.completed ? classes.completed : classes.default}
        >
          <Input
            id={item.id}
            value={newValue}
            onSubmit={valueChange}
            onChange={handleValueChange}
            onRender={handleRender}
            link={link}
          />
        </Item>
      ) : (
        <Item
          key={item.id}
          actionClick={completedToggle}
          mainClick={openMenu}
          icon={item.completed ? <CheckBoxIcon color="secondary" /> : <CheckBoxIconChecked />}
          data={{ ...item, index: i + 1 }}
          className={item.completed ? classes.completed : classes.default}
        />
      )
    );

  return (
    <>
      <List className={classes.root}>{element}</List>
      {menu && <Menu anchor={menu} onClick={menuClickHandler} onClose={closeMenu} items={menuItems} />}
      {confirm && (
        <Confirm id={confirm.id} type={confirm.type} title={confirm.title} yes={confirmHandler} no={closeConfirm} />
      )}
      {info && <Info item={info} onClose={closeInfo} />}
    </>
  );
};

const createMenu = (menu) => {
  if (!Array.isArray(menu)) {
    console.warn('В компонент меню передан неизвестный параметр');
    return Object.values(customMenu);
  } else if (!menu.length) {
    console.warn('В компонент меню передан параметр пустого массива');
    return Object.values(customMenu);
  }
  return menu.map((key) => customMenu[key]);
};

const getItemById = (id, items) => ({ ...items.find(({ id: itemId }) => itemId === id) });
