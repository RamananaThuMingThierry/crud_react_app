import React,{Component, Fragment} from 'react';
import Form from './Form';
import axios from 'axios';
import "./app.css";
import CustomerList from './CustomerList';
import Loader from './Loader';

class App extends Component{

    state = {
        loader: false,
        customers: [],
        customer: {}, // Utile pour la modification de données
        url: "http://localhost:8000/api/customers"
    }

    getCustomers = async () =>{
        this.setState({loader: true});
        const customers = await axios.get(this.state.url);
        this.setState({customers: customers.data, loader: false });
    }

    componentDidMount(){
        this.getCustomers();
    }

    deleteCustomer = async id =>{
        this.setState({loader: true});
        await axios.delete(`${this.state.url}/${id}`);

        this.getCustomers();
    }
    
    editCustomer = async id =>{
        this.setState({loader: true});
        await axios.update(`${this.state.url}/${id}`);
        this.getCustomers();
    }

    onDelete = id =>{
        this.deleteCustomer(id);
    }
    
    onEdit = data =>{
        this.setState({customer: data});
    }

    createCustomer = async (data) =>{
        this.setState({loader: true});
        await axios.post(this.state.url, {
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
        });

        this.getCustomers();
    }

    updateCustomer = async (data) =>{
        // clear customer obj
        this.setState({ customer: {}, loader: true});
        await axios.put(`${this.state.url}/${data.id}`, {
            nom: data.nom,
            prenom: data.prenom,
            email: data.email,
        });

        this.getCustomers();
    }

    onSubmitForm = data =>{
        if(data.isEdit){
            this.updateCustomer(data);
        }else{
            this.createCustomer(data);
        }
    }

    render(){
        return (
            <Fragment>
                <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" class="header item">React JS CRUD with Laravel API.</a>
                    </div>
                </div>

                <div className="ui main container">
                    <Form customer={this.state.customer} onSubmitForm={this.onSubmitForm}/>
                    {this.state.loader ? <Loader/> : ""}
                    <CustomerList customers={this.state.customers} onDelete={this.onDelete} onEdit={this.onEdit}/>
                </div>  
            </Fragment>
        );
    };
}

export default App;