import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    zIndex: 99999,
    position: 'fixed',
    padding: 20,
    bottom: 0,
    right: 0
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${green[500]}`
  },
  input: {
    flex: 1,
    paddingLeft: 20
  },
  iconButton: {
    padding: 10
  },
  title: {
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center'
  },
  dialog: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));

export default function AlertDialog({ id, handler }) {
  const open = Boolean(id);
  return (
    <Dialog
      open={open}
      onClose={handler()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Вы действительно хотите удалить элемент?</DialogTitle>
      <DialogContent>
        <DialogContentText>Это действие нельзя будет отменить!</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handler()} color="primary">
          Отмена
        </Button>
        <Button onClick={handler(id)} color="primary" autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
