import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { FirebaseService } from './firebase.service';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseService, provideZonelessChangeDetection()]
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});