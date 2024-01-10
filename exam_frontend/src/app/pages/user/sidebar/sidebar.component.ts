import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

@Component({
  selector: 'user-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  category:any;
  constructor(
    private _cat:CategoryService,
    private _snak:MatSnackBar,

  ){}
  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.category = data;
      },
      (error)=>{
        this._snak.open('Error Loading Data','OK',{
          duration:3000
        })
      }
    )
  }

}
