import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
  item: {
    border: '2px solid #3dda0c',
    borderRadius: 10,
    margin: '10px auto',
    minHeight: 50,
    paddingLeft: 0
    // background: '#a8ff44'
  },
  icon: {
    justifyContent: 'center'
  },
  progress: {
    margin: '20px auto',
    display: 'block'
  }
}));

export default function CheckboxList({ listItems }) {
  const classes = useStyles();
  const [completed, setCompleted] = useState(null);
  useEffect(() => setCompleted(storage.get()), []);
  useEffect(() => (completed ? storage.set(completed) : undefined), [completed]);

  const handleToggle = (id) => () => {
    const index = completed.indexOf(id);
    const newCompleted = [...completed];
    index === -1 ? newCompleted.push(id) : newCompleted.splice(index, 1);
    setCompleted(newCompleted);
  };
  let element;
  if (!listItems) element = <CircularProgress className={classes.progress} size={20} color="secondary" />;
  else if (!listItems.length) element = <ListItemText primary="Пока задач нет" />;
  else
    element = listItems.map(({ id, value }, i) => (
      <ListItem className={classes.item} key={id} dense button onClick={handleToggle(id)}>
        <ListItemIcon className={classes.icon}>{i + 1}</ListItemIcon>
        <ListItemText primary={value} />
        {completed ? (
          <Switch checked={completed.includes(id)} color="primary" />
        ) : (
          <CircularProgress size={20} color="secondary" />
        )}
      </ListItem>
    ));

  return <List className={classes.root}>{element}</List>;
}

const getState = (arr, key) => arr.reduce((result, { [key]: value, id }) => (value ? [...result, id] : result), []);

const storage = {
  get() {
    let data = localStorage.getItem('completed');
    if (data) data = JSON.parse(data);
    else data = [];
    return data;
  },
  set(data = []) {
    if (!Array.isArray(data)) return console.warn('Переданы некорректные данные');
    let value = JSON.stringify(data);
    localStorage.setItem('completed', value);
  }
};
