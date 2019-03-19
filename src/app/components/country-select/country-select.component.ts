import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})
export class CountrySelectComponent implements OnInit {
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() value: string;
  @Input() allCountries: boolean;

  options: any[];

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.options = (this.allCountries)
      ? this.countryService.getCountryList()
      : this.countryService.getEgnCountryList();

    // if got an invalid code, reset selection
    if (this.value && !this.countryService.isValidCode(this.value)) {
      this.value = undefined;
      this.selectionChange({ value: undefined });
    }
  }

  // emit valueChange event to achieve 2-way binding for "value" property
  selectionChange({ value }) { this.valueChange.emit(value); }
}
