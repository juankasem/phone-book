# phone-book
- Download the application.
- Define database connection URL, Here used Mongodb Atlas on the cloud via Mongoose client, Apply your databse    username, password & IP address.
- Define secret key that is used to sign the access token (typically within environment variables).
- A client app ( typically React js)  to receive user inputs & user credetials could have been implemented. ( didn't go through due to time limits).
- could have added a service layer to contain the domain logic, Instead, implemented the business logics, specifications & rules in the controllers (Api Layer).
-Add authentication as a middleware to the routes to the protected resources.