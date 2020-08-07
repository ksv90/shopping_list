import { useState } from 'react';
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
  },
  right: {
    float: 'right'
  }
}));

export default ({ mainClick, actionClick, icon, data }) => {
  const { id, value, index } = data;
  const classes = useStyles();

  const handleMain = (event) => {
    mainClick?.({ id, $: event.currentTarget });
  };
  const handleAction = (event) => {
    event.stopPropagation();
    actionClick?.(id);
  };

  return (
    <>
      <ListItem className={classes.item} dense button onClick={handleMain}>
        <ListItemIcon className={classes.icon}>{index}</ListItemIcon>
        <ListItemText primary={value} />
        <IconButton onClick={handleAction} className={classes.iconButton}>
          {icon}
        </IconButton>
      </ListItem>
    </>
  );
};
