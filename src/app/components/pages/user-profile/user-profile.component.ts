import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../User';
import { CommonModule } from '@angular/common'; // Adicione isto

@Component({
  selector: 'app-user-profile',
  standalone: true, // Certifique-se que está como standalone
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [CommonModule], // Adicione isto
})
export class UserProfileComponent implements OnInit {
  user?: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }
}