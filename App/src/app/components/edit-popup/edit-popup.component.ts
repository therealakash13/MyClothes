import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.css',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}
  @Input() display: boolean = false;
  @Input() header!: string;
  @Input() product: Product = {
    name: '',
    image: '',
    price: 0,
    rating: 0,
  };

  productForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    image: [''],
    price: [0, [Validators.required]],
    rating: [0],
  });

  @Output() displayChange = new EventEmitter<boolean>();

  @Output() confirm = new EventEmitter<Product>();

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

  onConfirm() {
    this.confirm.emit({
      name: this.productForm.value.name || '',
      image: this.productForm.value.image || '',
      price: this.productForm.value.price || 0,
      rating: this.productForm.value.rating || 0,
    });
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
