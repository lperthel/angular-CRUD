import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CrudService } from '../crud.service';
import { Product } from '../product';
import { UpdateComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;
  let crudService: jasmine.SpyObj<CrudService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;
  const fb: FormBuilder = new FormBuilder();

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 10,
    quantity: 5,
  };

  beforeEach(() => {
    crudService = jasmine.createSpyObj('CrudService', ['getById', 'update']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    activatedRoute = { params: of({ productId: '1' }) } as any;
    TestBed.configureTestingModule({
      declarations: [UpdateComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: CrudService, useValue: crudService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: FormBuilder, useValue: fb },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    crudService.getById.and.returnValue(of(mockProduct));
    crudService.update.and.returnValue(of(mockProduct));
    fixture.detectChanges();
  });

  describe('Update Component tests', () => {
    it('should initialize form with product data', () => {
      const productForm: FormGroup = fb.group({
        name: 'Test Product',
        description: 'Test Description',
        price: 10,
        quantity: 5,
      });
      expect(component.productForm.value).toEqual(productForm.value);
      expect(component.initialProduct).toEqual(mockProduct);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should not update product if form is invalid', () => {
      component.productForm.controls['name'].setValue('');
      component.updateProduct();
      expect(crudService.update).not.toHaveBeenCalled();
    });

    it('should update product and navigate to home if form is valid', () => {
      component.productForm.controls['name'].setValue('Updated Product');
      component.updateProduct();
      expect(crudService.update).toHaveBeenCalledWith('1', jasmine.any(Object));
      expect(router.navigate).toHaveBeenCalledWith(['/crud/home']);
    });

    it('should navigate to home on cancel', () => {
      component.cancel();
      expect(router.navigate).toHaveBeenCalledWith(['/crud/home']);
    });
  });
});
