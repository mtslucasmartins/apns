import { Injectable, Inject } from "@angular/core";
import { ApplePushNotificationService } from './apple-notification.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        @Inject('Window') private window: Window, 
        private appleNotificationService: ApplePushNotificationService
    ) {}

    private isSafari() {
        return ('safari' in this.window) && ('pushNotification' in (<any>this.window).safari);
    }

    public requestPermission(userinfo: any = {}) {
        if (this.isSafari()) {
            console.log('Browser is Safari!');
            
            this.appleNotificationService.requestSafariNotificationPermission(userinfo);
        } else {
            alert(`Another Notification Service`);
        }
    }

}