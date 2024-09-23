db.shelve.insertMany([
    {_id: 0, title: "book1", description: "desc1", authors: "auth1"},
    {_id: 1, title: "book2", description: "desc2", authors: "auth2"}
])

db.shelve.find( {title: "name"} )

db.shelve.updateMany(
    {id: {$eq: _id}},
    { $set: {
        description: "new description",
        authors: "new authors"
    }}
)