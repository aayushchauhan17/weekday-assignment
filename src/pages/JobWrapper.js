import React, { useEffect } from 'react';
import { fetchJobs } from '../slices/job.slice';
import { useSelector, useDispatch } from 'react-redux';

export function JobWrapper(){
    const dispatch = useDispatch();
    const { jobs, loading, error } = useSelector(state => state.jobs);

    useEffect(() => {
        dispatch(fetchJobs());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    console.log(jobs);

    return(
        <>JobWrapper</>
    )
}