import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-info-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './info-section-component.html',
  styleUrls: ['./info-section-component.scss']
})
export class InfoSectionComponent {}