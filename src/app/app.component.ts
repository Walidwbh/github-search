import { Component, OnInit} from '@angular/core';
import { GetUserService } from './services/get-user.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { Observable } from 'rxjs';
import { UserData } from './user-data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'github-search';
  myForm!: FormGroup;
  userData$!: Observable<UserData>;
  error!: string;
  constructor(private userService: GetUserService, private fb: FormBuilder){

  }
  ngOnInit(): void {
  this.myForm = this.fb.group({
    userName: ['', [Validators.required]]
  })
  }
  getUser(){
    let userName = this.myForm.get("userName")
    this.userData$ = this.userService.getUser(userName?.value);
    // this.userData$.subscribe(data=>{
    //   return data
    // });
    this.userData$.subscribe({
      next: (data)=>{
        this.error = "";
        return data;
      },
      error: ()=>this.error= "User Not Found...",
      complete: ()=>console.log("complete")
    });


  }
}
