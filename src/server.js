const express = require("express");
const {basicAuth, authenticate} = require("./auth/auth");
require("./db/mongoose");

const User = require("./model/User");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// app.use(basicAuth)
// ========================================================
// GET
app.get("/users", basicAuth, (req, res) => {
    if(req.user.role === "ADMIN") {
        User.find({})
        .then((users) => !!users.length ? res.send(users) : res.status(404).send())
        .catch((error) => res.status(500).send(error));
    } else {
        res.status(403).send();
    }
    
}); 

app.get("/users/:username", basicAuth, (req, res) => {

    const { username } = req.params;

    User.findOne({username})
        .then((user) => user ? res.send(user) : res.status(404).send())
        .catch((error) => res.status(500).send(error));
});

// ==========================================================
// POST

app.post("/users", basicAuth, (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(() => res.status(201).send(user))
        .catch((error) => res.status(400).send(error));
}); 

// ===========================================================
// PATCH

app.patch("/users/:username", basicAuth, (req, res) => {
    if(req.user.role === "USER") {
        const updates = Object.keys(req.body);

        if(updates.includes("username")){
            return res.status(400).send("Username cannot be updated!");
        }

        try{
            User.findOneAndUpdate({username: req.params.username}, res.body, { new: true, runValidators: true} )
            .then(user => {
                if(Object.keys(user).length == 0) return res.send(404);
                res.send(user);
            });
        } catch(e) {
            console.log(e);
            res.status(500).send(e);
        }
    } else {
        res.status(403).send();
    }

    
});

// ============================================================
// DELETE

app.delete("/users/:username", basicAuth, (req, res) => {
    if(req.user.role === "USER") {
        try{
            User.findOneAndDelete({username: req.params.username})
                .then((user) => res.status(200).send(user))
                .catch((error) => res.status(404).send());
        } catch(e) {
            res.status(500).send(e);
        }
    } else {
        res.status(403).send();
    }
    
});

app.listen(port, ()=> {
    console.log("PORT " + port);
})