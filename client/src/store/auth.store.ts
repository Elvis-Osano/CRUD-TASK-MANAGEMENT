import { loginRequest } from "./../dto/request/login-request.dto";
import { AuthService } from "./../services/auth.service";
import { makeAutoObservable } from "mobx";
export class AuthStore {
  private authenticated = false;
  constructor(private readonly AuthService: AuthService) {
    makeAutoObservable(this);
    this.authenticated = !!this.getAccessToken();
  }
  isAuthenticated() {
    return this.authenticated;
  }
  async login(loginRequest: loginRequest) {
    try {
      const tokenPayload = await this.AuthService.login(loginRequest);
      localStorage.setItem("token", tokenPayload.accessToken);
      this.setAuth(true);
    } catch (error) {
      this.setAuth(false);
    }
  }
  async signup(signUp: loginRequest) {
    if (this.authenticated) {
      const res = await this.AuthService.signup(signUp);
      console.log(res);
    }
  }

  private setAuth(authenticated: boolean) {
    this.authenticated = authenticated;
  }
  getAccessToken() {
    return localStorage.getItem("token");
  }
}
