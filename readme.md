# AloShop

A marketplace app with 2 tabs.

In the first tab, the user can see
the categories, when the user clicks on that category, a list of
products in will be shown. Each product has a `Purchase` button.
When that button is clicked, a map will be shown to the user for
them to select the delivery coordinates. When the user submits
the location, the app will redirect them to a second tab. The
second tab is the active orders of that same user.

It will check every `5` seconds for the status of the order (e.g. `pending`, `processing`, `delivering`, and `delivered`) and every `30` seconds the app will change the status of order automatically.
