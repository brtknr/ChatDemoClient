import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  @ViewChild("mySidenav", { static: false }) sideNav: ElementRef;
  

  openNav() {
    this.sideNav.nativeElement.style.width = "250px";
    this.sideNav.nativeElement.style.backgroundColor = "rgba(0,0,0,0.8)";
  }
  
  /* Set the width of the side navigation to 0 */
  closeNav() {
    this.sideNav.nativeElement.style.width = "0";
  }


}
