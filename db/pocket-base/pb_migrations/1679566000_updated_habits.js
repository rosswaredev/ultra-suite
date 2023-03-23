migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k630km364hmln88")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k630km364hmln88")

  collection.listRule = null

  return dao.saveCollection(collection)
})
