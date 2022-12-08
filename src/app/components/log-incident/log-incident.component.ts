import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-log-incident',
  templateUrl: './log-incident.component.html',
  styleUrls: ['./log-incident.component.css'],
})
export class LogIncidentComponent implements OnInit {
  // statusOptions: any = ['In Progress', 'Closed'];
  getId: any;
  logForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetIncident(this.getId).subscribe((res) => {
      this.logForm.setValue({
        incidentId: res['incidentId'],
        name: res['name'],
        date: res['date'],
        description: res['description'],
        priority: res['priority'],
        status: res['status'],
        narrative: res['narrative'],
        duration: res['duration'],
        resolution: res['resolution'] ||"",
        //modificationTime: res['modificationTime']
      });
    });

    this.logForm = this.formBuilder.group({
      incidentId: [''],
      name: [''],
      date: [''],
      description: [''],
      priority: [''],
      status: [''],
      narrative: [''],
      duration: [''],
      resolution: [''],
      //modificationTime:['']
    });
  }

  ngOnInit() { }

  // onUpdate(): any {console.log('here')
  //   if (this.updateForm.controls['status'].value == "Closed" && this.updateForm.controls['resolution'].value == "") {
  //     window.alert('Please enter the resolution to close the ticket!');

  //   }
  //   else {
  //     this.crudService.updateIncident(this.getId, this.updateForm.value).subscribe(
  //       () => {
  //         console.log('Data updated successfully!');
  //         this.ngZone.run(() => this.router.navigateByUrl('/incidents-list'));
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   }

  // }
}
