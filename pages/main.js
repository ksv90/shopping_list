import { useEffect, useReducer, useState } from 'react';
import TaskList from '../components/taskList';
import MyAddTask from '../components/AddTask';
import Context from '../app/context';
import reducer, * as actionType from '../app/reducer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from '../app/styles/main.module.css';
import MySettings from '../components/Settings';
import Router from 'next/router';
import Button from '@material-ui/core/Button';

const key = 'listItems';
export default () => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(reducer, null);
  useEffect(() => actions.A_get(), []);
  // useEffect(() => (state ? actions.A_set(state) : undefined), [state]);

  const tasks = state ? state.length : 0;
  const completed = state ? state.filter(({ completed }) => completed).length : 0;
  const actions = getActions(dispatch, key);
  const handleClick = () => {
    setLoading(true);
    Router.push('/');
  };
  return (
    <Context.Provider value={actions}>
      <div className={styles.container}>
        {loading ? (
          <p className={styles.button}>
            <CircularProgress size={20} color="secondary" />
          </p>
        ) : (
          <p className={styles.button}>
            <Button onClick={handleClick} variant="contained" color="primary">
              {'< На главную'}
            </Button>
          </p>
        )}
        <Typography className={styles.header} variant="h4">
          Cписок задач
        </Typography>
        <MySettings />
        <Divider />
        {state ? (
          <TaskList listItems={state} menu={['info', 'switch', 'change', 'delete']} />
        ) : (
          <div className={styles.progressWrap}>
            <CircularProgress className={styles.progress} size={20} color="secondary" />
          </div>
        )}
        <Divider />
        <div className={styles.statistics}>
          <Typography variant="h5">Статистика</Typography>
          {state ? (
            <Typography className={styles.last}>{`Всего задач: ${tasks} / Выполнено: ${completed}`}</Typography>
          ) : (
            <div className={styles.progressWrap}>
              <CircularProgress className={styles.progress} size={20} color="secondary" />
            </div>
          )}
        </div>
        <MyAddTask />
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
