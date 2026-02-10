// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Bike from "./components/Bike";
import Footer from "./components/Footer";
import HeadlineCard from "./components/HeadlineCard";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";
import ProductPreview from "./components/ProductPreview";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminDashboard from "./components/AdminDashboard";

import { AuthProvider, useAuth } from "./context/AuthContext";

// Layout wrapper
const Layout = ({ children }) => (
  <>
    <main>{children}</main>
    <Footer />
  </>
);

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/SignUp" replace />; // redirect to signup if not logged in
  return children;
};

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // -------------------------
  // CART STATE (Persistent)
  // -------------------------
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // -------------------------
  // CART FUNCTIONS
  // -------------------------
  const addToCart = (product) => {
    const exist = cart.find(item => item.id === product.id);

    if (exist) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, qty: item.qty + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, qty: item.qty + 1 }
        : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <AuthProvider>
      <Router>

        <Navbar setSearchTerm={setSearchTerm} cartCount={cartCount} />

        <Routes>

          {/* HOME / BIKES (Protected) */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Hero />
                  <HeadlineCard />
                  <Bike
                    searchTerm={searchTerm}
                    setSelectedProduct={setSelectedProduct}
                    addToCart={addToCart}
                  />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* CART */}
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart
                  cart={cart}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                  removeItem={removeItem}
                />
              </Layout>
            }
          />

          {/* CHECKOUT */}
          <Route
            path="/checkout"
            element={
              <Layout>
                <Checkout cart={cart} setCart={setCart} />
              </Layout>
            }
          />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin"
            element={
              <Layout>
                <AdminDashboard cart={cart} />
              </Layout>
            }
          />

          {/* STATIC PAGES */}
          <Route path="/AboutUs" element={<Layout><AboutUs /></Layout>} />
          <Route path="/ContactUs" element={<Layout><ContactUs /></Layout>} />
          <Route path="/Signin" element={<Layout><Signin /></Layout>} />
          <Route path="/SignUp" element={<Layout><SignUp /></Layout>} />

        </Routes>

        {/* PRODUCT QUICK VIEW MODAL */}
        <ProductPreview
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
        />

      </Router>
    </AuthProvider>
  );
}

export default App;
