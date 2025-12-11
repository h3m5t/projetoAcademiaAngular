import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  // URL base da API
  private apiUrl = 'http://localhost:3000/funcionario';

  constructor(private http: HttpClient) { }

  // --- FUNÇÕES DE FUNCIONÁRIO ---

  getFuncionarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  adicionarFuncionario(funcionario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, funcionario);
  }

  editarFuncionario(id: number, funcionario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${id}`, funcionario);
  }

  excluirFuncionario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/apagar/${id}`);
  }

  // --- FUNÇÃO QUE ESTAVA FALTANDO (CARGOS) ---
  getCargos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cargos`);
  }
}