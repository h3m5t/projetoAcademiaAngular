import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})
export class ClientesComponent implements OnInit {

  clientes: any[] = [];

  // Objeto do Formulário
  novoCliente = {
    nome: '',
    cpf: '',
    telefone: '',
    nascimento: ''
  };

  clienteSelecionado: any = null; // Para o Modal Sobre
  idEdicao: number | null = null; // Para controlar Edição vs Criação

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.getClientes().subscribe(
      (dados) => { this.clientes = dados; },
      (erro) => { console.error('Erro ao listar:', erro); }
    );
  }

  // --- Lógica de Cadastro/Edição ---

  prepararCadastro() {
    this.idEdicao = null; // Modo Criação
    this.novoCliente = { nome: '', cpf: '', telefone: '', nascimento: '' };
  }

  prepararEdicao(item: any) {
    this.idEdicao = item.Inscrição; // O ID vem como 'Inscrição' do banco

    // Converter data de dd/mm/aaaa para aaaa-mm-dd (para o input date funcionar)
    let dataFormatada = '';
    if (item.aniversario) {
      const partes = item.aniversario.split('/');
      if (partes.length === 3) {
        dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
      }
    }

    this.novoCliente = {
      nome: item.nome,
      cpf: item.cpf,
      telefone: item.Contato, // O banco retorna 'Contato'
      nascimento: dataFormatada
    };
  }

  salvar() {
    if (this.idEdicao) {
      // EDITAR
      this.clienteService.editarCliente(this.idEdicao, this.novoCliente).subscribe(
        () => {
          alert('Cliente atualizado!');
          this.carregarClientes();
          this.prepararCadastro(); // Limpa
        },
        (erro) => alert('Erro ao editar.')
      );
    } else {
      // ADICIONAR
      this.clienteService.adicionarCliente(this.novoCliente).subscribe(
        () => {
          alert('Cliente salvo!');
          this.carregarClientes();
          this.prepararCadastro();
        },
        (erro) => alert('Erro ao salvar.')
      );
    }
  }

  // --- Lógica de Excluir ---

  apagar(item: any) {
    if (confirm(`Tem certeza que deseja excluir ${item.nome}?`)) {
      this.clienteService.excluirCliente(item.Inscrição).subscribe(
        () => {
          alert('Excluído com sucesso!');
          this.carregarClientes();
        },
        (erro) => alert('Erro ao excluir.')
      );
    }
  }

  verDetalhes(item: any) {
    this.clienteSelecionado = item;
  }
}