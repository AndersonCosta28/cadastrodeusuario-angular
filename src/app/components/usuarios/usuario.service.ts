import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';
import { IUsuario } from './usuario';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarios: IUsuario[] = []

  urlBase: string = 'http://localhost:3000/usuario/';

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ManipularErros(error: HttpErrorResponse) {
    if (error.status === 0)
      console.error('An error occurred:', error.error);
    else
      console.error(`Backend returned code ${error.status}, body was: `, error.error);

    this.toastr.error(error.status.toString(), error.statusText);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  ListarTodosUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.urlBase).pipe(catchError(e => {
      this.toastr.error(e.error.message, e.statusText)
      return this.ManipularErros(e)
    }))
  }

  BuscarUmUsuario(id: number): Observable<IUsuario> {
    return this.http.get<IUsuario>(this.urlBase.concat(id.toString())).pipe(catchError(e => {
      this.toastr.error(e.error.message, e.statusText)
      return this.ManipularErros(e)
    }))
  }

  AdicionarUsuario(usuario: IUsuario): Observable<IUsuario> {
    return this.http.post<IUsuario>(this.urlBase, usuario).pipe(catchError((e: HttpErrorResponse) => {
      this.toastr.error(e.error.message, e.statusText)
      return this.ManipularErros(e)
    }))
  }

  AtualizarUsuario(id: number, usuario: IUsuario): Observable<IUsuario> {
    delete usuario.id;
    return this.http.put<IUsuario>(this.urlBase.concat(id.toString()), usuario).pipe(catchError(e => {
      this.toastr.error(e.error.message, e.statusText)
      return this.ManipularErros(e)
    }))
  }

  RemoverUsuario(id: number): Observable<IUsuario> {
    return this.http.delete<IUsuario>(this.urlBase.concat(id.toString())).pipe(catchError(e => {
      this.toastr.error(e.error.message, e.statusText)
      return this.ManipularErros(e)
    }))
  }
}
