var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/userDB',{
    useNewUrlParser: true,useUnifiedTopology:true
}).then(()=>console.log('Database Connected'));

var userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
       required:true
    },
    msg:[{
        type : String,
    }]
});

module.exports = new mongoose.model('user',userSchema);