migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aviq8jntohmnxe1")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "owhwwaoc",
    "name": "number",
    "type": "number",
    "required": false,
    "unique": true,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("aviq8jntohmnxe1")

  // remove
  collection.schema.removeField("owhwwaoc")

  return dao.saveCollection(collection)
})
