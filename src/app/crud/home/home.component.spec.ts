import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CrudService } from '../crud.service';
import { Product } from '../product';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let crudService: jasmine.SpyObj<CrudService>;
  let router: jasmine.SpyObj<Router>;

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      quantity: 10,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 200,
      quantity: 20,
    },
  ];

  beforeEach(async () => {
    crudService = jasmine.createSpyObj('CrudService', ['getAll', 'delete']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: CrudService, useValue: crudService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    crudService.getAll.and.returnValue(of(mockProducts));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all products on init', () => {
    crudService.getAll.and.returnValue(of(mockProducts));
    component.ngOnInit();
    expect(component.products).toEqual(mockProducts);
  });

  it('should delete a product and navigate to /crud/home', () => {
    const productId = 1;
    crudService.delete.and.returnValue(of<Product>(null!));
    component.products = [...mockProducts];
    component.deleteProduct(productId);
    expect(
      component.products.some((product) => product.id === productId)
    ).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/crud/home']);
  });
});
