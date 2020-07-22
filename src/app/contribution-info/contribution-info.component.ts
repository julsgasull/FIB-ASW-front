import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.interface';
import { Contribution } from '../models/contribution.model';
import { ContributionService } from '../services/contribution/contribution.service';
import { FirebaseUserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../core/user.model';
import { UserService } from '../services/user/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-contribution-info',
  templateUrl: './contribution-info.component.html',
  styleUrls: ['./contribution-info.component.css']
})
export class ContributionInfoComponent implements OnInit {

  public loggedUser:        FirebaseUserModel = new FirebaseUserModel();
  public contribution:      Contribution      = new Contribution();
  public logged:            boolean           = false;
  public isSubmitted:       boolean           = false;
  public commentForm:        FormGroup;

  constructor(
    private route:                Router,
    private contributionService:  ContributionService,
    private authService:          AuthService,
    private activatedRoute:       ActivatedRoute,
    private userService:          UserService,
    private formBuilder:          FormBuilder,
    private firebaseUserService:  FirebaseUserService
  ) { 
    this.loggedUser.email = localStorage.getItem('loggedUserEmail'); 
    this.contribution.id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"), 10); 
    console.log("info about", this.contribution.id);
  }

  ngOnInit(): void {
    // if the user is logged
    if (this.loggedUser.email != "") {
      this.logged = true;
      // get user
      this.userService.getByEmail(this.loggedUser.email).subscribe((response:FirebaseUserModel) => {
        this.loggedUser = response;
        this.contributionService.getContributionByIdRelatedToUser(this.contribution.id, this.loggedUser.id).subscribe((response: Contribution) => {
          this.contribution = response;
          console.log("contribution", this.contribution);
        })
      })
    } 
    // if there is no user
    else { 
      this.logged = false;
      this.contributionService.getContributionById(this.contribution.id).subscribe((response: Contribution) => {
        this.contribution = response;
        console.log("contribution", this.contribution);
      })
    }

    //form
    this.commentForm = this.formBuilder.group({comment:['', ] });
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.commentForm.valid) {
      this.contributionService.addComment(this.contribution.id, this.createCommentForm(), this.loggedUser.api_key).subscribe((response: Contribution) => {
        this.redirectToContributionInfo(this.contribution.id);
      })
    } else {
      alert("your commnent could not be created, try again.")
    }
  }

  private createCommentForm(): Contribution {
    const commentFormValue = JSON.parse(JSON.stringify(this.commentForm.value));
    var comment: Contribution = new Contribution();
    comment.content           = commentFormValue.comment;
    console.log("mycomment", comment);
    return comment;
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

  redirectToContributionInfo(id: number)          { 
    this.route.navigate(['/contributioninfo', id]).then(
      nav => { location.reload()}, err => {
    });
  }
  redirectToReply(id: number)                     { this.route.navigate(['/reply', id])                         }

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

  get formControls() { return this.commentForm.controls; }

}
