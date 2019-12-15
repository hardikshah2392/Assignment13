import React,{Component} from 'react'
const RESET_VALUES = {productId: '', category: '', price: '', name: ''}

class ProductForm extends Component {

    validateFields = () => {

        let name = this.state.product.name;
        let category = this.state.product.category;
        let price = this.state.product.price;
        let instock = this.state.product.instock;

        let errors = {}

        if(name === "") {
            errors['name'] = "name error"
            this.setState({errors:errors})
            return false
        }  
        if(category === "") {
            errors['category'] = "category error"
            this.setState({errors:errors})
            return false
        }
        if(price === ""){
            errors['price'] = "price error"
            this.setState({errors:errors})
            return false
        }
        if(instock === ""){
            errors['price'] = "price error"
            this.setState({errors:errors})
            return false
        }
        return true;
    }



    constructor(props) {
        super(props);
        this.state = {
            action: "Save",
            product: Object.assign({}, RESET_VALUES), errors: {},
            selectedOption:"In Stock",
       }
    }

    populateForm(modifiedProduct) {
        this.setState({product : modifiedProduct, action:"Update"});
    }

    onSubmit = (event) => {
        if(this.validateFields()) {
            
            if(this.state.action === "Save") { // save new product
                this.props.onSubmit(this.state.product);
            }
            else if(this.state.action === "Update") { // update existing ones
                this.props.onUpdate(this.state.product)
            }
    
            this.setState({ // reset form
                product: Object.assign({}, RESET_VALUES), 
                errors: {},
                action:"Save"
            })

        }else
        {
            console.log("Please enter values!")
        }
        event.preventDefault();
    }


    onRadioChange = (newValue) => {
        this.setState({
            selectedOption: newValue.target.value
          });
        var option = newValue.target.value;
        this.setState((prevState) => {
            if(option === "In Stock"){
                console.log("product in stock")
                prevState.product.instock = true;
            }
            else{
                console.log("product out stock")
                prevState.product.instock = false;
            }
            return { product: prevState.product }
        })
    }

    onChange = (event) => {
        const target = event.target    
        const name = target.name
        const value = target.value

        this.setState((prevState) => {
             prevState.product[name] = value
             return { product: prevState.product }
        })
    }

    render() {
        return (
            <div>
                <h4>Add a new Product</h4>
                <div className="col-md-10">
                    <form> 
                        <div className="form-group">
                            <label htmlFor="productName"><strong>Name</strong></label><br/>
                            <input placeholder="Enter Product Name" className="form-control" id="productName" type="text" onChange={this.onChange} value={this.state.product.name} name="name"></input><br/><br/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productCategory"><strong>Category</strong></label><br/>
                            <input placeholder="Enter Category"
                            className="form-control" id="productCategory" type="text" onChange={this.onChange} value={this.state.product.category} name="category"></input><br/><br/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productPrice"><strong>Price</strong></label><br/>
                            <input className="form-control" placeholder="Enter Price" id="productPrice" type="text" onChange={this.onChange} value={this.state.product.price} name="price"></input><br/><br/>
                        </div>

                        <div className="form-group">
                    
                    <input className="form-group-input" type="radio" value="In Stock" checked={this.state.product.instock === true} onChange={this.onRadioChange}/>
                    <label className="form-group-label">In Stock</label>
                    <br/>
                    <input className="form-group-input" type="radio" value="Out Stock" checked={this.state.product.instock === false} onChange={this.onRadioChange}/>
                    <label className="form-group-label">Out of Stock</label><br/><br/>
                </div>

                        <button className="btn btn-info" type="button" onClick={this.onSubmit}>Save</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ProductForm;