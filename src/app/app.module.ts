// Imports.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Components.
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { StreamComponent } from './main/stream/stream.component';
import { VideoComponent } from './main/stream/video/video.component';
import { ChatComponent } from './main/stream/chat/chat.component';
import { AccountDetailsComponent } from './main/account/account-details/account-details.component';
import { HomeComponent } from './main/home/home.component';
import { StreamsComponent } from './main/streams/streams.component';
import { SinglestreamComponent } from './main/streams/singlestream/singlestream.component';
import { FooterComponent } from './main/footer/footer.component';


// Services.
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_services/auth-guard.service';
import { EncryptionService } from './_services/encryption.service';
import { ChatService } from './_services/chat.service';
import {StreamService} from './_services/stream.service';
import { DropdownDirective } from './_shared/dropdown.directive';
import { AuthInterceptor } from './_interceptors/auth.interceptor';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { VideoplayerDirective } from './_directives/videoplayer.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    AuthComponent,
    LoginComponent,
    HeaderComponent,
    DropdownDirective,
    AccountDetailsComponent,
    HomeComponent,
    StreamsComponent,
    SinglestreamComponent,
    FooterComponent,
    StreamComponent,
    VideoComponent,
    ChatComponent,
    VideoplayerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    RouterModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  entryComponents: [
    AccountDetailsComponent
  ],
  providers: [
    AuthService,
    AuthGuard,
    EncryptionService,
    ChatService,
    EncryptionService,
    StreamService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {hasBackDrop: false}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
