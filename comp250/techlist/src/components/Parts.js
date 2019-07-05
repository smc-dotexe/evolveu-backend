import React from 'react'

class Parts extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            parts: []
        }
    }

    componentDidMount() {
        const urlParts = 'http://127.0.0.1:5000/parts'
        fetch(urlParts)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw Error('Error fetching posts!')
            }
        })
        .then(partsData => {
            console.log('partsData',partsData)
            this.setState({ parts: partsData, isLoading: false })
        })
    }

    render() {
        let partRows
        partRows = this.state.parts.map((part,key) => 
            <tr key={key}>
                <td>{part.parts_id}</td>
                <td>{part.description}</td>
                <td>{part.cost}</td>
            </tr>
        )

        return (
            <div>
                <div id='partsTableDiv'>
                    <table id='partsTable'>
                        <tbody>
                            <tr>
                                <td>Part ID</td>
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