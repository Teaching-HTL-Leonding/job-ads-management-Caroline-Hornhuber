import {Component, inject, signal} from '@angular/core';
import {Job,singleJobs, JobAdsService} from '../job-ads.service';
import {FormsModule} from '@angular/forms';
import {single} from 'rxjs';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent {

  private readonly jobAdsService= inject(JobAdsService);
  job_description=signal('');
  job_title=signal('');
  job_translations=signal<{language:string,translatedText:string}[]>([]);
  newTranslationLanguage= signal('');
  newTranslation= signal('');
  async ngOnInit(){
    this.reloadJob();
  }
  async deletejob() {
    const id = Number(new URLSearchParams(window.location.search).get('id'));
    await this.jobAdsService.deleteJobById(id);
    window.location.href="/jobAds";
  }
  async reloadJob(){
    const id = Number(new URLSearchParams(window.location.search).get('id'));
    this.job_description.set( (await this.jobAdsService.getJobById(id)).textEN);
    this.job_title.set((await this.jobAdsService.getJobById(id)).title);
    this.job_translations.set((await this.jobAdsService.getJobById(id)).translations);
  }

  async submitEdit() {
    const id = Number(new URLSearchParams(window.location.search).get('id'));
    await this.jobAdsService.updateJob(this.job_description(),id,this.job_title());
  }

  getBack() {
    window.location.href="/jobAds";
  }

  async deleteTranslation(language: string) {
    const id = Number(new URLSearchParams(window.location.search).get('id'));
    await this.jobAdsService.deleteTranslation(language,id);
    this.reloadJob();
  }

  async addTranslation() {
    const id = Number(new URLSearchParams(window.location.search).get('id'));
    await this.jobAdsService.addTranslation(this.newTranslationLanguage(),this.newTranslation(),id);
    this.newTranslation.set("");
    this.newTranslationLanguage.set("");
    this.reloadJob();
  }
}
