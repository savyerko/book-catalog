import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, addDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL, getStorage, deleteObject} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCnd5l-12rLmRm5IuEIJODtBABssSwMp2U",
  authDomain: "book-list-test-5d682.firebaseapp.com",
  projectId: "book-list-test-5d682",
  storageBucket: "book-list-test-5d682.appspot.com",
  messagingSenderId: "282556938870",
  appId: "1:282556938870:web:f60b521fe71f556a3dfd57"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const booksCollection = collection(db, 'books');
const storage = getStorage(app);

export default class BookListService {

	getBooks = async () => {
		const book_docs = await getDocs(booksCollection);

		const books = book_docs.docs.map((doc) => ({
			...doc.data()
		}));

		return books;
	}

	getBooksListener = (func) => {

		return onSnapshot(booksCollection, func);
	};

	_getRandomIsbn = () => {
			return `978\-${Math.floor(Math.random() * 10)}\-${Math.floor(Math.random() * 500)}\-${Math.floor(Math.random() * 4000)}\-${Math.floor(Math.random() * 10)}`
		};

	addBook = async (e) => {
		e.preventDefault();

		const form = e.target.elements;
		const file = form.image.files[0];

		const {title, author, pub_year, rate, isbn} = form;

		if (file == null) {
			const book = {
				title: title.value,
				author: author.value,
				pub_year: +(pub_year.value),
				rate: +(rate.value) || 0,
				isbn: isbn.value || this._getRandomIsbn(), 
				image: ''
			};

			addDoc(booksCollection, book);
			return;
		}

		const imageRef = ref(storage, `${file.name}`);
		const snapshot = await uploadBytes(imageRef, file);
		const url = await getDownloadURL(snapshot.ref);

		const book = {
			title: title.value,
			author: author.value,
			pub_year: +(pub_year.value) || '',
			rate: +(rate.value) || 0,
			isbn: +(isbn.value) || this._getRandomIsbn(),
			image: url
		};

		addDoc(booksCollection, book)
	};

	deleteBook = async (id, imgRef) => {
		const bookRef = doc(db, 'books', id);

		if(imgRef) {
			const imageRef = ref(storage, imgRef);
			deleteObject(imageRef);
		}
	
		deleteDoc(bookRef);
	};

	updateBook = async (id, imag, e) => {
		const bookRef = doc(db, 'books', id);

		const form = e.target.elements;
		const file = form.image.files[0];

		const {title, author, pub_year, rate, isbn} = form;

		if (file == null) {
			const book = {
				title: title.value,
				author: author.value,
				pub_year: +(pub_year.value),
				rate: +(rate.value),
				isbn: isbn.value || this._getRandomIsbn(), 
			};

			updateDoc(bookRef, {...book});
			return;
		}

		if(imag) {
			const imageDel = ref(storage, imag);
			deleteObject(imageDel);
		}
		

		const imageRef = ref(storage, `${file.name}`);
		const snapshot = await uploadBytes(imageRef, file);
		const url = await getDownloadURL(snapshot.ref);

		const book = {
			title: title.value,
			author: author.value,
			pub_year: +(pub_year.value),
			rate: +(rate.value),
			isbn: isbn.value || this._getRandomIsbn(),
			image: url
		};

		updateDoc(bookRef, {...book});
	}
};