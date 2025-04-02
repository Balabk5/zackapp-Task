import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AddProductComponent } from './Pages/add-product/add-product.component';
import { ProductListingComponent } from './Pages/product-listing/product-listing.component';

export const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'products', component: ProductListingComponent },
    { path: 'products/add-products', component: AddProductComponent },
    { path: 'products/edit-product/:id', component: AddProductComponent },
  ];
  

  export const appRouter = provideRouter(routes); // Provide router configuration
