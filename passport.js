const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const GithubStrategy = require("passport-github2").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const dbModel = require('./dbModel')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async function (accessToken, refreshToken, profile, done) {
    const userData = profile._json;
    let user = {};
    try {
      dbModel.getUser("googleid", userData.sub)
      .then(response => {
        if(response.length > 0){
          user = {
            given_name: userData.given_name,
            picture: userData.picture,
            is_new_user: false,
          };
          done(null, user);
        } else {
          dbModel.createUser("googleid", userData.sub, userData.email)
          .then(response => {
            if(response.length > 0){
              user = {
                given_name: userData.given_name,
                picture: userData.picture,
                is_new_user: true,
              };
              done(null, user);
            }
          })
          .catch(error => {
            done(error, false, error.message)
          })
        }
      })
      .catch(error => {
        done(error, false, error.message)
      })
    } catch (error) {
      done(error, false, error.message)
    }
  }
 )
);

// passport.use(
//   new GithubStrategy(
//     {
//       clientID: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//       callbackURL: "/auth/github/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     }
//   )
// );

passport.serializeUser((user, done)=>{
    done(null, user);
});

passport.deserializeUser((user, done)=>{
    done(null, user);
});