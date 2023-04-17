import { Injectable } from '@angular/core';
import { InteractionModule } from 'src/app/models/interaction.module';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public interactions: InteractionModule[] = [];

  constructor() { }
}
