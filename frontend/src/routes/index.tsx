import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login/Login';
import RegisterPage from '../pages/Register/Register';
import DashboardPage from '../pages/Dashboard/Dashboard';
import SubjectsPage from '../pages/Subjects/Subjects';
import ReportsPage from '../pages/Reports/Reports';
import PomodoroPage from '../pages/Pomodoro/Pomodoro';
import ExercisesPage from '../pages/Exercises/Exercises';
import HomePage from '../pages/Home/Home';
import ProfilePage from '../pages/Profile/ProfilePage';



export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/exercises" element={<ExercisesPage />} />
        <Route path="/pomodoro" element= {<PomodoroPage/>}/>
        <Route path="/reports" element={<ReportsPage/>} />
        <Route path="/subjects" element={<SubjectsPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </BrowserRouter>
  );
}
