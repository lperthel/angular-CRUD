import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { Product } from '../product';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  @ViewChild('startReadingHere') startReadingHere!: ElementRef;

  constructor(public crudService: CrudService, private router: Router) {}

  ngAfterViewInit() {
    this.startReadingHere.nativeElement.focus();
  }

  ngOnInit() {
    this.crudService.getAll().subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;
    });
  }

  deleteProduct(id: number) {
    this.crudService.delete(id.toString()).subscribe((res) => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }
}
