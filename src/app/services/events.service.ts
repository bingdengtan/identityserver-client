import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class EventsService {
    public getUserDataEventEmit: EventEmitter<any>;

    constructor() {
        this.getUserDataEventEmit = new EventEmitter<any>();
    }
}
