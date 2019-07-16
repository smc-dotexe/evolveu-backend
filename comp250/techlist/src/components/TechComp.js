import React from 'react'
import TechAddComp from './TechAddComp'
import Home from './Home'

class TechComp extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log('from techcomp ',this.props.passTechs)
        return (
                <div>
                    <TechAddComp 
                        passTechs={this.props.passTechs}
                        passUpdateState={this.props.passUpdateState}/>
                </div>
        )
    }
}


export default TechComp