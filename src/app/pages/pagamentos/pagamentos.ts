import { Component, OnInit } from '@angular/core';
import { PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-pagamentos',
  standalone: false,
  templateUrl: './pagamentos.html',
  styleUrls: ['./pagamentos.css']
})
export class Pagamentos implements OnInit {

  // Dados
  termoBusca: string = '';
  pagantesOriginal: any[] = [];
  pagantes: any[] = [];
  
  historicoSelecionado: any[] = [];
  clienteSelecionado: any = null;
  pagamentoParaExcluir: any = null; // Para exclusão

  // Mensagens
  msgSucesso: string = '';
  msgErro: string = '';

  novoPagamento = {
    id_cliente: 0,
    valor: 0,
    data: '',
    forma: 'Pix',
    plano: 'Mensal'
  };

  constructor(private pagamentoService: PagamentoService) { }

  ngOnInit(): void {
    this.carregarPagantes();
  }

  limparMensagens() {
    this.msgSucesso = '';
    this.msgErro = '';
  }

  abrirModalMensagem() {
    setTimeout(() => {
      document.getElementById('btnAbrirMensagem')?.click();
    }, 300);
  }

  carregarPagantes() {
    this.pagamentoService.getPagantes().subscribe(
      (dados) => {
        this.pagantesOriginal = dados;
        this.pagantes = dados;
      },
      (erro) => {
        this.msgErro = 'Erro ao carregar lista.';
        this.abrirModalMensagem();
      }
    );
  }

  filtrar() {
    if (!this.termoBusca) {
      this.pagantes = this.pagantesOriginal;
    } else {
      this.pagantes = this.pagantesOriginal.filter(item => 
        item.nome.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }
  }

  verHistorico(cliente: any) {
    this.limparMensagens();
    this.clienteSelecionado = cliente;
    this.pagamentoService.getHistorico(cliente.id).subscribe(
      (dados) => { this.historicoSelecionado = dados; },
      (erro) => {
        this.msgErro = 'Erro ao carregar histórico.';
        this.abrirModalMensagem();
      }
    );
  }

  prepararNovoPagamento(cliente: any) {
    this.limparMensagens();
    this.clienteSelecionado = cliente;
    this.novoPagamento = {
      id_cliente: cliente.id,
      valor: 0,
      data: '',
      forma: 'Pix',
      plano: 'Mensal'
    };
  }

  salvarPagamento() {
    this.limparMensagens();
    
    this.pagamentoService.adicionarPagamento(this.novoPagamento).subscribe(
      () => {
        this.msgSucesso = 'Pagamento registrado com sucesso!';
        document.getElementById('btnFechar')?.click();
        this.abrirModalMensagem();
      },
      (erro) => {
        console.error(erro);
        this.msgErro = 'Erro ao registrar pagamento.';
        this.abrirModalMensagem();
      }
    );
  }

  // 1. Botão Lixeira no Histórico chama este
  confirmarExclusaoPagamento(item: any) {
    this.pagamentoParaExcluir = item;
    // O modal abre via HTML
  }

  // 2. Botão "Sim" chama este
  apagarPagamentoReal() {
    if (this.pagamentoParaExcluir) {
      this.pagamentoService.excluirPagamento(this.pagamentoParaExcluir.id_pagamento).subscribe(
        () => {
          this.msgSucesso = 'Pagamento removido!';
          
          document.getElementById('btnFecharConfirmacao')?.click();
          
          // Atualiza o histórico para sumir o item deletado
          if (this.clienteSelecionado) {
            this.verHistorico(this.clienteSelecionado);
          }
          
          this.abrirModalMensagem();
        },
        (erro) => {
          this.msgErro = 'Erro ao excluir pagamento.';
          this.abrirModalMensagem();
        }
      );
    }
  }
}