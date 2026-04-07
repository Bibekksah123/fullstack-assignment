import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterForm() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="registerForm" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="registerName">Full Name</label>
        <input
          type="text"
          id="registerName"
          className="form-input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="registerEmail">Email</label>
        <input
          type="email"
          id="registerEmail"
          className="form-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="registerPassword">Password</label>
        <input
          type="password"
          id="registerPassword"
          className="form-input"
          placeholder="Min 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <button type="submit" id="registerSubmitBtn" className="btn-submit" disabled={loading}>
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
      {error && <p className="form-error">{error}</p>}
    </form>
  );
}
