import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../User';
import { UserService } from '../../../services/user.service';
import { MessagesService } from '../../../services/messages.service';

@Component({
  selector: 'app-user-registration',
  standalone: false,
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  btnText = 'Registrar';

  constructor(
    private userService: UserService,
    private router: Router,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {}

  async registerHandler(user: User) {
    this.userService.registerUser(user).subscribe(
      (response) => {
        this.messagesService.add('Usuário registrado com sucesso!');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erro ao registrar usuário:', error);
      }
    );
  }
}