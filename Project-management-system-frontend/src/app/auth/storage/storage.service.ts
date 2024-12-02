import { Injectable } from '@angular/core';
const USER: string = "user";
const TOKEN: string = "token";
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private router:Router) { }
  public saveToken(token: any) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(TOKEN, token);
      return true;
    }
    return false;
  }

  public getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN);
    }
    return null;
  }

  public saveuser(user:any){
    if(typeof window !=='undefined'){
      window.localStorage.setItem("user",JSON.stringify(user))
    }
  }

  public logout(){
    if(typeof window !=='undefined'){
      window.localStorage.removeItem("user");
      this.router.navigate(['/'])
    }
  }

  public getUser(){
    if(typeof window !== 'undefined'){
      let user=window.localStorage.getItem("user");
    if(user!=null){
      return JSON.parse(user);
    }
    return null;
    }
  }

  // public getUserRole() {
  //   let userData = this.getuser();
  //   if (userData !== null) {
  //     return userData.role;
  //   }
  //   return null;
  // }

  public getUserRole(p0?: boolean){
    if(typeof window !== 'undefined'){
      let user=this.getUser();
      if(user!=null){
        return user.role;
      }else{
        return null;
      }
    }
  }
}
