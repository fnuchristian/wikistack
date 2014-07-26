//expose our config directly to our application using modules


//using environmental variables to store API keys. Note that you can also just write the key strings in below, but it's not recommended.

var facebookId = "1453661621552559";

var facebookSecret = "32cf7d5df04dcae6a4409429c61fc59f";

module.exports = {
    'facebookAuth' : {
        'clientID'      : facebookId, // your App ID
        'clientSecret'  : facebookSecret, // your App Secret
        'callbackURL'   : 'http://localhost:3000/login/facebook/callback'
    }
}