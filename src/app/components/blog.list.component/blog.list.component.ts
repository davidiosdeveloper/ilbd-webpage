import { Component } from '@angular/core';
import { BlogItem } from '@models/blog.item';
import { Utils } from '@shared/utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.list.component.html',
  styleUrl: './blog.list.component.scss',
})
export class BlogListComponent {
  items: BlogItem[] = [
    { id: '1', date: new Date(2025, 5, 19), title: '¿Cómo tratar los conflictos matrimoniales?', href: '/blog/1' },
    { id: '2', date: new Date(2026, 1, 9),  title: 'Angular sin drama: tips que sí sirven', href: '/blog/2' },
    { id: '3', date: new Date(2026, 2, 2),  title: 'RxJS para humanos (prometido)', href: '/blog/3' },
    { id: '4', date: new Date(2026, 0, 31), title: 'CSS Grid: el layout que te mereces', href: '/blog/4' },
    { id: '5', date: new Date(2026, 5, 24), title: 'Audio player: de 0 a pro en Angular', href: '/blog/5' },
  ];

  constructor(private utils: Utils) {}

  monthShort(d: Date) {
    return this.utils.formatMonthShort(d);
  }

  day2Digits(d: Date) {
    return this.utils.day2Digits(d);
  }

  verMas(item: BlogItem) {
    // Aquí puedes navegar (Router) o abrir modal
    // Ejemplo simple:
    console.log('Ver más:', item);
  }

  trackById(_: number, item: BlogItem) {
    return item.id;
  }
}