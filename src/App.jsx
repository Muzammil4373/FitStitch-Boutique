import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingControls from './components/FloatingControls.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Contact from './pages/Contact.jsx';
import BusinessPartner from './pages/BusinessPartner.jsx';
import StaticPage from './pages/StaticPage.jsx';
import {
  faqs,
  shippingPolicy,
  returnPolicy,
  privacyPolicy,
  termsAndConditions,
} from './data/staticContent.js';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen key="loader" />}</AnimatePresence>

      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/business-partner" element={<BusinessPartner />} />
          <Route path="/faqs" element={<StaticPage {...faqs} />} />
          <Route path="/shipping-policy" element={<StaticPage {...shippingPolicy} />} />
          <Route path="/return-policy" element={<StaticPage {...returnPolicy} />} />
          <Route path="/privacy-policy" element={<StaticPage {...privacyPolicy} />} />
          <Route path="/terms" element={<StaticPage {...termsAndConditions} />} />
        </Routes>
      </main>
      <Footer />
      <FloatingControls />
    </>
  );
}
