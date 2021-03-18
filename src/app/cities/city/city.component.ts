import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {City} from '../../model/city';
import {CityService} from '../../service/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities: City[];
  city: City;
  modalReference: NgbModalRef;
  modalOption: NgbModalOptions = {};


  constructor(private cityService: CityService, private modalService: NgbModal, private cdr: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.getCities();
  }

  getCities(): void {
    this.cityService.findAll().subscribe(
      data => {
        this.cities = data;
      }
    );
  }

  delete(city: City): void {
    this.cityService.delete(city)
      .subscribe( data => {
        this.getCities();
        this.cities = this.cities.filter(u => u !== city);
      });
  }

  update(): void {
    this.cityService.update(this.city).subscribe();
    this.getCities();
  }

  add(): void {
    this.cityService.create(this.city).subscribe();
    this.getCities();
  }

  createUpdate(): void {
    if (this.city.name && this.city.info) {
      if (!this.city.id) {
        this.add();
      } else {
        this.update();
      }
      this.modalReference.close();
    } else {
      alert(JSON.stringify('You must fill in the fields \'Name\' and \'Info\''));
    }
  }

  open(city: City, content): void {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalReference = this.modalService.open(content, this.modalOption);
    if (city === null) {
      this.city = new City();
    } else {
      this.city = city;
    }
  }

  cancel(): void {
    this.modalReference.close();
  }
}
