import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TextSideBySideItem } from '@models/text.sidebyside.item';
import { PetitionCardItem } from '@models/petition.card.item';
import { EventItem } from '@models/event.item';
import { 
  MOCK_HOME_PETITION_CARD_ITEM, 
  MOCK_HOME_TEXT_SBS_ITEM, 
  MOCK_EVENT_ITEMS 
} from '../mocks';


@Injectable({
  providedIn: 'root',
})
export class MockServices {
  getTextSideBySideItem(): Observable<TextSideBySideItem> {
    return of(MOCK_HOME_TEXT_SBS_ITEM);
  }

  getHomePetitionCardItems(): Observable<PetitionCardItem[]> {
    return of(MOCK_HOME_PETITION_CARD_ITEM);
  }

  getEventsItems(): Observable<EventItem[]> {
    return of(MOCK_EVENT_ITEMS);
  }

  
}