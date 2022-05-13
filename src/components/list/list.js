import React from 'react';

import BookListService from '../../services/book-list-service';
import BookItem from '../book-item';

import './list.css'

export default class List extends React.Component {

	state = {
		list: []
	}

	BookListService = new BookListService();



	_randomISBN = this.BookListService._getRandomIsbn;

	snapFunc = (snap) => {
		
	
		setTimeout(() => {this.setState(({list}) => {
			const {book_year} = this.props;
			const filtered_docs = snap.docs.filter((doc) => doc.data().pub_year == book_year);

			const books_by_year = filtered_docs.map((doc) => ({
				rate: 0, isbn: this._randomISBN(), id: doc.id, ...doc.data()
			}));

			
				return	{ list: books_by_year };
			
		})}, 100)
		 
	}

	componentDidMount() {
		 this.BookListService.getBooksListener(this.snapFunc)
	}

	render() {
		const {book_year} = this.props;
		const {list} = this.state;
		const sorted_books = list.sort((a, b) => {
			if (a.title > b.title) return 1;
			return -1
		})
		const books = sorted_books.map((el) => { return <BookItem {...el} />});

		return (
			<div key={`${book_year}uniq`} className="card border-primary mb-3">
			  <h4 className="card-title card-header">{!book_year ? 'Книги без указания года' : book_year}</h4>
			  <div className="card-body card-year">
			   	<ul>
						{books}
					</ul>
			  </div>
			</div>
		)
	}

}