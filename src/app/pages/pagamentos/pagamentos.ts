import { Component } from '@angular/core';

@Component({
  selector: 'app-pagamentos',
  standalone: false,
  templateUrl: './pagamentos.html',
  styleUrl: './pagamentos.css',
})
export class Pagamentos {
pagamentos = [
    { id: 1, nome: 'João Silva', status: 'Pago' },
    { id: 2, nome: 'Maria Oliveira', status: 'Pendente' }
  ];
}
