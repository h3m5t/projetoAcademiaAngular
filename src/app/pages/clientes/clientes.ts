import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.html',
  styleUrl: './clientes.css',
})
export class Clientes {

  clientes = [
    { id: 1, nome: 'evelyn' },
    { id: 2, nome: 'fellype' },
    { id: 3, nome: 'nathalia' }
  ];
  
}
