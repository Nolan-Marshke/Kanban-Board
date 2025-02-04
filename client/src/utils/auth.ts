import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  username: string;
  exp?: number;
}

class AuthService {
  private static TOKEN_KEY = 'auth_token';

  getProfile() {
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded;
      } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
      }
    }
    return null;
  }

  loggedIn() {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        const expirationTime = decoded.exp * 1000; // Convert to milliseconds
        return Date.now() >= expirationTime;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
    return true;
  }

  getToken(): string {
    return localStorage.getItem(AuthService.TOKEN_KEY) || '';
  }

  login(idToken: string) {
    localStorage.setItem(AuthService.TOKEN_KEY, idToken);
    window.location.href = '/';
  }

  logout() {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    window.location.href = '/login';
  }
}

export default new AuthService();