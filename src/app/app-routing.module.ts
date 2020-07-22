import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent } from './news/news.component';
import { NewestComponent } from './newest/newest.component';
import { ThreadsComponent } from './threads/threads.component';
import { AskOnlyComponent } from './ask-only/ask-only.component';
import { SubmitComponent } from './submit/submit.component';
import { SubmittedComponent } from './submitted/submitted.component';
import { UpvotedCommentsComponent } from './upvoted-comments/upvoted-comments.component';
import { UpvotedSubmissionsComponent } from './upvoted-submissions/upvoted-submissions.component';
import { ContributionInfoComponent } from './contribution-info/contribution-info.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ReplyComponent } from './reply/reply.component';

const routes: Routes = [
  { path: '',                             component: NewsComponent,               },
  { path: 'news',                         component: NewsComponent,               },
  { path: 'newest',                       component: NewestComponent,             },
  { path: 'askonly',                      component: AskOnlyComponent             },
  { path: 'submit',                       component: SubmitComponent              },
  { path: 'submitted/:email',             component: SubmittedComponent           },
  { path: 'threads/:email',               component: ThreadsComponent,            },
  { path: 'upvotedsubmissions',           component: UpvotedSubmissionsComponent  },
  { path: 'upvotedcomments',              component: UpvotedCommentsComponent     },
  { path: 'userinfo/:email',              component: UserInfoComponent            },
  { path: 'contributioninfo/:id',         component: ContributionInfoComponent    },
  { path: 'reply/:id',                    component: ReplyComponent               },

];


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
