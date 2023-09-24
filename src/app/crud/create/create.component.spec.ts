import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CrudService } from '../crud.service';
import { Product } from '../product';
import { CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let crudService: jasmine.SpyObj<CrudService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    crudService = jasmine.createSpyObj('CrudService', ['create']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);

    TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: CrudService, useValue: crudService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('Create Component Tests', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    it('should initialize form group and form controls', () => {
      expect(component.productForm).toBeDefined();
      expect(component.productForm.get('name')).toBeDefined();
      expect(component.productForm.get('description')).toBeDefined();
      expect(component.productForm.get('price')).toBeDefined();
      expect(component.productForm.get('quantity')).toBeDefined();
    });
    it('should not submit form if form is invalid', () => {
      spyOn(console, 'error');
      component.productForm.setValue({
        name: '',
        description: '',
        price: -1,
        quantity: -1,
      });
      component.submitForm();
      expect(crudService.create).not.toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledWith('Invalid form data');
    });
    it('should return false if form control is invalid and not touched', () => {
      component.productForm.setValue({
        name: '',
        description: '',
        price: '',
        quantity: '',
      });
      expect(component.isInvalid('name')).toBeFalse();
    });
    it('should return false if form control is valid and not touched', () => {
      component.productForm.setValue({
        name: 'Test Product',
        description: 'Test Description',
        price: 10,
        quantity: 5,
      });
      expect(component.isInvalid('name')).toBeFalse();
    });
    it('should navigate to home on cancel', () => {
      component.cancel();
      expect(router.navigate).toHaveBeenCalledOnceWith(['/crud/home']);
    });
    it('should not submit form if form is invalid', () => {
      const formControl = component.productForm.get('name');
      if (!formControl) {
        fail('Form control does not exist');
        return;
      }
      component.productForm.setValue({
        name: '',
        description: '',
        price: '',
        quantity: '',
      });

      component.submitForm();

      expect(crudService.create).not.toHaveBeenCalled();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });
    it('should return true if form control is invalid and touched', () => {
      component.productForm.setValue({
        name: '',
        description: '',
        price: '',
        quantity: '',
      });
      component.productForm.get('name')?.markAsTouched();
      expect(component.isInvalid('name')).toBeTrue();
    });
    it('should submit form and navigate to home if form is valid', () => {
      const product: Product = {
        id: 0,
        name: 'Test Product',
        description: 'Test Description',
        price: 10,
        quantity: 5,
      };
      crudService.create.and.returnValue(of(product));
      component.productForm.setValue(product);

      component.submitForm();

      expect(crudService.create).toHaveBeenCalledWith(product);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/crud/home');
    });
  });
});
