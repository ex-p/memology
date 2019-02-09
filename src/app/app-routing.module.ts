import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {MemComponent} from './mem/mem.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AnonGuard} from './auth/anon.guard';

const routes: Routes = [
    {
        path: '',
        component: MemComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [AnonGuard]
    },
    {
        path: '**',
        redirectTo: '',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
