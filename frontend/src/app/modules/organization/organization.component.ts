import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventManager } from '@devmn/event-manager';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrganization } from 'src/app/shared/model/organization.model';

import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { OrganizationService } from './organization.service';
import { OrganizationDeleteDialogComponent } from './organization-delete-dialog.component';
import { OrganizationUpdateComponent } from './organization-update.component';
import { OrganizationType } from 'src/app/shared/model/enums/organization-type.model';

@Component({
  selector: 'organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
})
export class OrganizationComponent implements OnInit, OnDestroy {
  organizations?: IOrganization[];
  supplier?: IOrganization[];
  customer?: IOrganization[];
  orgEventSubscriber?: Subscription;
  totalItems = 0;
  active = 1;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected organizationService: OrganizationService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: EventManager,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInOrganizations();
  }

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.organizationService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IOrganization[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnDestroy(): void {
    if (this.orgEventSubscriber) {
      this.eventManager.destroy(this.orgEventSubscriber);
    }
  }

  trackId(index: number, item: IOrganization): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOrganizations(): void {
    this.orgEventSubscriber = this.eventManager.subscribe('organizationListModification', () => this.loadPage());
  }

  delete(organization: IOrganization): void {
    const modalRef = this.modalService.open(OrganizationDeleteDialogComponent, { size: 'sm', backdrop: 'static' });
    modalRef.componentInstance.organization = organization;
  }

  add() {
    const inst = this.modalService.open(OrganizationUpdateComponent, { size: 'lg' });
    inst.result.then(res => {
      this.registerChangeInOrganizations();
    });
  }

  edit(organization) {
    
    const instance = this.modalService.open(OrganizationUpdateComponent, { size: 'lg' });
    instance.componentInstance.organization = organization;
    instance.result.then(res => {
      this.registerChangeInOrganizations();
    });
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IOrganization[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/organization'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
      },
    });
    this.organizations = data || [];
    this.supplier = this.organizations.filter(item => item.type == OrganizationType.SUPPLIER);
    this.customer = this.organizations.filter(item => item.type == OrganizationType.CUSTOMER);
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
