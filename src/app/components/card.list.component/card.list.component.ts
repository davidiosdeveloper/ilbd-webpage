import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetitionCardItem } from '@models/petition.card.item';
import { MatDialog } from '@angular/material/dialog';
import { PetitionModalComponent } from '@components/petition.modal.component/petition.modal.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, ], //PetitionModalComponent

  templateUrl: './card.list.component.html',
  styleUrls: ['./card.list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() cards: PetitionCardItem[] = [];

  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    setTimeout(() => {
      const cardElements = document.querySelectorAll('.card');
      cardElements.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 200); 
      });
    }, 250);
  }

  /*openPetitions(card: PetitionCardItem) {
    if (!card.petitions?.length) return;

    this.dialog.open(PetitionModalComponent, {
      data: {
        title: card.title,
        petitions: card.petitions
      },
      panelClass: 'custom-dialog',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
    });
  }*/
 openPetitions(card: PetitionCardItem) {
    if (!card.petitions?.length) return;

    const isMobile = this.breakpointObserver.isMatched(Breakpoints.Handset);

    this.dialog.open(PetitionModalComponent, {
      data: {
        title: card.title,
        petitions: card.petitions
      },
      width: isMobile ? '100vw' : '500px',
      height: isMobile ? '100vh' : 'auto',
      maxWidth: isMobile ? '100vw' : '90vw',
      panelClass: 'custom-dialog',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms'
    });
  }
}

