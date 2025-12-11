import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../../services/horario.service';

@Component({
  selector: 'app-horarios',
  standalone: false,
  templateUrl: './horarios.html',
  styleUrls: ['./horarios.css']
})
export class Horarios implements OnInit {

  // Dados
  listaHorarios: any[] = [];
  listaFuncionarios: any[] = [];

  // Variáveis de Mensagem
  msgSucesso: string = '';
  msgErro: string = '';

  // Controles
  horarioParaExcluir: any = null;

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

  limparMensagens() {
    this.msgSucesso = '';
    this.msgErro = '';
  }

  // Abre o popup central de mensagem
  abrirModalMensagem() {
    setTimeout(() => {
      document.getElementById('btnAbrirMensagem')?.click();
    }, 300);
  }

  carregarDados() {
    // 1. Carrega a lista de horários
    this.horarioService.getHorarios().subscribe(
      (dados) => this.listaHorarios = dados,
      (erro) => {
        console.error(erro);
        this.msgErro = 'Erro ao carregar escala.';
        this.abrirModalMensagem();
      }
    );

    // 2. Carrega a lista de funcionários para o Select
    this.horarioService.getFuncionariosDropdown().subscribe(
      (dados) => this.listaFuncionarios = dados,
      (erro) => console.error('Erro ao carregar funcionários', erro)
    );
  }

  prepararNovoHorario() {
    this.limparMensagens();
    this.novoHorario = {
      mat: '',
      dia: 'Segunda-feira',
      inicio: '',
      fim: ''
    };
  }

  salvar() {
    this.limparMensagens();

    this.horarioService.adicionarHorario(this.novoHorario).subscribe(
      () => {
        this.msgSucesso = 'Horário adicionado com sucesso!';
        this.carregarDados();
        
        // Fecha o modal de cadastro
        document.getElementById('btnFechar')?.click();
        
        // Abre o feedback de sucesso
        this.abrirModalMensagem();
      },
      (erro) => {
        console.error(erro);
        this.msgErro = 'Erro ao salvar horário.';
        this.abrirModalMensagem();
      }
    );
  }

  // 1. Botão de Lixeira chama este
  apagarHorario(turno: any) {
    this.limparMensagens();
    this.horarioParaExcluir = turno;
    // O HTML abre o modal #modalConfirmacaoHorario
  }

  // 2. Botão "Sim" do Modal chama este
  confirmarExclusao() {
    if (this.horarioParaExcluir) {
      // Usa o ID que configuramos no backend (id_horario_funcionario)
      this.horarioService.excluirHorario(this.horarioParaExcluir.id).subscribe(
        () => {
          this.msgSucesso = 'Horário removido!';
          this.carregarDados();
          
          // Fecha modal de confirmação
          document.getElementById('btnFecharConfirmacao')?.click();
          
          // Abre feedback de sucesso
          this.abrirModalMensagem();
        },
        (erro) => {
          console.error(erro);
          this.msgErro = 'Erro ao excluir horário.';
          this.abrirModalMensagem();
        }
      );
    }
  }
}