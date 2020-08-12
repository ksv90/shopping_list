import MyDialog from '../Dialog';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  right: {
    float: 'right'
  }
}));

export default ({ id, title, type, yes, no }) => {
  const classes = useStyles();

  const negative = () => no?.();
  const positive = () => yes?.({ id, type });

  return (
    <MyDialog open={Boolean(id)} onClose={negative} title={title} close={false}>
      <DialogContentText>Это действие нельзя будет отменить!</DialogContentText>
      <div className={classes.right}>
        <Button onClick={negative} color="primary">
          Нет
        </Button>
        <Button onClick={positive} color="primary" autoFocus>
          Да
        </Button>
      </div>
    </MyDialog>
  );
};
