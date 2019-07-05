import React from 'react'

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
                <td>{job.company}</td>
                <td>{job.description}</td>
                <td>{job.tech_id}</td>
                <td>{job.est_completion}</td>
                <td>{job.actual_completion}</td>
            </tr>
        )
        return (
            <div>
                <div id='jobsTableDiv'>
                    <table id='jobsTable'>
                        <tbody>
                            <tr>
                                <td>Job ID</td>
                                <td>Company</td>
                                <td>Description</td>
                                <td>Tech ID</td>
                                <td>Est. of Completion</td>
                                <td>Completion Time</td>
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