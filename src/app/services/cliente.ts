import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // URL base (confirme se no app.js está app.use('/cliente', ...))
  private apiUrl = 'http://localhost:3000/cliente'; 

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  adicionarCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, cliente);
  }

  excluirCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/apagar/${id}`);
  }

  editarCliente(id: number, dados: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${id}`, dados);
  }
}