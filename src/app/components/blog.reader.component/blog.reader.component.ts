import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BannerImageComponent } from '@components/banner.image.component/banner.image.component';
import { BlogContent } from '@models/blog.item';
import { TextDescriptionItem } from '@models/text.sidebyside.item';
import { MockServices } from '@services/mock/mock.services';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Utils } from '@shared/utils';

@Component({
  selector: 'app-blog.reader.component',
  standalone: true,
  imports: [BannerImageComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './blog.reader.component.html',
  styleUrl: './blog.reader.component.scss',
})
export class BlogReaderComponent implements OnInit {
  blogId!: string;
  blog: BlogContent | null = null;
  bannerText!: TextDescriptionItem;
  safeDescription!: SafeHtml;
  isLoading = true;
  readingTime = 0;
  viewportScroller: any;
  
  constructor(private mockService: MockServices, 
    private route: ActivatedRoute, 
    private sanitizer: DomSanitizer,
    private utils: Utils
  ) {
    
  }
  
    ngOnInit() { 
      this.route.params.subscribe(params => { 
        this.loadBlog(params['id']);
      }); 
    }

    loadBlog(id: string) {
      this.isLoading = true;

      this.mockService.getBlogContent().subscribe({
        next: (blog) => {
          this.blog = blog;
          this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(blog.content);
          this.isLoading = false;

          this.bannerText = {
            title: "Parejas con proposito",
            description: blog.subtitle || 'Colombia para Cristo una plataforma a las naciones',
            image: 'assets/banner-lake.png'
          };

          this.readingTime = this.utils.calculateReadingTime(blog.content);

          window.scrollTo({ top: 0, behavior: 'auto' });
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
}
