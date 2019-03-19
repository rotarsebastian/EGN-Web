import { Injectable } from "@angular/core";

// This list is also available on BE api, so if you change one, change both
import countryList from "../../assets/data/countries.js";
import egnCountryList from "../../assets/data/egnCountries.js";

@Injectable()
export class CountryService {
  constructor() {}

  getCountryList(): any[] {
    return countryList;
  }

  getEgnCountryList(): any[] {
    return egnCountryList;
  }

  isValidCode(code: string, egn = false): boolean {
    const countryList = egn ? this.getEgnCountryList() : this.getCountryList();
    return !!countryList.find(v => v.code === code);
  }

  parseCountryCode(code: string): string {
    const found = this.getCountryList().find(v => v.code === code);

    return found ? found.name : null;
  }
}
