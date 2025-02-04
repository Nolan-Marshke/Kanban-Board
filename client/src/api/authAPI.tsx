import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error("Failed to log in");
    }

    const data = await response.json();
    
    const token = data.token;
    
    localStorage.setItem("authToken", token);
    console.log("Login successful");
    return token;
  } catch (error) {
    console.error("Login error:", error);
  }
};

export { login };
