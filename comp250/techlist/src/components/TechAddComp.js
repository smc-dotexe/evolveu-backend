import React from 'react'
import EditTech from './EditTechComp'

class Tech extends React.Component{
    constructor(){
        super()
        this.state = {
            isLoading: false,
            techs: [],
            position:'',
            apprenticeYear: 0,
            editDisplay: false,
            selectedTech:''
        }
    }
    
    componentDidMount() {
        const urlTech = 'http://127.0.0.1:5000/tech'
        fetch(urlTech)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw Error('Error fetching posts!')
            }
        })
        .then(techsData => {
            this.setState({ techs: techsData, isLoading: false })
        })
    }


    submitTech = (e) => {
        let firstName = document.getElementById('first_name').value
        let lastName = document.getElementById('last_name').value

        e.preventDefault()
        const urlAddTech = 'http://127.0.0.1:5000/add_tech'
        fetch(urlAddTech, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'first_name': firstName,
                'last_name': lastName,
                'position': this.state.position,
                'apprentice_year': this.state.apprenticeYear,
            })
        })
        .then(function(response) {
          if(response.ok){return response.json()}
            {throw new Error("Post Failed")}
        })
        .then(data => this.setState({techs:data}))
        .catch(function(error) {console.log("Request failed", error);})
}

    removeTech = (tech) => {
        let confirmString = 'Are you sure you want to remove ' 
                            + tech.first_name + ' ' + tech.last_name 
                            + ' from the system?'
        if (window.confirm(confirmString)) {
            const urlRemoveTech = 'http://127.0.0.1:5000/remove_tech'
            fetch(urlRemoveTech, {
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({'tech_id': tech.tech_id})               
            })
            .then(function(response) {
                if(response.ok){return response.json()}
                    {throw new Error("Post Failed")}
                })
            .then(data => this.setState({techs:data}))
        }
        this.setState(prevState=>({editDisplay: !prevState.editDisplay}))
    }


    editTech = (tech) => {
        console.log('edittech', this.state.editDisplay)
        this.setState(prevState=>({
            editDisplay: !prevState.editDisplay,
            selectedTech: tech}))
    }


    handleChange = (e) => {
        let x = e.target.name
        let y = e.target.value
        switch(x) {
            case 'position':
                this.setState({position: y})
                break
            case 'apprentice_year':
                this.setState({apprenticeYear: y})
            default:
                return null
        }
    }

    render(){
        let techRows
        if (this.state.techs.length > 0) {
            techRows = this.state.techs.map((tech, key) =>
                <tr key={key}>
                    <td>{tech.tech_id}</td>
                    <td>{tech.first_name}</td>
                    <td>{tech.last_name}</td> 
                    <td>{tech.position}</td>
                    <td>{tech.apprentice_year}</td>
                    <td><button onClick={()=>this.editTech(tech)}>Edit Technician</button></td>
                    <td><button onClick={()=>this.removeTech(tech)}>Remove Technician</button></td>
                </tr>
            )
        }
        return(
        <div>
            <div id='techTableDiv'>
                <label>Add Tech</label>
                <form method='post' onSubmit={this.submitTech}>
                    <input
                        id='first_name'
                        type='text'
                        name='first_name' 
                        placeholder='First Name'>
                    </input><br />
                    <input
                        id='last_name'
                        type='text'
                        name='last_name'
                        placeholder='Last Name'
                        onChange={this.handleChange}>
                    </input><br />
                    <input
                        id='apprenticeRadio'
                        type='radio'
                        name='position'
                        value='Apprentice'
                        onChange={this.handleChange}>
                    </input>
                        Apprentice
                    <input
                        id='journeymanRadio'
                        type='radio'
                        name='position'
                        value='Journeyman'
                        onChange={this.handleChange}>
                    </input>
                        Journeyman<br />
                    <label>Apprentice Year: </label>
                    <select
                        id='apprentice_year'
                        name='apprentice_year'
                        onChange={this.handleChange}>
                        <option value='0'>0</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                    </select><br />
                    <input type='submit' value='Submit'></input> 
                </form>
                <table id='techTable'>
                    <tbody>
                        <tr>
                            <td><h4>Tech ID</h4></td>
                            <td><h4>First Name</h4></td>
                            <td><h4>Last Name</h4></td>
                            <td><h4>Position</h4></td>
                            <td><h4>Apprentice Year</h4></td>
                        </tr>
                        {techRows}
                    </tbody>
                </table>
            </div>
            <div id='editTech'>
                {this.state.editDisplay ? <EditTech passSelectedTech={this.state.selectedTech}/> : null}
            </div>
        </div>
        )
    }
}

export default Tech