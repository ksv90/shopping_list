import { useState, useContext, useRef } from 'react';
import Context from '../app/context';
import Dialog from './Dialog';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 99999,
    position: 'fixed',
    padding: 20,
    bottom: 0,
    right: 0,
    '& > button': {
      background: red.A700,
      color: 'white'
    }
  },
  paper: {
    display: 'flex',
    marginBottom: 10,
    justifyContent: 'center'
  },
  input: {
    flex: 4
  },
  action: {
    color: green.A700,
    marginLeft: 10,
    height: 55
  },
  right: {
    float: 'right'
  }
}));

export default () => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const { A_add } = useContext(Context);
  const link = useRef(null);

  const changeHandler = (event) => {
    event.preventDefault();
    setValue({ ...value, title: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!value.title) {
      link.current.blur();
      link.current.addEventListener('focus', () => {
        console.log(555);
        setValue({ ...value, error: false });
      });
      return setValue({ ...value, error: true });
    }
    A_add(value.title);
    closeHandler();
  };

  const closeHandler = () => {
    setOpen(false);
    setValue(null);
  };

  const openHandler = () => {
    setValue({ title: '', error: false });
    setOpen(true);
  };
  const enteredHandler = () => {
    // link.current.focus();
  };

  return (
    <div className={classes.root}>
      <Fab onClick={openHandler} disabled={open} size="medium" color="inherit">
        <AddIcon />
      </Fab>
      {value && (
        <Dialog open={open} onClose={closeHandler} title="Новое задание">
          <Paper onSubmit={submitHandler} component="form" className={classes.paper}>
            <TextField
              error={value.error ? true : false}
              autoFocus
              color="primary"
              label={value.error ? 'Ошибка' : 'Название'}
              value={value.title}
              helperText={value?.error ? 'Поле не должно быть пустым' : 'Обязательное поле'}
              variant="outlined"
              inputRef={link}
              onChange={changeHandler}
              className={classes.input}
            />
            <Button type="submit" className={classes.action} variant="contained" color="primary">
              <AddCircleOutlineIcon fontSize="large" />
            </Button>
            {/* <IconButton type="submit" style={{ color: green[500] }} className={classes.action}>
            <AddCircleOutlineIcon />
          </IconButton> */}
          </Paper>
          <Button className={classes.right} onClick={closeHandler} color="primary">
            Закрыть
          </Button>
        </Dialog>
      )}
      {/* <Dialog open={open} onClose={closeHandler} title="Новое задание" onEntered={enteredHandler}>
        <Paper onSubmit={submitHandler} component="form" className={classes.paper}>
          <TextField
            error={value?.error ? true : false}
            autoFocus
            color="primary"
            label={value?.error ? 'Ошибка' : 'Название'}
            value={value?.title}
            helperText={value?.error ? 'Поле не должно быть пустым' : 'Обязательное поле'}
            variant="outlined"
            inputRef={link}
            onChange={changeHandler}
            className={classes.input}
          />
          <IconButton type="submit" style={{ color: green[500] }} className={classes.action}>
            <AddCircleOutlineIcon />
          </IconButton>
        </Paper>
      </Dialog> */}
    </div>
  );
};
