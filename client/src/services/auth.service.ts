import { loginRequest } from "../dto/request/login-request.dto";

export class AuthService {
  async login(loginRequest: loginRequest) {
    const response = await fetch(`http://localhost:8000/auth/signin`, {
      method: "post",
      body: JSON.stringify(loginRequest),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsed = await response.json();
    return parsed;
  }
  async signup(signUp: loginRequest) {
    const response = await fetch(`http://localhost:8000/auth/signup`, {
      method: "post",
      body: JSON.stringify(signUp),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const parsed = await response.json();
    return parsed;
  }
}
