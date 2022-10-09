import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { sexoList, IUsuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {
  usuario: IUsuario | undefined = {
    id: 0,
    nome: '',
    email: '',
    sexo: '',
    telefone: ''
  }

  sexo: string[];

  usuarioForm = this.formBuilder.group({ ...this.usuario });

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private routeNavigate: Router, private toastr: ToastrService) {
    this.sexo = sexoList;
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.SalvarUsuario();
  }

  SalvarUsuario() {
    let usuario = this.usuarioForm.value as IUsuario;
    this.usuarioService.AdicionarUsuario(usuario).subscribe(res => {
      this.toastr.success("Usuário cadastrado com sucesso")
      this.routeNavigate.navigateByUrl("/")
    });
  }
}
