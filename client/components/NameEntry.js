import React from 'react'
import {changeName} from '../store'
import {connect} from 'react-redux'

class NameEntry extends React.Component {
    constructor() {
        super()
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(txt) {
        console.log("do I run it ever?", this.props.changeName)
        this.props.changeName(txt)
    }

    render() {
        return (<form className="form-inline">
        <label htmlFor="name">Your name:</label>
        <input onChange={(event) => this.handleChange(event.target.value)}
            type="text"
            name="name"
            placeholder="Enter your name"
            className="form-control"
        />
        </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeName: (name) => {
            dispatch(changeName(name))
        }
    }
}

const ConnectedNameEntry = connect(mapStateToProps, mapDispatchToProps)(NameEntry)
export default ConnectedNameEntry