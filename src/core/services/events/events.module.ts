import { ModuleWithProviders, NgModule } from '@angular/core';
import { EventsService } from './events.service';

@NgModule({
    providers: [
        EventsService
    ]
})
export class EventsModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: EventsModule,
            providers: [
                EventsService
            ]
        };
    }
}
