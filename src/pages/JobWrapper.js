import React, { useEffect } from 'react';
import { fetchJobs } from '../slices/job.slice';
import { useSelector, useDispatch } from 'react-redux';
import JobFilters from '../components/JobFilter';
import { JobBox } from '../components/JobBox';
import './JobWrapper.css'

export function JobWrapper(){
    const dispatch = useDispatch();
    const { jobs, filteredJobs ,loading, error } = useSelector(state => state.jobs);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return(
        <div >
            <JobFilters />

            <div className='container-wrapper'>
                <div className='job-list'>
                    {filteredJobs?.map((job, idx)=>{
                        return (
                            <div key={idx}>
                                <JobBox job={job} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}