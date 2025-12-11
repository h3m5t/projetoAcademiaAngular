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
  
  // --- CONTROLES ---
  clienteSelecionado: any = null;
  itemParaExcluir: any = null; 
  idEdicao: number | null = null;

  // --- MENSAGENS ---
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

  // Abre o popup de feedback (Sucesso/Erro)
  abrirModalMensagem() {
    setTimeout(() => {
      document.getElementById('btnAbrirMensagem')?.click();
    }, 300);
  }

  carregarClientes() {
    this.clienteService.getClientes().subscribe(
      (dados) => { this.clientes = dados; },
      (erro) => {
        console.error('Erro:', erro);
        this.msgErro = 'Erro ao carregar lista de clientes.';
        this.abrirModalMensagem();
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
      // EDITAR
      this.clienteService.editarCliente(this.idEdicao, this.novoCliente).subscribe(
        () => {
          this.msgSucesso = 'Cliente atualizado com sucesso!';
          this.carregarClientes();
          
          // Fecha formulário e abre feedback
          document.getElementById('btnFechar')?.click(); 
          this.abrirModalMensagem();
        },
        (erro) => {
          this.msgErro = 'Erro ao atualizar cliente.';
          this.abrirModalMensagem();
        }
      );
    } else {
      // ADICIONAR
      this.clienteService.adicionarCliente(this.novoCliente).subscribe(
        () => {
          this.msgSucesso = 'Cliente cadastrado com sucesso!';
          this.carregarClientes();
          
          // Limpa form
          this.novoCliente = { nome: '', cpf: '', telefone: '', nascimento: '' };
          
          // Fecha formulário e abre feedback
          document.getElementById('btnFechar')?.click(); 
          this.abrirModalMensagem();
        },
        (erro) => {
          this.msgErro = 'Erro ao cadastrar cliente.';
          this.abrirModalMensagem();
        }
      );
    }
  }

  apagar(item: any) {
    this.limparMensagens();
    this.itemParaExcluir = item;
    // O modal de confirmação abre via HTML
  }

  confirmarExclusao() {
    if (this.itemParaExcluir) {
      this.clienteService.excluirCliente(this.itemParaExcluir.id).subscribe(
        () => {
          this.msgSucesso = 'Cliente excluído com sucesso!';
          this.carregarClientes();
          
          // Fecha confirmação e abre feedback
          document.getElementById('btnFecharConfirmacao')?.click();
          this.abrirModalMensagem();
        },
        (erro) => {
          console.error(erro);
          this.msgErro = 'Erro ao excluir cliente.';
          this.abrirModalMensagem();
        }
      );
    }
  }

  verDetalhes(item: any) {
    this.clienteSelecionado = item;
  }
}