import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Contribution } from '../../models/contribution.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ContributionRemote {
  
  constructor (
    private httpClient: HttpClient
  ) {}
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  /* ==== GET ==== */
  getContributions(): Observable<Array<Contribution[]>> {
    return this.httpClient.get<Array<Contribution[]>>(`${environment.API_URL}/contributions`, 
    { 
      headers:{ 'Accept':'application/json' } 
    })
  }
  getContributionsRelatedToUser(user_id: number): Observable<Contribution[]> {
    return this.httpClient.get<Contribution[]>(`${environment.API_URL}/contributions/withvotes/` + user_id, 
    { 
      headers:{ 'Accept':'application/json' } 
    })
  }

  getNewest(): Observable<Array<Contribution[]>> {
    return this.httpClient.get<Array<Contribution[]>>(`${environment.API_URL}/contributions/newest`, 
    { 
      headers:{ 'Accept':'application/json' } 
    })
  }
  getNewestRelatedToUser(user_id: number): Observable<Contribution[]> {
    return this.httpClient.get<Contribution[]>(`${environment.API_URL}/contributions/withvotes/newest/` + user_id, 
    { 
      headers:{ 'Accept':'application/json' } 
    })  
  }

  getAskOnly(): Observable<Array<Contribution[]>> {
    return this.httpClient.get<Array<Contribution[]>>(`${environment.API_URL}/contributions/askonly`,     
    { 
      headers:{ 'Accept':'application/json' } 
    })
  }
  getAskRelatedToUser(user_id: number): Observable<Contribution[]> {
    return this.httpClient.get<Contribution[]>(`${environment.API_URL}/contributions/withvotes/askonly/` + user_id, 
    { 
      headers:{ 'Accept':'application/json' } 
    })  
  }

  getContributionById(id: number): Observable<Contribution> {
    return this.httpClient.get<Contribution>(`${environment.API_URL}/contributions/` + id, 
    { 
      headers:{ 'Accept':'application/json' } 
    })
  }
  getContributionByIdRelatedToUser(contribution_id: number, user_id: number): Observable<Contribution> {
    return this.httpClient.get<Contribution>(`${environment.API_URL}/contributions/withvotes/` + contribution_id + `/` + user_id, 
    { 
      headers:{ 'Accept':'application/json' } 
    })
  }

  getGodfather(contribution_id: number): Observable<Contribution> {
    return this.httpClient.get<Contribution>(`${environment.API_URL}/contributions/godfather/` + contribution_id, 
    { 
      headers:{ 'Accept':'application/json' } 
    })
  }

  getSubmitted(requested_user_id: number): Observable<Contribution[]>  {
    return this.httpClient.get<Contribution[]>(`${environment.API_URL}/users/`+ requested_user_id + `/submitted`,
    {
      headers: { 'Accept':'application/json'}  
    })
  } 
  getSubmittedRelatedToUser(requested_user_id: number, logged_user_id: number, api_key: string): Observable<Contribution[]>  {
    return this.httpClient.get<Contribution[]>(`${environment.API_URL}/users/`+ requested_user_id + `/withvotes/submitted/` + logged_user_id, 
    {
      headers: { 
        'Accept':'application/json',
        'API_KEY': api_key
      }  
    })
  }  

  getUpvotedSubmissions(requested_user_id: number): Observable<Contribution[]>  {
    return this.httpClient.get<Contribution[]>(`${environment.API_URL}/users/`+ requested_user_id + `/upvotedsubmissions`,
    {
      headers: { 'Accept':'application/json'}  
    })
  } 
  getUpvotedSubmissionsRelatedToUser(logged_user_id: number, api_key: string): Observable<Contribution[]>  {
    return this.httpClient.get<Contribution[]>(`${environment.API_URL}/users/`+ logged_user_id + `/withvotes/upvotedsubmissions/` + logged_user_id, 
    {
      headers: { 
        'Accept':'application/json',
        'API_KEY': api_key
      }  
    })
  }

  getThreads(requested_user_id: number): Observable<Contribution[]>  {
    return this.httpClient.get<Contribution[]>(`${environment.API_URL}/users/`+ requested_user_id + `/threads`,
    {
      headers: { 'Accept':'application/json'}  
    })
  } 
  getThreadsRelatedToUser(requested_user_id: number, logged_user_id: number, api_key: string): Observable<Contribution[]>  {
    return this.httpClient.get<Contribution[]>(`${environment.API_URL}/users/`+ requested_user_id + `/withvotes/threads/` + logged_user_id, 
    {
      headers: { 
        'Accept':'application/json',
        'API_KEY': api_key
      }  
    })
  }
  
  getUpvotedComments(requested_user_id: number): Observable<Contribution[]>  {
    return this.httpClient.get<Contribution[]>(`${environment.API_URL}/users/`+ requested_user_id + `/upvotedcomments`,
    {
      headers: { 'Accept':'application/json'}  
    })
  } 
  getUpvotedCommentsRelatedToUser(logged_user_id: number, api_key: string): Observable<Contribution[]>  {
    return this.httpClient.get<Contribution[]>(`${environment.API_URL}/users/`+ logged_user_id + `/withvotes/upvotedcomments/` + logged_user_id, 
    {
      headers: { 
        'Accept':'application/json',
        'API_KEY': api_key
      }  
    })
  }

  isVoted(user_id: number, contribution_id: number): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.API_URL}/votes/isvoted/`+ contribution_id +`/` + user_id, 
    { 
      headers:{ 'Accept':'application/json' } 
    })
  }

  /* ==== POST ==== */
  createContribution(contribution: Contribution, api_key: string): Observable<Contribution> {
    return this.httpClient.post<Contribution>(`${environment.API_URL}/contributions`, 
    {   
      'title':   contribution.title,
      'url':     contribution.url,
      'content': contribution.content
    },
    {       
      headers: { 
        'Accept':'application/json',
        'API_KEY': api_key
      }  
    });
  }
  addComment(id: number, comment: Contribution, api_key: string): Observable<Contribution> {
    return this.httpClient.post<Contribution>(`${environment.API_URL}/contributions/`+ id, 
    {
      'content':  comment.content
    },
    { 
      headers: { 
        'Accept':'application/json',
        'API_KEY':api_key
      } 
    });
  }
  replyComment(comment_id: number, reply: Contribution, api_key: string): Observable<Contribution> {
    return this.httpClient.post<Contribution>(`${environment.API_URL}/contributions/` + comment_id + `/replyview`, 
    {
      'content': reply.content
    },
    { 
      headers: { 
        'Accept':'application/json',
        'API_KEY':api_key
      } 
    });
  }

  /* ==== DELETE ==== */
  deleteContribution(id: number, api_key: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.API_URL}/contributions/` + id,
    { 
      headers: { 
        'Accept':'application/json',
        'API_KEY':api_key
      } 
    });
  }
  unvoteContribution(contribution_id: number, api_key: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.API_URL}/contributions/` + contribution_id + `/unvote`,
    { 
      headers: { 
        'Accept':'application/json',
        'API_KEY':api_key
      } 
    });
  }

  /* ==== PUT ==== */
  voteContribution(contribution_id:number, api_key: string): Observable<any> {
    console.log("he llegado al remote");
    console.log("api key = ", api_key);
    return this.httpClient.put<any>(`${environment.API_URL}/vote/` + contribution_id, {},
    {
      headers: { 
        'Accept':'application/json',
        'API_KEY': api_key
      } 
    });
  }
}