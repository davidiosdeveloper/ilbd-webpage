import { Component } from '@angular/core';
import { TextDescriptionItem } from '@models/text.sidebyside.item';
import { BannerImageComponent } from '@components/banner.image.component/banner.image.component';

@Component({
  selector: 'app-planning.component',
  standalone: true,
  imports: [BannerImageComponent],
  templateUrl: './planning.component.html',
  styleUrl: './planning.component.scss',
})
export class PlanningComponent {
  contentTextSBS: TextDescriptionItem = {
    title: 'Nuestra visión',
    description: 'Glorificamos a Dios al ser familias dispuestas y disponibles que realizan CPC',
  }

  bannerText: TextDescriptionItem = { 
    title: 'Nuestra visión',
    description: 'Glorificamos a Dios al ser familias dispuestas y disponibles que realizan CPC',
    image: 'assets/banner-river.png'
  };
}
