import { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export default function Checkboxes() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Checkbox
      color="primary"
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'secondary checkbox' }}
    />
  );
}
