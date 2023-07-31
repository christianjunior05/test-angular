import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VerifyEmailComponent} from "./component/verify-email/verify-email.component";
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {ForgotPasswordComponent} from "./component/forgot-password/forgot-password.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {EntrepotUpdateComponent} from "./component/entrepot/entrepot-update/entrepot-update.component";

const routes: Routes = [
  {path: '', redirectTo : 'login', pathMatch: "full"},
  {path: 'login', component : LoginComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'verify-email', component : VerifyEmailComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},
  {
    path: 'update/:id',
    component: EntrepotUpdateComponent,
  },
  {
    path: 'detail/:id',
    component: EntrepotUpdateComponent,
  },
  {
    path: 'new',
    component: EntrepotUpdateComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

exports: [RouterModule]
})
export class AppRoutingModule { }
