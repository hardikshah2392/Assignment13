import React,{Component} from 'react'

import ProductRow from './ProductRow'

class ProductTable extends Component {
    
    onDeleteItem = (id) => {
        this.props.onDelete(id)
    }

    onModifyItem = (id) => {
        this.props.onModify(id)
    }

    render() {
        let filterText = this.props.filterText;
        let products = this.props.products;

        return (
            <div>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th colSpan="2">Stock</th>
                            <th colSpan ="2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(products).filter(
                                key => products[key].name.indexOf(filterText) >= 0
                            ).map( 
                                item => {
                                    return (
                                        <ProductRow 
                                            key = {products[item].productId} 
                                            product = {products[item]}
                                            onDelete={this.onDeleteItem}
                                            onModify={this.onModifyItem}
                                        />
                                    )
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable;