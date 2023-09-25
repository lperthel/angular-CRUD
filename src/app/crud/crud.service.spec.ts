import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CrudService } from './crud.service';
import { Product } from './product';

describe('CrudService', () => {
  let service: CrudService;
  let httpMock: HttpTestingController;
  const apiServer = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrudService],
    });

    service = TestBed.inject(CrudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a product', () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Test',
      description: 'Test Product',
      price: 100,
      quantity: 10,
    };
    service.create(mockProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${apiServer}/products/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockProduct);
  });

  it('should get a product by id', () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Test',
      description: 'Test Product',
      price: 100,
      quantity: 10,
    };
    service.getById('1').subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${apiServer}/products/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should get all products', () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: 'Test 1',
        description: 'Test Product 1',
        price: 100,
        quantity: 10,
      },
      {
        id: 2,
        name: 'Test 2',
        description: 'Test Product 2',
        price: 200,
        quantity: 20,
      },
    ];
    service.getAll().subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${apiServer}/products/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should update a product', () => {
    const mockProduct: Product = {
      id: 1,
      name: 'Updated Test',
      description: 'Updated Test Product',
      price: 150,
      quantity: 15,
    };
    service.update('1', mockProduct).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${apiServer}/products/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockProduct);
  });

  it('should delete a product', () => {
    service.delete('1').subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiServer}/products/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
