import React from 'react'

class EditTech extends React.Component { 
    constructor(props) {
        super(props)
        const tech = this.props.passSelectedTech
        this.state = {
            id: tech.tech_id,
            firstName: tech.first_name,
            lastName: tech.last_name,
            position: tech.position,
            apprentice_year: tech.apprentice_year,
        }
    }

//setting inputs to state to later jsonify
    handleChange=(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }


    doneEdit = (event) => {
        event.preventDefault()
        //create object with inputs to jsonify
        let tech = {
                'tech_id': this.state.id,
                'first_name': this.state.firstName,
                'last_name': this.state.lastName,
                'position': this.state.position,
                'apprentice_year': parseInt(this.state.apprentice_year)
                }
        fetch('http://127.0.0.1:5000/edit_tech', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(tech)
            })
        .then(function(response) {
            if(response.ok){return response.json()}
                {throw new Error("Post Failed")}
            })
            this.props.passEditFunc(tech, false)
    }


    render() {
        let tech = this.props.passSelectedTech
        return (
            <div>
                <h1>{tech.first_name}</h1>
                <table id='editTechTable'>
                    <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Position</td>
                            <td>Apprentice Year</td>
                        </tr>
                        <tr>
                            <td>
                                <input 
                                    id='editFName'
                                    name='firstName'
                                    onChange={this.handleChange} 
                                    type='text'
                                    value={this.state.firstName}>
                                </input>
                            </td>
                            <td>
                                <input 
                                    id='editLName'
                                    name='lastName'
                                    onChange={this.handleChange} 
                                    type='text'
                                    value={this.state.lastName}>
                                </input>
                            </td>
                            <td>
                                <select
                                    id='position'
                                    name='position'
                                    value={this.state.position}
                                    onChange={this.handleChange}>
                                        <option value='Apprentice'>Apprentice</option>
                                        <option value='Journeyman'>Journeyman</option>
                                </select>
                            </td>
                            <td>
                                <select
                                    id='apprentice_year'
                                    name='apprentice_year'
                                    onChange={this.handleChange}
                                    value={this.state.apprentice_year}>
                                        <option value='0'>0</option>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                </select><br />
                            </td>
                            <td><input type='submit' value='Done' onClick={this.doneEdit}></input></td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        )
    }
}

export default EditTech