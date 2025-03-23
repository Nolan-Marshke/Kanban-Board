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
    
  }
  
  isTokenExpired(token: string) {
    
  }

  getToken(): string {
    
  }

  login(idToken: string) {
    e
  }

  logout() {
    
}

export default new AuthService();
