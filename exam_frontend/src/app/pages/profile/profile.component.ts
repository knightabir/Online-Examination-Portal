import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null; // Specify 'any' if the type is not known at compile-time
  displayedColumns: string[] = ['label', 'value'];
  dataSource = new MatTableDataSource<{ label: string; value: any }>([]);

  constructor(private login: LoginService) {}

  ngOnInit(): void {
    this.user = this.login.getUser();

    if (this.user) {
      this.dataSource.data = [
        { label: 'Username', value: this.user!.username },
        { label: 'User Id', value: this.user!.id },
        { label: 'Phone', value: this.user!.phone },
        { label: 'Role', value: this.user!.authorities?.[0]?.authority },
        { label: 'Status', value: this.user!.enabled },
        // Add more properties as needed
      ];
    }
  }
}
