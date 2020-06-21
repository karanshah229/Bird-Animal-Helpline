import { Component, OnInit } from '@angular/core';
import { IsMobileService } from 'src/services/Common/is-mobile.service';

@Component({
  selector: 'app-my-cases',
  templateUrl: './my-cases.component.html',
  styleUrls: ['./my-cases.component.scss']
})
export class MyCasesComponent implements OnInit {

  isMobile: boolean
  my_cases: any[] = []

  constructor(private isMobile_t: IsMobileService) { }

  ngOnInit() {
    this.isMobile_t.isMobile().subscribe(result => {
    if (result.matches) {
        this.isMobile = true;
      } else this.isMobile = false;
    });
    //TODO: Get all my cases

  }



}
