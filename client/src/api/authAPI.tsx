import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to log in");
    }

    const data = await response.json();
    
    if (data.token) {
      localStorage.setItem("authToken", data.token);
      return data.token;
    } else {
      throw new Error("No token received");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export { login };