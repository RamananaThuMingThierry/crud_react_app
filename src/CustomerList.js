import React, {Fragment, Component} from "react";
import './app.css';
import Customer from "./Customer";
class CustomerList extends Component{
    
    onDelete = (id) => {
        this.props.onDelete(id);
    }
    
    onEdit = data => {
        this.props.onEdit(data);
    }
    
    render(){
        
        // Récupérer les données vient du App.js
        const customers = this.props.customers;

        return (
            <Fragment>
                <div className="data">
                    <table className="ui called table">
                        <thead>
                            <th style={{width: "50px", textAlign: "center"}}>#</th>
                            <th>Nom et Prénom</th>
                            <th>E-mail</th>
                            <th style={{width: "148px", textAlign: "center"}}>Actions</th>
                        </thead>

                        <tbody>
                            {
                                customers.map((customer) => {
                                    return <Customer customer={customer} key={customer.id} onEdit={this.onEdit} onDelete={this.onDelete}/>;
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </Fragment>
        );
    }
}

export default CustomerList;