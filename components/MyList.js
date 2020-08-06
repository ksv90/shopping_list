import { useContext } from 'react';
import Context from '../app/context';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxIconChecked from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import MyItem from './MyItem';

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
  progress: {
    margin: '20px auto',
    display: 'block'
  }
}));

export default function CheckboxList({ listItems, edit }) {
  const classes = useStyles();
  const { A_delete, A_update } = useContext(Context);

  const deleteHandler = ({ id }) => {
    A_delete(id);
  };
  const updateHandler = ({ id, completed }) => {
    A_update({ id, completed: !completed });
  };

  const icon = (completed) =>
    edit ? <DeleteIcon color="error" /> : completed ? <CheckBoxIcon color="secondary" /> : <CheckBoxIconChecked />;

  let element;
  if (!listItems) element = <CircularProgress className={classes.progress} size={20} color="secondary" />;
  else if (!listItems.length) element = <ListItemText primary="Пока задач нет" />;
  else
    element = listItems.map((item, i) => (
      <MyItem
        key={item.id}
        edit={edit}
        actionClick={edit ? deleteHandler : updateHandler}
        confirm={edit}
        mainClick={() => console.log('Main click!')}
        icon={icon(item.completed)}
        data={{ ...item, i }}
      />
    ));

  return <List className={classes.root}>{element}</List>;
}
