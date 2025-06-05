import { Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CurriculosService } from 'src/app/services/curriculos.service';
import { Curriculo } from 'src/app/models/curriculo.model';
import { CurriculosComponent } from './curriculos.component';

describe('CurriculosComponent', () => {
  let component: CurriculosComponent;
  let fixture: ComponentFixture<CurriculosComponent>;
  let curriculosServiceSpy: jasmine.SpyObj<CurriculosService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CurriculosService', ['getCurriculos', 'removerCurriculos']);

    TestBed.configureTestingModule({
      declarations: [CurriculosComponent],
      providers: [{ provide: CurriculosService, useValue: spy }]
    });

    fixture = TestBed.createComponent(CurriculosComponent);
    component = fixture.componentInstance;
    curriculosServiceSpy = TestBed.inject(CurriculosService) as jasmine.SpyObj<CurriculosService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-curriculos',
  templateUrl: './curriculos.component.html',
  styleUrls: ['./curriculos.component.scss']
})
export class CurriculosComponent implements OnInit {
  curriculos: Curriculo[] = [];

  constructor(private curriculosService: CurriculosService) {}

  ngOnInit(): void {
    this.listarCurriculos();
  }

  listarCurriculos(): void {
    this.curriculosService.getCurriculos().subscribe(
      (data: Curriculo[]) => this.curriculos = data,
      (err) => console.error(err)
    );
  }

  deletarCurriculo(cpf: string): void {
    if (confirm('Tem certeza que deseja deletar este currículo?')) {
      this.curriculosService.removerCurriculos(cpf).subscribe(
        () => this.listarCurriculos(),
        (err) => console.error(err)
      );
    }
  }
}
