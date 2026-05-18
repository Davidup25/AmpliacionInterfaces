import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { Header } from './header';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '123']])), // simula paramMap observable
            snapshot: {
              paramMap: {
                get: (key: string) => '123',        // simula snapshot.paramMap.get()
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
