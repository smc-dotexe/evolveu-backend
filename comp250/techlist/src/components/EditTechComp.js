import React from 'react'

class EditTech extends React.Component { 
    constructor(props) {
        super(props)
        const tech = this.props.passSelectedTech
        this.state = {
            firstName: tech.first_name,
            lastName: tech.last_name,
            position: tech.position,
            apprentice_year: tech.apprentice_year,
        }
    }


    handleChange=(e)=>{
        console.log('E.TARGET.NAME: ', e.target.name)
        console.log('E.TARGET.VALUE: ', e.target.value)
        console.log('APPRENTICE YEAR', this.state.apprentice_year)
        this.setState({[e.target.name]: e.target.value})
    }


    componentDidUpdate(prevProps) {
    const newTechProps = this.props.passSelectedTech
    if (this.props.passSelectedTech !== prevProps.passSelectedTech) {
        this.setState({firstName: newTechProps.first_name,
                       lastName: newTechProps.last_name,
                       position: newTechProps.position,
                       apprentice_year: newTechProps.apprentice_year});
        }
    }


    doneEdit = (event, tech, bool) => {
        event.preventDefault()
        console.log('firstname', this.props.passSelectedTech.first_name)
        const techFirstName = this.state.firstName
        const techLastName = this.state.lastName
        const techPosition = this.state.position
        const techYear = this.state.apprentice_year
        console.log(techFirstName, techLastName, techPosition, techYear)
        const urlEditTech = 'http://127.0.0.1:5000/edit_tech'
        // fetch(urlEditTech, {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-type': 'application/json'
        //     },
        //     body: JSON.stringify()
        //     }
        // })
        // this.props.passEditFunc(tech, false)
    }


    render() {
        console.log('state firstName', this.state.firstName)
        let tech = this.props.passSelectedTech
        console.log('tech variable', tech)
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