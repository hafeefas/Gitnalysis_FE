import React from 'react';
import { Toolbar } from '@material-ui/core';

function DateRangeToolbar() {
return (
    <Toolbar>
      <FormControl style={{ marginRight: '20px' }}>
        <InputLabel id="time-range-label">Time Range</InputLabel>
        <Select
          labelId="time-range-label"
          id="time-range-select"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id="start-date-picker"
        label="Start Date"
        type="date"
        value={startDate.toISOString().split('T')[0]}
        onChange={(e) => setStartDate(new Date(e.target.value))}
        style={{ marginRight: '10px' }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="end-date-picker"
        label="End Date"
        type="date"
        value={endDate.toISOString().split('T')[0]}
        onChange={(e) => setEndDate(new Date(e.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Toolbar>
  );
}

export default DateRangeToolbar;
