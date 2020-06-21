import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { fadeIn, fadeOut } from 'src/animations/anim_registration';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IsMobileService } from 'src/services/Common/is-mobile.service';

interface notification {notif: string, state: string};

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  host: {
    'style': 'display: block;',
    '[class.mobile-theme]':'false',
    '[class.dashboard-theme]':'true',
    '(document:keyup)': 'handleKeyboardEvent($event)'
  },
  animations: [ fadeIn(), fadeOut() ]
})
export class MainNavComponent implements OnInit {
  //Data fields
  username:string;

  //TODO: Decide Message Format
  notifs:string[] = ["#3543 accepted by ABC", '#2514 declined by Karan', '#3528 closed by Tarun'];
  notif_num:number;
  clear_all_notifs_btn_click:boolean = false;
  notif_state:notification[] = [];

  //Responsive Menu
  isMobile:boolean = false;

  //Side-Nav
  @ViewChild('drawer', {static: false}) public sidenav: MatSidenav;

  //Search
  search_div:boolean = false;
  search_field = new FormControl();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private isMobile_t: IsMobileService) {
    this.router.navigateByUrl('/dashboard/raise-case');
  }

  ngOnInit(){
    this.isMobile_t.isMobile().subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else this.isMobile = false;
    });
    //Get notifs from service and Update badge
    //also use swing animation
    this.notif_num = this.notifs.length;

    //Create Notification State
    for(let i = 0; i < this.notifs.length; i++){
      const x = {notif: this.notifs[i], state: "enter"};
      this.notif_state.unshift(x);
    }
  }

  clear_unread_notifs(){ this.notif_num = 0 }
  clear_all_notifs(){
    let i = 0;
    this.clear_all_notifs_btn_click = true;
    let clear_all_notifs = setInterval(() => {
      this.notif_state[i] = {notif: this.notifs[i], state: "leave"};
      i++;
      if(this.notif_state.length === i) clearInterval(clear_all_notifs);
    }, 100);
  }
  clear_all_anim_end(notif:{notif:string, state: string}){
    if(this.clear_all_notifs_btn_click){
      if(notif === this.notif_state[this.notif_state.length - 1])
        this.notif_state = [];
      else notif = {notif: "", state: ""};
    }
  }

  openDialog(): void {
    let dialogSize = { height: '50%', width: '40%' }
    if(this.isMobile){
      dialogSize = { height: '50%', width: '80%' }
    }
    const dialogRef = this.dialog.open(All_notifications, {
      height: dialogSize.height,
      width: dialogSize.width,
      data: this.notif_state,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.notif_state = result;
    });
  }

  //Close side nav on click - mobile
  close_side_nav(){
    if(this.isMobile) this.sidenav.close();
  }

  //Search - Overlay
  open_search_overlay(){
    this.search_div = true;
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if(this.search_div == true && event.key === "Escape"){ this.close_search_overlay() }
  }

  close_search_overlay(){
    this.search_div = false;
  }

}

@Component({
  selector: 'all-notifications',
  templateUrl: './all_notifications.html',
  animations: [ fadeIn(), fadeOut() ]
})
export class All_notifications {
  notif_num:number;
  clear_all_notifs_btn_click:boolean = false;

  constructor(
    public dialogRef: MatDialogRef<All_notifications>,
    @Inject(MAT_DIALOG_DATA) public notif_state: notification[]) {}

    ngOnInit() {
    }

    clear_all_notifs(){
      let i = 0;
      this.clear_all_notifs_btn_click = true;
      let clear_all_notifs = setInterval(() => {
        this.notif_state[i] = {notif: this.notif_state[i].notif, state: "leave"};
        i++;
        if(this.notif_state.length === i) clearInterval(clear_all_notifs);
      }, 100);
    }

    clear_all_anim_end(notif:{notif:string, state: string}){
      if(this.clear_all_notifs_btn_click){
        if(notif === this.notif_state[this.notif_state.length - 1]){
          this.notif_state = [];
        }
        else notif = {notif: "", state: ""};
      }
    }

}
