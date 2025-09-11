import Header from "../../components/Header/Header";

export default function DashboardPage () {
    return (
        <div className="dashboard-page">
            <Header />

        <div className="dashboard-content p-4">
            <h1 className="text-3x1 font-bold">Dashboard</h1>
            <p>Aqui você acompanhar seus ciclos de Promodoro, progresso e estatísticas</p>
        </div>
        </div>
    );
}