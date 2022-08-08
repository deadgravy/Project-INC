import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react';

const CounterToggle = () => {
  let [counter, setCounter] = useState('');

  function handleChange(e) {
    setCounter(() => e.target.value);
  }
  return (
    <FormControl fullWidth>
      <InputLabel id='demo-simple-select-label'>Age</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={counter}
        label='Count'
        onChange={handleChange}
      >
        <MenuItem value={'start'}>Start</MenuItem>
        <MenuItem value={'stop'}>Stop</MenuItem>
        <MenuItem value={'completedCycles'}>Completed Cycles</MenuItem>
        <MenuItem value={'anomolies'}>Anomolies Count</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CounterToggle;
