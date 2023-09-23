import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService
  ){ }

  ngOnInit() {
    // Initialize the productForm with form controls and validators
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]], // Added Validators
      description: ['', [Validators.required, Validators.maxLength(50)]], // Added Validators
      price: ['', [Validators.required, Validators.min(0)]], // Added Validators
      quantity: ['', [Validators.required, Validators.min(0)]], // Added Validators
    });
  }

  submitForm() {
    if (this.productForm.valid) { // Check if form is valid
      // Send the form data to the CRUD service for creating a product
      this.crudService.create(this.productForm.value).subscribe(res => {
        console.log('Product created!');
        // Redirect to the home page after successful creation
        this.router.navigateByUrl('/crud/home');
      });
    } else {
      console.error('Invalid form data');
    }
  }

  cancel() {
    this.router.navigate(['/crud/home']);
  }
}
