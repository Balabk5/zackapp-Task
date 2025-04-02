import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, SelectModule, CommonModule, ButtonModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  
  @Input() products: Product[] = []
  @Output() ondeleteProduct = new EventEmitter<number>();

  constructor(private router: Router, private confirmationService: ConfirmationService) {}

  getInputSearchValue(event: Event) {
    return (event.target as HTMLInputElement).value
  }
  
  navToAddProduct(){
    this.router.navigate(['/products/add-products']);
  }

  editRow(product: Product){
    this.router.navigate(['/products/edit-product', product.id]);
  }
  
  
  deleteRow(product: Product){
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Please confirm to proceed moving forward.',
      icon: 'pi pi-exclamation-circle',
      rejectButtonProps: {
          label: 'Cancel',
          icon: 'pi pi-times',
          outlined: true,
          size: 'small'
      },
      acceptButtonProps: {
          label: 'delete',
          icon: 'pi pi-check',
          size: 'small'
      },
      accept: () => {
          // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
          this.ondeleteProduct.emit(product.id)
      },
      reject: () => {
          // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
  });
  }


}
