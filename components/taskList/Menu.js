import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export default ({ anchor, onClose, onClick, items = [] }) => {
  const { $, id } = anchor;
  const handleClose = () => onClose?.();
  const handleClick = (name) => () => onClick?.({ id, name });
  return (
    <Menu anchorEl={$} open={Boolean($)} onClose={handleClose}>
      {items.map(({ name, icon }) => (
        <MenuItem key={name} onClick={handleClick(name)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={name} />
        </MenuItem>
      ))}
    </Menu>
  );
};
