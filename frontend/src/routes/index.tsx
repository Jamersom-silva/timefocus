import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages//Login';
import RegisterPage from '../pages//Register';
import DashboardPage from '../pages//Dashboard';
import SubjectsPage from '../pages//Subjects';
import ReportsPage from '../pages//Reports';
import PomodoroPage from '../pages//Pomodoro';
import ExercisesPage from '../pages//Exercises';
import HomePage from '../pages//Home';
import ProfilePage from '../pages//ProfilePage';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 👇 Agora sua Home é a rota inicial */}
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/pomodoro" element={<PomodoroPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
