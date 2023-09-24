import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  productForm!: FormGroup;
  formSubmitted = false; // New property to track whether the form has been submitted

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CrudService
  ) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]],
    });
  }

  submitForm() {
    this.formSubmitted = true; // Set formSubmitted to true when the form is submitted
    if (this.productForm.valid) {
      this.crudService.create(this.productForm.value).subscribe((res) => {
        console.log('Product created!');
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
