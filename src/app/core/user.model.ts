export class FirebaseUserModel {
  name:     string;
  email:    string;
  provider: string;

  // new
  id:                    number;
  created_at:            Date;
  updated_at:            Date;
  google_token:          string;
  google_refresh_token:  string;
  about:                 string;
  api_key:               string;
  karma:                 number;

  constructor() {
    this.name     = "";
    this.email    = "";
    this.provider = "";

    // new
    this.id                   = 0;
    this.created_at           = new Date();
    this.updated_at           = new Date();
    this.google_token         = "";
    this.google_refresh_token = "";
    this.about                = "";
    this.api_key              = "";
    this.karma                = 0;
  }
}