const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("./db/userModel.js");
require("dotenv").config();

const clientID = '1070906125266-rqvs7g4b75k01ua7uau9krq0l4in21g1.apps.googleusercontent.com';
const clientSecret = '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';
const callbackURL = 'http://localhost:5050/auth/google/callback';

passport.use(new GoogleStrategy({
     clientID: clientID,
     clientSecret: clientSecret,
     callbackURL: callbackURL,
     passReqToCallback: false,
}, async function (request, accessToken, refreshToken, profile, done) {

     const user = await User.findOne({ googleId: profile.id });

     console.log(user);

     if (!user) {

          let user = await User.create({
               googleId: profile.id,
               name: profile.displayName,
               email: profile.emails[0].value,
               provider: profile.provier,
               avatar: {
                    public_id: profile.photos[0].value,
                    url: profile.picture,
               },
          });
     } else {
          let user = await User.create({
               googleId: profile.id,
               name: profile.displayName,
               email: profile.emails[0].value,
               provider: profile.provier,
               avatar: {
                    public_id: profile.photos[0].value,
                    url: profile.picture,
               },
          });
     };

     done(null, profile);
}));

passport.serializeUser((user, done) => {
     done(null, user);
});

passport.deserializeUser((user, done) => {
     done(null, user);
});

module.exports = passport;