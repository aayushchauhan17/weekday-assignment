import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './JobFilter.css'
import { filterPayloadChanged } from '../slices/job.slice';

const JobFilters = () => {
  const dispatch = useDispatch();
  const [filters, setLocalFilters] = useState({
    minExperience: '',
    companyName: '',
    location: '',
    role: '',
    minBasePay: ''
  });

  const handleChange = (e) => {
    const { name, value, } = e.target;
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleFilterApply = () => {
    dispatch(filterPayloadChanged(filters));
  };

  const handleResetApply = () => {
    const defaultFilter = {
        minExperience: '',
        companyName: '',
        location: '',
        role: '',
        minBasePay: ''
    }
    dispatch(filterPayloadChanged(defaultFilter));
    setLocalFilters(defaultFilter);
  };


  return (
    <div className='job-container'>
        <div className="job-filters">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Min Experience</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filters.minExperience}
                    label="minExperience"
                    name='minExperience'
                    onChange={handleChange}
                >
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filters.location}
                    label="location"
                    name="location"
                    onChange={handleChange}
                >
                    <MenuItem value={"delhi ncr"}>Delhi NCR</MenuItem>
                    <MenuItem value={"mumbai"}>Mumbai</MenuItem>
                    <MenuItem value={"remote"}>Remote</MenuItem>
                    <MenuItem value={"chennai"}>Chennai</MenuItem>
                    <MenuItem value={"bangalore"}>Bangalore</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filters.role}
                    label="role"
                    name='role'
                    onChange={handleChange}
                >
                    <MenuItem value={"tech lead"}>tech lead</MenuItem>
                    <MenuItem value={"android"}>Android</MenuItem>
                    <MenuItem value={"backend"}>backend</MenuItem>
                    <MenuItem value={"ios"}>IOS</MenuItem>
                    <MenuItem value={"frontend"}>Frontend</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Min base pay</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filters.minBasePay}
                    label="minBasePay"
                    name='minBasePay'
                    onChange={handleChange}
                >
                    <MenuItem value={"10-30"}>10-20 USD</MenuItem>
                    <MenuItem value={"30-60"}>30-60 USD</MenuItem>
                    <MenuItem value={"60-90"}>60-90 USD</MenuItem>
                    <MenuItem value={"100+"}>100+ USD</MenuItem>
                </Select>
            </FormControl>

            <TextField id="outlined-basic" label="Company Name" variant="outlined" value={filters.companyName} name='companyName' onChange={handleChange} fullWidth/>
        </div>

        <div className='buttons'>
            <Button className='fliter-button' variant="contained" onClick={handleFilterApply}>Apply Filter</Button>
            <Button className='fliter-button' variant="contained" onClick={handleResetApply}>Reset Filter</Button>
        </div>
    </div>
  );
};

export default JobFilters;
