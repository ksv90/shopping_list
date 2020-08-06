import { useState, useEffect, useReducer } from 'react';
import MyList from '../components/MyList';
import MyAddTask from '../components/MyAddTask';
import Context from '../app/context';
import reducer, * as actionType from '../app/reducer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../app/styles/main.module.css';
import MySettings from '../components/MySettings';
import Button from '@material-ui/core/Button';

export default () => {
  const key = 'listItems';
  const [state, dispatch] = useReducer(reducer, null);
  const [edit, setEdit] = useState(false);
  useEffect(() => actions.A_get(), []);
  // useEffect(() => (state ? actions.A_set(state) : undefined), [state]);

  const tasks = state ? state.length : 0;
  const completed = state ? state.filter(({ completed }) => completed).length : 0;
  const actions = getActions(dispatch, key);

  return (
    <Context.Provider value={actions}>
      <div className={styles.container}>
        <Typography className={styles.header} variant="h4">
          Cписок покупок
        </Typography>
        <MySettings />
        <Button onClick={() => setEdit(!edit)} variant="contained" color={edit ? 'secondary' : 'primary'}>
          Редактировать
        </Button>
        <Divider />
        <MyList edit={edit} listItems={state} />
        <Divider />
        <div className={styles.statistics}>
          <Typography variant="h5">Статистика</Typography>
          {state ? (
            <Typography className={styles.last}>{`Всего задач: ${tasks} / Выполнено: ${completed}`}</Typography>
          ) : (
            <CircularProgress className={styles.progress} size={20} color="secondary" />
          )}
        </div>
        {edit ? <MyAddTask /> : ''}
      </div>
    </Context.Provider>
  );
};

const getActions = (dispatch = console.log, key = 'default') => ({
  A_add: (payload) => dispatch({ ...actionType.ADD, key, payload }),
  A_delete: (payload) => dispatch({ ...actionType.DELETE, key, payload }),
  A_get: (payload) => dispatch({ ...actionType.GET, key, payload }),
  A_set: (payload) => dispatch({ ...actionType.SET, key, payload }),
  A_update: (payload) => dispatch({ ...actionType.UPDATE, key, payload })
});
