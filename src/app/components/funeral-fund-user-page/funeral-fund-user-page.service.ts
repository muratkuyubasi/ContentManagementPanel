import { Injectable } from '@angular/core';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuneralFundUserPageService {

  constructor(private httpClient: HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }

  updateFuneralFundUser(data): Observable<any | CommonError> {
    const url = `User/UpdateUserContactInformation`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }
}
