import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaForm } from './despesa-form';

describe('DespesaForm', () => {
  let component: DespesaForm;
  let fixture: ComponentFixture<DespesaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DespesaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DespesaForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
