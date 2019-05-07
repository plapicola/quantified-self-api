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
```
