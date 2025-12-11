import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/products.css';

import api from '../api/axios';

function Products() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchTerm = query.get('q');
  const categoryFilter = query.get('category');

  // State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = '/products';
        // Simple query param handling - adjust based on your backend API capabilities
        if (searchTerm) url += `?search=${searchTerm}`;
        else if (categoryFilter) url += `?category=${categoryFilter}`;

        const response = await api.get(url);
        setProducts(response.data.products || response.data); // Adjust based on actual API response structure
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, categoryFilter]);

  return (
    <div className="productsPage">
      {/* Sidebar */}
      <div className="productsPage__left">
        <div className="productsPage__filterSection">
          <div className="productsPage__filterHeader">Delivery Day</div>
          <div className="productsPage__filterItem">
            <input type="checkbox" /> Get It by Tomorrow
          </div>
        </div>

        <div className="productsPage__filterSection">
          <div className="productsPage__filterHeader">Department</div>
          <div className="productsPage__filterItem">Men's Clothing</div>
          <div className="productsPage__filterItem">Women's Clothing</div>
          <div className="productsPage__filterItem">Electronics</div>
        </div>

        <div className="productsPage__filterSection">
          <div className="productsPage__filterHeader">Price</div>
          <div className="productsPage__filterItem">Under $25</div>
          <div className="productsPage__filterItem">$25 to $50</div>
          <div className="productsPage__filterItem">$50 to $100</div>
          <div className="productsPage__filterItem">$100 & Above</div>
        </div>

        <div className="productsPage__filterSection">
          <div className="productsPage__filterHeader">Avg. Customer Review</div>
          <div className="productsPage__filterItem">★★★★☆ & Up</div>
          <div className="productsPage__filterItem">★★★☆☆ & Up</div>
        </div>
      </div>

      {/* Results */}
      <div className="productsPage__right">
        <div className="productsPage__resultsHeader">
          <span>
            {searchTerm ? `Results for "${searchTerm}"` : 'All Products'}
          </span>
          <select style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd' }}>
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Avg. Customer Review</option>
          </select>
        </div>

        <div className="productsPage__grid">
          {loading && <p>Loading products...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && products.length === 0 && <p>No products found.</p>}
          {!loading && !error && products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
