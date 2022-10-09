import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { UsuarioService } from 'src/app/components/usuarios/usuario.service';
import { IUsuario } from '../usuario';

@Component({
  selector: 'app-usuario-details',
  templateUrl: './usuario-details.component.html',
  styleUrls: ['./usuario-details.component.css']
})
export class UsuarioDetailsComponent implements OnInit {

  usuario: IUsuario | undefined
  usuarioForm = this.formBuilder.group({
    id: '',
    nome: '',
    email: '',
    sexo: '',
    telefone: ''
  });
  sexo: string[] = ["Masculino", "Feminino"]

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const id = Number(routeParams.get('id'));
    this.usuarioService.BuscarUmUsuario(id).subscribe(res => this.usuario = res)
  }
}
