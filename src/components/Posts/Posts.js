import React,{useState, useEffect} from 'react';

import Heart from '../../assets/Heart';
import './Posts.css';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

function Posts() {
  const [products, setProducts] = useState([]);

  // Default products
  const defaultProducts = [
    {
      id: 1,
      productName: 'YAMAHA R15V3',
      category: 'Two Wheeler',
      price: 250000,
      imageUrl: '../../../Images/R15V3.jpg',
      createdAt: 'Tue May 04 2021',
    },
  ];

  useEffect(() => {
    // Fetch products from Firestore
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const fetchedProducts = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts([...defaultProducts, ...fetchedProducts]); // Merge default and fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
        {products.map((product) => (
          <div
            className="card"
            key={product.id} >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageUrl} alt={product.productName} />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.productName}</p>
            </div>
            <div className="date">
              <span>{new Date(product.createdAt).toDateString()}</span>
            </div>
          </div>
            ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {products.map((product) => (
          <div className="card"  key={product.id}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
            <img src={product.imageUrl} alt={product.productName} />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.productName}</p>
            </div>
            <div className="date">
              <span>{new Date(product.createdAt).toDateString()}</span>
            </div>
          </div>
         ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;