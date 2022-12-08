import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-incident',
  templateUrl: './add-incident.component.html',
  styleUrls: ['./add-incident.component.css'],
})
export class AddIncidentComponent implements OnInit {
  incidentForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.incidentForm = this.formBuilder.group({
      incidentId: this.idGenerator(),
      name: [''],
      date: [''],
      description:[''],
      priority: [''],
      status: ['New'],
      narrative: [''],
      duration:[''],
      resolution:[''],
    });
  }
  idGenerator(){
    var date = new Date();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    var d = date.toJSON().slice(0,10).replace(/-/g,'') + "-" + hours + minutes + seconds;
    return d;
  }

  ngOnInit() {}

  onSubmit(): any {
    this.crudService.AddIncident(this.incidentForm.value).subscribe(
      () => {
        console.log('Data added successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/incidents-list'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
}
