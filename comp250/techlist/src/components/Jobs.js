import React from 'react'
import TechAddComp from './TechAddComp'

class Jobs extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            jobs : []
        }
    }

    componentDidMount() {
        const urlJobs = 'http://127.0.0.1:5000/jobs'
        fetch(urlJobs)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw Error('Error fetching posts!')
            }
        })
        .then(jobsData => {
            console.log('jobsData',jobsData)
            this.setState({ jobs: jobsData, isLoading: false })
        })
    }



    render() {
        let jobRows
        jobRows = this.state.jobs.map((job, key) =>
            <tr key={key}>
                <td>{job.job_id}</td>
                <td>{job.ro_number}</td>
                <td>{job.company}</td>
                <td>{job.description}</td>
                <td>{job.tech_id}</td>
                <td>{job.est_completion}</td>
            </tr>
        )
        return (
            <div>
                <div id='addJobDiv'>
                    <label>Add Job</label>
                    <form>
                        <input
                            id='ro_number'
                            type='number'
                            name='ro_number'
                            placeholder='R.O. Number'/>
                        <br />
                        <input
                            id='company'
                            type='text'
                            name='company'
                            placeholder='Company' />
                        <br />
                        <input
                            id='description'
                            type='text'
                            name='description'
                            placeholder='Job Description' />
                        <br />
                        <input
                            id='est_completion'
                            type='number'
                            name='est_completion'
                            placeholder='Est. Time of Completion'/>
                        <br />
                        <select>
                            <option value='select'>Select Tech</option>
                        </select>
                        <br />  
                        <input type='submit' value='Submit'></input>                      
                    </form>
                </div>
                <div id='jobsTableDiv'>
                    <table id='jobsTable'>
                        <tbody>
                            <tr>
                                <td><h4>Job ID</h4></td>
                                <td><h4>RO Number</h4></td>
                                <td><h4>Company</h4></td>
                                <td><h4>Description</h4></td>
                                <td><h4>Tech ID</h4></td>
                                <td><h4>Est. of Completion</h4></td>
                            </tr>
                            {jobRows}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Jobs