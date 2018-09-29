import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { TemperaturaPage } from '../temperatura/temperatura'

import { LuminosidadePage } from '../luminosidade/luminosidade'

import { DweetSettingsEnum } from '../../enum/DweetSettingsEnum'

import { DweetServiceProvider } from '../../providers/dweet-service/dweet-service'
import { Dweet } from '../../models/dweet'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class Home {
  
  public active: string = "false";
  private dweet: Dweet
  private thingName: any
  private status: string = '';
  private touch: string = ''
 

  constructor(public navCtrl: NavController, private dweetService: DweetServiceProvider) {
    this.thingName = DweetSettingsEnum.DWEET_THING_NAME
    setInterval(() => {this.getUpdate()}, 1000)
    //this.time = setInterval(() => {this.getStatusTemp()}, 1000)
    //this.timeButton = setInterval(() => {this.getStatusButtonTouch()}, 1000)
    //this.myStatus = setInterval(() => {this.statusToogle()}, 1000)
  }

  goToTempPage(){
    this.navCtrl.push(TemperaturaPage)
  }

  goToLuxPage(){
    this.navCtrl.push(LuminosidadePage)
  }

  activateAlarme($event){
    this.dweetService.sendDweetAlarm(this.thingName, $event.value)    
  }

  getUpdate(){
    this.dweetService.loadLatestDweets(this.thingName).subscribe(
      data => {
                this.preencherDweet(data)
              },
      err => console.log()
    );
  }

  private preencherDweet(data: any){
    
    this.dweet = this.dweetService.preencherDweet(data)
    this.status = this.dweet.with[0].content.getStatus();
    this.touch = this.dweet.with[0].content.getTouch();
    this.active = this.dweet.with[0].content.getActive()
    console.log("status " + this.status)
    console.log("touch " + this.touch)
    console.log("active " + this.active)
  }

}
