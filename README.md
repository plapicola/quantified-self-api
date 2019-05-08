# Quantified Self API

### Using the application

The application provides several endpoints for tracking food and meal information.

##### Get all foods

A list of all foods can be retreived by submitting a `GET` request to the endpoint `/api/v1/foods`. The application will return an array of food objects, including the `id`, `name`, and `calories`, along with a 200 status code. A sample response can be found below:

``` HTTP
status: 200
body:

[
  {
    "id": 1,
    "name": "Banana",
    "calories": 105
  }
]
```
##### Get one food item

A single food object can be retrieved by submitting a `GET` request to the `/api/vi/foods/:id` where `:id` is a valid Id of a food item in the system. This will return a Food Object with its attributes including its `id`, `name`, and `calories` along with a 200 status code. The response would look like:

```HTTP
status: 200
body:

{
  "id": 1,
  "name": "Banana",
  "calories": 105
}
```
If an invalid Id is send you the return will be sent with a 404 status code an an error message. The response would look like:

```HTTP
status: 404
body:

{
  "message": "Food not found."
}

##### Create a food item

A new food item can be added to the system by submitting a `POST` request to the endpoint `/api/v1/foods`. The request should be formatted as follows:

``` HTTP
{
  "food": {
    "name": "Banana",
    "calories": 105
  }
}
```

If the food item has been created, the response will be a 201 status, and include the food item that was created. An example response can be found below:

``` HTTP
code: 201
body:

{
  "id": 1,
  "name": "Banana",
  "calories": 105
}
```

In the event the food could not be created, the application will return a 400 status along with an error message indicating the reason the request failed. An example response can be found below:

``` HTTP
code: 400
body:

{
  "error": "Name is required"
}
```
