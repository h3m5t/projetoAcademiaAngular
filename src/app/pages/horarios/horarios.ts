import { Component } from '@angular/core';

@Component({
  selector: 'app-horarios',
  standalone: false,
  templateUrl: './horarios.html',
  styleUrl: './horarios.css',
})
export class Horarios {
horarios = [
    { id: 1, nome: 'Henrique', desc: 'Segunda a Sexta: 08:00 - 17:00' },
    { id: 2, nome: 'Erick', desc: 'Terça a Sábado: 13:00 - 22:00' }
  ];
}
