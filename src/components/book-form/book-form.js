import React from 'react';

import './book-form.css';

import FormInput from '../form-input';
import BookListService from '../../services/book-list-service';

const BookForm = ({onChangeFlag}) => {

	const {addBook} = new BookListService();

	const checkInputs = (e) => {
		const form = e.target.elements;
		const {title, author, pub_year} = form;

		if(author.value === '' && title.value === '' && (+(pub_year.value) < 1800 && pub_year.value != '')) {
			title.classList.add('is-invalid');
			author.classList.add('is-invalid');
			pub_year.classList.add('is-invalid');
			pub_year.value = '';
			pub_year.placeholder = 'Год не раньше 1800';
			return true;
		} else if (author.value === '') {
			author.classList.add('is-invalid');
			return true;
		} else if (title.value === '') {
			title.classList.add('is-invalid');
			return true;
		} else if( +(pub_year.value) < 1800 && pub_year.value != '') {
			pub_year.classList.add('is-invalid');
			pub_year.value = '';
			pub_year.placeholder = 'Год не раньше 1800';
			return true;
		}
	}
	return (
		<div className='add-book-block'>
			<form className='book-form' onSubmit={(e) => {
				e.preventDefault();
				if (checkInputs(e)) return;
				addBook(e);
				onChangeFlag();
			}}>
				<h4>Книжный формуляр</h4>

				<FormInput label='Название' placeholder='Введите название книги' id='inputD' name='title' />

				<FormInput label='Авторы' placeholder='Введите имена аторов' id='inputDe' name='author'/>

				<FormInput label='Год публикации' placeholder='Введите год публикации книги' id='inputDef' name='pub_year' class_inp='form-year'/>

				<FormInput label='Рейтинг' placeholder='Введите рейтинг книги' id='inputDefa' name='rate' class_inp='form-rate'/>

				<FormInput label='Международный стандартный книжный номер (ISBN)' placeholder='Введите ISBN книги' id='inputDefau' name='isbn' />

				<div className="form-group">
		      <label htmlFor="formFile" className="form-label mt-4">Добавьте изображение книги</label>
		      <input className="form-control" name='image' type="file" id="formFile"/>
		    </div>

		    <button type="submit" className="btn btn-primary">Добавить книгу</button>

		    <button className="btn btn-outline-dark" onClick={(e) => {
		    	e.preventDefault();
		    	onChangeFlag()}}>Закрыть форму</button>
			</form>
		</div>
	)
}

export default BookForm; 