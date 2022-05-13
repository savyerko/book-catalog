import React from 'react';

import BookListService from '../../services/book-list-service'

import './best-book.css';

export default class BestBook extends React.Component {
	
	state = {
		book: null,
	}

	BookListService = new BookListService();

	getBooks = this.BookListService.getBooks;

	componentDidMount() {
		this.getBooks().then((books) => {
			const actual_year = +(new Date().getFullYear()) - 3;

			const books_rate = books.map((book) => book.rate);
			const rate_set = new Set(books_rate);
			const rate_arr = Array.from(rate_set);
			rate_arr.pop();

			const max_rate = Math.max(...rate_arr);

			const books_filtred = books.filter((book) => {
				return book.pub_year <= actual_year && book.rate == max_rate
			});

			const best_book = books_filtred[Math.floor(Math.random() * books_filtred.length)];

			this.setState(({book}) => {
				return {book: best_book}
			})
		})
	}

	render() {
		const {book} = this.state;

		if(this.state.book) {
			return ( 
				<div className="card bg-light mb-3">
				  <div className="card-header">Рекомендуемая книга</div>
				  <div className="card-body">
				  	<div className='card-image'>
				  		<img src={book.image ? book.image : 'https://firebasestorage.googleapis.com/v0/b/book-list-test-5d682.appspot.com/o/no_photo_2.png?alt=media&token=3a8bad61-543c-4ff8-a984-5d8f03436b03'} alt="Изображение отсутствует"/>
				  	</div>
				    <h4 className="card-title">{book.title}</h4>
				    <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
				    <p>
				    	Год: <span>{book.pub_year}</span>
				    </p>
				    <p>
				    	ISBN: <span>{book.isbn}</span>
				    </p>
				  </div>
				</div>
			)
		} else {
			return (
				<span>Loading</span>
			)
		}
	}
}