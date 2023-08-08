import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex pour valider l'email

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]]
    });
  }

  get emailControl() {
    return this.forgotPasswordForm.controls['email'];
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.emailControl.markAsTouched(); // Marquer le champ email comme touché pour afficher les erreurs
      return;
    }

    const email = this.forgotPasswordForm.value.email;
    this.auth.forgotPassword(email).subscribe(
      () => {
        this.forgotPasswordForm.reset();
      },
      (error) => {
        console.log('Error sending reset instructions:', error);
      }
    );
  }

  ngOnInit(): void {
  }
}