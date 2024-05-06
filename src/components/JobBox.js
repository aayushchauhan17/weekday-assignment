import React from 'react';
import './JobBox.css';
import { Button } from '@mui/material';

export function JobBox({job}){
    //job card
    return (
        <>
            <div className='container'>
                <div className='postTime'>Post a day ago</div>
                <div className='job-details'>
                    <img src={job?.logoUrl} width={50} height={50} />
                    <div className='job-names'>
                        <div className='company-name'>{job?.companyName}</div>
                        <div>{job?.jobRole}</div>
                        <div>{job?.location}</div>
                    </div>
                </div>

                <div className='salary'>
                    Estimated salary: {job?.minJdSalary ? `${job?.salaryCurrencyCode} ${job.minJdSalary} -` : ""}  {job?.maxJdSalary ? `${job?.salaryCurrencyCode} ${job?.maxJdSalary}` : ""}
                </div>
                <div className='about'>
                    <p className='about-company'>About Company</p>
                    <p className='jobDetailsFromCompany'>{job?.jobDetailsFromCompany}</p>
                </div>

                <div className='exp'>
                    <div className='minimum-experience'> Minimum Experience </div>
                    <div>{job?.minExp} years</div>
                </div>

                <Button className='button' variant="contained" >Easy Apply</Button>
                
            </div>
        </>
    )
}