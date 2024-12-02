import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import BASE_URL from '../../auth/helper';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
  
  public adduser(form:any):Observable<any>{
    return this.http.post(BASE_URL +"/user/addUser",form);
  }
  public getAllGroups():Observable<any>{
    return this.http.get(BASE_URL +"/group/allGroups")
  }
  public getAllPermissionsById(id:any):Observable<any>{
    return this.http.get(`${BASE_URL}/permission/getPermissionById/${id}`)
   
  }
  public getGroupById(id:any):Observable<any>{
    return this.http.get(`${BASE_URL}/group/getGroupById/${id}`)
  }
  public getAllUser():Observable<any>{
    return this.http.get(BASE_URL +"/user/getAllUser")
  }
  updatePermissions(permission: any): Observable<any> {
    return this.http.patch(`${BASE_URL}/permission/updatePermissions`, permission);
  }
  
  public add_adminGroup(data:any):Observable<any>{
    return this.http.post(BASE_URL +"/group/addGroup", data)
  }
}
