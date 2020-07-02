from apple_notifications.push_package import PushPackage
from apple_notifications.push_package.utilities import PushPackageUtilities

if __name__ == "__main__":

    WEBSITE_PUSH_ID = 'web.br.com.ottimizza.app'

    # {
    #     "websiteName": "Ottimizza Accounts",
    #     "websitePushID": "web.com.herokuapp.angular-apple-notifications",
    #     "allowedDomains": [
    #         "https://angular-apple-notifications.herokuapp.com"
    #     ],
    #     "urlFormatString": "http://accounts.ottimizza.com.br/%@/?flight=%@",
    #     "authenticationToken": "19f8d7a6e9fb8a7f6d9330dabe",
    #     "webServiceURL": "https://staging-notifications-service.herokuapp.com"
    # }


    push_package = PushPackage(WEBSITE_PUSH_ID)

    zip = push_package.create_push_package("1234")
    tmp = push_package.create_temporary_zip(zip)

    print(tmp.name)

    PushPackageUtilities.copy_file(tmp.name, "pushPackage_copy.zip")

    # tmp.close()