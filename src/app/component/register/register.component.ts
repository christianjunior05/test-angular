import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup; // Declare the FormGroup

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10) ]]
    });
  }

  ngOnInit(): void {
    this.initForm(); // Call the method to initialize the form
  }

  initForm() {
    // Initialize the FormGroup with form controls and validators
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10) ]]
    });
  }

  get formControls() {
    return this.registrationForm.controls;
  }

  register() {
    if (this.registrationForm.invalid) {
      alert('Please fill all required fields with valid data.');
      return;
    }

    const password = this.registrationForm.get('password')?.value;
    const confirm_password = this.registrationForm.get('confirm_password')?.value;

    if (password !== confirm_password) {
      alert('Les mots de passes ne correspondent pas');
      return;
    }

    const email = this.registrationForm.get('email')?.value;

    this.auth.register(email, password);

    this.registrationForm.reset();
  }

}