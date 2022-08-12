import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react';

const CounterToggle = ({ parentCounter, setParentCounter }) => {

  function handleChange(e) {
    setParentCounter(() => e.target.value);
  }
  return (
    <FormControl fullWidth>
      <InputLabel id='demo-simple-select-label'>Count</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={parentCounter}
        label='Count'
        onChange={handleChange}
      >
        <MenuItem value={'1'}>Start</MenuItem>
        <MenuItem value={'2'}>Stop</MenuItem>
        <MenuItem value={'3'}>Completed Cycles</MenuItem>
        <MenuItem value={'4'}>Anomolies Count</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CounterToggle;
