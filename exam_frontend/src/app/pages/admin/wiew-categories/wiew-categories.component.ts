import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wiew-categories',
  templateUrl: './wiew-categories.component.html',
  styleUrl: './wiew-categories.component.css',
})
export class WiewCategoriesComponent implements OnInit {
  categories = [
    {
      cid: 23,
      title: ' ',
      description: ' ',
    }
  ];

  constructor(private _category:CategoryService, private snak:MatSnackBar) {}

  ngOnInit(): void {

    this._category.categories().subscribe((data : any) =>{
      this.categories = data;
      console.log(this.categories);
    },
    (error) =>{
      console.log(error);
      this.snak.open("Error !!","Ok",{
        duration:3000,
      })
    })
  }
}
