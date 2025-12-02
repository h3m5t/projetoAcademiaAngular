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

  // Objeto do formulário
  novoFunc = {
    nome: '',
    cpf: '',
    telefone: '',
    nascimento: '',
    cargo: 1
  };

  // Variáveis de controle
  funcionarioSelecionado: any = null; // Para o Modal "Sobre"
  idEdicao: number | null = null;     // Se tiver valor, é Edição. Se for null, é Cadastro.

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe(
      (dados) => { this.funcionarios = dados; },
      (erro) => { console.error('Erro:', erro); }
    );
  }

  // BOTÃO ADICIONAR (Limpa o formulário)
  prepararCadastro() {
    this.idEdicao = null; // Garante que é modo criação
    this.novoFunc = { nome: '', cpf: '', telefone: '', nascimento: '', cargo: 1 };
  }

  // BOTÃO EDITAR (Preenche o formulário)
  prepararEdicao(item: any) {
    this.idEdicao = item.Matricula; // Guarda o ID para usar no UPDATE

    // TRUQUE DA DATA: O banco manda dd/mm/aaaa, o input date quer aaaa-mm-dd
    let dataFormatada = '';
    if (item.Aniversario) {
      const partes = item.Aniversario.split('/'); // Quebra 10/05/2000 em [10, 05, 2000]
      if (partes.length === 3) {
        dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`; // Monta 2000-05-10
      }
    }

    this.novoFunc = {
      nome: item.Nome,
      cpf: item.Cpf,
      telefone: item.contato,
      nascimento: dataFormatada,
      cargo: 1 // Idealmente viria do banco, mas deixamos 1 por enquanto
    };
  }

  // SALVAR (Decide se cria ou edita)
  salvar() {
    if (this.idEdicao) {
      // MODO EDIÇÃO
      this.funcionarioService.editarFuncionario(this.idEdicao, this.novoFunc).subscribe(
        () => {
          alert('Funcionário atualizado!');
          this.carregarFuncionarios();
          // Fechar modal via código seria ideal aqui, mas o alert pausa a tela
          this.prepararCadastro(); // Limpa form
        },
        (erro) => alert('Erro ao editar.')
      );
    } else {
      // MODO CADASTRO
      this.funcionarioService.adicionarFuncionario(this.novoFunc).subscribe(
        () => {
          alert('Funcionário cadastrado!');
          this.carregarFuncionarios();
          this.prepararCadastro(); // Limpa form
        },
        (erro) => alert('Erro ao salvar.')
      );
    }
  }

  verDetalhes(funcionario: any) {
    this.funcionarioSelecionado = funcionario;
  }

  apagar(item: any) {
    if (confirm(`Tem certeza que deseja excluir ${item.Nome}?`)) {
      this.funcionarioService.excluirFuncionario(item.Matricula).subscribe(
        () => {
          alert('Excluído com sucesso!');
          this.carregarFuncionarios();
        },
        (erro) => alert('Erro ao excluir.')
      );
    }
  }
}