# 💻 Projeto Academia - Front-end (Angular)

Interface web moderna para o sistema de administração da Academia "Titanium". Desenvolvido em **Angular v20**, o projeto oferece uma experiência fluida para gerenciar funcionários, clientes e pagamentos.

## ✨ Funcionalidades

**Gestão de Clientes:** Cadastro, listagem e edição de alunos com validação de dados.
**Gestão de Funcionários:** Controle completo da equipe, incluindo instrutores e recepcionistas.
**Controle Financeiro:** Visualização e registro de pagamentos (Mensal, Anual, Diária).
**Escala de Horários:** Visualização da grade de horários dos funcionários.

## ⚠️ Limitações Conhecidas (Regras de Negócio)

* **Integridade de Dados (Exclusão):** O sistema possui travas de segurança no Banco de Dados (Foreign Keys). **Não é possível excluir um cliente** se ele possuir pagamentos ou treinos registrados. Isso garante que o histórico financeiro da academia nunca seja perdido acidentalmente.

## 🚀 Tecnologias Utilizadas

* [cite_start]**Framework:** Angular CLI 20.0.2 [cite: 18]
* **Linguagem:** TypeScript
* **Estilização:** CSS / Angular Material

## ⚙️ Pré-requisitos

1.  [cite_start]**Node.js** instalado (v22.x)[cite: 7].
2.  **Angular CLI** instalado globalmente:
    ```bash
    npm install -g @angular/cli
    ```
    [cite_start]*[cite: 507]*

## 🏃‍♂️ Como Rodar o Projeto

1.  Certifique-se de que o **Back-end** (projeto do servidor) já esteja rodando na porta 3000.
2.  Abra o terminal na pasta deste projeto Angular.
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Execute a aplicação:
    ```bash
    ng serve
    ```
    [cite_start]*[cite: 508]*

5.  Acesse o sistema no navegador pelo endereço:
    **`http://localhost:4200/`**

## 📂 Estrutura do Projeto

* `src/app/components`: Contém os componentes de Cliente, Funcionário, Pagamento e Horário.
* `src/app/services`: Serviços responsáveis por conectar com o Back-end (API).

---
**Desenvolvido por:** [Seu Nome/Grupo] - Projeto da disciplina PPI/PDS.

