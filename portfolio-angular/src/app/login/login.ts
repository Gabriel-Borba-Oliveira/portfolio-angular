import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  erro = '';
  carregando = false;

  form = this.fb.group({
    login: ['', Validators.required],
    senha: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.carregando = true;
    this.erro = '';

    const login = this.form.value.login!;
    const senha = this.form.value.senha!;

    this.auth.login(login, senha).subscribe({
      next: (res: any) => {
        this.carregando = false;
        if (res.sucesso) {
          this.router.navigate(['/gestao']);
        } else {
          this.erro = res.mensagem || 'Credenciais inválidas';
        }
      },
      error: (err) => {
        this.carregando = false;
        this.erro = err.error?.mensagem || 'Erro de conexão com o servidor.';
      }
    });
  }
}