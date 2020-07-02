import { Injectable, Inject } from '@angular/core';

interface PermissionData {
	permission: 'default' | 'granted' | 'denied';
	deviceToken?: any;
}

enum Permission {
	DEFAULT = 'default',
	GRANTED = 'granted',
	DENIED = 'denied'
}

@Injectable({providedIn: 'root'})
export class ApplePushNotificationService {

	// Environemnt
	private APN_WEBSERVER_URL = "https://staging-notifications-service.herokuapp.com";
    private APN_WEBSITE_PUSH_ID = "web.br.com.ottimizza.app";
    
	constructor(@Inject('Window') private window: Window) {}

    private isSafari() {
        return ('safari' in this.window) && ('pushNotification' in (<any>this.window).safari);
    }

	public requestSafariNotificationPermission(userinfo: any = {}) {
		if (this.isSafari()) {
			const permissionData: PermissionData = (<any>this.window).safari.pushNotification.permission(
				this.APN_WEBSITE_PUSH_ID
            );
			this.checkRemotePermission(permissionData);
		}
	}

	private checkRemotePermission(permissionData: PermissionData) {        
		if (permissionData.permission === Permission.DEFAULT) {
			// This is a new web service URL and its validity is unknown.
			console.log(`Permission Default: `, permissionData);
			(<any>this.window).safari.pushNotification.requestPermission(
				this.APN_WEBSERVER_URL, // The web service URL.
				this.APN_WEBSITE_PUSH_ID, // The Website Push ID.
				{application_id: 'accounts', username: 'lucas@ottimizza.com.br'}, // Data that you choose to send to your server to help you identify the user.
				this.checkRemotePermission // The callback function.
			);
		} else if (permissionData.permission === Permission.DENIED) {
			// The user said no or something went wrong...
			console.log(`Permission Denied: `, permissionData);
			// The user said no.
		} else if (permissionData.permission === Permission.GRANTED) {
			// The web service URL is a valid push provider, and the user said yes.
			// permissionData.deviceToken is now available to use.
			console.log(`Permission Granted: `, permissionData);
		}
    };

}
