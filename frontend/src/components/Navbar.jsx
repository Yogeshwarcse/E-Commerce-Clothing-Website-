import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../store/cartStore';
import '../styles/header.css';

// Simple SVG Icons to avoid external deps if possible, or use text if simple
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="#111"><path d="M0 0h24v24H0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 12 7.01 12 9.5 9.99 14 9.5 14z" /></svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 24 24" width="28" fill="#fff"><path d="M0 0h24v24H0z" fill="none" /><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.42l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
);

export default function Navbar() {
  const items = useCart(s => s.items);
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (term.trim()) {
      navigate(`/products?q=${encodeURIComponent(term)}`);
    }
  };

  return (
    <div className="header">
      {/* Logo */}
      <Link to="/">
        <div className="header__logo">
          {/* Placeholder for Amazon-like logo. Using text for now if image missing */}
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white' }}>SHOPIFY</span>
        </div>
      </Link>

      {/* Location (Fake) */}
      <div className="header__location">
        <span>Deliver to</span>
        <span>India</span>
      </div>

      {/* Search Bar */}
      <form className="header__search" onSubmit={handleSearch}>
        <select className="header__searchSelect">
          <option>All</option>
          <option>Men</option>
          <option>Women</option>
        </select>
        <input
          className="header__searchInput"
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <button className="header__searchIcon" type="submit">
          <SearchIcon />
        </button>
      </form>

      {/* Right Nav */}
      <div className="header__nav">
        {/* Sign In */}
        <Link to="/login">
          <div className="header__option">
            <span className="header__optionLineOne">Hello, sign in</span>
            <span className="header__optionLineTwo">Account & Lists</span>
          </div>
        </Link>

        {/* Returns */}
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        {/* Cart */}
        <Link to="/cart">
          <div className="header__optionBasket">
            <CartIcon />
            <span className="header__optionLineTwo header__basketCount">
              {items.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
