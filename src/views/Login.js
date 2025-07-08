import "./views.css"
import LoginForm from "../components/LoginForm.js";
import { useState } from "react";
import AdminPage from "../components/AdminPage.js";

export default function Login() {
  const [LoginCredentials, setLoginCredentials] = useState(null);
  const [onLogin, setOnLogin] = useState(false);
  return (
    <div className="App-login-block">
      {!onLogin &&
      <>
        <h1>Administration Login</h1>
        <p>Please enter your credentials to log in.</p>
        <p>If you are not an administrator, please contact your system administrator.</p>
        <p>Note: This is a demo application. Please use 'Admin@gmail.com' for both username and password.</p>
        <LoginForm setOnLogin={setOnLogin} setLoginCredentials={setLoginCredentials} />
      </>}
      {onLogin &&
      <>
        <AdminPage loginCredentials={LoginCredentials} />
      </>
      }
    </div>
  );
}
