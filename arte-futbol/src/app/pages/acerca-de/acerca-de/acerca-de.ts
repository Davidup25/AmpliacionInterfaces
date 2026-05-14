import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-acerca-de',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './acerca-de.html',
  styleUrls: ['./acerca-de.css'],
})
export class AcercaDe {}