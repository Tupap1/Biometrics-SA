import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
  const { loginWithRedirect } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogin = async () => {

    const returnTo = location.state?.from || "/";
    await loginWithRedirect({
      appState: { returnTo }
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
export default LoginPage