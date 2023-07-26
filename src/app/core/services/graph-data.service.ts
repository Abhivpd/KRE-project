import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IgraphData } from '../models/graph.model';

@Injectable({
  providedIn: 'root',
})
export class GraphDataService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<IgraphData[]>(
      'https://eltp-aims-27398-default-rtdb.firebaseio.com/graphData.json'
    );
  }
}
