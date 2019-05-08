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

A single food object can be retrieved by submitting a `GET` request to the `/api/vi/foods/:id` endpoint where `:id` is a valid Id of a food item in the system. This will return a Food Object with its attributes including its `id`, `name`, and `calories` along with a 200 status code. The response would look like:

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
```

##### Update one food item

A single food object can be updated by submitting a `PATCH` request to the `/api/v1/foods/:id` endpoint where `:id` is a valid Id of a food item in the system and the body contains both name and calories as keys. This will return the updated Food Object with its attributes including its `id`, `name`, and `calories` along with a 200 status code. An example request would look like:

```HTTP
POST '/api/v1/foods/1'

body:
{
  name: 'newname',
  calories: 0
}
```
The response would like:

```HTTP
status: 200
body:
{
  "id": 1,
  "name": "newname",
  "calories": 0
}
```
If the request to the endpoint is sent with ID that is not in the system the response will be returned with a 400 status code, and an error message. An example unsuccessful response will look like:
```HTTP
status: 400
body:
{
  "message": "Food not found."
}
```
If the request does not contain both name and calories in the body the response will be a 400 status code and return an error message. An example response would look like:
```HTTP
status: 400
body:
{
  "message": "Name and Calories required."
}
```
