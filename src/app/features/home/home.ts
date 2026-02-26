import { Component } from '@angular/core';
import { CardListComponent } from '@components/card.list.component/card.list.component';
import { PetitionCardItem } from '@models/petition.card.item';
import { BannerImageComponent } from '@components/banner.image.component/banner.image.component';
import { TextSidebysideComponent } from '@components/text.sidebyside.component/text.sidebyside.component';
import { InfoSectionComponent } from '@components/info-section-component/info-section-component';
import { TextDescriptionItem } from '@models/text.sidebyside.item';
import { MockServices } from '@services/mock/mock.services';
import { AudioPlayerComponent } from '@components/audio.player.component/audio.player.component';
import { BlogListComponent } from '@components/blog.list.component/blog.list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardListComponent, 
    BannerImageComponent, 
    TextSidebysideComponent, 
    InfoSectionComponent, 
    AudioPlayerComponent,
    BlogListComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})  
export class Home {

  cards: PetitionCardItem[] = [];
  contentTextSBS!: TextDescriptionItem
  bannerText: TextDescriptionItem = { 
    title: 'Parejas jovenes', 
    description: 'Glorificamos a Dios al ser familias dispuestas y disponibles que realizan Colombia para Cristo',
    image: 'assets/banner-river.png'
  };

  constructor(private mockService: MockServices) {}

  ngOnInit() { 
    this.mockService.getTextDescriptionItem().subscribe(data => { 
      this.contentTextSBS = data; 
    }); 

    this.mockService.getHomePetitionCardItems().subscribe(data => { 
      this.cards = data.slice(0, 3); 
    }); 

    
  }

  


}

