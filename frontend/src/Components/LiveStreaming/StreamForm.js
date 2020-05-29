import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './Stream.scss'
import{ Link } from "react-router-dom"
import { displayStream } from '../../Actions/action'
import { connect } from 'react-redux'
import jwt_decode from "jwt-decode"
import Axios from 'axios';

class StreamForm extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
///
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
  
      
        
    }
    handleLive = ()=>{
        var token = localStorage.getItem("token");
        var decoded = jwt_decode(token);
        Axios.put("http://localhost:5000/live/"+decoded.id).then(res=>console.log(res.data)).catch(err=>console.log(err))
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button onClick={()=>this.handleLive()} className="ui button primary">Add new Stream</button>
                
            </form>
    
        )}}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
}
       

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
