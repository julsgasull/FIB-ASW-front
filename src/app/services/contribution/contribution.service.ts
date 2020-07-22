import { Injectable } from '@angular/core';
import { ContributionRemote } from './contribution.remote';
import { Observable } from 'rxjs';
import { Contribution } from 'src/app/models/contribution.model';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  constructor (
    private contributionRemote: ContributionRemote
  ) { }

  /* ==== GET ==== */
  getContributions(): Observable<Array<Contribution[]>> { 
    return this.contributionRemote.getContributions();
  }
  getContributionsRelatedToUser(user_id: number): Observable<Contribution[]> {
    return this.contributionRemote.getContributionsRelatedToUser(user_id);
  }

  getNewest(): Observable<Array<Contribution[]>> {
    return this.contributionRemote.getNewest();
  }
  getNewestRelatedToUser(user_id: number): Observable<Contribution[]> {
    return this.contributionRemote.getNewestRelatedToUser(user_id);
  }

  getAskOnly(): Observable<Array<Contribution[]>> {
    return this.contributionRemote.getAskOnly();
  }
  getAskRelatedToUser(user_id: number): Observable<Contribution[]> {
    return this.contributionRemote.getAskRelatedToUser(user_id);
  }

  getContributionById(contribution_id: number): Observable<Contribution> {
    return this.contributionRemote.getContributionById(contribution_id);
  }
  getContributionByIdRelatedToUser(contribution_id: number, user_id: number): Observable<Contribution> {
    return this.contributionRemote.getContributionByIdRelatedToUser(contribution_id, user_id);
  }

  getGodfather(contribution_id: number): Observable<Contribution> {
    return this.contributionRemote.getGodfather(contribution_id);
  }

  getSubmitted(requested_user_id: number): Observable<Contribution[]>  {
    return this.contributionRemote.getSubmitted(requested_user_id);
  } 
  getSubmittedRelatedToUser(requested_user_id: number, logged_user_id: number, api_key: string): Observable<Contribution[]>  {
    return this.contributionRemote.getSubmittedRelatedToUser(requested_user_id, logged_user_id, api_key);
  }  

  getUpvotedSubmissions(requested_user_id: number): Observable<Contribution[]>  {
    return this.contributionRemote.getUpvotedSubmissions(requested_user_id);
  } 
  getUpvotedSubmissionsRelatedToUser(logged_user_id: number, api_key: string): Observable<Contribution[]>  {
    return this.contributionRemote.getUpvotedSubmissionsRelatedToUser(logged_user_id, api_key);
  }

  getThreads(requested_user_id: number): Observable<Contribution[]>  {
    return this.contributionRemote.getThreads(requested_user_id);
  }
  getThreadsRelatedToUser(requested_user_id: number, logged_user_id: number, api_key: string): Observable<Contribution[]>  {
    return this.contributionRemote.getThreadsRelatedToUser(requested_user_id, logged_user_id, api_key);
  }

  getUpvotedComments(requested_user_id: number): Observable<Contribution[]>  {
    return this.contributionRemote.getUpvotedComments(requested_user_id);
  } 
  getUpvotedCommentsRelatedToUser(logged_user_id: number, api_key: string): Observable<Contribution[]>  {
    return this.contributionRemote.getUpvotedCommentsRelatedToUser(logged_user_id, api_key);
  }

  isVoted(user_id: number, contribution_id: number): Observable<boolean> {
    return this.contributionRemote.isVoted(user_id, contribution_id);
  }

  /* ==== POST ==== */
  createContribution(contribution: Contribution, api_key: string): Observable<Contribution> {
    return this.contributionRemote.createContribution(contribution, api_key);
  }
  addComment(id: number, comment: Contribution, api_key: string): Observable<Contribution> {
    return this.contributionRemote.addComment(id, comment, api_key);
  }
  replyComment(comment_id: number, reply: Contribution, api_key: string): Observable<Contribution> {
    return this.contributionRemote.replyComment(comment_id, reply, api_key);
  }

  /* ==== DELETE ==== */
  deleteContribution(id: number, api_key: string): Observable<Contribution> {
    return this.contributionRemote.deleteContribution(id, api_key);
  }
  unvoteContribution(contribution_id: number, api_key: string): Observable<any> {
    return this.contributionRemote.unvoteContribution(contribution_id, api_key);
  }

  /* ==== PUT ==== */
  voteContribution(contribution_id:number, api_key: string): Observable<Contribution> {
    return this.contributionRemote.voteContribution(contribution_id, api_key);
  }
}