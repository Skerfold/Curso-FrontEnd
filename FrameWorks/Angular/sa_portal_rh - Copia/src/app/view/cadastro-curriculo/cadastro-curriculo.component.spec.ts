import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCurriculoComponent } from './cadastro-curriculo.component';

describe('CadastroCurriculoComponent', () => {
  let component: CadastroCurriculoComponent;
  let fixture: ComponentFixture<CadastroCurriculoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroCurriculoComponent]
    });
    fixture = TestBed.createComponent(CadastroCurriculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
