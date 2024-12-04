import React, { Fragment,useState } from 'react';
import './Create.css';
import Header from '../../components/Header/Header'; 
import { db } from '../../firebase/config';
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Create ({addPost}) {

  const navigate = useNavigate();

  const [product,setProduct] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [img,setImg] = useState(null);
  const [error, setError] = useState(''); 
  const [imageUrl, setImageUrl] = useState(''); // To store uploaded image URL

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');

    if (!product || !category || !price || !img) {
      setError('All fields are required.');
      return;
    }

    console.log(process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
console.log(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
    
    try{

      const data = new FormData();
      data.append('file',img);
      data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
      data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

      const resImg = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: data,
      });

      const uploadedImage = await resImg.json();

    if (!resImg.ok) {
      throw new Error(uploadedImage.error?.message || 'Image upload failed');
    }

    const imageUrl = uploadedImage.secure_url;
      setImageUrl(imageUrl);

      // Store product details in Firestore
      const productId = new Date().getTime().toString(); // Example unique ID
      const productRef = doc(db, 'products', productId);
      const newPost = {
        pid: productId,
        productName: product,
        category,
        price: parseFloat(price),
        imageUrl,
        createdAt: new Date().toISOString(),
      };

      await setDoc(productRef, newPost);

      // Add post to global state
      addPost(newPost);

     // Reset form
     setProduct('');
     setCategory('');
     setPrice('');
     setImg(null);
     setImageUrl('');
     
     navigate('/')
    }catch(error){
      setError(error.message || 'An error occurred.');
    }
  }

  return (
    <Fragment>
      <Header />
        <div className="centerDiv">
          <form onSubmit={handleCreate}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              value={product}
              onChange={(e)=> setProduct(e.target.value)}
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" value={price}
              onChange={(e)=> setPrice(e.target.value)} type="number" id="fname" name="Price" />
            <br />
            <label htmlFor="image">Image</label>
          <br />
          <input
            type="file"
            id="image"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <br />
          <button className="uploadBtn" type="submit">
            Upload and Submit
          </button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        {imageUrl && (
          <div>
            <p>Uploaded Image:</p>
            <img src={imageUrl} alt="Uploaded" width="200px" height="200px" />
          </div>
        )}
        </div>
    </Fragment>
  );
};

export default Create;