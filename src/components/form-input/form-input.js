import React from 'react';

import './form-input.css'

const FormInput = ({label, id, placeholder, class_inp = '', type = 'text', name}) => {
	return (
		<div className={`form-group ${class_inp}`}>
		  <label className="col-form-label mt-4" htmlFor={id}>{label}</label>
		  <input type={type} name={name} className="form-control" placeholder={placeholder} id={id}/>
		</div>
	)
} 

export default FormInput;