import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  
 // Aqui você coloca o endereço do seu backend (Node.js)
  // Como você ainda vai configurar o backend para JSON, vamos deixar apontado:
private apiUrl = 'http://localhost:3000/funcionario/listar';

  constructor(private http: HttpClient) { }

  // Função que busca a lista de funcionários
  getFuncionarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Adicione esse método dentro da classe do Service
adicionarFuncionario(funcionario: any): Observable<any> {
  // Ajuste a URL se a sua rota for diferente de /funcionario/add
  return this.http.post('http://localhost:3000/funcionario/add', funcionario);
}

}
