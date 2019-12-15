import React, { Component } from 'react'

class Filter extends Component {
    render() {
        return (
            <div className="my-4">
                <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Enter Product Name"
                        onChange={this.onTextInput}>        
                </input>
            </div>
        )
    }
    onTextInput = (event) => {
        this.props.onFilter({
            filterText : event.target.value
       });
    }
}
export default Filter;