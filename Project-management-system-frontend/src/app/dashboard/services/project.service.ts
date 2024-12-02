import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../../auth/helper';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  
  public addProject(form:any):Observable<any>{
    console.log(form);
    
    return this.http.post(BASE_URL +"/project/addProject",form);
  }

  public getAllTeamMember():Observable<any>{
    return this.http.get(BASE_URL +"/teammember/getAllTeamMember");
  }

  // Fetch all projects
  public getAllProjects(): Observable<any> {
    return this.http.get(BASE_URL + "/project/getAllProjects");
  }

  public getAllCategories(): Observable<any> {
    return this.http.get(BASE_URL + "/category/getAllCategories");
  }

  getProjectsByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${BASE_URL}/project/getProjectsByCategory/${categoryId}`);
    
  }

  getProjectsByStatus(status: string): Observable<any> {
    return this.http.get(`${BASE_URL}/project/getProjectsByStatus/${status}`);
  }

  public updateProject(formData: FormData): Observable<any> {
    console.log(formData);
    
    return this.http.patch(BASE_URL + '/project/updateProject', formData);
  }

  public deleteProject(projectId: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/project/deleteProject/${projectId}`);
  }
}
