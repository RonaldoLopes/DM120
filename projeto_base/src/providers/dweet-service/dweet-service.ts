import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DweetSettingsEnum } from './../../enum/DweetSettingsEnum'
import { Content } from './../../models/content'
import { With } from './../../models/with'
import { Dweet } from './../../models/dweet'

/*
  Generated class for the DweetServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DweetServiceProvider {

  private dweetioApiUrlGet = DweetSettingsEnum.DWEET_URL_GET_ALL
  private dweetioApiUrlPut = DweetSettingsEnum.DWEET_URL_PUT_ALARM
  private dweetioApiUrlGetLatest = DweetSettingsEnum.DWEET_URL_GET_ALL_LATEST

  constructor(public http: HttpClient) {
    console.log('Hello DweetServiceProvider Provider');
  }

  loadDweets(thingName: string){
    return this.http.get(this.dweetioApiUrlGet + thingName)
  }

  loadLatestDweets(thingName: string){
    return this.http.get(this.dweetioApiUrlGetLatest + thingName)
  }

  loadAlarmeButtonStatus(thingName: string){
    return this.http.get(this.dweetioApiUrlGetLatest + thingName)
  }
  
  sendDweetAlarm(thingName: string, value: string){
    console.log("post ")

    this.http.post(this.dweetioApiUrlPut + thingName, {     
      active: value
    }).subscribe(
      data => {
                console.log("OK ")
              },
      err => console.log()
    );

  }
  preencherDweet(data: any){
    let dweet: Dweet
    let _withs: Array<With>
    let _date: string
    let _time: string

    _withs = new Array<With>()
    for(let _with of data.with){
      let dataContent: Content
      dataContent = new Content(_with.content.temp, _with.content.lux, _with.content.status, _with.content.touch, _with.content.active)

      _date = this.formatDate(_with.created)
      _time = this.formatTime(_with.created)

      let tempWith: With
      tempWith = new With(_with.thing, _with.created, dataContent, _date, _time)

      _withs.push(tempWith)
    }

    dweet = new Dweet(data.this, data.by, data.the, _withs)

    return dweet
  }
  private formatDate(date : any): string{
    let originalDate: string = date
    var dateParse = originalDate.slice(0,10)

    return dateParse
  }
  private formatTime(date: any): string{
    let originalDate : string = date
    var timeParse = originalDate.slice(11,19)

    return timeParse
  }

}
