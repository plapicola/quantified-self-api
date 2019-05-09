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

##### Delete one Food item

A single food object can be deleted by submitting a `DELETE` request to the `/api/v1/foods/:id` endpoint where `:id` is a valid Id of a food item in the system. This will return a 204 status code with no body. Example response would be:
```HTTP
status: 204
body:
{

}
```
If the `:id` sent in the request does not exists in the system an unsuccessful response will be returned with a 404 status code and a message. An example response would look like:
```HTTP
status: 404
body:

{
   "message": "Food not found"
}
```

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

##### Update one food item

A single food object can be updated by submitting a `PATCH` request to the `/api/v1/foods/:id` endpoint where `:id` is a valid Id of a food item in the system and the body contains both name and calories as keys. This will return the updated Food Object with its attributes including its `id`, `name`, and `calories` along with a 200 status code. An example request would look like:

```HTTP
POST '/api/v1/foods/1'

body:
{
  "name": "newname",
  "calories": 0
}
```
The response would look like:

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

##### Get all meals

A list of all meal objects and their associated food objects can be retrived by submitting a `GET` request to the endpoint `/api/v1/meals`. The application will return an array of meal objects, including the `id` and `name`, as well as a nested array of food objects containing the `id`, `name`, and `calories` along with a 200 status code. A sample response can be found below:

``` HTTP
code: 200
body:

[
    {
        "id": 1,
        "name": "Breakfast",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 6,
                "name": "Yogurt",
                "calories": 550
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 2,
        "name": "Snack",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 9,
                "name": "Gum",
                "calories": 50
            },
            {
                "id": 10,
                "name": "Cheese",
                "calories": 400
            }
        ]
    },
    {
        "id": 3,
        "name": "Lunch",
        "foods": [
            {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
            },
            {
                "id": 3,
                "name": "Chicken Burrito",
                "calories": 800
            },
            {
                "id": 12,
                "name": "Apple",
                "calories": 220
            }
        ]
    },
    {
        "id": 4,
        "name": "Dinner",
        "foods": [
            {
                "id": 1,
                "name": "Banana",
                "calories": 150
            },
            {
                "id": 2,
                "name": "Bagel Bites - Four Cheese",
                "calories": 650
            },
            {
                "id": 3,
                "name": "Chicken Burrito",
                "calories": 800
            }
        ]
    }
]
```
