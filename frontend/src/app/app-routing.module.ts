import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginAuthGuard, RoomAuthGuard } from './_helpers';


const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./user/user.module').then(x => x.UsersModule);
const roomModule = () => import('./slateroom/slateroom.module').then(x => x.RoomModule);

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [LoginAuthGuard, RoomAuthGuard] },
    { path: 'users', loadChildren: usersModule, canActivate: [LoginAuthGuard, RoomAuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'room', loadChildren: roomModule, canActivate: [LoginAuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation : 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
