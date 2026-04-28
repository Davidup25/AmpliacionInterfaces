import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core'; // 👈 nuevo
import { Chandales } from './chandales';

describe('Chandales', () => {
  let component: Chandales;
  let fixture: ComponentFixture<Chandales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chandales],
      providers: [provideZonelessChangeDetection()] // 👈 clave para quitar NG0908
    }).compileComponents();

    fixture = TestBed.createComponent(Chandales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
