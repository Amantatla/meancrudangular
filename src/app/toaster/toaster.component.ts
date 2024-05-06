import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent implements OnInit{
  constructor(private toast:ToastrService){}
  ngOnInit(): void {
    this.showToaster()
  }

  showToaster(){
    this.toast.success("Saved Successfullt", "Success")
  }
}
