import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Horarios } from './horarios';

describe('Horarios', () => {
  let component: Horarios;
  let fixture: ComponentFixture<Horarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Horarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Horarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
