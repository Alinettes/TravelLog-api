import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';
import { Router } from "@angular/router";
import { User } from 'src/app/models/user';
// import { PlacesMapPage } from 'src/app/models/places-map';
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.page.html',
  styleUrls: ['./profile-user.page.scss'],
})

export class ProfileUserPage implements OnInit {
  currentUser: User;
  
  constructor(public auth: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    this.auth.getUser$().subscribe((user) => {
      this.currentUser = user;
    });
  }

  handleScrollStart() {
    console.log('scroll start');
  }

  handleScroll(ev: CustomEvent<ScrollDetail>) {
    console.log('scroll', ev.detail);
  }

  handleScrollEnd() {
    console.log('scroll end');
  }
  logOut() {
    console.log("logging out...");
    this.auth.logOut();
    this.router.navigateByUrl("/login");
  }
}
