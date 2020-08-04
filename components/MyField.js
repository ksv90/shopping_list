import { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import Context from '../appFolder/context';
import { TEST, VALUE } from '../appFolder/reducer';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 20px',
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

export default function CustomizedInputBase({ value, addItem }) {
  const classes = useStyles();
  // const [value, setValue] = useState('');
  const { setValue } = useContext(Context);
  // dispatch({ ...TEST, payload: 15 });
  const changeHandler = (event) => {
    event.preventDefault();
    setValue({ ...VALUE, payload: event.target.value });
    // setValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!value) return;
    setValue({ ...VALUE, payload: '' });
    // setValue('');
    addItem(value);
  };

  return (
    <Paper onSubmit={submitHandler} component="form" className={classes.root}>
      <InputBase className={classes.input} placeholder="Заголовок" value={value} onChange={changeHandler} />
      <IconButton type="submit" className={classes.iconButton}>
        <AddCircleOutlineIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton}>
        <CancelIcon />
      </IconButton>
    </Paper>
  );
}
