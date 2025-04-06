import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true, // se for standalone
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  imports: [CommonModule, ReactiveFormsModule] // IMPORTAÇÕES NECESSÁRIAS AQUI
})
export class UserLoginComponent {
  loginForm: FormGroup;
  message: string = '';
showSuccessModal: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.message = 'Preencha todos os campos corretamente.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.http.post<any>('http://localhost:3000/api/users/login', { email, password }).subscribe({
      next: (res) => {
        this.message = 'Login realizado com sucesso!';

        // Exibir a mensagem por 2 segundos antes de redirecionar
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        this.message = err.error?.error || 'Erro ao fazer login.';
      }
    });
  }
}
