import { Component, OnInit, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { fadeIn, fadeOut } from 'src/animations/anim_registration';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

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
  fadeOut_notif:string[] = [];
  clear_all_notifs_btn_click:boolean = false;
  notif_state:[{notif: string, state: string}] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private dialog: MatDialog,) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );
    console.log(this.isHandset$);
  }

  ngOnInit(){
    //Set "normal" state to all messages
    //for clear_all animation
    for(let i = 0; i < this.notifs.length; i++)
      this.fadeOut_notif[i] = "enter";
    this.notif_num = this.notifs.length;

    //Create Notification State
    for(let i = 0; i < this.notifs.length; i++){
      let x = {notif: this.notifs[i], state: "enter"};
      this.notif_state.push(x);
    }
    console.log(this.notif_state);

    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );
  }

  clear_all_notifs(){
    let i = 0;
    this.clear_all_notifs_btn_click = true;
    let clear_all_notifs = setInterval(() => {
      //this.fadeOut_notif[i] = "leave";
      this.notif_state[i] = {notif: this.notifs[i], state: "leave"};
      console.log("asd: " + i);
      i++;
      if(this.notifs.length === i) clearInterval(clear_all_notifs);
    }, 100);
  }

  clear_all_anim_end(index: number){
    let i = index;
    if(this.clear_all_notifs_btn_click){
      console.info(i);
      if(i === this.notifs.length - 1){
        this.notifs = [];
        //this.notifs = [];
        //this.fadeOut_notif = [];
      } else {
        this.notif_state[i] = {notif: "", state: ""};
        //this.notifs[i] = "";
        //this.fadeOut_notif[i] = "";
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(All_notifications, {
      height: '50%',
      width: '50%',
      data: {notifications: this.notifs}
    });
  }

}

@Component({
  selector: 'all-notifications',
  templateUrl: './all_notifications.html',
  animations: [ fadeIn(), fadeOut() ]
})
export class All_notifications {
  fadeOut_notif:string[] = [];

  constructor(
    public dialogRef: MatDialogRef<All_notifications>,
    @Inject(MAT_DIALOG_DATA) public messages: string[]) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit() {
      //Set "normal" state to all messages
      //for clear_all animation
      for(let i = 0; i < this.messages.length; i++)
        this.fadeOut_notif[i] = "normal";
    }

}
