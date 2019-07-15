import React from 'react'
import TechAddComp from './TechAddComp'
import Home from './Home'

class TechComp extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log('passing from parent: ', this.props.location.state)
        return (
                <div>
                    <TechAddComp passTechs={this.props.location.state}/>
                </div>
        )
    }
}


export default TechComp