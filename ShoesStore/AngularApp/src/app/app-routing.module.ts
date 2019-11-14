import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { ShoesComponent } from './components/shoes/shoes.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { HistoryComponent } from './components/history/history.component';
import { AdminComponent } from './components/admin/admin.component';
import { CreateshoesComponent } from './components/createshoes/createshoes.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch: 'full' },
  {  path: 'shoes/:id', component: ShoesComponent, pathMatch: 'full' },
  {  path: 'profile', component: ProfileComponent, pathMatch: 'full',
  canActivate: [AuthGuard] },
  {  path: 'cart', component: CartComponent, pathMatch: 'full',
  canActivate: [AuthGuard] },
  {  path: 'history', component: HistoryComponent, pathMatch: 'full',
  canActivate: [AuthGuard] },
  {  path: 'admin', component: AdminComponent, pathMatch: 'full' },
  {  path: 'createShoes', component: CreateshoesComponent, pathMatch: 'full' },
];
// Code tuần 1

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
