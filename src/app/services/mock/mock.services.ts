import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TextDescriptionItem } from '@models/text.sidebyside.item';
import { PetitionCardItem } from '@models/petition.card.item';
import { EventItem } from '@models/event.item';
import { 
  MOCK_HOME_PETITION_CARD_ITEM, 
  MOCK_HOME_TEXT_SBS_ITEM, 
  MOCK_EVENT_ITEMS, 
  MOCK_BLOG_CONTENT
} from '../mocks';
import { BlogContent } from '@models/blog.item';


@Injectable({
  providedIn: 'root',
})
export class MockServices {
  getTextDescriptionItem(): Observable<TextDescriptionItem> {
    return of(MOCK_HOME_TEXT_SBS_ITEM);
  }

  getHomePetitionCardItems(): Observable<PetitionCardItem[]> {
    return of(MOCK_HOME_PETITION_CARD_ITEM);
  }

  getEventsItems(): Observable<EventItem[]> {
    return of(MOCK_EVENT_ITEMS);
  }

  getBlogContent(): Observable<BlogContent> {
    return of(MOCK_BLOG_CONTENT);
  }

}