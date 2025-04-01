import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, IconFieldModule, InputIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  
  @Input() products: Product[] = []

}
