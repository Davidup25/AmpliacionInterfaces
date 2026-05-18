import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Equipaciones } from './equipaciones';
import { RouterTestingModule } from '@angular/router/testing';

describe('Equipaciones', () => {
  let component: Equipaciones;
  let fixture: ComponentFixture<Equipaciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Equipaciones, RouterTestingModule],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(Equipaciones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});