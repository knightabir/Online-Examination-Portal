import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {
  category= {
    title:'',
    description:''
  }

  constructor(private _category:CategoryService, private _snak:MatSnackBar){}

  ngOnInit(): void {
    
  }

  formSubmit(){
    if(this.category.title.trim() == '' || this.category.title == null){
      this._snak.open('Title Required','Ok',{
        duration:3000,
      })
      return;
    }
    
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='',
        this.category.description='',
        this._snak.open('Category Added Successfully!','Ok',{
          duration:3000
        }
        )
      },
      (error:any)=>{
        console.log(error)
        this._snak.open('Something Went Wrong','Ok',{
          duration:3000,
        })
      }
    )
  };

}
