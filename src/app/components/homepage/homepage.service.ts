import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class HomePageService {

    constructor(private httpClient: HttpClient,
        private commonHttpErrorService: CommonHttpErrorService) { }

    // ~~~~~~~~~~~~~~~~~~Hajj~~~~~~~~~~~~~~~~~~~~~ //
    getHajjPilgrimByAssociation(): Observable<any | CommonError> {
        const url = "Dashboard/GetHacPilgrimCountByAssociation"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    getHajjMenAndWomenCount(): Observable<any | CommonError> {
        const url = "Dashboard/GetHacMenAndWomenCount"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    getHajjPilgrimByDepartureAirport(): Observable<any | CommonError> {
        const url = "Dashboard/GetHacPilgrimCountByDepartureAirport"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    // getHajjPilgrimByLandingAirport(): Observable<any | CommonError> {
    //     const url = "Dashboard/GetHacPilgrimCountByLandingAirport"
    //     return this.httpClient.get<any>(url)
    //         .pipe(catchError(this.commonHttpErrorService.handleError));
    // }


    // ~~~~~~~~~~~~~~~~~~Umrah~~~~~~~~~~~~~~~~~~~~~ //

    getUmrahPilgrimByAssociation(): Observable<any | CommonError> {
        const url = "Dashboard/GetUmrePilgrimCountByAssociation"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }
    getUmrahMenAndWomenCount(): Observable<any | CommonError> {
        const url = "Dashboard/GetUmreMenAndWomenCount"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    getUmrahPilgrimByDepartureAirport(): Observable<any | CommonError> {
        const url = "Dashboard/GetUmrePilgrimCountByDepartureAirport"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    // getUmrahPilgrimByLandingAirport(): Observable<any | CommonError> {
    //     const url = "Dashboard/GetUmrePilgrimCountByLandingAirport"
    //     return this.httpClient.get<any>(url)
    //         .pipe(catchError(this.commonHttpErrorService.handleError));
    // }

    // ~~~~~~~~~~~~~~~~~~User~~~~~~~~~~~~~~~~~~~~~ //
    getActiveUser(): Observable<any | CommonError> {
        const url = "Dashboard/GetActiveUserCount"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    getInactiveUser(): Observable<any | CommonError> {
        const url = "Dashboard/GetInactiveUserCount"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    getTotalUser(): Observable<any | CommonError> {
        const url = "Dashboard/GetTotalUserCount"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    // ~~~~~~~~~~~~~~~~~~Funeral Fund~~~~~~~~~~~~~~~~~~~~~ //

    getUnpaidDebtors(): Observable<any | CommonError> {
        const url = "Dashboard/GetUnpaidDebtorsCount"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }

    getPaidDebtors(): Observable<any | CommonError> {
        const url = "Dashboard/GetPaidDebtorsCount"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }
    getDiedMember(): Observable<any | CommonError> {
        const url = "Dashboard/GetDiedMembersCountByYear"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }
    getDebtorsIncomeByYear(): Observable<any | CommonError> {
        const url = "Dashboard/GetDebtorsIncomeByYear"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }
    getFuneralFundMemberbyAge(): Observable<any | CommonError> {
        const url = "Dashboard/GetUsersByAgeQuery"
        return this.httpClient.get<any>(url)
            .pipe(catchError(this.commonHttpErrorService.handleError));
    }


}