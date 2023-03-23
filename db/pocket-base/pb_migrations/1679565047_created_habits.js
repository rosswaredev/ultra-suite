migrate((db) => {
  const collection = new Collection({
    "id": "k630km364hmln88",
    "created": "2023-03-23 09:50:47.103Z",
    "updated": "2023-03-23 09:50:47.103Z",
    "name": "habits",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "d5hrmufq",
        "name": "title",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": 100,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("k630km364hmln88");

  return dao.deleteCollection(collection);
})
