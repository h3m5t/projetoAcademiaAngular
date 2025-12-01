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

  // Objeto para o NOVO funcionário (Cadastro)
  novoFunc = {
    nome: '',
    cpf: '',
    telefone: '',
    nascimento: '',
    cargo: 1
  };

  // Objeto para o funcionário SELECIONADO (Botão Sobre)
  funcionarioSelecionado: any = null;

  constructor(private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.funcionarioService.getFuncionarios().subscribe(
      (dados) => {
        this.funcionarios = dados;
      },
      (erro) => {
        console.error('Erro:', erro);
      }
    );
  }

  salvar() {
    this.funcionarioService.adicionarFuncionario(this.novoFunc).subscribe(
      () => {
        alert('Sucesso!');
        this.carregarFuncionarios();
        this.novoFunc = { nome: '', cpf: '', telefone: '', nascimento: '', cargo: 1 };
      },
      (erro) => {
        console.error(erro);
        alert('Erro ao salvar.');
      }
    );
  }

  // Função nova para selecionar quem vai aparecer no Modal "Sobre"
  verDetalhes(funcionario: any) {
    this.funcionarioSelecionado = funcionario;
  }
}