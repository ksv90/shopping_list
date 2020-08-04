import { useState } from 'react';
import Switch from '@material-ui/core/Switch';

export default function Switches() {
  const [state, setState] = useState(true);

  const handleChange = () => {
    setState(!state);
  };

  return (
    <Switch checked={state} onChange={handleChange} color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} />
  );
}
