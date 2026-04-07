import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="nav-brand-icon">🏠</div>
        <span>Buyer Portal</span>
      </div>
      <div className="nav-user">
        <div className="nav-user-info">
          <div className="nav-user-name">{user?.name}</div>
          <span className="nav-user-role">{user?.role}</span>
        </div>
        <button id="logoutBtn" className="btn-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
