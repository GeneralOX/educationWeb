import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guard/admin.guard';
import { InstructorGuard } from './guard/instructor.guard';
import { StudentGuard } from './guard/student.guard';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./view/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: "admin",
    canActivate: [AdminGuard],
    loadChildren: () => import('./view/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: "student",
    canActivate: [StudentGuard],
    loadChildren: () => import('./view/student/student.module').then(m => m.StudentModule),
  },
  {
    path: "instructor",
    canActivate: [InstructorGuard],
    loadChildren: () => import('./view/instructor/instructor.module').then(m => m.InstructorModule),
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
