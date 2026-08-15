import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContatoService, NovoContato } from './contato.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
    selector: 'app-contato',
    standalone: true,
    imports: [ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule],
    templateUrl: './contato.html',
})
export class Contato {
    private fb = inject(FormBuilder);
    private service = inject(ContatoService);
    private cdr = inject(ChangeDetectorRef); // ← injeta
    enviando = false; sucesso = ''; erro = '';

    form = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        mensagem: ['', [Validators.required, Validators.minLength(10)]],
    });

    onSubmit() {
        this.sucesso = ''; this.erro = '';
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        this.enviando = true;
        this.service.enviar(this.form.getRawValue() as NovoContato).subscribe({
            next: (resp) => {
                this.sucesso = resp.mensagem;
                this.form.reset();
                this.enviando = false;
            },
            error: () => {
                this.erro = 'Nao foi possivel enviar. Tente novamente.';
                this.cdr.detectChanges();
                this.enviando = false;
            },
        });
    }
}
