import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { ProdutsService } from '../../services/produts.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.scss'
})
export class ProductListingComponent {
  listOfProducts: Product[] = []
  constructor(private productService: ProdutsService){

  }
  ngOnInit(){
    this.productService.getProductData().subscribe({
      next:(products)=>{
        this.listOfProducts = products
        this.productService.setProductCount(this.listOfProducts.length)
      },
      error:(err)=>{
        console.error(err);
        
      }
    })
  }

}
