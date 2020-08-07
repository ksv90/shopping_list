import { useState, useContext, useRef } from 'react';
import Context from '../app/context';
import MyDialog from './Dialog';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 99999,
    position: 'fixed',
    padding: 20,
    bottom: 0,
    right: 0
  },
  paper: {
    display: 'flex',
    marginBottom: 10,
    alignItems: 'center',
    border: `1px solid ${green[500]}`
  },
  input: {
    flex: 1,
    paddingLeft: 20
  },
  action: {
    padding: 10
  }
}));

export default () => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const { A_add } = useContext(Context);
  const link = useRef(null);

  const changeHandler = (event) => {
    event.preventDefault();
    setValue(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!value) return;
    closeHandler();
    A_add(value);
    setValue('');
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const openHandler = () => {
    setOpen(true);
  };
  const enteredHandler = () => {
    link.current.children[0].focus();
  };

  return (
    <div className={classes.root}>
      <Fab onClick={openHandler} disabled={open} size="medium" color="primary">
        <AddIcon />
      </Fab>
      <MyDialog close={false} open={open} onClose={closeHandler} title="Новое задание" onEntered={enteredHandler}>
        <Paper onSubmit={submitHandler} component="form" className={classes.paper}>
          <InputBase
            ref={link}
            className={classes.input}
            placeholder="Заголовок"
            value={value}
            onChange={changeHandler}
          />
          <IconButton type="submit" style={{ color: green[500] }} className={classes.action}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Paper>
      </MyDialog>
    </div>
  );
};
