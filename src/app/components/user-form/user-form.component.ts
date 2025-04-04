import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../User';


@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<User>();
  @Input() btnText!: string;
  @Input() userData: User | null = null;

  userForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  get name() {
    return this.userForm.get('name')!;
  }

  get email() {
    return this.userForm.get('email')!;
  }

  get password() {
    return this.userForm.get('password')!;
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }
    console.log(this.userForm.value);

    this.onSubmit.emit(this.userForm.value);
  }
}