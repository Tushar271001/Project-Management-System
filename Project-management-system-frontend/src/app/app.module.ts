import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './dashboard/components/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './dashboard/components/admin-home/admin-home.component';
import { FooterComponent } from './dashboard/components/footer/footer.component';
import { HeaderComponent } from './dashboard/components/header/header.component';
import { SidebarComponent } from './dashboard/components/sidebar/sidebar.component';
import { ProjectComponent } from './dashboard/components/project/project.component';
import { AdminsComponent } from './dashboard/components/admins/admins/admins.component';
import { CreatenewComponent } from './dashboard/components/admins/createnew/createnew.component';
import { AdmingroupsComponent } from './dashboard/components/admins/admingroups/admingroups.component';
import { TasksComponent } from './dashboard/components/tasks/tasks.component';
import { CreateNewTaskComponent } from './dashboard/components/tasks/create-new-task/create-new-task.component';
import { ProjectReportComponent } from './dashboard/components/reports/project-report/project-report.component';
import { TaskReportComponent } from './dashboard/components/reports/task-report/task-report.component';
import { CreateProjectComponent } from './dashboard/components/project/create-project/create-project.component';
import { CreateNewTeammemberComponent } from './dashboard/components/team-members/create-new-teammember/create-new-teammember.component';
import { TeamMembersComponent } from './dashboard/components/team-members/team-members/team-members.component';
import { DesignationsComponent } from './dashboard/components/team-members/designations/designations.component';
import { ProductivitiesComponent } from './dashboard/components/productivities/productivities/productivities.component';
import { CreateProductivityComponent } from './dashboard/components/productivities/create-productivity/create-productivity.component';
import { ProductivitiesReportComponent } from './dashboard/components/reports/productivities-report/productivities-report.component';
import { SettingComponent } from './dashboard/components/setting/setting/setting.component';
import { ShowProjectComponent } from './dashboard/components/project/show-project/show-project.component';
import { CreateCategoriesComponent } from './dashboard/components/categories/create-categories/create-categories.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CreateGroupComponent } from './dashboard/components/admins/create-group/create-group.component';
import { CreateAdminGroupComponent } from './dashboard/components/admins/create-admin-group/create-admin-group.component';
import { CategoriesComponent } from './dashboard/components/categories/categories/categories.component';
import { CreateDesignationComponent } from './dashboard/components/team-members/create-designation/create-designation.component';
import { PendingTaskComponent } from './dashboard/components/tasks/pending-task/pending-task.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SuperadminloginComponent } from './auth/component/superadminlogin/superadminlogin.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminHomeComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ProjectComponent,
    AdminsComponent,
    CreatenewComponent,
    AdmingroupsComponent,
    TasksComponent,
    CreateNewTaskComponent,
    ProjectReportComponent,
    TaskReportComponent,
    CreateProjectComponent,
    CreateNewTeammemberComponent,
    TeamMembersComponent,
    DesignationsComponent,
    ProductivitiesComponent,
    CreateProductivityComponent,
    ProductivitiesReportComponent,
    SettingComponent,
    ShowProjectComponent,
    CreateCategoriesComponent,
    CategoriesComponent,
    CreateGroupComponent,
    CreateAdminGroupComponent,
    CreateDesignationComponent,
    PendingTaskComponent,
    SuperadminloginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    authInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
