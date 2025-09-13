import { useNavigate } from "react-router-dom";
// import Logo from "../../assets/logo.png"; // exemplo, se tiver um logo

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-between p-4 bg-gray-100 shadow">
           
          {/*
<div className="logo">
    <img src={Logo} alt="TimeFocus Logo" className="h-10" />
</div>
*/}


            {/* Botões de navegação */}
            <nav className="flex gap-2">
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Registro</button>
                <button onClick={() => navigate("/dashboard")}>Dashboard</button>
                <button onClick={() => navigate("/pomodoro")}>Pomodoro</button>
                <button onClick={() => navigate("/exercises")}>Exercises</button>
                <button onClick={() => navigate("/reports")}>Reports</button>
                <button onClick={() => navigate("/subjects")}>Subjects</button>
                <button onClick={() => navigate("/profile")}>profile</button>
            </nav>
        </header>
    );
}
