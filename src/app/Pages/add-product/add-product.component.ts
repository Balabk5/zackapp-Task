import { Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common'; 
import { DropdownModule } from 'primeng/dropdown';
import { ProdutsService } from '../../services/produts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';




@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule,TextareaModule,InputNumberModule,MessageModule, ButtonModule, CommonModule, DropdownModule ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  productForm!: FormGroup;
  productCount: number = 0;
  productId!: number;
  isEditMode: boolean = false;
  private destroy$ = new Subject<void>();



  constructor(private fb: FormBuilder, private productService: ProdutsService, private router: Router, private route: ActivatedRoute) {}
  categories = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Home Appliances', value: 'home-appliances' },
    { label: 'Books', value: 'books' },
    { label: 'Toys', value: 'toys' }
  ];

  ngOnInit(): void {
    // Check the current route
    this.route.url.pipe(takeUntil(this.destroy$)).subscribe((urlSegment) => {
      const isAddRoute = urlSegment.some(segment => segment.path === 'add-products');
      this.isEditMode = !isAddRoute; // True if it's an edit route

      if (isAddRoute) {
        // If route is "add-product", get the product count
        this.productService.productCount$
          .pipe(takeUntil(this.destroy$))
          .subscribe((count) => {
            this.productCount = count + 1;
            this.initializeForm(); // Call form init after setting count
          });
      } else {
        // If route is "edit-product/:id", get the product ID
        this.productId = Number(this.route.snapshot.paramMap.get('id'));
        this.productCount = this.productId; // Using product ID for form
         // Fetch the product list and find the product by ID
         this.productService.Product$
         .pipe(takeUntil(this.destroy$))
         .subscribe((products) => {
           const productToEdit = products.find(p => p.id === this.productId);
           console.log(productToEdit);
           
           if (productToEdit) {
             // Initialize the form with the product data
             this.initializeForm(productToEdit);
           }
         });
        // this.initializeForm(); // Call form init after setting ID
      }
    });
  }
  private initializeForm(product?: Product): void {
    this.productForm = this.fb.group({
      id: [{ value: product?.id || this.productCount, disabled: false }],
      title: [product?.title || '', Validators.required],
      price: [product?.price || '', [Validators.required, Validators.min(0)]],
      description: [product?.description || '', Validators.required],
      category: [product?.category || '', Validators.required],
      image: [
        product?.image || '',
        [
          Validators.required,
          Validators.pattern(
            /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/ // ✅ URL validation regex
          ),
        ],
      ],
    });
  }


  onSubmit(): void {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      if(this.isEditMode){
        console.log(' edit works');
        
        this.productService.setEditProduct(this.productForm.value)
      }else{
        this.productService.setAddProduct(this.productForm.value)
      }
      this.router.navigate(['']);
    } else {
      console.log('Form is invalid');
    }
  }



}
