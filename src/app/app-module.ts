import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { Funcionarios } from './pages/funcionarios/funcionarios';
import { Clientes } from './pages/clientes/clientes';
import { Pagamentos } from './pages/pagamentos/pagamentos';
import { Horarios } from './pages/horarios/horarios';

@NgModule({
  declarations: [
    App,
    Navbar,
    Funcionarios,
    Clientes,
    Pagamentos,
    Horarios
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
