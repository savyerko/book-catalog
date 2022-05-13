import React from 'react';

import Header from '../header';
import BookLists from '../book-lists';

import './app.css';

import BookListService from '../../services/book-list-service';

export default class App extends React.Component {

	render () {

		return (
	  	<div className='app-wrapper'>
	  		<Header />
	  		<BookLists />
	  	</div>
		)
	}
};
