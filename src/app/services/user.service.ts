import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor() { }

  registerUser(user: User): void {
    this.users.push(user);
    // Here you can add logic to save the user to a backend or local storage
  }

  getUsers(): User[] {
    return this.users;
  }
}