import React, { useState, useEffect } from 'react';
import { Toolbar, FormControl, InputLabel, Select, MenuItem, TextField, makeStyles } from '@material-ui/core';
import axios from 'axios'

const useStyles = makeStyles({
  toolbar: {
    backgroundColor: '#cbd5e0',
    borderRadius: '0.5rem',    
    padding: '1rem',        
    width: '28rem',            
    justifyContent: 'space-between',
  },
  select: {
    '& .MuiSelect-select': {
      color: '#9f7aea',      
    },
    '& .MuiSelect-icon': {
      color: '#9f7aea',      
    },
  },
  datePicker: {
    '& .MuiInput-input': {
      color: '#9f7aea',      
    },
    '& .MuiSvgIcon-root': {
      color: '#9f7aea',   
    },
  },
  formControl: {
    minWidth: 120,
  },
  label: {
    color: '#718096',       
    fontSize: '0.875rem',    
    fontWeight: 500,         
  },
});

function DateRangeToolbar({owner, repo}) {
  const classes = useStyles();
  const [timeRange, setTimeRange] = useState('daily');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    switch (timeRange) {
      case 'daily':
        setStartDate(today);
        setEndDate(today);
        break;
      case 'weekly':
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        setStartDate(startOfWeek);
        setEndDate(today);
        break;
      case 'monthly':
        setStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
        setEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
        break;
      case 'yearly':
        setStartDate(new Date(today.getFullYear(), 0, 1));
        setEndDate(new Date(today.getFullYear(), 11, 31));
        break;
      default:
        break;
    }
  }, [timeRange]);

  useEffect(() => {
    async function fetchData() {
      try {

      }
    }
  });

  return (
    <Toolbar className={classes.toolbar}>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label} shrink id="time-range-label">Time Range</InputLabel>
        <Select
          className={classes.select}
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
        className={classes.datePicker}
        id="start-date-picker"
        label="Start Date"
        type="date"
        value={startDate.toISOString().split('T')[0]}
        onChange={(e) => setStartDate(new Date(e.target.value))}
        InputLabelProps={{
          shrink: true,
          className: classes.label,
        }}
      />
      <TextField
        className={classes.datePicker}
        id="end-date-picker"
        label="End Date"
        type="date"
        value={endDate.toISOString().split('T')[0]}
        onChange={(e) => setEndDate(new Date(e.target.value))}
        InputLabelProps={{
          shrink: true,
          className: classes.label,
        }}
      />
    </Toolbar>
  );
}

export default DateRangeToolbar;
