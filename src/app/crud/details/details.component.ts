import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { CrudService } from '../crud.service';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product!: Product;

  constructor(
    public crudService: CrudService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['productId']; // Access productId from route parameters
      console.log(productId); // Log the productId to the console
      
      if (productId) {
        this.crudService.getById(productId).subscribe((data: Product) => {
          console.log(data);
          this.product = data;
        });
      }
    });
  }
  
}
