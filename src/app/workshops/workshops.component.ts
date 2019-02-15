import { Component, OnInit } from "@angular/core";
import { BlogsService } from "../framework/shared/blogs.service";

@Component({
  selector: "blog-workshops",
  templateUrl: "./workshops.component.html",
  styleUrls: ["./workshops.component.scss"]
})
export class WorkshopsComponent implements OnInit {
  step = -1;
  workshops;
  constructor(private service: BlogsService) {}

  ngOnInit() {
    this.service.getWorkshops().subscribe(data => (this.workshops = data));
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
