import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { CrudService } from '../crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product!: Product;
  errorMessage: string | null = null; // Initialize errorMessage to null

  constructor(
    public crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['productId'];
      
      if (productId) {
        this.crudService.getById(productId).subscribe(
          (data: Product) => {
            this.product = data;
          },
          (error) => {
            console.error('Error fetching product details', error);
            this.errorMessage = 'Error fetching product details. Please try again later.'; // Set errorMessage on error
          }
        );
      }
    });
  }

  cancel() {
    this.router.navigate(['/crud/home']);
  }

  get isError(): boolean {
    return this.errorMessage !== null;
  }
  
}
