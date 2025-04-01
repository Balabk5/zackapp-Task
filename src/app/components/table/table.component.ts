import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Product } from '../../models/product.model';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule, ButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  
  @Input() products: Product[] = []
  constructor(private router: Router) {}

  getInputSearchValue(event: Event) {
    return (event.target as HTMLInputElement).value
  }
  
  navToAddProduct(){
    this.router.navigate(['/add-products']);
  }

}
