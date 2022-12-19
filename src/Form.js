import React, {Component} from 'react';

class Form extends Component{
    
    isEmpty(obj){
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props && !this.isEmpty(this.props.customer)){
            this.setState({
                form: {...this.props.customer, isEdit: true},
                btnName: "Modifier",
                btnClasse: "ui orange button submit-button"
            });
        }
    }
    state = {
        form: {nom : "", prenom: "", email: "", isEdit: false},
        btnName: "Enregistre",
        btnClasse : "ui primary button submit-button"
    };

    handleChange = (e) =>{
        const {name, value} = e.target;
        let form = this.state.form;
        form[name] = value;
        this.setState({form});
    }

    valide = (name, message) => {
        if(document.getElementsByName(name)[0].value === ""){
            alert(message, name);
            return false;
        }
    }

    formValidation = () =>{
        this.valide("nom","Entrer votre nom");
        this.valide("prenom", "Entre votre prénom");
        this.valide("email", "Entrer votre E-mail");
        return true;
    }

    onSubmitForm = (e) =>{
        e.preventDefault();

        if(this.formValidation()){
            this.props.onSubmitForm(this.state.form);
        }

        // clear form fields
        this.clearFormFields();
    }

    clearFormFields = () =>{
        // Change form state
        this.setState({
            form: {nom : "", prenom: "", email: "", isEdit: false},
        });

        // Changer le button to save
        this.setState({
            btnName: "Enregistre",
            btnClasse : "ui primary button submit-button"
        });

        // clear form fields
        document.querySelector(".form").reset();
    }


    render(){

        const {nom, prenom, email} = this.props.customer;

        return (
            <form className="ui form">
                <div className="fields">
                    <div className='four wide field'>
                        <label for="nom">Nom</label>
                        <input type="text" name="nom" placeholder="Nom" onChange={this.handleChange} value={this.state.form.nom}/>
                    </div>
                    <div className='four wide field'>
                        <label for="prenom">Prénom</label>
                        <input type="text" name="prenom" placeholder="Prénom" onChange={this.handleChange} value={this.state.form.prenom}/>
                    </div>
                    <div className='four wide field'>
                        <label for="email">E-mail</label>
                        <input type="email" name="email" placeholder="E-mail" onChange={this.handleChange} value={this.state.form.email}/>
                    </div>
                    <div className='four wide field'>
                        <button className={this.state.btnClasse} onClick={this.onSubmitForm}>{this.state.btnName}</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;