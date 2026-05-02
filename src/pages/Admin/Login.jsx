import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, LogIn, AlertCircle } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import Logo from '../../components/Logo/Logo';
import styles from './Admin.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login: authLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authLogin(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.loginCard}
      >
        <div className={styles.loginHeader}>
          <div className={styles.logoWrapper}>
            <Logo variant="light" />
          </div>
          <h1>Admin Portal</h1>
          <p>Please sign in to manage your products</p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <div className={styles.inputWithIcon}>
              <User size={18} className={styles.inputIcon} />
              <input 
                type="text" 
                required
                className="form-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className={styles.inputWithIcon}>
              <Lock size={18} className={styles.inputIcon} />
              <input 
                type="password" 
                required
                className="form-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`btn btn-primary ${styles.loginBtn}`}
          >
            {loading ? (
              <span className="spinner" style={{ width: '20px', height: '20px' }} />
            ) : (
              <>
                <LogIn size={18} />
                Sign In
              </>
            )}
          </button>
        </form>
        
        <div className={styles.loginFooter}>
          <a href="/">Back to Website</a>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
