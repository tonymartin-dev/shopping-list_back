# SHOPPING LISTS BACKEND

This is a node (typescript) + express backend, pointing to mongoDB database designed for [MariJose](https://github.com/MariaJGuerrero/)'s [Lists-app](https://github.com/MariaJGuerrero/Lists-App) project.

It exposes a simple CRUD API which handles shopping lists.

## Startup

This backend works with a MongoDB database. So, first of all, you need a MongoDB instance in your localhost in your IP `127.0.0.1`.

This instance need a Database called "shopping-lists" with a collection called "lists", wich has to meet the schema located in `/src/schemas/list.ts`.

### Usefull commands

- Launch MongoDB service: `sudo systemctl start mongod`
- Check MongoDB status: `sudo systemctl status mongod`
- Stop MongoDB service: `sudo systemctl stop mongod`
- Serve project in development mode, with watch: `npm run dev`

## Default url

```
http://localhost:3000
```

## Endpoints
---

## **/lists**

#### GET

Returns all lists

- **Params**: none
- **Response**: array of lists. Example:
  ```json
  [
    {
        "_id": "63cc94f2d2d1f5b8209d89b9",
        "name": "test 1",
        "items": [
            "Potatoes",
            "Tomatoes",
            "soup"
        ],
        "__v": 0
    },
    {
        "_id": "63cc975088c44cff4bb335dd",
        "name": "test 2",
        "items": [
            "Potatoes",
            "Tomatoes"
        ],
        "__v": 0
    }
  ]
  ```

#### POST

Creates a list

- **Payload**: complete list. Example:
  ```json
  {
    "name": "test",
    "items": ["Potatoes", "Tomatoes"]
  }
  ```
- **Response**: saved list. Example for given body:
  ```json
  {
    "name": "test",
    "items": ["Potatoes", "Tomatoes"],
    "_id": "63cc975088c44cff4bb335dd",
    "__v": 0
  }
  ```

#### PUT

Updates a list

- **Payload**: complete list with `id`. Example:
  ```json
  {
    "name": "test",
    "items": ["Potatoes", "Tomatoes", "Soup"],
    "_id": "63cc975088c44cff4bb335dd",
  }
  ```
- **Response**: returns saved list, just as sent. Example for given body:
  ```json
  {
    "name": "test",
    "items": ["Potatoes", "Tomatoes", "Soup"],
    "_id": "63cc975088c44cff4bb335dd"
  }
  ```

#### DELETE

Deletes a list

- **Payload**: Object with the `id` of the product to be deleted. Example:
  ```json
  {
    "_id": "63cc975088c44cff4bb335dd",
  }
  ```
- **Response**: returns a succes message:
  ```json
  {
    "message": "List succesfully deleted"
  }
  ```

---

## **/lists/list/:id**

#### GET

Returns a list from a given id

- **Params**: `id` (type: string)
- **Example url**: `http://localhost:3000/lists/list/63cc94f2d2d1f5b8209d89b9`
- **Response**: a list. Example:
  ```json
  {
    "_id": "63cc94f2d2d1f5b8209d89b9",
    "name": "test 1",
    "items": [
        "Potatoes",
        "Tomatoes",
        "soup"
    ],
    "__v": 0
  },
  ```