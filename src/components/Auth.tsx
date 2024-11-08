import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, isValidDomain } from '../firebase';
import '../styles/auth.css';

const Auth = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        hd: 'apkappa.it'
      });
      
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;
      
      if (!email || !isValidDomain(email)) {
        await auth.signOut();
        alert('È necessario utilizzare un account @apkappa.it');
        return;
      }
      
      navigate('/');
    } catch (error: any) {
      console.error('Errore durante il login:', error);
      alert('Errore durante il login. Assicurati di utilizzare un account @apkappa.it');
    }
  };

  return (
    <div className="split-container">
      <div className="login-section">
        <div className="logo">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#016BF8"/>
          </svg>
          <span>Interacta Organizer</span>
        </div>
        
        <h1>Accedi al tuo account</h1>
        <p className="signup-text">Non hai un account? <a href="#">Registrati</a></p>

        <div className="social-buttons">
          <button 
            className="social-button"
            onClick={handleGoogleLogin}
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid #dadce0',
              color: '#1f1f1f',
              fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
              fontWeight: '500',
              fontSize: '14px',
              letterSpacing: '0.25px',
              padding: '0 12px',
              height: '40px',
              minWidth: '100%',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continua con Google
          </button>
        </div>
        
        <div className="divider">oppure accedi con email</div>

        <form id="loginForm">
          <div className="form-group">
            <label htmlFor="email">Indirizzo email</label>
            <input 
              type="email" 
              id="email" 
              required 
              placeholder="nome@esempio.com"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              required 
              placeholder="Inserisci la tua password"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="social-button">
            Accedi
          </button>
        </form>
      </div>
      <div className="welcome-section">
        BENVENUTO IN<br/>INTERACTA ORGANIZER
      </div>
    </div>
  );
};

export default Auth;
