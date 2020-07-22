export class Contribution {
  id?:               number;
  title?:           string;
  url?:             string;
  content?:         string;
  contribution_id?: number;
  user_id:          number;
  username?:        string;
  useremail?:       string;
  comments?:        Contribution[];
  numcomments?:     number;
  created_at:       Date;
  updated_at:       Date;
  vote:             number;
  c_type:           string;
  isvoted:          boolean;

  constructor() {
    this.id               = -1;
    this.title            = "";
    this.url              = "";
    this.contribution_id  = -1;
    this.content          = "";
    this.user_id          = -1;
    this.username         = "";
    this.useremail        = "";
    this.comments         = null;
    this.numcomments      = -1;
    this.created_at       = new Date();
    this.updated_at       = new Date();
    this.vote             = 0;
    this.c_type           = "";
    this.isvoted          = false;
  }
}