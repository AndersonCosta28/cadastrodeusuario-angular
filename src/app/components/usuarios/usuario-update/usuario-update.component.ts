import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { sexoList, IUsuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {

  usuario: IUsuario | undefined

  id?: number;
  usuarioForm = this.formBuilder.group({
    id: 0,
    nome: '',
    email: '',
    sexo: '',
    telefone: ''
  });
  sexo: string[];

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private route: ActivatedRoute, private toastr: ToastrService, private routeNavigate: Router) {
    this.sexo = sexoList;
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = Number(routeParams.get('id'));
    this.usuarioService.BuscarUmUsuario(this.id).subscribe(res => this.usuario = res)
  }

  onSubmit() {
    this.SalvarUsuario();
  }

  SalvarUsuario() {
    let usuario = this.usuarioForm.value as IUsuario;

    this.usuarioService.AtualizarUsuario(this.id!, usuario).subscribe(res => {
      this.toastr.success("Usuário Alterado com sucesso")
      this.routeNavigate.navigateByUrl("/")
    });
  }
}
