import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '95%',
    margin: '0 auto'
  },
  item: {
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
  },
  right: {
    float: 'right'
  }
}));

export default ({ mainClick, actionClick, action2Click, icon, icon2, data, children, className }) => {
  const { id, value, index } = data;
  const classes = useStyles();

  const handleMain = (event) => {
    mainClick?.({ id, $: event.currentTarget });
  };
  const handleAction = (event) => {
    event.stopPropagation();
    actionClick?.(id);
  };

  const handleAction2 = (event) => {
    event.stopPropagation();
    action2Click?.(id);
  };

  return (
    <>
      <ListItem
        className={`${classes.item} ${className || ''}`}
        dense
        button
        onClick={handleMain}
        aria-label="menu-item"
      >
        <ListItemIcon className={classes.icon}>{index}</ListItemIcon>
        <ListItemText primary={children || value}></ListItemText>
        <IconButton onClick={handleAction} className={classes.iconButton}>
          {icon}
        </IconButton>
        {icon2 ? (
          <IconButton onClick={handleAction2} className={classes.iconButton}>
            {icon2}
          </IconButton>
        ) : (
          ''
        )}
      </ListItem>
    </>
  );
};
