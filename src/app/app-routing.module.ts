import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {NgModule} from '@angular/core';
import {AuthGuard} from './_services/auth-guard.service';
import {MainComponent} from './main/main.component';
import {HomeComponent} from './main/home/home.component';
import {StreamsComponent} from './main/streams/streams.component';
import { StreamComponent } from './main/stream/stream.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: '', canActivate: [AuthGuard], component: MainComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'streams', component: StreamsComponent},
      {path: 'stream', component: StreamComponent},
      {path: 'stream/:username', component: StreamComponent}
    ]},

  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
