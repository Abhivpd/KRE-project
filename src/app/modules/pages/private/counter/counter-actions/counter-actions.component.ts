import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment } from '../store/counter.actions';

@Component({
  selector: 'app-counter-actions',
  templateUrl: './counter-actions.component.html',
  styleUrls: ['./counter-actions.component.scss'],
})
export class CounterActionsComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  onIncrement() {
    this.store.dispatch(increment({value: 1}));
  }

  onDecrement() {
    this.store.dispatch(decrement({value: 2}))
  }
}
