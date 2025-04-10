import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NewMomentComponent } from './components/pages/new-moment/new-moment.component';
import { MomentComponent } from './components/pages/moment/moment.component';
import { EditMomentComponent } from './components/pages/edit-moment/edit-moment.component';
import { UserLoginComponent } from './components/pages/user-login/user-login.component';
import { UserRegistrationComponent } from './components/pages/user-registration/user-registration.component';
import { AuthGuard } from './guards/auth.guard'; // <--- importar o guard

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }, // Protegido
  { path: 'about', component: AboutComponent },
  { path: 'moments/new', component: NewMomentComponent, canActivate: [AuthGuard] },
  { path: 'moments/edit/:id', component: EditMomentComponent, canActivate: [AuthGuard] },
  { path: 'moments/:id', component: MomentComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
