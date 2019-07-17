import React from 'react'
import TechAddComp from './TechAddComp'

class Jobs extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            selectedTech: ''
        }
    }


    submitJob = (e) => {
        let ro_number, company, description, est_completion, selectTech
        ro_number = document.getElementById('ro_number').value
        company = document.getElementById('company').value
        description = document.getElementById('description').value
        est_completion = document.getElementById('est_completion').value
        selectTech = document.getElementById('selectTech').value
        
        e.preventDefault()
        fetch('http://127.0.0.1:5000/add_job', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'ro_number': ro_number,
                'company': company,
                'description': description,
                'est_completion': est_completion,
                'tech_id': selectTech,
            })
        })
        .then(function(response) {
            if(response.ok){
                return response.json()
                } else {
                throw new Error("Post Failed")
                }
        })
        .then(data => this.props.passUpdateJobs(data))
        .catch(function(error) {console.log("Request failed", error)})       
    }


    jobDone = (e) => {
        console.log('from jobDone ', e)
        //once completed, move to archive?
    }

    render() {
        let jobRows
        jobRows = this.props.passJobs.map((job, key) =>
            <tr key={key}>
                <td>{job.job_id}</td>
                <td>{job.ro_number}</td>
                <td>{job.company}</td>
                <td>{job.description}</td>
                <td>{job.tech_id}</td>
                <td>{job.est_completion}</td>
                <td><button onClick={()=>this.jobDone(job)}>Completed</button></td>
            </tr>
        )


        let techRows
        techRows = this.props.passTechs.map((tech, key) =>
            <option key={key} value={tech.tech_id}>{tech.tech_id}. {tech.first_name}</option>
        )


        return (
            <div>
                <div id='addJobDiv'>
                    <label>Add Job</label>
                    <form method='POST' onSubmit={this.submitJob}>
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
                            type='numeric'
                            value={this.props.passJobs.est_completion}
                            name='est_completion'
                            placeholder='Est. Time of Completion'/>
                        <br />
                        <select id='selectTech'>
                            <option value='select'>Select Tech</option>
                            {techRows}
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