import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CrudService } from '../crud.service';
import { Product } from '../product';
import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let crudService: jasmine.SpyObj<CrudService>;
  let activatedRoute: ActivatedRoute;
  let router: jasmine.SpyObj<Router>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 10,
    quantity: 5,
  };

  beforeEach(async () => {
    crudService = jasmine.createSpyObj('CrudService', ['getById']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [
        { provide: CrudService, useValue: crudService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: { params: of({ productId: '1' }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    crudService.getById.and.returnValue(of(mockProduct));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product details on init', () => {
    component.ngOnInit();
    expect(component.product).toEqual(mockProduct);
  });

  it('should set error to true if fetching product details fails', () => {
    crudService.getById.and.returnValue(throwError('Error'));
    component.ngOnInit();
    expect(component.error).toBeTrue();
  });

  it('should navigate to /crud/home when cancel is called', () => {
    component.cancel();
    expect(router.navigate).toHaveBeenCalledWith(['/crud/home']);
  });
});
