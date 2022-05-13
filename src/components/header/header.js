import React from 'react';

import './header.css';
import BookForm from '../book-form';


export default class Header extends React.Component {

	state = {
		form_opened: false
	};

	onChangeFlag = () => {
		this.setState(({form_opened}) => {
			return {
				form_opened: !form_opened
			}
		})
	}
	

	render () {
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			  <div className="container-fluid">
			    <a className="navbar-brand" href="#">Каталог книг</a>
			    <button className="btn btn-secondary my-2 my-sm-0" type="button" onClick={this.onChangeFlag}>Добавить книгу</button>
			  </div>
			  {this.state.form_opened ? (<BookForm onChangeFlag={this.onChangeFlag}/>) : null}
			</nav>
		);
	}
}
