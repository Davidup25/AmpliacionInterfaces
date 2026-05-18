import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AcercaDe } from './acerca-de';
import { RouterTestingModule } from '@angular/router/testing';

describe('AcercaDe', () => {
  let component: AcercaDe;
  let fixture: ComponentFixture<AcercaDe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcercaDe, RouterTestingModule],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(AcercaDe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});