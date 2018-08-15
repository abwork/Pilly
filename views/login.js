<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>MedAlert</title>
    <link rel="manifest" href="./manifest.json">
    <link rel="icon" type="image/png" href="./logo.png" sizes="16x16">
    <link rel="stylesheet" href="https://unpkg.com/onsenui/css/onsenui.css">
    <link rel="stylesheet" href="https://unpkg.com/onsenui/css/onsen-css-components.min.css">
    <script src="https://unpkg.com/onsenui/js/onsenui.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>

<body>
    <ons-page>

        <ons-toolbar>
            <div class="center">MedAlert</div>
            <div class="right">

            </div>
        </ons-toolbar>

        <ons-tabbar swipeable position="auto">
            <ons-tab page="member.html" label="Member" icon="fa-user" active>
            </ons-tab>
            <ons-tab page="register.html" label="Register" icon="fa-address-card">
            </ons-tab>
        </ons-tabbar>

    </ons-page>

    <template id="member.html">
        <ons-page id="Tab1">
            
            <p style="margin-top:2em ;text-align: center;">
                    <img class="image" src="logo.png" width="70%" height="auto">
                <form action="/" method="POST" style="margin-top:2em;">
                    <ons-list>
                        <ons-list-item>
                            <div class="center">
                                <input class="text-input text-input--material" type="text" name="logemail" placeholder="E-mail:" required>
                            </div>
                        </ons-list-item>

                        <ons-list-item>
                            <div class="center">
                                <input class="text-input text-input--material" type="password" name="logpassword" placeholder="Password:" required>
                            </div>
                        </ons-list-item>
                        <input class="button--large--cta" type="submit" value="Enter">
                    </ons-list>
                </form>
            </p>
        </ons-page>
    </template>

    <template id="register.html">
        <ons-page id="Tab2">
            <p style="text-align: center;">
                <form action="/" method="post">
                    <ons-list>
                        <ons-list-item>
                            <div class="center">
                                <input class="text-input text-input--material" type="text" name="email" placeholder="E-mail" required="">
                            </div>
                        </ons-list-item>

                        <ons-list-item>
                            <div class="center">
                                <input class="text-input text-input--material" type="text" name="username" placeholder="Username" required="">
                            </div>
                        </ons-list-item>

                        <ons-list-item>
                            <div class="center">
                                <input class="text-input text-input--material" type="password" name="password" placeholder="Password" required="">
                            </div>
                        </ons-list-item>

                        <ons-list-item>
                            <div class="center">
                                <input class="text-input text-input--material" type="password" name="passwordConf" placeholder="Confirm Password" required="">
                            </div>
                        </ons-list-item>
                        <input class="button--large--cta" type="submit" value="Register">
                    </ons-list>
                </form>
            </p>

        </ons-page>
    </template>

    <script src='serviceWorker.js'></script>
</body>

</html>
