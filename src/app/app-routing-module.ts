import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Funcionarios } from './pages/funcionarios/funcionarios';
import { Clientes } from './pages/clientes/clientes';
import { Pagamentos } from './pages/pagamentos/pagamentos';
import { Horarios } from './pages/horarios/horarios';


const routes: Routes = [  
  { path: '', redirectTo: 'funcionarios', pathMatch: 'full' }, 
  { path: 'funcionarios', component: Funcionarios },
  { path: 'clientes', component: Clientes },
  { path: 'pagamentos', component: Pagamentos},
  { path: 'horarios', component: Horarios }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

