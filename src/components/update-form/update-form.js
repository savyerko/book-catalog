import React from 'react';

import BookListService from '../../services/book-list-service';

import './update-form.css';

const UpdateForm = ({onChangeView, book}) => {

	const {updateBook} = new BookListService();

	return (
		<form onSubmit={(e) => {
			e.preventDefault();
			updateBook(book.id, book.image, e);
			onChangeView();
		}}>
			<label htmlFor="title_book">Название</label>
			<input type="text" id="title_book" name="title" defaultValue={`${book.title}`} />

			<label htmlFor="author_book">Автор</label> 
			<input type="text" id="author_book" name="author" defaultValue={`${book.author}`} />

			<label htmlFor="year_book">Год публикации</label> 
			<input type="text" id="year_book" name="pub_year" defaultValue={`${book.pub_year}`} />

			<label htmlFor="rate_book">Рейтинг</label> 
			<input type="text" id="rate_book" name="rate" defaultValue={`${book.rate}`} />

			<label htmlFor="isbn_book">ISBN</label>
			<input type="text" id="isbn_book" name="isbn" defaultValue={`${book.isbn}`} />

			<label htmlFor="image_book">Изображение</label>
			<input type="file" id="image_book" name="image" />

			<button type="submit" className="btn btn-primary">Обновить</button>

		  <button className="btn btn-outline-dark" onClick={(e) => {
		  	e.preventDefault();
		  	onChangeView()}}>Закрыть форму</button>
		</form>
	)
}

export default UpdateForm;