import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      return jwtDecode(token) as JwtPayload;
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      
      if (!decoded.exp) return true;
      
      
      const expirationTime = decoded.exp * 1000; 
      const currentTime = Date.now();
      
      return expirationTime < currentTime;
    } catch (error) {
      console.error('Token verification error:', error);
      return true; 
    }
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    e
  }

  logout() {
    
}

export default new AuthService();
