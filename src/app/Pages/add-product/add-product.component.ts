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

  constructor(private fb: FormBuilder, private productService: ProdutsService) {}
  categories = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Home Appliances', value: 'home-appliances' },
    { label: 'Books', value: 'books' },
    { label: 'Toys', value: 'toys' }
  ];

  ngOnInit():void{
    this.productService.productCount$.subscribe((count) => {
      this.productCount = count;
    });
    this.productForm = this.fb.group({
      id: [{value:this.productCount + 1, disabled: true}],
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: [
        '',
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
    } else {
      console.log('Form is invalid');
    }
  }

}
