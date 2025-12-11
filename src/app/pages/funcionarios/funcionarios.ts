import { Component, OnInit } from '@angular/core';
import { FuncionarioService } from '../../services/funcionario.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.html',
  standalone: false,
  styleUrls: ['./funcionarios.css']
})
export class Funcionarios implements OnInit { // Note que mantive o nome 'Funcionarios'

  funcionarios: any[] = [];
  
  // AQUI ESTÁ A CORREÇÃO: Criamos a lista de cargos
  cargos: any[] = []; 

  funcionarioSelecionado: any = null;
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
    this.carregarCargos(); // Chama a função ao abrir a tela
  }

  carregarFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe(
      (dados) => { this.funcionarios = dados; },
      (erro) => console.error('Erro ao carregar lista:', erro)
    );
  }

  // Função que busca os cargos no Banco de Dados
  carregarCargos() {
    this.funcionarioService.getCargos().subscribe(
      (dados) => { 
        console.log('Cargos carregados:', dados); // Para você conferir no F12
        this.cargos = dados; 
      },
      (erro) => console.error('Erro ao carregar cargos:', erro)
    );
  }

  prepararCadastro() {
    this.idEdicao = null;
    this.novoFunc = { 
      nome: '', 
      cpf: '', 
      telefone: '', 
      nascimento: '', 
      cargo: 1 
    };
  }

  prepararEdicao(item: any) {
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
      cargo: 1 // Aqui você pode ajustar depois para puxar o ID do cargo se tiver
    };
  }

  salvar() {
    if (this.idEdicao) {
      this.funcionarioService.editarFuncionario(this.idEdicao, this.novoFunc).subscribe(
        () => {
          alert('Funcionário atualizado!');
          this.carregarFuncionarios();
        },
        (erro) => alert('Erro ao editar.')
      );
    } else {
      this.funcionarioService.adicionarFuncionario(this.novoFunc).subscribe(
        () => {
          alert('Funcionário salvo!');
          this.carregarFuncionarios();
        },
        (erro) => alert('Erro ao salvar.')
      );
    }
  }

  apagar(item: any) {
    if (confirm(`Tem certeza que deseja apagar ${item.Nome}?`)) {
      this.funcionarioService.excluirFuncionario(item.Matricula).subscribe(
        () => {
          alert('Excluído com sucesso!');
          this.carregarFuncionarios();
        },
        (erro) => alert('Erro ao excluir.')
      );
    }
  }

  verDetalhes(item: any) {
    this.funcionarioSelecionado = item;
  }
}