import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="home-page">
      <Header />
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
