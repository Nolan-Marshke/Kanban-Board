import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error('Invalid login');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login Error', error);
    throw error;
  }
};

export { login };
