import { Component } from '@angular/core';

declare type PageTab = {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
};

@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})

export class LayoutPage {
  tabs: PageTab[];

  constructor() {
    this.tabs = [
      { title: "Accueil", icon: "add", path: "home" },
      { title: "Carte", icon: "map", path: "places-map" },
      { title: "Profil", icon: "list", path: "profile-user" },
    ];
  }
}
