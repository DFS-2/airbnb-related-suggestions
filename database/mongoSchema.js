db.createCollection("homes", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "title", "price", "num_reviews", "rating", "type", "num_beds", "city" ],
          properties: {
             title: {
                bsonType: "string",
             },
             price: {
                bsonType: "double",
             },
             num_reviews: {
                bsonType: "int",
             },
             rating: {
                bsonType: "double" ,
             },
             type: {
                bsonType: "string" ,
             },
             num_beds: {
                bsonType: "int" ,
             },
             city: {
                bsonType: "string" ,
             },
             photos: {
                bsonType: ["string"],
             }
          }
       }
    }
 })

 db.createCollection("users", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "name"],
          properties: {
             name: {
                bsonType: "string",
             },
             
          }
       }
    }
 })

 db.createCollection("userfavoritelists", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "name", "user_id" ],
          properties: {
             name: {
                bsonType: "string",
             },
             user_id: {
                bsonType: "int",
             },
             
          }
       }
    }
 })

 db.createCollection("userfavoritehomes", {
    validator: {
       $jsonSchema: {
          bsonType: "object",
          required: [ "home_id", "userlist_id" ],
          properties: {
             home_id: {
                bsonType: "int",
             },
             userlist_id: {
                bsonType: "int",
             },
          }
       }
    }
 })