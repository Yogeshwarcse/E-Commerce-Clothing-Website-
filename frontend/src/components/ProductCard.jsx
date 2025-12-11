import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../store/cartStore';

function ProductCard({ product }) {
  const add = useCart(s => s.add);

  const handleCreateOrder = (e) => {
    e.preventDefault();
    // Simple add to cart for now
    add({ product: product._id || product.id || 'unknown', quantity: 1, price: product.price, meta: product });
  };

  return (
    <div className="productCard">
      <Link to={`/products/${product._id}`}>
        <img src={product.images?.[0] || 'https://via.placeholder.com/200'} alt="" className="productCard__image" />
      </Link>

      <div className="productCard__info">
        <Link to={`/products/${product._id}`}>
          <div className="productCard__title">{product.title}</div>
        </Link>

        <div className="productCard__rating">
          <span className="productCard__stars">★★★★☆</span>
          <span className="productCard__count">1,234</span>
        </div>

        <div className="productCard__price">
          <sup>$</sup>{Math.floor(product.price)}<sup>{(product.price % 1).toFixed(2).substring(2)}</sup>
        </div>

        <div className="productCard__prime">
          FREE Delivery by Tomorrow
        </div>

        <button className="productCard__button" onClick={handleCreateOrder}>
          Add to Cart
        </button>
      </div >
    </div >
  );
}

export default ProductCard;
