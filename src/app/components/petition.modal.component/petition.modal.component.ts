import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-petition-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './petition.modal.component.html',
  styleUrls: ['./petition.modal.component.scss']
})
export class PetitionModalComponent {

  constructor(
    private dialogRef: MatDialogRef<PetitionModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      petitions: string[];
    }
  ) {}

  close() {
    this.dialogRef.close();
  }
}