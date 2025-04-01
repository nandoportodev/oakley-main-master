import { Component } from '@angular/core';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  register() {
    if (this.password === this.confirmPassword) {
      // Logic for user registration goes here
      console.log('User registered:', this.username, this.email);
    } else {
      console.error('Passwords do not match');
    }
  }
}