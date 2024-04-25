import { Link, Outlet } from "react-router-dom";
import { useStateContext } from "../ContextProvider.jsx";
import axios from 'axios';

export default function GuestLayout() {
  const { notification, setUser, setToken } = useStateContext();

  const onLogout = (e) => {
    e.preventDefault();

    axios.post("/logout").then(() => {
      setUser({});
      setToken(null);
    });
  };

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="#">Dashboard</Link>
        <Link to="#">Users (Role)</Link>
        <Link to="#">(Role) Permissions</Link>
        <Link to="#">Projects</Link>
        <Link to="#">Team</Link>
        <Link to="#">Testimonials</Link>
        <Link to="#">Contact</Link>
      </aside>

      <div className="content">
        <header>
          <div>Integr8 D.S Admin Panel</div>
          <div>
        
            <a href="#test" onClick={onLogout} className="btn-logout">
              Logout
            </a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>

      {/* this displays all notification at the bottom in our admin panel */}
      {notification && <div className="notification">{notification}</div>}
    </div>
  );
}
