import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { FirebaseUserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { UserService } from '../services/user/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FirebaseUserModel } from '../core/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {

  public userForm:          FormGroup;
  
  public loggedUser:        FirebaseUserModel = new FirebaseUserModel();
  public requestedUser:     FirebaseUserModel = new FirebaseUserModel();

  public logged:            boolean           = false;
  public sameUser:          boolean           = false;
  public isSubmitted:       boolean           = false;

  constructor (
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private firebaseUserService: FirebaseUserService,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { this.loggedUser.email = localStorage.getItem('loggedUserEmail'); }

  ngOnInit(): void {
    // requested user
    this.requestedUser.email = this.activatedRoute.snapshot.paramMap.get("email");
    this.userService.getByEmail(this.requestedUser.email).subscribe((response: FirebaseUserModel) => {
      this.requestedUser = response;
      console.log("requestedUser", this.requestedUser);
    });

    // logged user
    if (this.loggedUser.email != "") {
      this.logged = true;
      this.userService.getByEmail(this.loggedUser.email).subscribe((response: FirebaseUserModel) => {
        this.loggedUser = response;
        console.log("loggedUser", this.loggedUser);
      })
      // same user
      if (this.requestedUser.email == this.loggedUser.email) this.sameUser = true;
    } else {
      this.logged = false;
      this.sameUser = false;
    }

    this.userForm = this.formBuilder.group({
      about:  ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.userService.updateUser(this.loggedUser.id, this.createUserForm(), this.loggedUser.api_key).subscribe(
      (response: FirebaseUserModel) => {
        location.reload();
      }
    )
  }
  private createUserForm(): string {
    return this.userForm.value.about;
  }
  
  redirectToNews()                                { this.router.navigate(['/news']);                            }
  redirectToNewest()                              { this.router.navigate(['/newest']);                          }
  redirectToAskOnly()                             { this.router.navigate(['/askonly']);                         }
  redirectToSubmit()                              { this.router.navigate(['/submit']);                          }

  redirectToContributionInfo(id: number)          { this.router.navigate(['/contributioninfo', id])             }
  redirectToUserInfo(useremail: string)           { this.router.navigate(['/userinfo', useremail])              }
  
  redirectToThreads(useremail: string)            { this.router.navigate(['/threads', useremail])               }
  redirectToSubmitted(useremail: string)          { this.router.navigate(['/submitted', useremail])             }
  redirectToUpvotedSubmissions()                  { this.router.navigate(['/upvotedsubmissions'])               }
  redirectToUpvotedComments()                     { this.router.navigate(['/upvotedcomments'])                  }
  
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
  
  get formControls() { return this.userForm.controls; }

}
