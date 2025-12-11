import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-funcionarios',
  standalone: false,
  templateUrl: './funcionarios.html',
  styleUrls: ['./funcionarios.css']
})
export class Funcionarios implements OnInit {

  funcionarios: any[] = [];
  cargos: any[] = [];
  
  // Variáveis para mensagens
  msgSucesso: string = '';
  msgErro: string = '';

  // Controles
  funcionarioSelecionado: any = null; // Para o "Sobre"
  itemParaExcluir: any = null;        // Para o "Excluir" (NOVO)
  idEdicao: number | null = null;

  novoFunc = {
    nome: '',
    cpf: '',
    telefone: '',
    nascimento: '',
    cargo: 1
  };

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.carregarFuncionarios();
    this.carregarCargos();
  }

  limparMensagens() {
    this.msgSucesso = '';
    this.msgErro = '';
  }

  // Abre o modal de feedback (sucesso/erro)
  abrirModalMensagem() {
    setTimeout(() => {
      document.getElementById('btnAbrirMensagem')?.click();
    }, 300);
  }

  carregarFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe(
      (dados) => { this.funcionarios = dados; },
      (erro) => console.error(erro)
    );
  }

  carregarCargos() {
    this.funcionarioService.getCargos().subscribe(
      (dados) => { this.cargos = dados; },
      (erro) => console.error(erro)
    );
  }

  prepararCadastro() {
    this.limparMensagens();
    this.idEdicao = null;
    this.novoFunc = { nome: '', cpf: '', telefone: '', nascimento: '', cargo: 1 };
  }

  prepararEdicao(item: any) {
    this.limparMensagens();
    this.idEdicao = item.Matricula;
    
    let dataFormatada = '';
    if (item.Aniversario) {
      const partes = item.Aniversario.split('/');
      if (partes.length === 3) {
        dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
      }
    }

    this.novoFunc = {
      nome: item.Nome,
      cpf: item.Cpf,
      telefone: item.contato,
      nascimento: dataFormatada,
      cargo: 1 
    };
  }

  salvar() {
    this.limparMensagens();

    const aoSucesso = (msg: string) => {
      this.msgSucesso = msg;
      this.carregarFuncionarios();
      document.getElementById('btnFechar')?.click(); // Fecha modal de cadastro
      this.abrirModalMensagem(); // Abre feedback
      
      if (!this.idEdicao) {
        this.novoFunc = { nome: '', cpf: '', telefone: '', nascimento: '', cargo: 1 };
      }
    };

    const aoErro = (msg: string, erro: any) => {
      console.error(erro);
      this.msgErro = msg;
      this.abrirModalMensagem();
    };

    if (this.idEdicao) {
      this.funcionarioService.editarFuncionario(this.idEdicao, this.novoFunc).subscribe(
        () => aoSucesso('Funcionário atualizado com sucesso!'),
        (erro) => aoErro('Erro ao atualizar funcionário.', erro)
      );
    } else {
      this.funcionarioService.adicionarFuncionario(this.novoFunc).subscribe(
        () => aoSucesso('Funcionário cadastrado com sucesso!'),
        (erro) => aoErro('Erro ao cadastrar funcionário.', erro)
      );
    }
  }

  // 1. O botão da tabela chama ISSO AQUI agora
  apagar(item: any) {
    this.limparMensagens();
    this.itemParaExcluir = item; // Guarda quem vai ser excluído
    // O modal abre automaticamente pelo data-bs-target no HTML
  }

  // 2. O botão "Sim, Excluir" do modal chama ISSO AQUI
  confirmarExclusao() {
    if (this.itemParaExcluir) {
      this.funcionarioService.excluirFuncionario(this.itemParaExcluir.Matricula).subscribe(
        () => {
          this.msgSucesso = 'Funcionário excluído com sucesso!';
          this.carregarFuncionarios();
          
          // Fecha o modal de confirmação
          document.getElementById('btnFecharConfirmacao')?.click();
          
          // Abre o modal de sucesso
          this.abrirModalMensagem();
        },
        (erro) => {
          console.error(erro);
          this.msgErro = 'Erro ao excluir funcionário.';
          this.abrirModalMensagem();
        }
      );
    }
  }

  verDetalhes(item: any) {
    this.funcionarioSelecionado = item;
  }
}