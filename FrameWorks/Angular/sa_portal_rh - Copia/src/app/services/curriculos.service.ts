import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curriculo } from '../models/curriculo.model';

@Injectable({
  providedIn: 'root'
})
export class CurriculosService {
  private apiUrl = 'http://localhost:3013/curriculos'; // Use your real backend port

  constructor(private http: HttpClient) {}

  getCurriculos(): Observable<Curriculo[]> {
    return this.http.get<Curriculo[]>(this.apiUrl);
  }

  cadastrarCurriculos(curriculo: Curriculo): Observable<Curriculo> {
    return this.http.post<Curriculo>(this.apiUrl, curriculo);
  }

  atualizarCurriculos(cpf: string, curriculo: Curriculo): Observable<Curriculo> {
    return this.http.put<Curriculo>(`${this.apiUrl}/${cpf}`, curriculo);
  }

  removerCurriculos(cpf: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cpf}`);
  }
}
