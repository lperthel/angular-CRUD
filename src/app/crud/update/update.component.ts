import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { Product } from '../product';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  productForm!: FormGroup;
  product!: Product;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });

    this.route.params.subscribe(params => {
      const productId = params['productId'];
      if (productId) {
        this.crudService.getById(productId).subscribe((data: Product) => {
          this.product = data;
          this.productForm.patchValue(data); // Update formGroup with product data
        });
      }
    });
  }

  updateProduct() {
    if (this.productForm.valid && this.product && this.product.id) {
      const updatedProduct = { ...this.product, ...this.productForm.value };
      this.crudService.update(this.product.id.toString(), updatedProduct).subscribe(() => {
        console.log('Product updated', updatedProduct);
        this.router.navigate(['/crud/home']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/crud/home']);
  }
}
