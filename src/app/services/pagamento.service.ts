import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  // ATENÇÃO: Verifique se sua rota base no Node.js é '/pagamento'
  private apiUrl = 'http://localhost:3000/pagamento'; 

  constructor(private http: HttpClient) { }

  // 1. Busca lista de nomes para a tabela principal
  getPagantes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pagantes`);
  }

  // 2. Busca histórico de um cliente específico (para o Modal)
  getHistorico(idCliente: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/historico/${idCliente}`);
  }

  // 3. Adiciona um novo pagamento
  adicionarPagamento(pagamento: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, pagamento);
  }

  excluirPagamento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/apagar/${id}`);
  }
}