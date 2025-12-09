import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.html',
  styleUrls: ['./clientes.css']
})
export class Clientes implements OnInit {

  clientes: any[] = [];

  novoCliente = {
    nome: '',
    cpf: '',
    telefone: '',
    nascimento: ''
  };

  clienteSelecionado: any = null;
  idEdicao: number | null = null;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes() {
    this.clienteService.getClientes().subscribe(
      (dados) => { this.clientes = dados; },
      (erro) => { console.error('Erro:', erro); }
    );
  }

  prepararCadastro() {
    this.idEdicao = null;
    this.novoCliente = { nome: '', cpf: '', telefone: '', nascimento: '' };
  }

  prepararEdicao(item: any) {
    // ATENÇÃO: Agora usamos 'id' (minusculo e sem acento)
    this.idEdicao = item.id; 

    // Formatar data
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
      // ATENÇÃO: Agora usamos 'telefone' (que vem do backend novo)
      telefone: item.telefone, 
      nascimento: dataFormatada
    };
  }

  salvar() {
    if (this.idEdicao) {
      this.clienteService.editarCliente(this.idEdicao, this.novoCliente).subscribe(
        () => {
          alert('Atualizado!');
          this.carregarClientes();
          this.prepararCadastro();
        },
        (erro) => alert('Erro ao editar.')
      );
    } else {
      this.clienteService.adicionarCliente(this.novoCliente).subscribe(
        () => {
          alert('Salvo!');
          this.carregarClientes();
          this.prepararCadastro();
        },
        (erro) => alert('Erro ao salvar.')
      );
    }
  }

  apagar(item: any) {
    if (confirm(`Excluir ${item.nome}?`)) {
      // ATENÇÃO: Usando 'id' aqui também
      this.clienteService.excluirCliente(item.id).subscribe(
        () => {
          alert('Excluído!');
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