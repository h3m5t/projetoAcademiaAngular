import { Component } from '@angular/core';

@Component({
  selector: 'app-funcionarios',
  standalone: false,
  templateUrl: './funcionarios.html',
  styleUrl: './funcionarios.css',
})
export class Funcionarios {
// Lista de funcionários fake para testar o visual
  funcionarios = [
    { id: 1, nome: 'Henrique' },
    { id: 2, nome: 'Erick' },
    { id: 3, nome: 'Evelyn' }
  ];
}
