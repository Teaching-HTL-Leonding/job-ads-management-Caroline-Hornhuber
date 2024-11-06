import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';




export interface Job{
  id:number,
  title:string,
  textEN:string
}
export interface singleJobs {
  id:number,
  title:string,
  textEN:string,
  translations:[
    {
      language:string,
      translatedText:string
    }

  ]
}
export interface DeepLResponse{
    translations: [
    {
      detected_source_language: string,
      text: string
    }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class JobAdsService {
  private httpClient = inject(HttpClient);

  async getAllJobs():Promise<Job[]>{
    return firstValueFrom( await this.httpClient.get<Job[]>("http://localhost:3000/ads"));
  }
  async deleteJobById(id: number) {
    await firstValueFrom(await this.httpClient.delete(`http://localhost:3000/ads/${id}`));
  }
  async getJobById(id:number):Promise<singleJobs> {
    return await firstValueFrom(await this.httpClient.get<singleJobs>(`http://localhost:3000/ads/${id}`));
  }
  async updateJob(textEN:string, id:number,title:string) {
    await firstValueFrom(await this.httpClient.patch(`http://localhost:3000/ads/${id}`, {title,textEN}));
  }
  async deleteTranslation(language:string,id:number){
    await firstValueFrom(await this.httpClient.delete(`http://localhost:3000/ads/${id}/translations/${language}`));
  }
  async addTranslation(language:string,translation:string,id:number){
    const translatedText :string = translation;
    await firstValueFrom(await this.httpClient.put(`http://localhost:3000/ads/${id}/translations/${language}`, {translatedText}));
  }
  async autoTranslate(target_lang:string,text:string):Promise<DeepLResponse>{
    const res :Promise<DeepLResponse> =firstValueFrom( await this.httpClient.post<DeepLResponse>(`https://api-free.deepl.com/v2/translate`, {target_lang,text}));
    return res;
  }
}
