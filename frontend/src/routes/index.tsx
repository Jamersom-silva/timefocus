import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import DashboardPage from '../pages/Dashboard';
import SubjectsPage from '../pages/Subjects';
import ReportsPage from '../pages/Reports';
import PomodoroPage from '../pages/Pomodoro';
import ExercisesPage from '../pages/Exercises';
import HomePage from '../pages/Home';
import ProfilePage from '../pages/ProfilePage';
import FeaturesPage from '../pages/Features';
import ContactPage from '../pages/Contact';
import AboutPage from '../pages/About';
import PricingPage from '../pages/Pricing'
import ArticlesPage from '@/pages/Articles';
import CommunityPage from '@/pages/Community';
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 👇 Agora sua Home é a rota inicial */}
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element = {<LoginPage />} />
        <Route path="/register" element = {<RegisterPage />} />
        <Route path="/dashboard" element = {<DashboardPage />} />
        <Route path="/exercises" element = {<ExercisesPage />} />
        <Route path="/pomodoro" element = {<PomodoroPage />} />
        <Route path="/reports" element = {<ReportsPage />} />
        <Route path="/subjects" element = {<SubjectsPage />} />
        <Route path="/profile" element = {<ProfilePage />} />
        <Route path="/features" element = {<FeaturesPage />} />
        <Route path="/Contact" element = {<ContactPage /> } />
        <Route path="/About" element = {<AboutPage />} />
        <Route path="/Pricing" element = {<PricingPage />} />
        <Route path="/Articles" element = {<ArticlesPage />} />
        <Route path="/Community" element = {<CommunityPage />} />
      </Routes>
    </BrowserRouter>
  );
}
