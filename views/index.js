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
            <ons-tab page="tab1.html" label="Reminders" icon="fa-heartbeat" active>
            </ons-tab>
            <ons-tab page="tab2.html" label="Settings" icon="md-settings">
            </ons-tab>
        </ons-tabbar>

    </ons-page>

    <template id="tab1.html">
        <ons-page id="Tab1">
            <form action="/medications" method="POST">

                <div style="text-align: center; margin-top: 30px;">
                    <p>
                        <input class="text-input text-input--material" placeholder="Medication" type="text" name="medication" required>
                    </p>
                    <p>
                        <input class="text-input text-input--material" placeholder="Time" type="text" name="time" required>
                    </p>
                    <p style="margin-top: 30px;">
                        <button class="button" type="submit">Save Alert</button>
                    </p>
                </div>
            </form>

            <% if (medications) { %>
                <ons-list>

                    <% for(var i=0; i<medications.length; i++) {%>

                        <ons-list-item>

                            <div class="list-item__center list-item--material__center">
                                <div class="list-item__title list-item--material__title">
                                    <%= medications[i].medication %>
                                </div>
                                <div class="list-item__subtitle list-item--material__subtitle">
                                    <%= medications[i].time %>
                                </div>
                            </div>

                            <div class="list-item__right list-item--material__right">
                                <button class="delete button button--outline" onclick="deleteMedication(this.value)" value='<%= medications[i]._id %>' alt='<%= medications[i].userId %>'>
                                    Forget </button>
                            </div>
                        </ons-list-item>

                        <% } %>
                </ons-list>
                <% } %>


        </ons-page>
    </template>

    <template id="tab2.html">
        <ons-page id="Tab2">

            <center>
                <h3 style="margin: 30px; text-align:center; color:lightgray">
                    <!--<i>"An apple a day, keeps the doctor away."</i>-->
                    <img class="image" src="logo.png" width="70%" height="auto">
                </h3>
            </center>
            <ons-list>
                <ons-list-item>
                    <div class="center">
                        Username:
                    </div>
                    <div class="right">
                        <%= user.username %>
                    </div>
                </ons-list-item>

                <ons-list-item>
                    <div class="center">
                        E-mail:
                    </div>
                    <div class="right">
                        <%= user.email  %>
                    </div>
                </ons-list-item>
                <a class="button--large--cta" type="button" href="/logout">Logout</a>
            </ons-list>

            <br/>



        </ons-page>
    </template>

    <script src='serviceWorker.js'></script>
    <script src="main.js"></script>

</body>

</html>