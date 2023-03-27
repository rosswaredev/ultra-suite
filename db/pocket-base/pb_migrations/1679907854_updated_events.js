migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aviq8jntohmnxe1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "83jtik2e",
    "name": "action",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aviq8jntohmnxe1")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "83jtik2e",
    "name": "event",
    "type": "json",
    "required": true,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
