import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  logoLocation = '../../assets/img/logo.png';

  constructor(private router: Router) { }

  ngOnInit() {
  }


  test(){
    this.router.navigateByUrl('/stream/' +'mika');
  }

}