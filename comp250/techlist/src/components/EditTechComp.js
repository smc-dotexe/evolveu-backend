import React from 'react'

class EditTech extends React.Component { 
    constructor(props) {
        super(props)
        this.state = {
            apprentice_year: this.props.passSelectedTech.apprentice_year,
        }
    }
    

    handleChange=(e)=>{
        this.setState({apprentice_year: e.target.value})
    }


    render() {
        let tech = this.props.passSelectedTech
        return (
            <div>
                <h1>{this.props.passSelectedTech.first_name}</h1>
                <table id='editTechTable'>
                    <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>Last Name</td>
                            <td>Position</td>
                            <td>Apprentice Year</td>
                        </tr>
                        <tr>
                            <td><input type='text' placeholder={tech.first_name}></input></td>
                            <td><input type='text' placeholder={tech.last_name}></input></td>
                            <td><input type='text' placeholder={tech.position}></input></td>
                            <td><select
                                    id='apprentice_year'
                                    name='apprentice_year'
                                    value={this.state.apprentice_year}
                                    onChange={this.handleChange}>
                                    <option value='0'>0</option>
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                </select><br />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        )
    }
}

export default EditTech