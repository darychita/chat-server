const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/chat-api", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true
// });


mongoose.connect("mongodb+srv://mainUser:j9bDtLxZniGHgMeS@cluster0-4o0fs.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
});
