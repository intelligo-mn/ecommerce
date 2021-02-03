import { Component, Input, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProduct, Product } from 'src/app/shared/model/product.model';
import { ProductService } from './product.service';
import { ICategory } from 'src/app/shared/model/category.model';
import { CategoryService } from 'src/app/modules/category/category.service';
import { IUnit } from 'src/app/shared/model/unit.model';
import { UnitService } from 'src/app/modules/unit/unit.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from '@devmn/event-manager';

type SelectableEntity = ICategory | IUnit;

@Component({
  selector: 'product-update',
  templateUrl: './product-update.component.html',
})
export class ProductUpdateComponent implements OnInit {
  @Input() product: IProduct;
  isSaving = false;
  categories: ICategory[] = [];
  units: IUnit[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    category: [null, Validators.required],
    unit: [null, Validators.required],
  });

  constructor(
    protected productService: ProductService,
    protected categoryService: CategoryService,
    protected unitService: UnitService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private eventManager: EventManager,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (this.product) {
      this.updateForm(this.product);
    }

    this.categoryService.query().subscribe((res: HttpResponse<ICategory[]>) => (this.categories = res.body || []));

    this.unitService.query().subscribe((res: HttpResponse<IUnit[]>) => (this.units = res.body || []));
  }

  updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      unit: product.unit,
    });
  }

  save(): void {
    this.isSaving = true;
    const product = this.editForm.value;
    debugger;
    if (product.id) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      product.id = undefined;
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.activeModal.close();
    this.eventManager.broadcast('productListModification');
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
