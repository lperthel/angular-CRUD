import { NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes,PRIMARY_OUTLET, NavigationEnd, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { Injectable } from '@angular/core';

const CRUD_PATH = 'crud';
const DEFAULT_TITLE_SUFFIX = ' - lperthel\'s Prodcut Inventory';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(private titleService: Title, private router: Router, private route: ActivatedRoute) {
    this.setupTitleOnNavigation();
  }

  private setupTitleOnNavigation(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const title = this.getTitleFromRoute(this.route.root) + DEFAULT_TITLE_SUFFIX;
      this.titleService.setTitle(title);
    });
  }

  private getTitleFromRoute(route: ActivatedRoute): string {
    const title = route.snapshot.data?.['title'];
    if (title) return title;

    const childWithTitle = route.children.find(child => child.outlet === PRIMARY_OUTLET && 'title' in child.snapshot.data);
    return childWithTitle ? childWithTitle.snapshot.data?.['title'] : '';
  }
}

const routes: Routes = [
  { path: CRUD_PATH, redirectTo: `${CRUD_PATH}/home`, pathMatch: 'full' },
  { path: `${CRUD_PATH}/home`, component: HomeComponent, data: { title: 'All Products' } },
  { path: `${CRUD_PATH}/details/:productId`, component: DetailsComponent, data: { title: 'View Product Details' } },
  { path: `${CRUD_PATH}/create`, component: CreateComponent, data: { title: 'Create a New Product' } },
  { path: `${CRUD_PATH}/update/:productId`, component: UpdateComponent, data: { title: 'Update Product' } }
] as Readonly<Route>[];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule {}
