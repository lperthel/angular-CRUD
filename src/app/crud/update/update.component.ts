import { Component } from '@angular/core';
import { Product } from '../product';
import { CrudService } from '../crud.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  product!: Product;

  constructor(
    public crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['productId']; // Access productId from route parameters
      
      if (productId) {
        this.crudService.getById(productId).subscribe((data: Product) => {
          this.product = data;
        });
      }
    });
  }

  updateProduct() {
    if (this.product && this.product.id) {
      this.crudService.update(this.product.id.toString(), this.product).subscribe(updatedProduct => {
        console.log('Product updated', updatedProduct);
        this.router.navigate(['/crud/home']);
      });
    }
  }
    cancel() {
      this.router.navigate(['/crud/home']);
        }
}
