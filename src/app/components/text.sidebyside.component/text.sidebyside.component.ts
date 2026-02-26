import { Component, Input, OnChanges } from '@angular/core';
import { TextDescriptionItem } from '@models/text.sidebyside.item';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-text-sidebyside',
  standalone: true,
  imports: [],
  templateUrl: './text.sidebyside.component.html',
  styleUrl: './text.sidebyside.component.scss',
})
export class TextSidebysideComponent implements OnChanges {
  @Input() content!: TextDescriptionItem;

  safeTitle!: SafeHtml;
  safeDescription!: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges() {
    this.safeTitle = this.sanitizer.bypassSecurityTrustHtml(this.content.title);
    this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(this.content.description);
  }
}






