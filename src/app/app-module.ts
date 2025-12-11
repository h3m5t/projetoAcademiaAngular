import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app'; 

import { Navbar } from './components/navbar/navbar'; 
import { Funcionarios } from './pages/funcionarios/funcionarios';
import { Clientes } from './pages/clientes/clientes';
import { Pagamentos } from './pages/pagamentos/pagamentos';
import { Horarios } from './pages/horarios/horarios';

@NgModule({
  declarations: [
    AppComponent,
    Navbar,
    Funcionarios,
    Clientes,
    Pagamentos,
    Horarios
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMaskDirective, 
    NgxMaskPipe
  ],
  providers: [
    // 3. ADICIONAR NO PROVIDERS:
    provideNgxMask()
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }