import React, {Component} from 'react';
import Filter from './Filters';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';


class Product extends Component {

onDelete = (productId) => {
    
  this.setState((prevState) => {
      var products = prevState.products
      delete products[productId]
      return { products }
    });

  fetch(`/product/delete/${productId}`,{
      method: 'DELETE',
      headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
      }
  }).then(response => {console.log("Deletion successful!" ,response)}).catch(error =>{console.log(error)})
}

onUpdate = (updatedProduct) => {

  this.setState((prevState) => {
    var products = prevState.products
    products[updatedProduct.productId] = updatedProduct
    return { products }
});

var productId = updatedProduct.productId
var data = {'product' : updatedProduct, 'id': productId}

fetch(`/product/update/${productId}`,{
    method: 'PUT',
    headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
}).then(response => {console.log("Update successful",response)}).catch(error =>{console.log(error)})
}

onFilterChange = (filterInput) => {
  this.setState(filterInput);
}

onSubmitForm = (newProduct) => {
  
  if (!newProduct.productId)
  newProduct.productId = new Date().getTime() // if product is newly created only then assign new id

  this.setState((prevState) => {
    var products = prevState.products
    products[newProduct.productId] = newProduct // create new product or replace old one
    return { products }
  });

  var data = {'product' : newProduct, 'id': newProduct.productId}
  fetch('/product/create',{
      method: 'POST',
      headers: {
          Accept: 'application/json',
                  'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
  }).then(response => {console.log(response)})
  .catch(error =>{
      console.log(error)
  })
}


populateForm = (productId) => {
  let modifiedProduct = this.state.products[productId]
  this.child.current.populateForm(modifiedProduct);
}

constructor(props) {
  super(props);
  this.state = {
      products : {},
      filterText : ''
    }
  this.child = React.createRef();
}

componentDidMount() {
  fetch('/product/get').then(data => data.json()).then(data =>{ // show all products when screen loads
    this.setState({products:data})
    console.log("Setting state!")
  })
}

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <h3>My Inventory</h3>
            <Filter 
                onFilter={this.onFilterChange}/>
            <ProductTable 
                products ={this.state.products} 
                filterText ={this.state.filterText}
                onDelete ={this.onDelete}
                onModify = {this.populateForm}
                onUpdate = {this.onUpdate}
                />
            <ProductForm
                onSubmit={this.onSubmitForm}
                onUpdate={this.onUpdate}
                ref={this.child}

                />
            </div>
        </div>
      </div>
    )
  }

  
}

export default Product;