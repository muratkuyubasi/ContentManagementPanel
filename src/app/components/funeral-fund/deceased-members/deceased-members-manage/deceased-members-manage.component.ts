import { Component, OnInit } from '@angular/core';
import { FuneralFundService } from '../../funeral-fund.service';
import { TranslationService } from '@core/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent } from 'src/app/base.component';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';


@Component({
  selector: 'app-deceased-members-manage',
  templateUrl: './deceased-members-manage.component.html',
  styleUrls: ['./deceased-members-manage.component.css']
})
export class DeceasedMembersManageComponent extends BaseComponent implements OnInit {
  isEditMode: boolean = false;
  isLoadingButton: boolean = false;
  isLoadingNotes: boolean = false;
  deathForm: FormGroup
  id: any;
  memberId: any;
  member: any;
  noteForm: FormGroup
  notes: any;

  constructor(
    private toastrService: ToastrService,
    private activeRoute: ActivatedRoute,
    private translationService: TranslationService,
    private funeralFundService: FuneralFundService,
    private formBuilder: FormBuilder

  ) {
    super();
  }
  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.sub$.sink = this.activeRoute.params.subscribe((params: { id: string, memberId: number }) => {
      this.id = params.id;
      this.memberId = params.memberId;
      this.funeralFundService.getMemberById(this.id).subscribe(data => {
        this.member = data;
        if (this.member.dateOfDeath != null) {
          this.deathForm.patchValue(this.member)
          const formatDate = moment(this.member.dateOfDeath).format('yyyy-MM-DD');
          this.deathForm.patchValue({ dateOfDeath: formatDate })

        }
      });
      this.funeralFundService.getUserNotes(this.id).subscribe(data => {
        this.notes = data;
        if (this.notes.length > 0) {
          this.noteForm.patchValue(this.notes[0])
        }
      });

      this.createDeathForm();
    })
    this.createNotes();


  }

  currentDate() {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  }

  markAsDeceased() {
    this.isLoadingButton = true;
    if (this.member.dateOfDeath != null) {
      this.isEditMode = true;
    }
    const formValue = this.deathForm.value
    if (!this.isEditMode) {
      this.funeralFundService.addFamilyMembersDeathReport(formValue).subscribe((data: any) => {
        if (data.success == true) {
          this.isLoadingButton = false;
          this.toastrService.success(this.translationService.getValue('SAVED_SUCCESSFULLY'));

        } else {
          this.toastrService.error(data.errors[0]);
          this.isLoadingButton = false;
        }

      });

    } else {
      const form = this.formBuilder.group({
        id: this.id,
        firstName: this.member.firstName,
        lastName: this.member.lastName,
        identificationNumber: this.member.identificationNumber,
        birthPlace: this.member.birthPlace,
        birthDay: this.member.birthDay,
        genderId: this.member.genderId,
        nationality: this.member.nationality,
        memberTypeId: this.member.memberTypeId,
        dateOfDeath: this.deathForm.get('dateOfDeath').value,
        burialPlace: this.deathForm.get('burialPlace').value,
        placeOfDeath: this.deathForm.get('placeOfDeath').value

      })
      this.funeralFundService.updateFamilyMember(form.value).subscribe((data: any) => {
        if (data.success == true) {

          this.isLoadingButton = false;
          this.toastrService.success(this.translationService.getValue('UPDATED_SUCCESSFULLY'));
        } else {
          this.toastrService.error(data.errors[0]);
          this.isLoadingButton = false;
        }

      });
    }
    (error: any) => {
      this.isLoadingButton = false;

      if (error && error.errors && error.errors.length > 0) {
        const errorMessage = error.errors[0];
        this.toastrService.error('Bir hata oluştu!', 'Başarısız');
        this.isLoadingButton = false;
      } else {
        this.toastrService.error('Bir hata oluştu!', 'Başarısız');
        this.isLoadingButton = false;
      }
    }
  }



  createDeathForm() {
    this.deathForm = this.formBuilder.group({
      id: this.id,
      dateOfDeath: [this.currentDate(), Validators.required],
      burialPlace: [''],
      placeOfDeath: [''],
    })
  }

  createNotes() {
    this.noteForm = this.formBuilder.group({
      id: [''],
      userId: this.id,
      text: ['']
    })
  }

  addNotes() {
    this.isLoadingNotes = true;
    if (this.notes.length > 0) {
      this.isEditMode = true
    }

    const note = this.noteForm.value

    if (this.isEditMode) {

      this.funeralFundService.updateMemberNotes(note).subscribe(
        (data: any) => {
          this.isLoadingNotes = false;

          if (data.success == true) {

            this.toastrService.success('Başarıyla güncellendi!', 'Başarılı');
          

          } else {
            this.toastrService.error(data.errors[0])
          }
        },
        (error: any) => {
          this.isLoadingNotes = false;

          if (error && error.errors && error.errors.length > 0) {
            const errorMessage = error.errors[0];
            this.toastrService.error('Güncelleme sırasında bir hata oluştu!', 'Başarısız');

          } else {
            this.toastrService.error('Güncelleme sırasında bir hata oluştu!', 'Başarısız');
          }
        }
      );

    }
    else {
      this.funeralFundService.addNotesMember(note).subscribe(
        (data: any) => {
          this.isLoadingNotes = false;


          if (data.success == true) {
            this.toastrService.success('Başarıyla eklendi!', 'Başarılı');
            this.id = data.data.id
            this.getAll();
          }
          else {
            this.toastrService.error(data.errors[0])
          }
        },
        (error: any) => {
          this.isLoadingNotes = false;

          if (error && error.errors && error.errors.length > 0) {
            const errorMessage = error.errors[0];
            this.toastrService.error('Ekleme sırasında bir hata oluştu!', 'Başarısız');
          } else {
            this.toastrService.error('Ekleme sırasında bir hata oluştu!', 'Başarısız');
          }
        }
      );


    }


  }
}
