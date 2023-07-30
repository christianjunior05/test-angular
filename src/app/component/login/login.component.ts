import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private auth: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.invalid) {
      alert('Please enter valid email and password');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password);

    this.loginForm.reset();
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
