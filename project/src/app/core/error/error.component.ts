import { Component, OnDestroy, OnInit } from '@angular/core';

import { ErrorService } from './error.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  errorMsg = '';
  constructor(private errorService: ErrorService) { }

  ngOnInit(): void {
    this.subscription = this.errorService.apiError$.subscribe((err: any) => {
      this.errorMsg = err?.error.message || '';
      console.log(this.errorMsg)

    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}