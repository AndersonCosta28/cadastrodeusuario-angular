import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioCreateComponent } from './components/usuarios/usuario-create/usuario-create.component';
import { UsuarioDetailsComponent } from './components/usuarios/usuario-details/usuario-details.component';
import { UsuarioListComponent } from './components/usuarios/usuario-list/usuario-list.component';
import { UsuarioUpdateComponent } from './components/usuarios/usuario-update/usuario-update.component';

const routes: Routes = [
  { path: "", component: UsuarioListComponent },
  { path: "novo", component: UsuarioCreateComponent },
  { path: "editar/:id", component: UsuarioUpdateComponent },
  { path: "visualizar/:id", component: UsuarioDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
