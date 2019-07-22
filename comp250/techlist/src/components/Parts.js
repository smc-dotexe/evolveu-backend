import React from 'react'

class Parts extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            parts: []
        }
    }

    // componentDidMount() {
    //     const urlParts = 'http://127.0.0.1:5000/parts'
    //     fetch(urlParts)
    //     .then(res => {
    //         if (res.ok) {
    //             return res.json()
    //         } else {
    //             throw Error('Error fetching posts!')
    //         }
    //     })
    //     .then(partsData => {
    //         console.log('partsData',partsData)
    //         this.setState({ parts: partsData, isLoading: false })
    //     })
    // }

    submitParts = e => {
        let partDescription, partCost

        partDescription = document.getElementById('partDescription').value
        partCost = document.getElementById('partCost').value
        
    }
    render() {
        let partRows
        partRows = this.state.parts.map((part,key) => 
            <tr key={key}>
                <td>{part.parts_id}</td>
                <td>{part.job_id}</td>
                <td>{part.description}</td>
                <td>{part.cost}</td>
            </tr>
        )

        let jobRows
        jobRows = this.props.passJobs.map((job, key) => 
            <option key={key} value={job.job_id}>{job.ro_number}</option>
        )

        return (
            <div>
                <div id ='addPartsDiv'>
                    <form method='POST' onSubmit={this.submitParts}>
                        <select id='selectJob'>
                            <option value='select'>Select Job ID</option>
                            {jobRows}
                        </select><br />
                        <input 
                            id='partDescription' 
                            type='text' 
                            placeholder='Part Description'>
                        </input><br />
                        <input 
                            id='partCost' 
                            type='number' 
                            placeholder='Price'>
                        </input><br />
                        <input type='submit' value='Submit'></input>
                    </form>
                </div>
                <div id='partsTableDiv'>
                    <table id='partsTable'>
                        <tbody>
                            <tr>
                                <td>Part ID</td>
                                <td>Job ID</td>
                                <td>Description</td>
                                <td>Cost</td>
                            </tr>
                            {partRows}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Parts