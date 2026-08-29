import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Projeto {
    id?: number;
    nome: string;
    descricao: string;
    tecnologias: string;
    link_github: string;
    ano: number;
    status: string;          // <-- NOVO campo
}

@Injectable({ providedIn: 'root' })
export class ProjetoService {
    private http = inject(HttpClient);
    private url = 'https://literate-space-couscous-jj6gqgw7vgvrf5pvx-8000.app.github.dev/api/projetos.php';

    listar(todos?: boolean): Observable<Projeto[]> {
        const params = todos ? '?todos=1' : '';
        return this.http.get<Projeto[]>(this.url + params);
    }

    criar(projeto: Projeto): Observable<{ id?: number; mensagem?: string }> {
        return this.http.post<{ id?: number; mensagem?: string }>(this.url, projeto);
    }

    atualizar(id: number, projeto: Projeto): Observable<{ id?: number; mensagem?: string }> {
        return this.http.put<{ id?: number; mensagem?: string }>(`${this.url}?id=${id}`, projeto);
    }

    excluir(id: number): Observable<void> {
        return this.http.delete<void>(`${this.url}?id=${id}`);
    }
}