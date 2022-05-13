import React from 'react';

import BookListService from '../../services/book-list-service';
import UpdateForm from '../update-form';

import './book-item.css';

export default class BookItem extends React.Component {

	state = {
		view_flag: false
	};

	onChangeView = () => {
		this.setState(({view_flag}) => {
			return {
				view_flag: !view_flag
			}
		})
	}

	BookListService = new BookListService();

	delBook = this.BookListService.deleteBook;

	render() {
		const {id, title, author, isbn, rate, image} = this.props;

			return (
				<li key={`${id}`}>{this.state.view_flag ? (<UpdateForm onChangeView={ this.onChangeView } book={this.props}/>)
					: (<div className="card">
					  <div className="card-body card-elem">
					  	<div className='card-image'>
					  		<img src={image ? image : 'https://firebasestorage.googleapis.com/v0/b/book-list-test-5d682.appspot.com/o/no_photo_2.png?alt=media&token=3a8bad61-543c-4ff8-a984-5d8f03436b03'} alt="Изображение отсутствует"/>
					  	</div>
					  	<div className='card-details'>
					  		<h5 className="card-title">{title}</h5>
						    <h6 className="card-subtitle mb-2 text-muted">{author}</h6>
						    <a className="card-link">Рейтинг: {rate} из 10</a>
						    <a className="card-link">ISBN: {isbn}</a>
						    <button type="button" className="btn btn-danger" onClick={(e) => { this.delBook(id, image) }}>Удалить</button>
						    <button type="button" className="btn btn-outline-primary" onClick={(e) => {
						    	e.preventDefault();
						    	this.onChangeView()
						    }}>Обновить данные</button>
					  	</div>
					  </div>
					</div>)
				}
				</li>
			)
	}
}