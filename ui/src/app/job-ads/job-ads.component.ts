import {Component, inject, signal} from '@angular/core';
import {Job, JobAdsService} from '../job-ads.service';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';



@Component({
  selector: 'app-job-ads',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './job-ads.component.html',
  styleUrl: './job-ads.component.css'
})
export class JobAdsComponent {
  private readonly jobAdsService= inject(JobAdsService);
  jobs=signal<Job[]>([]);

  async ngOnInit() {
    await this.reloadJobs();
  }
  async reloadJobs(){
    this.jobs.set(await this.jobAdsService.getAllJobs())
  }



  protected readonly window = window;
}
