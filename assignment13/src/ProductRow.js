import React,{Component} from 'react'

class ProductRow extends Component {
    
    modifyItem = () => {
        let id = this.props.product.productId;
        this.props.onModify(id);
    }

   
    deleteItem = () => {
        let id = this.props.product.productId
        console.log("row",id)
        this.props.onDelete(id);
   }

    render() {
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.category}</td>
                <td>{this.props.product.instock == true ? "In Stock" : "No Stock"}</td>
                <td>
                    <button className="btn" type="button" onClick={this.deleteItem}>Delete</button>
                </td>
                <td>
                <button className="btn" type="button" onClick={this.modifyItem}>Modify</button>
                </td>

            </tr>
        )
    }
}

export default ProductRow;