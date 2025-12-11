import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useCart from '../store/cartStore';
import '../styles/product-details.css';

import api from '../api/axios';

function ProductDetails() {
  const { id } = useParams();
  const addItem = useCart(s => s.add);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({ product: product._id, size: selectedSize, quantity: 1, price: product.price, meta: product });
    }
  };

  if (loading) return <div className="productDetails">Loading...</div>;
  if (error) return <div className="productDetails" style={{ color: 'red' }}>{error}</div>;
  if (!product) return <div className="productDetails">Product not found</div>;

  return (
    <div className="productDetails">
      {/* Left Column: Images */}
      <div className="productDetails__left">
        <div className="productDetails__images">
          <div className="productDetails__thumbnailList">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className={`productDetails__thumbnail ${selectedImage === idx ? 'selected' : ''}`}
                onMouseEnter={() => setSelectedImage(idx)}
                alt=""
              />
            ))}
          </div>
          <img
            src={product.images[selectedImage]}
            className="productDetails__mainImage"
            alt="Main"
          />
        </div>
      </div>

      {/* Center Column: Info */}
      <div className="productDetails__center">
        <div className="productDetails__title">{product.title}</div>
        <div className="productDetails__brand">Visit the {product.brand} Store</div>

        <div className="productDetails__ratings">
          <span style={{ color: '#ffa41c', marginRight: 5 }}>★★★★☆</span>
          <span style={{ color: '#007185' }}> 14,500 ratings</span>
        </div>

        <div className="productDetails__price">
          <sup>$</sup>{Math.floor(product.price)}<sup>{(product.price % 1).toFixed(2).substring(2)}</sup>
        </div>

        <div className="productDetails__variations">
          <div className="productDetails__variationLabel">Size: {selectedSize}</div>
          <div className="productDetails__sizes">
            {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <div
                key={size}
                className={`productDetails__sizeOption ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        <div className="productDetails__bullets">
          <h3>About this item</h3>
          <ul>
            <li>100% Cotton</li>
            <li>Imported</li>
            <li>Machine Wash</li>
            <li>{product.description}</li>
            <li>Button closure</li>
          </ul>
        </div>
      </div>

      {/* Right Column: Buy Box */}
      <div className="productDetails__right">
        <div className="productDetails__buyBox">
          <div className="productDetails__buyBoxPrice">
            ${product.price.toFixed(2)}
          </div>
          <div className="productDetails__delivery">
            FREE delivery <strong>Tomorrow, Dec 12</strong>
          </div>
          <div className="productDetails__inStock">
            In Stock
          </div>

          <button className="productDetails__addToCartBtn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="productDetails__buyNowBtn">
            Buy Now
          </button>

          <div className="productDetails__secure">
            Secure transaction
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
