import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonError } from '@core/error-handler/common-error';
import { CommonHttpErrorService } from '@core/error-handler/common-http-error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Member } from '@core/domain-classes/funeral-fund';

@Injectable({
  providedIn: 'root'
})
export class FuneralFundService {

  constructor(private httpClient: HttpClient,
    private commonHttpErrorService: CommonHttpErrorService) { }

  // -----------Families------------- //
  addFamily(member: any): Observable<any | CommonError> {
    const url = "Family/FuneralFundApplication";
    return this.httpClient.post<any>(url, member)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFamilies(skip, pageSize, isActive, isDeleted, search, order): Observable<Member | CommonError> {
    const url = "Family/GetFamiliesPagination/" + skip + "/" + pageSize + "?isActive=" + isActive + "&isDeleted=" + isDeleted + "&search=" + search + "&orderBy=" + order;
    return this.httpClient.get<Member>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFamilyByFamilyId(familyId): Observable<any | CommonError> {
    const url = `Family/GetFamilyDetailByFamilyID?familyId=${familyId}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getMemberById(id): Observable<any | CommonError> {
    const url = `Family/GetMemberById?id=${id}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteFamily(id): Observable<any | CommonError> {
    const url = `Family/Delete?id=${id}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteFamilyMember(id): Observable<any | CommonError> {
    const url = `Family/DeleteMember?id=${id}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFamilyMember(data): Observable<any | CommonError> {
    const url = `Family/UpdateFamilyMember`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  approveFamily(id): Observable<any | CommonError> {
    const url = `Family/ChangeActivityStatus?familyId=${id}`;
    return this.httpClient.put<any>(url, id)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFamilyAddress(data): Observable<any | CommonError> {
    const url = `Family/UpdateFamilyAddress`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  addNewFamilyMember(data): Observable<any | CommonError> {
    const url = "Family/AddNewFamilyMember";
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getDeletedMembers(skip, pageSize, search): Observable<any | CommonError> {
    const url = `Family/GetDeletedMembers/${skip}/${pageSize}?search=${search}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getDeletedFamilies(skip, pageSize, search): Observable<any | CommonError> {
    const url = `Family/GetDeletedFamilies/${skip}/${pageSize}?search=${search}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getDiedMembers(skip, pageSize, search): Observable<any | CommonError> {
    const url = `Family/GetAllDiedMembers?skip=${skip}&pageSize=${pageSize}&search=${search}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  addFamilyMembersDeathReport(data): Observable<any | CommonError> {
    const url = `Family/ReportFamilyMemberDateOfDeath?id=${data.id}&dateOfDeath=${data.dateOfDeath}&burialPlace=${data.burialPlace}&placeOfDeath=${data.placeOfDeath}`;
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFamilyHead(familyId, memberId): Observable<any | CommonError> {
    const url = `Family/ChangeHeadOfTheFamily?familyId=${familyId}&memberId=${memberId}`;
    return this.httpClient.put<any>(url, familyId, memberId)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getFamilyByUserId(id): Observable<any | CommonError> {
    const url = `Family/GetFamilyByUserID?id=${id}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  parentalDivorce(familyId): Observable<any | CommonError> {
    const url = `Family/ParentalDivorce?familyId=${familyId}`;
    return this.httpClient.post<any>(url, familyId)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  transferChildrenToAnotherFamily(familyId, transferFamilyId): Observable<any | CommonError> {
    const url = `Family/TransferChildrenToAnotherFamily?familyId=${familyId}&transferFamilyId=${transferFamilyId}`;
    return this.httpClient.put<any>(url, familyId, transferFamilyId)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getMemberCard(id): Observable<any | CommonError> {
    const url = `Family/GetMemberCardPDF?id=${id}`;
    return this.httpClient.get<any>(url, id)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  // -----------Age------------- //

  addAge(data: any): Observable<any | CommonError> {
    const url = "Age/Add";
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getAllAge(): Observable<any | CommonError> {
    const url = "Age/GetAll";
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getAgeGetById(id): Observable<any | CommonError> {
    const url = `Age/GetFamilyByMemberId?memberId=${id}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateAge(data): Observable<any | CommonError> {
    const url = `Age/Update`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteAge(id): Observable<any | CommonError> {
    const url = `Age/Delete?id=${id}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateDues(data: number): Observable<any | CommonError> {
    const url = `Age/Change?dues=${data}`;
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  calculateFee(data): Observable<any | CommonError> {
    const url = `Age/GetAgeByDate?date=${data}`;
    return this.httpClient.get<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  // -----------Notes------------- //

  addNotesFamily(notes): Observable<any | CommonError> {
    const url = `Note/AddFamilyNote`;
    return this.httpClient.post<any>(url, notes)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateFamilyNotes(notes): Observable<any | CommonError> {
    const url = `Note/UpdateFamilyNote`;
    return this.httpClient.put<any>(url, notes)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  addNotesMember(notes): Observable<any | CommonError> {
    const url = `Note/Add`;
    return this.httpClient.post<any>(url, notes)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateMemberNotes(notes): Observable<any | CommonError> {
    const url = `Note/Update`;
    return this.httpClient.put<any>(url, notes)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getUserNotes(id): Observable<any | CommonError> {
    const url = `Note/GetByUserId?id=${id}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  // -----------BILLS------------- //

  getBills(skip, pageSize, year, isPayment, search, order): Observable<any | CommonError> {
    const url = `Debtor/GetAllFDebtorsPagination?skip=${skip}&pageSize=${pageSize}&year=${year}&IsPayment=${isPayment}&search=${search}&orderBy=${order}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  paidBills(id, debtorNumber): Observable<any | CommonError> {
    const url = `Debtor/FamilyDebtPayment?familyId=${id}&debtorNumber=${debtorNumber}`;
    return this.httpClient.put<any>(url, id, debtorNumber)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  addBills(data): Observable<any | CommonError> {
    const url = `Debtor/Add`;
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  updateBills(data): Observable<any | CommonError> {
    const url = `Debtor/UpdateDebtorInformation`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getBillsPdf(id, debtorNumber): Observable<any | CommonError> {
    const url = `Family/GetDebtorPDF?familyId=${id}&debtorNumber=${debtorNumber}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteBill(familyId, debtorNumber): Observable<any | CommonError> {
    const url = `Debtor/DeleteDebtorById?familyId=${familyId}&debtorNumber=${debtorNumber}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getBillstoFolder(year): Observable<any | CommonError> {
    const url = `Debtor/SaveDebtorsToFolder?approve=true&year=${year}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getPdftoPath(path): Observable<any | CommonError> {
    const url = `Debtor/GetPdftoPath?path=${path}`;
    return this.httpClient.get(url, { responseType: 'blob' })
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  getCheckBillFile(year): Observable<any | CommonError> {
    const url = `Debtor/CheckDebtorFile?year=${year}`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }




  // -----------DEBTOR TYPES------------- //

  getAllDebtorTypes(): Observable<any | CommonError> {
    const url = `DebtorType/GetAllDebtorTypes`;
    return this.httpClient.get<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  addDebtorType(data): Observable<any | CommonError> {
    const url = `DebtorType/Add`;
    return this.httpClient.post<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }


  updateDebtorType(data): Observable<any | CommonError> {
    const url = `DebtorType/Update`;
    return this.httpClient.put<any>(url, data)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }

  deleteDebtorType(id): Observable<any | CommonError> {
    const url = `DebtorType/Delete?id=${id}`;
    return this.httpClient.delete<any>(url)
      .pipe(catchError(this.commonHttpErrorService.handleError));
  }



}
