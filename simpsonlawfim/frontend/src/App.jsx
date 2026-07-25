import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './admin/AuthContext';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import PracticeAreas from './pages/PracticeAreas';
import PracticeAreaPage from './pages/PracticeAreaPage';
import About from './pages/About';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import RequestCallBack from './pages/RequestCallBack';
import CommunityInvolvement from './pages/CommunityInvolvement';
import StaticPage from './pages/StaticPage';

import AdminLayout from './admin/AdminLayout';
import LoginPage from './admin/LoginPage';
import Dashboard from './admin/Dashboard';
import PracticeAreasAdmin from './admin/PracticeAreasAdmin';
import PracticeAreaForm from './admin/PracticeAreaForm';
import TeamAdmin from './admin/TeamAdmin';
import TeamForm from './admin/TeamForm';
import TestimonialsAdmin from './admin/TestimonialsAdmin';
import TestimonialForm from './admin/TestimonialForm';
import InquiriesAdmin from './admin/InquiriesAdmin';
import OfficesAdmin from './admin/OfficesAdmin';
import OfficeForm from './admin/OfficeForm';
import PagesAdmin from './admin/PagesAdmin';
import PageForm from './admin/PageForm';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ProtectedRoute() {
  const auth = useAuth();
  if (!auth) return null;
  if (!auth.authenticated) return <Navigate to="/admin/login" replace />;
  return <AdminLayout />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/practice-areas" element={<PracticeAreas />} />
            <Route path="/practice-areas/:slug" element={<PracticeAreaPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-a-call-back" element={<RequestCallBack />} />
            <Route path="/community-involvement" element={<CommunityInvolvement />} />
            <Route path="/page/:slug" element={<StaticPage />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            element={<ProtectedRoute />}
          >
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/practice-areas" element={<PracticeAreasAdmin />} />
            <Route path="/admin/practice-areas/new" element={<PracticeAreaForm />} />
            <Route path="/admin/practice-areas/:id/edit" element={<PracticeAreaForm />} />
            <Route path="/admin/team" element={<TeamAdmin />} />
            <Route path="/admin/team/new" element={<TeamForm />} />
            <Route path="/admin/team/:id/edit" element={<TeamForm />} />
            <Route path="/admin/testimonials" element={<TestimonialsAdmin />} />
            <Route path="/admin/testimonials/new" element={<TestimonialForm />} />
            <Route path="/admin/testimonials/:id/edit" element={<TestimonialForm />} />
            <Route path="/admin/inquiries" element={<InquiriesAdmin />} />
            <Route path="/admin/offices" element={<OfficesAdmin />} />
            <Route path="/admin/offices/new" element={<OfficeForm />} />
            <Route path="/admin/offices/:id/edit" element={<OfficeForm />} />
            <Route path="/admin/pages" element={<PagesAdmin />} />
            <Route path="/admin/pages/new" element={<PageForm />} />
            <Route path="/admin/pages/:id/edit" element={<PageForm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
