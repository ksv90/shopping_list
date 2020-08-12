import { useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

export default ({ id, value, onSubmit, onChange, onRender, link }) => {
  useEffect(() => {
    onRender?.(id);
  }, []);

  if (value === null) value = '';
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(id);
  };

  const handleChange = () => {
    onChange?.();
  };

  return (
    <>
      <Paper onSubmit={handleSubmit} component="form">
        <InputBase value={value} onChange={handleChange} inputRef={link} />
      </Paper>
    </>
  );
};
