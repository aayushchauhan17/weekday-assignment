import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const defaultFilter = {
    minExperience: '',
    companyName: '',
    location: '',
    role: '',
    minBasePay: ''
  }

const initialState = {
  jobs: [],
  filteredJobs : [],
  loading: false,
  error: null,
  filter: defaultFilter
};

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (_, { rejectWithValue }) => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const body = JSON.stringify({
            "limit": 10,
            "offset": 0
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body
        };

        const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)

        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

const applyFilter = (jobs, filter) => {
    let filterJobs = jobs
    if(filter.minExperience){
        filterJobs = filterJobs.filter((j)=> +j.minExp === +filter.minExperience);
    }
    if(filter.companyName){
        filterJobs = filterJobs.filter((j)=> j.companyName.includes(filter.companyName))
    }
    if(filter.location){
        filterJobs = filterJobs.filter((j)=> j.location.toLowerCase() === filter.location.toLowerCase())
    }
    if(filter.role){
        filterJobs = filterJobs.filter((j)=> j.jobRole.toLowerCase() === filter.role.toLowerCase());
    }
    if(filter.minBasePay){
        let min = 0;
        let max = 0;
        if(filter.minBasePay.includes('+')){
            min = filter.minBasePay.split('+')[0];
            max = 9999999
        }
        if(filter.minBasePay.includes('-')){
            min = filter.minBasePay.split('-')[0];
            max = filter.minBasePay.split('-')[1];
        }
        
        filterJobs = filterJobs.filter((j)=> (+min <= +j?.minJdSalary && +j?.minJdSalary < max ) )
    }

    return filterJobs;
}

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    filterPayloadChanged : (state, action) => {
        console.log(action.payload);
        state.filter = action.payload;
        let filteredJobs = applyFilter(state.jobs, action.payload);
        state.filteredJobs = filteredJobs;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        let allJobs = [...state.jobs, ...action.payload.jdList];
        let filteredJobs = applyFilter(allJobs, state.filter);
        state.loading = false;
        state.jobs = allJobs;
        state.filteredJobs = filteredJobs;
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { filterPayloadChanged } = jobSlice.actions;

export default jobSlice.reducer;
