import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  // Verifique se no app.js você definiu: app.use('/horarios', ...)
  // Se for '/horario' (sem S), ajuste aqui embaixo:
  private apiUrl = 'http://localhost:3000/horarios'; 

  constructor(private http: HttpClient) { }

  // Pega a lista já agrupada
  getHorarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  // Pega lista simples de funcionários para o dropdown
  getFuncionariosDropdown(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/funcionarios`);
  }

  adicionarHorario(dados: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, dados);
  }
}