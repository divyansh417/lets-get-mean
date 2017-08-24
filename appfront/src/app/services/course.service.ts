import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Course } from '../models/course';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CourseService{
  private headers=new Headers({'Content-Type':'application/json'});
  constructor(private http: Http){
  }
  addNewCourse(newCourse: Course):Promise<boolean>{
    console.log(newCourse);
    return this.http.post('/',JSON.stringify(newCourse),{headers: this.headers}).toPromise()
    .then(res=>{
        return true;
    });
  }
}