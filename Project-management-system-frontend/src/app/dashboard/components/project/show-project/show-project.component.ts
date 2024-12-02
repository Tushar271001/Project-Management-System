import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrl: './show-project.component.css'
})
export class ShowProjectComponent implements OnInit{
  constructor(private service:ProjectService){

  }


  pro=[
    {
      id:"",
      name:'',
      category:'',
      duration:'',
      projectmanager:'',
      status:'',
      date:''
    }
  
    
  ]
  ngOnInit(): void {
    this.service.getAllProjects().subscribe(res=>{
      this.pro = res;
      console.log(res)
    })

  }

}
