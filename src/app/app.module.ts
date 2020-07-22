import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { NewestComponent } from './newest/newest.component';
import { ThreadsComponent } from './threads/threads.component';
import { AskOnlyComponent } from './ask-only/ask-only.component';
import { SubmitComponent } from './submit/submit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { CustomFormsModule } from 'ng2-validation';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ContributionService } from './services/contribution/contribution.service';
import { ContributionRemote } from './services/contribution/contribution.remote';
import { UserRemote } from './services/user/user.remote';
import { UserService } from './services/user/user.service';
import { SubmittedComponent } from './submitted/submitted.component';
import { UpvotedSubmissionsComponent } from './upvoted-submissions/upvoted-submissions.component';
import { UpvotedCommentsComponent } from './upvoted-comments/upvoted-comments.component';
import { ContributionInfoComponent } from './contribution-info/contribution-info.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ReplyComponent } from './reply/reply.component';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NewestComponent,
    ThreadsComponent,
    AskOnlyComponent,
    SubmitComponent,
    DateAgoPipe,
    SubmittedComponent,
    UpvotedSubmissionsComponent,
    UpvotedCommentsComponent,
    ContributionInfoComponent,
    UserInfoComponent,
    ReplyComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    HttpClientModule
  ],
  providers: [
    ContributionRemote,
    ContributionService,
    UserRemote,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}