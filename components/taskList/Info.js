import Dialog from '../Dialog';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  right: {
    float: 'right'
  }
}));

export default ({ item, onClose }) => {
  if (!item) {
    console.log('Компонент MyInfo | Не передан обязательный параметр item');
  } else if (!(item instanceof Object)) {
    console.log('Компонент MyInfo | Обязательный параметр item должен быть объектом');
  }

  const { id, value, completed } = item || {};
  const classes = useStyles();
  const handleClose = () => onClose?.(id);

  return (
    <Dialog open={Boolean(id)} onClose={handleClose} title={value}>
      <DialogContentText>Дата создания: {new Date(id).toLocaleDateString()}</DialogContentText>
      <DialogContentText>Выполнено: {completed ? 'да' : 'нет'}</DialogContentText>
      <Button className={classes.right} onClick={handleClose} color="primary">
        Закрыть
      </Button>
    </Dialog>
  );
};
