import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../../components/header.component/header.component';
import { RouterModule } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavContent } from '@angular/material/sidenav';
import { ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer.component/footer.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    HeaderComponent,
    MatIconModule,
    RouterModule,
    MatSidenavContent,
    CommonModule,
    FooterComponent
],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild(MatSidenavContent)
  sidenavContent!: MatSidenavContent;
  showScrollButton = false;

  ngAfterViewInit() {
    this.sidenavContent.elementScrolled().subscribe(() => {
      const scrollPosition = this.sidenavContent.measureScrollOffset('top');
      this.showScrollButton = scrollPosition > 10;
      console.log(scrollPosition);
    });
  }

  scrollToTop() {
    this.sidenavContent.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}


