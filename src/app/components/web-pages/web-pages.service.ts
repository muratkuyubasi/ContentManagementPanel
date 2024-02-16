import { CommonHttpErrorService } from './../../core/error-handler/common-http-error.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FrontMenu, FrontMenuRecords, FrontPage } from '@core/domain-classes/web-pages';
import { CommonError } from '@core/error-handler/common-error';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebPagesService {


  languageCode: string = 'tr';
  constructor(
    private httpClient: HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }

  // ~~~~~~~~~~~~~~~~~~Front Menu~~~~~~~~~~~~~~~~~~~~~ //

  addFrontMenu(frontMenu: any): Observable<FrontMenu | CommonError> {
    const url = `FrontMenu/Add`;
    return this.httpClient.post<FrontMenu>(url, frontMenu)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getAllFrontMenu(): Observable<any | CommonError> {
    const url = `FrontMenu/GetList/${this.languageCode}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFrontMenu(frontMenu: any): Observable<any | CommonError> {
    const url = `FrontMenu/Update`;
    return this.httpClient.put<FrontMenu>(url, frontMenu)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontMenuById(code: string): Observable<any | CommonError> {
    const url = `FrontMenu/Get/${code}`;
    return this.httpClient.get<FrontMenu>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));

  }

  deleteFrontMenu(code: string): Observable<any | CommonError> {
    const url = `FrontMenu/Delete/${code}`;
    return this.httpClient.delete<FrontMenu>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));

  }

  // ~~~~~~~~~~~~~~~~~~Front Page~~~~~~~~~~~~~~~~~~~~~ //

  getAllFrontPages(): Observable<any | CommonError> {
    const url = `FrontPage/GetList/${this.languageCode}`;
    return this.httpClient.get<FrontPage>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getAllFrontPageRecord(): Observable<any | CommonError> {
    const url = `FrontPageRecord/GetList`;
    return this.httpClient.get<FrontPage>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  addFrontPage(frontPage: any): Observable<FrontPage | CommonError> {
    const url = `FrontPage/Add`;
    return this.httpClient.post<FrontPage>(url, frontPage)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontPageById(code: string): Observable<any | CommonError> {
    const url = `FrontPage/Get/${code}`;
    return this.httpClient.get<FrontPage>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFrontPage(data): Observable<any | CommonError> {
    const url = `FrontPage/Update`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteFrontPage(code): Observable<any | CommonError> {
    const url = `FrontPage/Delete/${code}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }


  // ~~~~~~~~~~~~~~~~~~Front Announcement~~~~~~~~~~~~~~~~~~~~~ //

  getFrontAllAnnouncements(): Observable<any | CommonError> {
    const url = `FrontAnnouncement/GetList/${this.languageCode}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontAnnouncementByCode(code): Observable<any | CommonError> {
    const url = `FrontAnnouncement/Get/${code}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  addFrontAnnouncement(data): Observable<any | CommonError> {
    const url = `FrontAnnouncement/Add`;
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFrontAnnouncement(data): Observable<any | CommonError> {
    const url = `FrontAnnouncement/Update`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteFrontAnnouncement(code): Observable<any | CommonError> {
    const url = `FrontAnnouncement/Delete/${code}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  // ~~~~~~~~~~~~~~~~~~Front Clergy~~~~~~~~~~~~~~~~~~~~~ //

  getFrontAllClergy(): Observable<any | CommonError> {
    const url = `Clergy/GetAll`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontClergyById(id): Observable<any | CommonError> {
    const url = `Clergy/GetById?id=${id}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  addFrontClergy(data): Observable<any | CommonError> {
    const url = `Clergy/Add`;
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFrontClergy(data): Observable<any | CommonError> {
    const url = `Clergy/Update`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteFrontClergy(id): Observable<any | CommonError> {
    const url = `Clergy/Delete?id=${id}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  // ~~~~~~~~~~~~~~~~~~Front Activity (Faaliyetler)~~~~~~~~~~~~~~~~~~~~~ //

  getFrontAllActivity(): Observable<any | CommonError> {
    const url = `Activity/GetAllActivities`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontActivityById(id): Observable<any | CommonError> {
    const url = `Activity/GetById?id=${id}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  addFrontActivity(data): Observable<any | CommonError> {
    const url = `Activity/Create`;
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFrontActivity(data): Observable<any | CommonError> {
    const url = `Activity/Update`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteFrontActivity(id): Observable<any | CommonError> {
    const url = `Activity/Delete?id=${id}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  // ~~~~~~~~~~~~~~~~~~Front Mosque~~~~~~~~~~~~~~~~~~~~~ //

  getFrontAllMosque(): Observable<any | CommonError> {
    const url = `Mosque/GetAll`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontMosqueById(id): Observable<any | CommonError> {
    const url = `Mosque/GetById?id=${id}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  addFrontMosque(data): Observable<any | CommonError> {
    const url = `Mosque/Add`;
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFrontMosque(data): Observable<any | CommonError> {
    const url = `Mosque/Update`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteFrontMosque(id): Observable<any | CommonError> {
    const url = `Mosque/Delete?id=${id}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  // ~~~~~~~~~~~~~~~~~~Front Service (Hizmetler)~~~~~~~~~~~~~~~~~~~~~ //

  getFrontAllService(): Observable<any | CommonError> {
    const url = `Service/GetList`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontServiceById(id): Observable<any | CommonError> {
    const url = `Service/GetById/${id}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  addFrontService(data): Observable<any | CommonError> {
    const url = `Service/Create`;
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFrontService(data): Observable<any | CommonError> {
    const url = `Service/Update`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteFrontService(id): Observable<any | CommonError> {
    const url = `Service/Delete/${id}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

    // ~~~~~~~~~~~~~~~~~~Front Foundation Pulication~~~~~~~~~~~~~~~~~~~~~ //

    getFrontAllPublication(): Observable<any | CommonError> {
      const url = `FoundationPublication/GetAll`;
      return this.httpClient.get<any>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    getFrontPublicationById(id): Observable<any | CommonError> {
      const url = `FoundationPublication/GetById?id=${id}`;
      return this.httpClient.get<any>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    addFrontPublication(data): Observable<any | CommonError> {
      const url = `FoundationPublication/Add`;
      return this.httpClient.post<any>(url, data)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    updateFrontPublication(data): Observable<any | CommonError> {
      const url = `FoundationPublication/Update`;
      return this.httpClient.put<any>(url, data)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    deleteFrontPublication(id): Observable<any | CommonError> {
      const url = `FoundationPublication/Delete?id=${id}`;
      return this.httpClient.delete<any>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    // ~~~~~~~~~~~~~~~~~~Front Country~~~~~~~~~~~~~~~~~~~~~ //
    
    getFrontAllCountry(): Observable<any | CommonError> {
      const url = `Country/GetList`;
      return this.httpClient.get<any>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    getFrontCountryById(id): Observable<any | CommonError> {
      const url = `Country/GetById?id=${id}`;
      return this.httpClient.get<any>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    getFrontCountryByLangcode(code): Observable<any | CommonError> {
      const url = `Country/GetById?langcode=${code}`;
      return this.httpClient.get<any>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    addFrontCountry(data): Observable<any | CommonError> {
      const url = `Country/Add`;
      return this.httpClient.post<any>(url, data)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    updateFrontCountry(data): Observable<any | CommonError> {
      const url = `Country/Update`;
      return this.httpClient.put<any>(url, data)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    deleteFrontCountry(id): Observable<any | CommonError> {
      const url = `Country/Delete?id=${id}`;
      return this.httpClient.delete<any>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    // ~~~~~~~~~~~~~~~~~~Front City~~~~~~~~~~~~~~~~~~~~~ //
    
    getFrontAllCity(): Observable<any | CommonError> {
      const url = `City/GetList`;
      return this.httpClient.get<any>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    getFrontCityById(id): Observable<any | CommonError> {
      const url = `City/GetById?id=${id}`;
      return this.httpClient.get<any>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    addFrontCity(data): Observable<any | CommonError> {
      const url = `City/Add`;
      return this.httpClient.post<any>(url, data)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    updateFrontCity(data): Observable<any | CommonError> {
      const url = `City/Update`;
      return this.httpClient.put<any>(url, data)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }
  
    deleteFrontCity(id): Observable<any | CommonError> {
      const url = `City/Delete?id=${id}`;
      return this.httpClient.delete<any>(url)
        .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    
    
  // ~~~~~~~~~~~~~~~~~~Front Airport Hajj-Umre Application~~~~~~~~~~~~~~~~~~~~~ //

  addFrontAirport(data): Observable<any | CommonError> {
    const url = `Airport/Add`;
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFrontAirport(data): Observable<any | CommonError> {
    const url = `Airport/Update`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontAllAirport(): Observable<any | CommonError> {
    const url = `Airport/GetAllAirports`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontAirportById(id): Observable<any | CommonError> {
    const url = `Airport/Get/${id}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteFrontAirports(id): Observable<any | CommonError> {
    const url = `Airport/Delete?id=${id}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  // ~~~~~~~~~~~~~~~~~~Front Association Hajj-Umre Application~~~~~~~~~~~~~~~~~~~~~ //

  addFrontAssociation(data): Observable<any | CommonError> {
    const url = `Association/Add`;
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFrontAssociation(data): Observable<any | CommonError> {
    const url = `Association/Update`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontAllAssociation(): Observable<any | CommonError> {
    const url = `Association/GetAllAssociations`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontAssociationById(id): Observable<any | CommonError> {
    const url = `Association/GetById/${id}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteFrontAssociations(id): Observable<any | CommonError> {
    const url = `Association/Delete?id=${id}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  // ~~~~~~~~~~~~~~~~~~Front Room Type  Hajj-Umre Application~~~~~~~~~~~~~~~~~~~~~ //

  addFrontRoomType(data): Observable<any | CommonError> {
    const url = `RoomType/Add`;
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFrontRoomType(data): Observable<any | CommonError> {
    const url = `RoomType/Update`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontAllRoomType(): Observable<any | CommonError> {
    const url = `RoomType/GetAllRoomTypes`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFrontRoomTypeById(id): Observable<any | CommonError> {
    const url = `RoomType/GetById?id=${id}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteFrontRoomTypes(id): Observable<any | CommonError> {
    const url = `RoomType/Delete?id=${id}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

}