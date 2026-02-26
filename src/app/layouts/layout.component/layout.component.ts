import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../../components/header.component/header.component';
import { RouterModule } from "@angular/router";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatSidenavModule,
    HeaderComponent,
    RouterModule
],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}