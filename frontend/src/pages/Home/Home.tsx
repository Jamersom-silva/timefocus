import Header from "../../components/Header/Header";

export default function HomePage() {
    return (
        <div className="home-page">
            <Header />
            <div className="body-home p-4">
                <h1 className="text-3xl font-bold">TimeFocus</h1>
                <p>Otimize seus estudos com métodos eficientes</p>
            </div>
        </div>
    );
}
