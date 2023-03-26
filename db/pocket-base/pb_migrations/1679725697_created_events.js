migrate((db) => {
  const collection = new Collection({
    "id": "aviq8jntohmnxe1",
    "created": "2023-03-25 06:28:17.560Z",
    "updated": "2023-03-25 06:28:17.560Z",
    "name": "events",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "83jtik2e",
        "name": "event",
        "type": "json",
        "required": true,
        "unique": false,
        "options": {}
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("aviq8jntohmnxe1");

  return dao.deleteCollection(collection);
})
