import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardDetailComponent } from './card-detail/card-detail.component';


//path is the URL, equivalent to localhost:4200/cards.
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'cards', component: CardsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: CardDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
