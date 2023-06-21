const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/groupdb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log(`Connected to groupdb database!`))