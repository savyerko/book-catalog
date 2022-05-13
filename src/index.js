import React from 'react';
import {createRoot} from 'react-dom/client';

import App from './components/app';

const root = createRoot(document.getElementById('root'));

root.render(<App/>);

// import React from 'react';
// import {createRoot} from 'react-dom/client';

// import { useState, useEffect } from "react";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   list,
//   getStorage
// } from "firebase/storage";

// import { initializeApp } from "firebase/app";
// const firebaseConfig = {
//   apiKey: "AIzaSyCnd5l-12rLmRm5IuEIJODtBABssSwMp2U",
//   authDomain: "book-list-test-5d682.firebaseapp.com",
//   projectId: "book-list-test-5d682",
//   storageBucket: "book-list-test-5d682.appspot.com",
//   messagingSenderId: "282556938870",
//   appId: "1:282556938870:web:f60b521fe71f556a3dfd57"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);

// function App() {
//   const [imageUpload, setImageUpload] = useState(null);
//   const [imageUrls, setImageUrls] = useState([]);

//   const imagesListRef = ref(storage);
//   const uploadFile = () => {
//     if (imageUpload == null) return;
//     const imageRef = ref(storage, `${imageUpload.name}`);
//     uploadBytes(imageRef, imageUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImageUrls((prev) => [...prev, url]);
//       });
//     });
//   };

//   useEffect(() => {
//     listAll(imagesListRef).then((response) => {
//       response.items.forEach((item) => {
//         getDownloadURL(item).then((url) => {
//           setImageUrls((prev) => [...prev, url]);
//         });
//       });
//     });
//   }, []);

//   return (
//     <div className="App">
//       <input
//         type="file"
//         onChange={(event) => {
//           setImageUpload(event.target.files[0]);
//         }}
//       />
//       <button onClick={uploadFile}> Upload Image</button>
//       {imageUrls.map((url) => {
//       	console.log(url)
//         return <img src={url} />;
//       })}
//     </div>
//   );
// }

// const root = createRoot(document.getElementById('root'));

// root.render(<App/>);




//------------------------------------------


// <h2>{this.state.books[0].title}</h2>
// <h3>{this.state.books[0].author}</h3>
// <span>{this.state.books[0].pub_year}</span>
// <img src={this.state.books[0].image} style={{width: 100, height: 200}} alt="7skills"/>