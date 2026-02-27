import { EventItem } from '@models/event.item';
import { MockServices } from '@services/mock/mock.services';
import { Utils } from '@shared/utils';
import { CommonModule } from '@angular/common';
import { BannerImageComponent } from '../../components/banner.image.component/banner.image.component';
import { EventItemComponent } from '@components/event.item.component/event.item.component';
import { AfterViewInit, OnInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, BannerImageComponent, EventItemComponent],
  templateUrl: './events.html',
  styleUrls: ['./events.scss', './event.item.animation.scss'],
})
export class Events implements OnInit, AfterViewInit {
  myEvents: EventItem[] = [/* ... */];
  groupedEvents: { month: string; events: EventItem[] }[] = [];
  @ViewChildren('eventItem') eventItems!: QueryList<ElementRef>;

  constructor(private mockService: MockServices, private utils: Utils) {}
  
  ngOnInit() {
    this.mockService.getEventsItems().subscribe(events => {
      this.myEvents = events;
      this.groupByMonth();
    });
  }

  // MARK: - Animación de fade-in al hacer scroll
  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // deja de observar una vez animado
          }
        });
      },
      { threshold: 0.1 } // se activa cuando al menos 10% es visible
    );

    this.eventItems.forEach(item => observer.observe(item.nativeElement));
  }

  private groupByMonth() {
    const groups: { [key: string]: EventItem[] } = {};

    this.myEvents.forEach(event => {
      if (event.date) {
        const [day, month, year] = event.date.split('/');
        const key = `${this.utils.capitalizeFirstLetter(this.utils.monthNumberToName(Number(month)))} ${year}`;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(event);
      }
    });

    this.groupedEvents = Object.keys(groups).map(key => ({
      month: key,
      events: groups[key]
    }));
  }
}
