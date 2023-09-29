import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { Product } from '../product';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  @ViewChild('startReadingHere') startReadingHere!: ElementRef;
  product!: Product;
  errorMessage: string =
    'Error fetching product details. Please try again later.'; // Initialize errorMessage to null
  error: boolean | null = false;

  constructor(
    public crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngAfterViewInit() {
    this.startReadingHere.nativeElement.focus();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productId = params['productId'];

      if (productId) {
        this.crudService.getById(productId).subscribe(
          (data: Product) => {
            this.product = data;
          },
          (error) => {
            console.error('Error fetching product details!!!!!', error);
            this.error = true;
          }
        );
      }
    });
  }

  cancel() {
    this.router.navigate(['/crud/home']);
  }
}
