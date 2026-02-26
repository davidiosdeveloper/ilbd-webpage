import { Component } from '@angular/core';
import { BlogItem } from '@models/blog.item';
import { Utils } from '@shared/utils';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
    { id: '2', date: new Date(2026, 1, 9),  title: '¿Estorbar a Dios?', href: '/blog/2' },
    { id: '3', date: new Date(2026, 2, 2),  title: '¿Crees que Dios está jugando?', href: '/blog/3' },
    { id: '4', date: new Date(2026, 0, 31), title: '¿Cómo darle la gloria al Señor como matrimonios?', href: '/blog/4' },
    { id: '5', date: new Date(2026, 5, 24), title: '¿Peleas por la unidad?', href: '/blog/5' },
  ];

  constructor(private utils: Utils, private route: ActivatedRoute, private router: Router) {}

  monthShort(d: Date) {
    return this.utils.formatMonthShort(d);
  }

  day2Digits(d: Date) {
    return this.utils.day2Digits(d);
  }

  verMas(item: BlogItem) {
    this.router.navigate(['/blogReader', item.id]);
  }

  trackById(_: number, item: BlogItem) {
    return item.id;
  }
}
