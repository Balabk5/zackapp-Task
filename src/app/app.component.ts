import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProductListingComponent } from './Pages/product-listing/product-listing.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zakapps';
}
