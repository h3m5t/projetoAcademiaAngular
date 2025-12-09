import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-horarios',
  standalone: false,
  templateUrl: './horarios.html',
  styleUrls: ['./horarios.css']
})
export class Horarios implements OnInit {

  listaHorarios: any[] = [];      // Lista agrupada para exibir
  listaFuncionarios: any[] = [];  // Lista para o dropdown

  novoHorario = {
    mat: '',
    dia: 'Segunda-feira',
    inicio: '',
    fim: ''
  };

  constructor(private horarioService: HorarioService) { }

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    // 1. Carrega os horários
    this.horarioService.getHorarios().subscribe(
      (dados) => this.listaHorarios = dados,
      (erro) => console.error(erro)
    );

    // 2. Carrega os funcionários para o select
    this.horarioService.getFuncionariosDropdown().subscribe(
      (dados) => this.listaFuncionarios = dados,
      (erro) => console.error(erro)
    );
  }

  salvar() {
    this.horarioService.adicionarHorario(this.novoHorario).subscribe(
      () => {
        alert('Horário adicionado!');
        this.carregarDados(); // Atualiza a tela
        // Limpa campos (opcional)
        this.novoHorario.inicio = '';
        this.novoHorario.fim = '';
      },
      (erro) => alert('Erro ao salvar.')
    );
  }
}