"use strict";

module.exports = {
    path: "/api/test",
    type: "get",
    handler: function(db, req) {
        return db.foo.create({ name: "Foo test" }).then(() => {
            return db.foo.findAll();
        });
    }
};