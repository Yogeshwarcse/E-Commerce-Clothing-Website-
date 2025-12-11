import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="/images/hero-banner.png"
          alt="Amazon Fashion Hero"
        />

        {/* Row 1: Category Boxes */}
        <div className="home__row">
          <div className="home__card">
            <h2>Dresses</h2>
            <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="" className="home__cardImage" />
            <Link to="/products?category=dresses" className="home__cardLink">See more</Link>
          </div>

          <div className="home__card">
            <h2>Men's T-Shirts</h2>
            <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="" className="home__cardImage" />
            <Link to="/products?category=tshirts" className="home__cardLink">Shop now</Link>
          </div>

          <div className="home__card">
            <h2>Electronics</h2>
            <img src="https://images.unsplash.com/photo-1498049860654-af5a11528bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="" className="home__cardImage" />
            <Link to="/products?category=electronics" className="home__cardLink">View collection</Link>
          </div>

          <div className="home__card">
            <h2>Sign in for best experience</h2>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link to="/login">
                <button className="btn-primary" style={{ width: '100%' }}>Sign in securely</button>
              </Link>
            </div>
          </div>
        </div>

        {/* Row 2: More Categories */}
        <div className="home__row">
          <div className="home__card">
            <h2>Footwear</h2>
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="" className="home__cardImage" />
            <Link to="/products?category=footwear" className="home__cardLink">See more</Link>
          </div>
          <div className="home__card">
            <h2>Deals under $20</h2>
            <img src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="" className="home__cardImage" />
            <Link to="/products?price_lte=20" className="home__cardLink">Shop deals</Link>
          </div>
          <div className="home__card">
            <h2>New Arrivals</h2>
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" alt="" className="home__cardImage" />
            <Link to="/products?sort=newest" className="home__cardLink">See more</Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
