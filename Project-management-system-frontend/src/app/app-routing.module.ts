import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './dashboard/components/admin-home/admin-home.component';
import { ProjectComponent } from './dashboard/components/project/project.component';
import { AdminsComponent } from './dashboard/components/admins/admins/admins.component';
import { AdmingroupsComponent } from './dashboard/components/admins/admingroups/admingroups.component';
import { CreatenewComponent } from './dashboard/components/admins/createnew/createnew.component';
import { TasksComponent } from './dashboard/components/tasks/tasks.component';
import { TaskReportComponent } from './dashboard/components/reports/task-report/task-report.component';
import { TeamMembersComponent } from './dashboard/components/team-members/team-members/team-members.component';
import { CreateNewTeammemberComponent } from './dashboard/components/team-members/create-new-teammember/create-new-teammember.component';
import { DesignationsComponent } from './dashboard/components/team-members/designations/designations.component';
import { ProductivitiesComponent } from './dashboard/components/productivities/productivities/productivities.component';
import { CreateProductivityComponent } from './dashboard/components/productivities/create-productivity/create-productivity.component';
import { ProductivitiesReportComponent } from './dashboard/components/reports/productivities-report/productivities-report.component';
import { SettingComponent } from './dashboard/components/setting/setting/setting.component';
import { CreateProjectComponent } from './dashboard/components/project/create-project/create-project.component';
import { ShowProjectComponent } from './dashboard/components/project/show-project/show-project.component';
import { CreateCategoriesComponent } from './dashboard/components/categories/create-categories/create-categories.component';
import { CategoriesComponent } from './dashboard/components/categories/categories/categories.component';
import { CreateNewTaskComponent } from './dashboard/components/tasks/create-new-task/create-new-task.component';
import { ProjectReportComponent } from './dashboard/components/reports/project-report/project-report.component';
import { SuperadminloginComponent } from './auth/component/superadminlogin/superadminlogin.component';
import { CreateGroupComponent } from './dashboard/components/admins/create-group/create-group.component';
import { CreateAdminGroupComponent } from './dashboard/components/admins/create-admin-group/create-admin-group.component';
import { CreateDesignationComponent } from './dashboard/components/team-members/create-designation/create-designation.component';
import { PendingTaskComponent } from './dashboard/components/tasks/pending-task/pending-task.component';
import { AuthGuard } from './auth/guards/auth.guard';
const routes: Routes = [
 {
  path:'',
  redirectTo:'superadminlogin',
  pathMatch:'full'
 },
 {
  path:'superadminlogin',
  component:SuperadminloginComponent,
 },

 {
  path:'',
  component:AdminDashboardComponent,
  canActivate: [AuthGuard],
  children:[
    {
    path:'admin-home',
    component:AdminHomeComponent
    },
    {
      path:'admins',
      component:AdminsComponent
    },
    {
    path:'createnew',
    component:CreatenewComponent
    },
    {
      path:'admingroups/:id',
      component:AdmingroupsComponent
    },
    {
      path:'creategroup',
      component:CreateGroupComponent
    },
    {
      path:'createadmingroup',
      component:CreateAdminGroupComponent
    },
    {
      path:'categories',
      component:CategoriesComponent
    },
    
    {
      path:'create-categories',
      component:CreateCategoriesComponent
    },
    {
      path:'teammembers',
      component:TeamMembersComponent
    },
    {
      path:'create_teammember',
      component:CreateNewTeammemberComponent
    },
    {
      path:'designations',
      component:DesignationsComponent
    },
    {
      path: 'createdesignation',
      component: CreateDesignationComponent
    },
    {
      path:'project',
      component:ProjectComponent
    },
    {
      path:'create-project',
      component:CreateProjectComponent
    },
    {
      path:'showproject',
      component:ShowProjectComponent
    },
    {
      path:'tasks',
      component:TasksComponent
    },
    {
      path:'pending-task',
      component:PendingTaskComponent
    },
    {
      path:'create-new-task',
      component:CreateNewTaskComponent
    },
    {
      path:'productivities',
      component:ProductivitiesComponent
    },
    {
      path:'createproductivity',
      component:CreateProductivityComponent
    },
    {
      path:'project-report',
      component:ProjectReportComponent
    },
    {
      path:'taskreport',
      component:TaskReportComponent
    },
    {
      path:'productivities-report',
      component:ProductivitiesReportComponent
    },
    {
      path:'setting',
      component:SettingComponent
    }

  ]
 }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
