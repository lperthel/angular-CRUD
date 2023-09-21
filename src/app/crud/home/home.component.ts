import { Component, OnInit } from '@angular/core';
import { CrudService }  from '../crud.service';
import { Product } from '../product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  products: Product[] = [];

  constructor(public crudService: CrudService,private router: Router) { }

  ngOnInit() {

    this.crudService.getAll().subscribe((data: Product[])=>{
      console.log(data);
      this.products = data;
    })  
  }

  deleteProduct(id:number) {
    this.crudService.delete(id.toString()).subscribe(res => {
         console.log('Product deleted successfully!');
         this.products = this.products.filter(product => product.id !== id);
         this.router.navigate(['/crud/home']);
    })
  }
}
