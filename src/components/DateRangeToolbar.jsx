import React, { useState, useEffect } from 'react';
import { Toolbar, FormControl, InputLabel, Select, MenuItem, TextField, styled } from '@mui/material';
import axios from 'axios';

const StyledToolbar = styled(Toolbar)({
  backgroundColor: '#cbd5e0',
  borderRadius: '0.5rem',
  padding: '1rem',
  width: '28rem',
  justifyContent: 'space-between',
});

const StyledFormControl = styled(FormControl)({
  minWidth: 120,
});

const StyledInputLabel = styled(InputLabel)({
  color: '#718096',
  fontSize: '0.875rem',
  fontWeight: 500,
});

const StyledSelect = styled(Select)({
  '& .MuiSelect-select': {
    color: '#9f7aea',
  },
  '& .MuiSelect-icon': {
    color: '#9f7aea',
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiInput-input': {
    color: '#9f7aea',
  },
  '& .MuiSvgIcon-root': {
    color: '#9f7aea',
  },
});

function DateRangeToolbar({ currRepo }) {
  const [timeRange, setTimeRange] = useState('daily');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // minimum and maximum dates based on repo time
  const [minDate, setMinDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(new Date());

  useEffect(() => {
    async function fetchAvailableDates() {
      try {
        const response = await axios.get(`http://localhost:8080/api/repositories/${owner}/${repo}/getActivity/${timeRange}`);
        const dates = response.data.repoActivityArray.map(activity => new Date(activity.activityTime));
        dates?.sort((a, b) => a - b); 

        if (dates.length) {
          setStartDate(dates[0]);
          setEndDate(dates[dates.length - 1]);
          setMinDate(dates[0]);
          setMaxDate(dates[dates.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching available dates:", error);
      }
    }

    fetchAvailableDates();
    // re run if owner, repo, or timeRange changes
  }, [owner, repo, timeRange]);

  return (
    <StyledToolbar>
      <StyledFormControl>
        <StyledInputLabel shrink id="time-range-label">
          Time Range
        </StyledInputLabel>
        <StyledSelect
          labelId="time-range-label"
          id="time-range-select"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </StyledSelect>
      </StyledFormControl>
      <StyledTextField
        id="start-date-picker"
        label="Start Date"
        type="date"
        value={startDate.toISOString().split('T')[0]}
        onChange={(e) => setStartDate(new Date(e.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          max: endDate.toISOString().split('T')[0],
          min: minDate.toISOString().split('T')[0],
        }}
      />
      <StyledTextField
        id="end-date-picker"
        label="End Date"
        type="date"
        value={endDate.toISOString().split('T')[0]}
        onChange={(e) => setEndDate(new Date(e.target.value))}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: startDate.toISOString().split('T')[0],
          max: maxDate.toISOString().split('T')[0],
        }}
      />
    </StyledToolbar>
  );
};

export default DateRangeToolbar;
