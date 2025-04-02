import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AddProductComponent } from './Pages/add-product/add-product.component';
import { ProductListingComponent } from './Pages/product-listing/product-listing.component';

export const routes: Routes = [
    { path: '', component: ProductListingComponent },
    { path: 'add-products', component: AddProductComponent },
    { path: 'edit-product/:id', component: AddProductComponent },
  ];
  

  export const appRouter = provideRouter(routes); // Provide router configuration
