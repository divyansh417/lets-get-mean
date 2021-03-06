import { Component, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Vedios, Course } from  '../models/course';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

import { CourseService } from '../services/course.service';

@Component({
 templateUrl: './addCourse.component.html',
 styleUrls: ['./addCourse.component.scss']
})

export class AddCourseComponent implements OnChanges{
  @Input() course: Course;

  courseForm: FormGroup;
  constructor(private fb: FormBuilder, private courseservice: CourseService,private router:Router){
     this.createForm();
  }
  createForm(){
    this.courseForm=this.fb.group({
      course_id: '',
      title: '',
      description:'',
      author:'',
      no_of_vedios: '',
      secretLairs: this.fb.array([ this.initvedio()])
    });
  }
  initvedio(){
    return this.fb.group({
      vedio_title:[''],
      vedio_url:['']
    })
  }
  ngOnChanges() {
    this.setVediosUrl(this.course.vedios_links);
  }
  setVediosUrl(ved:Vedios[]){
    const vediosFGs=ved.map(vedio=>this.fb.group(vedio));
    const vediosFormArray=this.fb.array(vediosFGs);
    this.courseForm.setControl('secretLairs',vediosFormArray);
  }
  get secretLairs(): FormArray{
     return this.courseForm.get('secretLairs') as FormArray;
  }
  addLair() {
     const control=<FormArray>this.courseForm.controls['secretLairs'];
     control.push(this.initvedio());
  }
  onSubmit(formval:any):void{
    const control=<FormArray>this.courseForm.controls['secretLairs'];
    formval.no_of_vedios=control.length;
    this.courseservice.addNewCourse(formval).then(res=>{
       if(res){
        this.router.navigate(['/admin']);
       }
    });

  }
  removeLair(vedio_index){
    const control=<FormArray>this.courseForm.controls['secretLairs'];
    control.removeAt(vedio_index);
  }
}
