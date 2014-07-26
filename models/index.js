var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); // to encrypt password

mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Page, User;
var Schema = mongoose.Schema;

// =====All about Pages
var pageSchema = new Schema({
  title: String,
  url_name: String,
  owner_id: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  date: { type: Date, default: Date.now }
});

// generate a url before the saving of every page into mongodb database
// http://mongoosejs.com/docs/middleware.html
pageSchema.pre('save', function(next) {
  var generateUrlName = function(name) {
    if (typeof name != 'undefined' && name !== "") {
      // remove all non-alphanumeric characters from name
      // and make spaces underscore
      return name.replace(/[\s]/ig, "_").replace(/[^\w]/ig, "");
    } else {
      // generates random 5 letter string
      return Math.random().toString(36).substring(2, 7);
    }
  };

  var url_name = generateUrlName(this.title);
  this.url_name = url_name;
  next();
});

// =====All about User
var userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  wikis: [{ type: Schema.Types.ObjectId, ref: 'Page' }]
});

// ======Methods
// generating a password hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};


// =====Export model
Page = mongoose.model('Page', pageSchema);
User = mongoose.model('User', userSchema);

module.exports = {
  'Page': Page,
  'User': User
};