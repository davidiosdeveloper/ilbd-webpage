import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TextDescriptionItem } from '@models/text.sidebyside.item';

@Component({
  selector: 'app-banner-image',
  standalone: true,
  imports: [],
  templateUrl: './banner.image.component.html',
  styleUrl: './banner.image.component.scss',
})
export class BannerImageComponent {
  @Input() text: TextDescriptionItem = { title: '', description: '' };
  safeTitle!: SafeHtml;
  safeDescription!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    this.safeTitle = this.sanitizer.bypassSecurityTrustHtml(this.text.title);
    this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.text.description);
  }
}
