import { Component, OnInit } from '@angular/core';
import { Contribution } from '../models/contribution.model';
import { ContributionService } from '../services/contribution/contribution.service';
import { FirebaseUserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { FirebaseUserModel } from '../core/user.model';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-ask-only',
  templateUrl: './ask-only.component.html',
  styleUrls: ['./ask-only.component.css']
})
export class AskOnlyComponent implements OnInit {

  public userInfo:          FirebaseUserModel = new FirebaseUserModel();
  public contributions:     Contribution[];
  public logged:            boolean           = false;

 constructor (
    private route:                Router,
    private contributionService:  ContributionService,
    private authService:          AuthService,
    private userService:          UserService,
    private firebaseUserService:  FirebaseUserService
  ) { this.userInfo.email = localStorage.getItem('loggedUserEmail'); }


  ngOnInit(): void {
    // if the user is logged
    if (this.userInfo.email != "") {
      this.logged = true;   console.log("logged user:", this.userInfo.email); 
      // get user
      this.userService.getByEmail(this.userInfo.email).subscribe((response:FirebaseUserModel) => {
        this.userInfo = response;
        this.contributionService.getAskRelatedToUser(this.userInfo.id).subscribe((response: Contribution[]) => {
          this.contributions = response; 
          console.log("contribucions related to user", this.userInfo.email, ":", this.contributions);
        })
      })
    } 
    // if there is no user
    else { 
      this.logged = false;    console.log("no logged user"); 
      this.contributionService.getAskOnly().subscribe((response: Array<Contribution[]>) => {
        this.contributions = response[0]; 
        console.log("contribucions with no user:", this.contributions);
      })
    }
  }

  vote(contribution_id: number) {
    this.contributionService.voteContribution(contribution_id, this.userInfo.api_key).subscribe((response)=>{
      location.reload();
    });
  }  
  unvote(contribution_id: number) {
    this.contributionService.unvoteContribution(contribution_id, this.userInfo.api_key).subscribe((response)=>{
      location.reload();
    });
  }
  delete(contribution_id: number) {
    if (confirm("Are you sure?")) {
      this.contributionService.deleteContribution(contribution_id, this.userInfo.api_key).subscribe((response) => {
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
