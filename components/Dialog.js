import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  root: {
    verticalAlign: 'top'
  },
  action: {
    paddingBottom: 0
  },
  divider: {
    marginBottom: 10
  },
  title: {
    padding: 0,
    textAlign: 'center'
  },
  content: {
    padding: 8
  }
}));

export default ({ open, close = true, onClose, onEntered, title, children }) => {
  const classes = useStyles();

  const closeHandler = () => onClose?.();
  const enteredHandler = () => onEntered?.();

  return (
    <Dialog
      classes={{ paperScrollBody: classes.root }}
      fullWidth={true}
      maxWidth="xs"
      scroll="body"
      onEntered={enteredHandler}
      open={open}
      onClose={closeHandler}
    >
      {close ? (
        <DialogActions className={classes.action}>
          <CancelIcon onClick={closeHandler} color="error" />
        </DialogActions>
      ) : (
        <Divider className={classes.divider} />
      )}
      {title ? <DialogTitle className={classes.title}>{title}</DialogTitle> : ''}
      <DialogContent className={classes.content} dividers={true}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
