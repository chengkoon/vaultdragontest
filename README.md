#VaultDragon Test#

##Server is deployed at##
http://139.59.244.123:3000/

##Test GET request##
http://139.59.244.123:3000/object/key1

##POST your own object at##
http://139.59.244.123:3000/object/
with the format of {"keyName":"valueName"}

##Some points##
* Code is separated into model, controller, routes folder for easy adding of new API endpoints
* the main querying's condition of the GET request is abstracted out for easy addition of future query, such as location
* timestamp is stored in two separate fields (i.e. timestamp and timestampMS) to enable quicker comparison of queried collections and the user-provided timestamp (faster to compare in terms of milliseconds than Date object)

##Few learning points:##
* reconnecting to the test database before every single unit test to ensure 'clean testing'
* managing of error handling using express middleware and next()
* deploying to digitalocean - new to me but surprisingly manageable
