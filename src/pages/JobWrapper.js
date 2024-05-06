import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const documentHeight = document.body.scrollHeight;
            const isScrolledNearBottom = scrollPosition + 200 >= documentHeight;

            if (isScrolledNearBottom && !loading ) {
                dispatch(fetchJobs());
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, dispatch]);

    // if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return(
        <div >
            <JobFilters />

            {filteredJobs.length === 0 && <div style={{margin: "40px"}}> No Job Found</div>}

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