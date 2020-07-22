import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Contribution } from '../models/contribution.model';
import { ContributionService } from '../services/contribution/contribution.service';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from '../core/auth.service';
import { UserService } from '../services/user/user.service';
import { FirebaseUserModel } from '../core/user.model';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  
  public isSubmitted:      boolean            = false;
  public contributionForm: FormGroup;
  public userInfo:         FirebaseUserModel = new FirebaseUserModel();
  public urlAndContent:    boolean           = false;
  public niUrlNiContent:   boolean           = false;
    
  constructor(
    private formBuilder:          FormBuilder, 
    private contributionService:  ContributionService,
    private route:                Router,
    private userService:          UserService,
    private authService:          AuthService,
  ) { this.userInfo.email = localStorage.getItem('loggedUserEmail'); }

  ngOnInit(): void {
    // if the user is logged
    if (this.userInfo.email != "") {
      this.userService.getByEmail(this.userInfo.email).subscribe(
        (response:FirebaseUserModel) => {
          this.userInfo = response;
        }
      );
    } else this.redirectToLogin();
    this.contributionForm = this.formBuilder.group({
      title:  ['', [Validators.required, Validators.minLength(4)]],
      url:    ['', [Validators.minLength(4), CustomValidators.url]],
      content:['', ]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.urlAndContent  = false;
    this.niUrlNiContent  = false;
    if (this.contributionForm.valid) {
      const contributionFormValue = JSON.parse(JSON.stringify(this.contributionForm.value));
      
      if (contributionFormValue.url != "" && contributionFormValue.content != "") { 
        this.urlAndContent  = true; 
      } else {this.urlAndContent  = false; }
      
      if (contributionFormValue.url == "" && contributionFormValue.content == "") { 
        this.niUrlNiContent  = true; 
      } else {this.niUrlNiContent  = false; }

      console.log("api key", this.userInfo.api_key);
      if (this.urlAndContent == false && this.niUrlNiContent == false) {
        this.contributionService.createContribution(this.createContributionForm(), this.userInfo.api_key).subscribe(
          (response: any) => {
            this.route.navigate(['/contributioninfo', response.contribution.id]);
          } 
        )
      }
    }
  }

  private createContributionForm(): Contribution {
    const contributionFormValue = JSON.parse(JSON.stringify(this.contributionForm.value));
    var contribution: Contribution = new Contribution();
    contribution.title   = contributionFormValue.title;
    contribution.url     = contributionFormValue.url;
    contribution.content = contributionFormValue.content;
    contribution.user_id = this.userInfo.id;
    return contribution;
  }

  redirectToNews() { this.route.navigate(['/news']); }
  
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

  get formControls() { return this.contributionForm.controls; }
}
