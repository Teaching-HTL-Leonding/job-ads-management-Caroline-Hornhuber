import { Routes } from '@angular/router';
import {JobAdsComponent} from './job-ads/job-ads.component';
import {JobComponent} from './job/job.component';

export const routes: Routes = [
  {path: "jobAds", component: JobAdsComponent},
  {path: "job", component: JobComponent},
  {path: '', pathMatch: "full", redirectTo: "jobAds"}
];
