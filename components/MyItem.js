import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import DraftsIcon from '@material-ui/icons/Drafts';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SendIcon from '@material-ui/icons/Send';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import MyDialog from './MyDialog';

const useStyles = makeStyles(() => ({
  root: {
    width: '95%',
    margin: '0 auto'
  },
  item: {
    border: '2px solid #3dda0c',
    borderRadius: 10,
    margin: '10px auto',
    minHeight: 50,
    padding: '4px 0'
  },
  icon: {
    justifyContent: 'center'
  },
  progress: {
    margin: '20px auto',
    display: 'block'
  }
}));

export default function MyItem({ mainClick, actionClick, edit, confirm, icon, data }) {
  const { completed = false, id, value, i } = data;
  const classes = useStyles();
  const [anchor, setAnchor] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const mainHandler = (event) => {
    mainClick?.(id);
    setAnchor(event.currentTarget);
  };
  const actionHandler = () => {
    actionClick?.({ id, completed, value });
  };

  const handleCloseInfo = () => {
    setAnchor(null);
  };

  const handleCloseConfirm = () => setOpenConfirm(false);
  const handleAction = (event) => {
    event.stopPropagation();
    confirm ? setOpenConfirm(true) : actionHandler();
  };

  const confirmElement = (
    <MyDialog
      open={openConfirm}
      onClose={handleCloseConfirm}
      title="Вы действительно хотите удалить элемент?"
      close={false}
    >
      <DialogContentText>Это действие нельзя будет отменить!</DialogContentText>
      <Button onClick={handleCloseConfirm} color="primary">
        Отмена
      </Button>
      <Button onClick={actionHandler} color="primary" autoFocus>
        Удалить
      </Button>
    </MyDialog>
  );

  const dialogElement = (
    <MyDialog open={Boolean(anchor)} onClose={handleCloseInfo} title={value}>
      <DialogContentText>Дата создания</DialogContentText>
      <Button onClick={handleCloseInfo} color="primary">
        Закрыть
      </Button>
    </MyDialog>
  );

  const menuElement = (
    <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleCloseInfo}>
      <MenuItem>
        <ListItemIcon>
          <SendIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Sent mail" />
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <DraftsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <ListItem className={classes.item} dense button onClick={mainHandler}>
        <ListItemIcon className={classes.icon}>{i + 1}</ListItemIcon>
        <ListItemText primary={value} />
        <IconButton onClick={handleAction} className={classes.iconButton}>
          {icon}
        </IconButton>
      </ListItem>
      {edit ? confirmElement : ''}
      {edit ? menuElement : dialogElement}
    </>
  );
}
