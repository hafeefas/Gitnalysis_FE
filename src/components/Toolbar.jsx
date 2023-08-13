import React from 'react';
import { Toolbar } from '@material-ui/core';

function DateRangeToolbar() {
    return (
        <Toolbar>
            <FormControl>
                <InputLabel id="time-range-label">Time Range</InputLabel>
                <Select
                    labelId="time-range-label"
                    id="time-range-select"
                    value=
                    onChange=
                >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
            </FormControl>
        </Toolbar>
    );
}

export default DateRangeToolbar;
