// home.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  subjects = [
    { id: 1, name: 'Mathematics', description: 'Algebra, Calculus, Geometry, etc.' },
    { id: 2, name: 'Science', description: 'Physics, Chemistry, Biology, etc.' },
    // Add more subjects as needed
  ];
}
