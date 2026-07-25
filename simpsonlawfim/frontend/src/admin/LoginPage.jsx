import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin');
    } catch {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] bg-paper-white border border-line rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="font-heading text-[1.5rem] text-ink">Simpson &amp; Simpson</h1>
          <span className="font-mono text-[0.72rem] text-slate tracking-[0.08em] uppercase">
            Admin Panel
          </span>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 text-[0.92rem] px-4 py-3 rounded-sm">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="username" className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-ink-soft block mb-1.5">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-line bg-transparent py-2.5 px-3 font-body text-[0.98rem] text-ink focus:outline-none focus:border-brass transition-colors rounded-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-mono text-[0.72rem] uppercase tracking-[0.06em] text-ink-soft block mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-line bg-transparent py-2.5 px-3 font-body text-[0.98rem] text-ink focus:outline-none focus:border-brass transition-colors rounded-sm"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-ink text-paper border-none py-3 px-7 font-semibold text-[0.95rem] rounded-sm cursor-pointer transition-colors hover:bg-ribbon disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
