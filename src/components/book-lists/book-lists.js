import React from 'react';

import BookListService from '../../services/book-list-service'
import List from '../list';
import BestBook from '../best-book';

import './book-lists.css';

export default class BookLists extends React.Component {
	
	state = {
		book_years: [],
		book_data: []
	}

	BookListService = new BookListService();


	snapshotFunc = (snap) => {

			const years = snap.docs.map((doc) => {return doc.data().pub_year});
			const year_set = new Set(years);
			const pub_years = Array.from(year_set);
			

			this.setState(({book_years}) => {
			if(book_years.length != pub_years.length ){
					return { book_years: pub_years }
				}
			})

		
	}

	componentDidMount() {
		this.BookListService.getBooksListener(this.snapshotFunc)
	}

	render() {
		const {book_years} = this.state;

		const year_sorted = book_years.sort((a, b) => b - a);

		const mapped_books = year_sorted.map((year) => {return <List book_year={year} />});

		return (
			<div className="books-wrapper">
				<BestBook />
				{mapped_books}
			</div>
		)
	}
}