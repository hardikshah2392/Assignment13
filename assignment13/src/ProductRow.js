import React,{Component} from 'react'

class ProductRow extends Component {
    
   delete = () => {
        let id = this.props.product.productId
        console.log("row",id)
        this.props.onDelete(id);
   }

   modify = () => {
    let id = this.props.product.productId;
    this.props.onModify(id);
   }

    render() {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.category}</td>
                <td>{this.props.product.instock == true ? "In Stock" : "No Stock"}</td>
                <td>
                    <button className="btn btn-info" type="button" onClick={this.delete}>Delete</button>
                </td>
                <td>
                <button className="btn btn-info" type="button" onClick={this.modify}>Modify</button>
                </td>

            </tr>
        )
    }
}

export default ProductRow;