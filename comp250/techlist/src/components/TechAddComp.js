import React from 'react'
import EditTech from './EditTechComp'

class Tech extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: false,
            techs: [],
            position:'',
            apprenticeYear: 0,
            editDisplay: false,
            selectedTech:'',
        }
    }
    
    
    submitTech = (e) => {
        let firstName = document.getElementById('first_name').value
        let lastName = document.getElementById('last_name').value

        e.preventDefault()
        fetch('http://127.0.0.1:5000/add_tech', {
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
            if(response.ok){
                return response.json()
                } else {
                throw new Error("Post Failed")
                }
            })
        .then(data => this.props.passUpdateState(data))
        .catch(function(error) {console.log("Request failed", error)})
    }


    removeTech = (tech) => {
        let confirmString = 'Are you sure you want to remove ' 
                            + tech.first_name + ' ' + tech.last_name 
                            + ' from the system?'
        if (window.confirm(confirmString)) {
            fetch('http://127.0.0.1:5000/remove_tech', {
                method:'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({'tech_id': tech.tech_id})               
            })
            .then(function(response) {
                if(response.ok){
                    return response.json()
                } else {
                    throw new Error("Post Failed")
                }
            })
            .then(data => this.props.passUpdateState(data))
            this.setState({editDisplay: false})
        } 
    }

//clicked to display edit window, 
//clicked done: executed from EditTechComp to match the selected Tech
//and modify it in the state.techs list.
    editTech = (tech, bool) => {
        let i, index, newTechs
        for (i of this.props.passTechs){
            if (i.tech_id === tech.tech_id) {
                index = this.props.passTechs.indexOf(i)
            }
        }
        newTechs = this.props.passTechs.slice()
        newTechs[index] = tech
        this.setState({
            editDisplay: bool,
            selectedTech: tech,
            techs: newTechs,
        })
        this.props.passUpdateState(newTechs)
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
                break
            default:
                return null
        }
    }


    render(){
        const passTechs = this.props.passTechs
        let techRows
    //map the tech list to display as table elements.
        if (passTechs.length > 0) {
            techRows = passTechs.map((tech, key) =>
                <tr key={key}>
                    <td>{tech.tech_id}</td>
                    <td>{tech.first_name}</td>
                    <td>{tech.last_name}</td> 
                    <td>{tech.position}</td>
                    <td>{tech.apprentice_year}</td>
                    <td><button onClick={()=>this.editTech(tech, true)}>Edit Technician</button></td>
                    <td><button onClick={()=>this.removeTech(tech)}>Remove Technician</button></td>
                </tr>
            )
        }
        return( 
            <div>
                <div id='techTableDiv'  style={this.state.editDisplay ? 
                                              {pointerEvents: 'none', opacity: '0.4'}: 
                                              {}}>
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
                            placeholder='Last Name'>
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
                    {
                    this.state.editDisplay ? 
                        <EditTech 
                            passSelectedTech={this.state.selectedTech}
                            passEditFunc={this.editTech}
                            passTechs={this.props.passTechs}
                            /> : null
                    }
                </div>
            </div>
        )
    }
}

export default Tech