import { Component, OnInit } from '@angular/core'
import { CrudService } from '../../service/crud.service'
import { AuthService } from 'src/app/shared/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-incidents-list',
  templateUrl: './incidents-list.component.html',
  styleUrls: ['./incidents-list.component.css'],
})
export class IncidentsListComponent implements OnInit {
  allIncidents = [];
  Incidents: any = [];
  isChecked: boolean = false;

  constructor(private crudService: CrudService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.crudService.GetIncidents().subscribe((res: any) => {
      console.log(res)
      this.allIncidents = res
      this.Incidents = res.filter((obj: any) => {
        return obj.status.toLowerCase() !== 'closed'
      })
    })
  }
  checkValue(event: any) {
    console.log('here', event.target.checked)
    if (event.target.checked == true) {
      this.Incidents = this.allIncidents
    } else {
      this.Incidents = this.allIncidents.filter((obj: any) => {
        return obj.status.toLowerCase() !== 'closed'
      })
    }

  }
  delete(id: any, i: any) {
    if (!this.authService.isLoggedIn) {
      window.alert('Access not allowed!')
      this.router.navigate(['log-in'])
    }
    else {
      console.log(id)
      if (window.confirm('Do you want to go ahead?')) {
        this.crudService.deleteIncident(id).subscribe((res) => {
          this.Incidents.splice(i, 1)
        })
      }
    }

  }
  logIncident(id: any) {
    let route = '/log-incident/{{ incident._id }}';
    this.router.navigate([route], { queryParams: { id } });
  }
}
