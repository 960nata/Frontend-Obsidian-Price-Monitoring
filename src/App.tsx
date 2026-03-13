import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/auth.store';
import { useGoogleAnalytics, trackPageView } from './hooks/useGoogleAnalytics';

// Public pages
import Landing from './pages/public/Landing';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Intelligence from './pages/public/Intelligence';
import Networks from './pages/public/Networks';
import API from './pages/public/API';
import Enterprise from './pages/public/Enterprise';
import Terminal from './pages/public/Terminal';
import Analytics from './pages/public/Analytics';
import Security from './pages/public/Security';
import Integration from './pages/public/Integration';
import Status from './pages/public/Status';
import About from './pages/public/About';
import Legal from './pages/public/Legal';
import Contact from './pages/public/Contact';

// Protected pages
import Dashboard from './pages/dashboard/Dashboard';
import Products from './pages/dashboard/Products';
import ProductDetail from './pages/dashboard/ProductDetail';
import Alerts from './pages/dashboard/Alerts';
import Settings from './pages/dashboard/Settings';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPricing from './pages/admin/AdminPricing';
import AdminAnalytics from './pages/admin/AdminAnalytics';

// Superadmin pages
import SuperadminDashboard from './pages/superadmin/SuperadminDashboard';
import SuperadminAdmins from './pages/superadmin/SuperadminAdmins';
import SuperadminBilling from './pages/superadmin/SuperadminBilling';

// Layout
import Layout from './components/layout/Layout';

const queryClient = new QueryClient();

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

// Component to track page views
function PageViewTracker() {
  const location = useLocation();
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const gaEnabled = import.meta.env.VITE_GA_ENABLED === 'true' && !!gaMeasurementId;

  useGoogleAnalytics(gaEnabled ? gaMeasurementId : undefined);

  React.useEffect(() => {
    if (gaEnabled) {
      trackPageView(location.pathname + location.search);
    }
  }, [location, gaEnabled]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <PageViewTracker />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/networks" element={<Networks />} />
          <Route path="/api" element={<API />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/security" element={<Security />} />
          <Route path="/integration" element={<Integration />} />
          <Route path="/status" element={<Status />} />
          <Route path="/about" element={<About />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <Layout>
                  <Products />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/products/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <ProductDetail />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <PrivateRoute>
                <Layout>
                  <Alerts />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Layout>
                  <Settings />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <AdminDashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute>
                <Layout>
                  <AdminUsers />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/pricing"
            element={
              <PrivateRoute>
                <Layout>
                  <AdminPricing />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <PrivateRoute>
                <Layout>
                  <AdminAnalytics />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Superadmin routes */}
          <Route
            path="/superadmin/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <SuperadminDashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/superadmin/admins"
            element={
              <PrivateRoute>
                <Layout>
                  <SuperadminAdmins />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/superadmin/billing"
            element={
              <PrivateRoute>
                <Layout>
                  <SuperadminBilling />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
