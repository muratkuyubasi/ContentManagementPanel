import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base.component';
import { WebPagesService } from '../../web-pages/web-pages.service';



@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
})

export class SpecificationComponent extends BaseComponent {
  specification: string = '';

  constructor(
    private webPagesService: WebPagesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAll();
  }


  getAll() {
    this.webPagesService.getAllFrontPageRecord().subscribe((data: any) => {
      this.specification = data[11].pageContent;
    })
  }
}
