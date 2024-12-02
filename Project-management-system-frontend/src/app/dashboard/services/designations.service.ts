import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../../auth/helper';

@Injectable({
  providedIn: 'root'
})
export class DesignationsService {
  constructor(private http:HttpClient) { }
  
  public adddesignations(form:any):Observable<any>{
    return this.http.post(BASE_URL +"/designation/addDesignation",form);
  }

  public getAllDesignations():Observable<any>{
    return this.http.get(BASE_URL +"/designation/getAllDesignations");

  }

   public getAllCategories():Observable<any>{
    return this.http.get(BASE_URL +"/category/getAllCategories");
    
  }

  public updateDesignation(data: FormData): Observable<any> {
    return this.http.patch(BASE_URL + '/designation/updateDesignation', data);
  }

  public deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/category/deleteCategory/${categoryId}`);
  }
}
