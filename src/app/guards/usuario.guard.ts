import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanLoad {

  constructor( private usarioService: UsuarioService ) {}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {

    return this.usarioService.validaToken();

  }

}
