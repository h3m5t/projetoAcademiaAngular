import { Component, OnInit } from '@angular/core';
import { PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-pagamentos',
  standalone: false,
  templateUrl: './pagamentos.html',
  styleUrls: ['./pagamentos.css']
})
export class Pagamentos implements OnInit {

  // --- Variáveis da Pesquisa e Lista ---
  termoBusca: string = '';
  pagantesOriginal: any[] = []; // Guarda a lista completa (Backup)
  pagantes: any[] = [];         // Lista que aparece na tela (Filtrada)

  // --- Variáveis dos Modais ---
  historicoSelecionado: any[] = [];
  clienteSelecionado: any = null;

  // Objeto para novo pagamento
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

  // 1. Carrega a lista de nomes (para a tabela principal)
  carregarPagantes() {
    this.pagamentoService.getPagantes().subscribe(
      (dados) => {
        this.pagantesOriginal = dados;
        this.pagantes = dados; // Inicialmente mostra tudo
      },
      (erro) => console.error('Erro ao carregar pagantes:', erro)
    );
  }

  // 2. Filtra a tabela quando digita na busca
  filtrar() {
    if (!this.termoBusca) {
      this.pagantes = this.pagantesOriginal;
    } else {
      this.pagantes = this.pagantesOriginal.filter(item => 
        item.nome.toLowerCase().includes(this.termoBusca.toLowerCase())
      );
    }
  }

  // 3. Busca o histórico de um cliente (Ao clicar em Ver Detalhes)
  verHistorico(cliente: any) {
    this.clienteSelecionado = cliente;
    this.pagamentoService.getHistorico(cliente.id).subscribe(
      (dados) => {
        this.historicoSelecionado = dados;
      },
      (erro) => alert('Erro ao carregar histórico.')
    );
  }

  // 4. Prepara o formulário de pagamento
  prepararNovoPagamento(cliente: any) {
    this.clienteSelecionado = cliente;
    this.novoPagamento = {
      id_cliente: cliente.id,
      valor: 0,
      data: '',
      forma: 'Pix',
      plano: 'Mensal'
    };
  }

  // 5. Salva o pagamento no banco
  salvarPagamento() {
    this.pagamentoService.adicionarPagamento(this.novoPagamento).subscribe(
      () => {
        alert('Pagamento registrado com sucesso!');
        // Se quiser, pode abrir o histórico logo em seguida para conferir
        this.verHistorico(this.clienteSelecionado);
      },
      (erro) => alert('Erro ao salvar pagamento.')
    );
  }
}