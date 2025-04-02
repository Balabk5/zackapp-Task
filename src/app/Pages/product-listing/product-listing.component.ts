import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { ProdutsService } from '../../services/produts.service';
import { Product } from '../../models/product.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss'
})
export class ProductListingComponent {
  listOfProducts: Product[] = []
  private destroy$ = new Subject<void>();

  constructor(private productService: ProdutsService){

  }
  ngOnInit(){
    this.productService.getProductData()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (products) => {
        this.listOfProducts = products;

        this.productService.setProductCount(this.listOfProducts.length);
        this.productService.setProducts(this.listOfProducts)
        this.addProduct()
        this.updateProduct()
      },
      error: (err) => {
        console.error(err);
      }
    });
}

  addProduct(){
    this.productService.addProduct$.pipe(takeUntil(this.destroy$)).subscribe({
      next:(product)=>{
        this.listOfProducts.push(product)        
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  updateProduct() {
    this.productService.editProduct$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (updatedProduct: Product) => {
          // Find the product by id in the list of products and update it
          const index = this.listOfProducts.findIndex(product => product.id === updatedProduct.id);
          console.log(updatedProduct);
          
          
          if (index !== -1) {
            // Replace the existing product with the updated one
            this.listOfProducts[index] = updatedProduct;
          }
          console.log(this.listOfProducts, index);
          
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  handleDeleteProduct(productId: number): void {
    this.listOfProducts = this.listOfProducts.filter(product => product.id !== productId);
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete();
  }


}
