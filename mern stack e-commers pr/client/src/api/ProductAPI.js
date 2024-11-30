import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductAPI = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get('/api/product');
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {products.map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductAPI;
