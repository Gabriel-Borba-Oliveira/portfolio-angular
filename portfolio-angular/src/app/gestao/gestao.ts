import { Component, inject, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjetoService, Projeto } from '../projeto.service';
import { Router } from '@angular/router';                 // ← NOVO
import { AuthService } from '../auth/auth';      // ← NOVO

@Component({
  selector: 'app-gestao',
  imports: [ReactiveFormsModule],
  templateUrl: './gestao.html',
  styleUrl: './gestao.css',
})
export class Gestao implements OnInit {
  private service = inject(ProjetoService);
  private cdr = inject(ChangeDetectorRef);
  private zone = inject(NgZone);
  private router = inject(Router);      // ← NOVO
  private auth = inject(AuthService);   // ← NOVO

  projetos: Projeto[] = [];
  carregando = true;
  erro = '';

  editandoId: number | null = null;
  salvando = false;

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    descricao: new FormControl(''),
    tecnologias: new FormControl(''),
    link_github: new FormControl(''),
    ano: new FormControl(2026, [Validators.required]),
    status: new FormControl('rascunho', [Validators.required])
  });

  ngOnInit() {
    // ─── VERIFICAÇÃO DE AUTENTICAÇÃO ───
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    // ─── FIM DA VERIFICAÇÃO ───
    this.carregar();
  }

  carregar() {
    this.erro = '';
    this.carregando = true;
    this.service.listar(true).subscribe({
      next: (lista) => {
        this.zone.run(() => {
          this.projetos = lista;
          this.carregando = false;
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.zone.run(() => {
          this.erro = 'Nao foi possivel carregar os projetos.';
          this.carregando = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  editar(p: Projeto) {
    this.editandoId = p.id ?? null;
    this.form.patchValue(p);
    this.cdr.detectChanges();
  }

  salvar() {
    this.erro = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.cdr.detectChanges();
      return;
    }
    this.salvando = true;
    const dados = this.form.value as Projeto;

    const requisicao = this.editandoId
      ? this.service.atualizar(this.editandoId, dados)
      : this.service.criar(dados);

    requisicao.subscribe({
      next: () => {
        this.zone.run(() => {
          this.salvando = false;
          this.editandoId = null;
          this.form.reset({ status: 'rascunho', ano: 2026 });
          this.carregar();
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.zone.run(() => {
          this.salvando = false;
          this.erro = 'Nao foi possivel salvar. Tente de novo.';
          this.cdr.detectChanges();
        });
      }
    });
  }

  excluir(p: Projeto) {
    if (!p.id) return;
    if (!confirm(`Excluir o projeto "${p.nome}"? Esta ação não pode ser desfeita.`)) return;

    this.service.excluir(p.id).subscribe({
      next: () => {
        this.zone.run(() => {
          this.projetos = this.projetos.filter(x => x.id !== p.id);
          if (this.editandoId === p.id) {
            this.editandoId = null;
            this.form.reset({ status: 'rascunho', ano: 2026 });
          }
          this.cdr.detectChanges();
        });
      },
      error: () => {
        this.zone.run(() => {
          this.erro = 'Nao foi possivel excluir. Tente de novo.';
          this.cdr.detectChanges();
        });
      }
    });
  }

  // ─── MÉTODO DE LOGOUT ───
  logout() {
    this.auth.logout();
  }
  // ─── FIM ───
}