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
  clienteSelecionado: any = null;
  idEdicao: number | null = null;

  // Variáveis de Mensagem (NOVO)
  msgSucesso: string = '';
  msgErro: string = '';

  novoCliente = {
    nome: '',
    cpf: '',
    telefone: '',
    nascimento: ''
  };

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  limparMensagens() {
    this.msgSucesso = '';
    this.msgErro = '';
  }

  carregarClientes() {
    this.clienteService.getClientes().subscribe(
      (dados) => { this.clientes = dados; },
      (erro) => {
        console.error('Erro:', erro);
        this.msgErro = 'Erro ao carregar lista de clientes.';
      }
    );
  }

  prepararCadastro() {
    this.limparMensagens();
    this.idEdicao = null;
    this.novoCliente = { nome: '', cpf: '', telefone: '', nascimento: '' };
  }

  prepararEdicao(item: any) {
    this.limparMensagens();
    this.idEdicao = item.id; 

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
      telefone: item.telefone, 
      nascimento: dataFormatada
    };
  }

  salvar() {
    this.limparMensagens();

    if (this.idEdicao) {
      this.clienteService.editarCliente(this.idEdicao, this.novoCliente).subscribe(
        () => {
          this.msgSucesso = 'Cliente atualizado com sucesso!';
          this.carregarClientes();
          // FECHA O MODAL AUTOMATICAMENTE
          document.getElementById('btnFechar')?.click(); 
        },
        (erro) => this.msgErro = 'Erro ao atualizar cliente.'
      );
    } else {
      this.clienteService.adicionarCliente(this.novoCliente).subscribe(
        () => {
          this.msgSucesso = 'Cliente cadastrado com sucesso!';
          this.carregarClientes();
          this.prepararCadastro();
          // FECHA O MODAL AUTOMATICAMENTE
          document.getElementById('btnFechar')?.click(); 
        },
        (erro) => this.msgErro = 'Erro ao cadastrar cliente.'
      );
    }
  }

  apagar(item: any) {
    this.limparMensagens();
    if (confirm(`Tem certeza que deseja apagar ${item.nome}?`)) {
      this.clienteService.excluirCliente(item.id).subscribe(
        () => {
          this.msgSucesso = 'Cliente excluído com sucesso!';
          this.carregarClientes();
        },
        (erro) => this.msgErro = 'Erro ao excluir cliente.'
      );
    }
  }

  verDetalhes(item: any) {
    this.clienteSelecionado = item;
  }
}