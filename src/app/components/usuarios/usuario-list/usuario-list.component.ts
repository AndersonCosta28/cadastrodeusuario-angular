import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/components/usuarios/usuario.service';
import { IUsuario } from '../usuario'

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  usuarios: IUsuario[] | undefined;

  constructor(private usuarioService: UsuarioService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.CarregarUsuarios()
  }

  CarregarUsuarios(): void {
    this.usuarioService.ListarTodosUsuarios().subscribe((res) => this.usuarios = res)
  }

  Deletar(id: number) {
    if (confirm(`Você deseja deletar este usuário? ${id}`))
      this.usuarioService.RemoverUsuario(id).subscribe(res => {
        this.toastr.success("Usuário deletado com sucesso")
        this.CarregarUsuarios()
      })
  }
}
