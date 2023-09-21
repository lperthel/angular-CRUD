import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService
  ){ }

  ngOnInit() {
    // Initialize the productForm with form controls
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      quantity: [''],    
    });
  }

  submitForm() {
    // Send the form data to the CRUD service for creating a product
    this.crudService.create(this.productForm.value).subscribe(res => {
      console.log('Product created!');
      // Redirect to the home page after successful creation
      this.router.navigateByUrl('/crud/home');
    });
  }
}
