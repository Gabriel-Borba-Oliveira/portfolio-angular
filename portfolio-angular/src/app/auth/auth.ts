import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private baseUrl = 'https://literate-space-couscous-jj6gqgw7vgvrf5pvx-8000.app.github.dev';
  private loginUrl = `${this.baseUrl}/api/login.php`;
  private logoutUrl = `${this.baseUrl}/api/logout.php`;
  private verificarUrl = `${this.baseUrl}/api/verificar_login.php`; // ← use baseUrl

  private loggedIn = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedIn.asObservable();

  // ─── NOVO: controla se a verificação já foi feita ───
  private sessaoVerificada = new BehaviorSubject<boolean>(false);
  public sessaoVerificada$ = this.sessaoVerificada.asObservable();

  login(login: string, senha: string): Observable<any> {
    return this.http.post(this.loginUrl, { login, senha }, { withCredentials: true }).pipe(
      tap((res: any) => {
        if (res.sucesso) {
          this.loggedIn.next(true);
          this.sessaoVerificada.next(true);
        }
      })
    );
  }

  logout(): void {
    this.http.post(this.logoutUrl, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

verificarSessao(): Observable<any> {
  console.log('🔄 Verificando sessão... URL:', this.verificarUrl);
  return this.http.get(this.verificarUrl, { withCredentials: true }).pipe(
    tap({
      next: (res: any) => {
        console.log('✅ Resposta da verificação:', res);
        this.loggedIn.next(res.logado === true);
        this.sessaoVerificada.next(true);
        console.log('📌 loggedIn agora é:', this.loggedIn.value);
      },
      error: (err) => {
        console.error('❌ Erro na verificação:', err);
        this.loggedIn.next(false);
        this.sessaoVerificada.next(true);
      }
    })
  );
}

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }
}