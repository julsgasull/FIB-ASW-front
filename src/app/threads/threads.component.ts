import { Component, OnInit } from '@angular/core';
import { FirebaseUserModel } from '../core/user.model';
import { Contribution } from '../models/contribution.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { UserService } from '../services/user/user.service';
import { ContributionService } from '../services/contribution/contribution.service';
import { FirebaseUserService } from '../core/user.service';

@Component({
  selector: 'app-threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {
    
  public loggedUser:        FirebaseUserModel = new FirebaseUserModel();
  public requestedUser:     FirebaseUserModel = new FirebaseUserModel();
  
  public logged:            boolean           = false;
  public sameUser:          boolean           = false;

  public contributions:     Contribution[];
  public numContributions:  number            = 0;


  constructor(
    private route:                Router,
    private contributionService:  ContributionService,
    private authService:          AuthService,
    private userService:          UserService,
    private activatedRoute:       ActivatedRoute,
    private firebaseUserService:  FirebaseUserService
  ) { this.loggedUser.email = localStorage.getItem('loggedUserEmail'); }

  ngOnInit(): void {
    // requested user
    this.requestedUser.email = this.activatedRoute.snapshot.paramMap.get("email");
    this.userService.getByEmail(this.requestedUser.email).subscribe((response: FirebaseUserModel) => {
      this.requestedUser = response;      console.log("requestedUser", this.requestedUser);
      if (this.loggedUser.email != "") {
        this.logged = true;
        if (this.requestedUser.email == this.loggedUser.email) this.sameUser = true;  // same user
        this.userService.getByEmail(this.loggedUser.email).subscribe((response: FirebaseUserModel) => {
          this.loggedUser = response;     console.log("loggedUser", this.loggedUser);
          this.contributionService.getThreadsRelatedToUser(this.requestedUser.id, this.loggedUser.id, this.loggedUser.api_key).subscribe((response: any)=>{
            this.contributions = response;
            this.numContributions = this.contributions.length;
          })
        })
      } 
      else {
        this.logged = false;
        this.sameUser = false;
        this.contributionService.getThreads(this.requestedUser.id).subscribe((response: any)=>{
          console.log("threads", response);
          this.contributions = response;
        })
      }
    });
  }
  vote(contribution_id: number) {
    this.contributionService.voteContribution(contribution_id, this.loggedUser.api_key).subscribe((response)=>{
      location.reload();
    });
  }  
  unvote(contribution_id: number) {
    this.contributionService.unvoteContribution(contribution_id, this.loggedUser.api_key).subscribe((response)=>{
      location.reload();
    });
  }
  delete(contribution_id: number) {
    if (confirm("Are you sure?")) {
      this.contributionService.deleteContribution(contribution_id, this.loggedUser.api_key).subscribe((response) => {
        location.reload();
      });
    }
  }

  redirectToNews()                                { this.route.navigate(['/news']);                            }
  redirectToNewest()                              { this.route.navigate(['/newest']);                          }
  redirectToAskOnly()                             { this.route.navigate(['/askonly']);                         }
  redirectToSubmit()                              { this.route.navigate(['/submit']);                          }

  redirectToContributionInfo(id: number)          { this.route.navigate(['/contributioninfo', id])             }
  redirectToUserInfo(useremail: string)           { this.route.navigate(['/userinfo', useremail])              }
  redirectToReply(id: number)                     { this.route.navigate(['/reply', id])                        }
  
  redirectToThreads(useremail: string)            { this.route.navigate(['/threads', useremail])               }
  redirectToSubmitted(useremail: string)          { this.route.navigate(['/submitted', useremail])             }
  redirectToUpvotedSubmissions()                  { this.route.navigate(['/upvotedsubmissions'])               }
  redirectToUpvotedComments()                     { this.route.navigate(['/upvotedcomments'])                  }
  
  redirectToLogin()   {
    this.authService.doGoogleAuth()
    .then(
      res => {
        localStorage.setItem('loggedUserEmail', res.additionalUserInfo.profile.email);
        location.reload();
      },
      err => {
        localStorage.setItem('loggedUserEmail', "");
        console.log(err)
        location.reload();
      }
    )
  }
  logout() {
    this.authService.doLogout().then(
      res => {
        localStorage.setItem('loggedUserEmail', "");
        location.reload();
      },
      err => {
        this.firebaseUserService.getCurrentUser().then(
          res => {
            localStorage.setItem('loggedUserEmail', "");
            location.reload();
          }
        )
      }
    )
  }
}
