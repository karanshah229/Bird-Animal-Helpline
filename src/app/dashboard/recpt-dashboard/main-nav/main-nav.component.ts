import { Component, OnInit, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { fadeIn, fadeOut } from 'src/animations/anim_registration';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

interface notification {notif: string, state: string};

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
  host: {
    'style': 'display: block;',
    '[class.mobile-theme]':'false',
    '[class.dashboard-theme]':'true'
  },
  animations: [ fadeIn(), fadeOut() ]
})
export class MainNavComponent implements OnInit {
  username:string;

  //TODO: Decide Message Format
  notifs:string[] = ["#3543 accepted by ABC", '#2514 declined by Karan', '#3528 closed by Tarun'];
  notif_num:number;
  clear_all_notifs_btn_click:boolean = false;
  notif_state:notification[] = [];

  isHandset$: Subscription;
  isMobile:boolean = false;

  constructor(private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog) {
    this.isHandset$ = this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
      } else this.isMobile = false;
    });
  }

  ngOnInit(){
    //Get notifs from service and Update badge
    this.notif_num = this.notifs.length;

    //Create Notification State
    for(let i = 0; i < this.notifs.length; i++){
      const x = {notif: this.notifs[i], state: "enter"};
      this.notif_state.push(x);
    }
  }

  clear_unread_notifs(){ this.notif_num = 0; }

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
      data: this.notif_state
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.notif_state = result;
    });
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
        if(notif === this.notif_state[this.notif_state.length - 1])
          this.notif_state = [];
        else notif = {notif: "", state: ""};
      }
    }

}
