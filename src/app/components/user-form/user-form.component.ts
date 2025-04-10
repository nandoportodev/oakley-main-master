import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
    this.userForm = new FormGroup(
      {
        id: new FormControl(''),
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // Validação customizada no nível do formulário
  passwordsMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
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

  get confirmPassword() {
    return this.userForm.get('confirmPassword')!;
  }

  submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    // Remover o confirmPassword antes de enviar (opcional)
    const { confirmPassword, ...user } = this.userForm.value;

    this.onSubmit.emit(user);
  }
}
