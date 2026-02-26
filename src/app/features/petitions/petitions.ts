import { Component, OnInit } from '@angular/core';
import { CardListComponent } from '../../components/card.list.component/card.list.component';
import { PetitionCardItem } from '@models/petition.card.item';
import { TextSidebysideComponent } from '../../components/text.sidebyside.component/text.sidebyside.component';
import { TextSideBySideItem } from '@models/text.sidebyside.item';
import { MockServices } from '@services/mock/mock.services';


@Component({
  selector: 'app-petitions',
  standalone: true,
  imports: [CardListComponent, TextSidebysideComponent],
  templateUrl: './petitions.html',
  styleUrl: './petitions.scss',
})
export class Petitions implements OnInit {
  cards: PetitionCardItem[] = [];
  contentTextSBS: TextSideBySideItem = {
        title: 'Peticiones',
        description: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. <br/><br/> Filipenses 4:6'
      }

  constructor(private mockService: MockServices) {}

  ngOnInit() { 
    this.mockService.getHomePetitionCardItems().subscribe(data => { 
      this.cards = data; 
    }); 
  }
}
