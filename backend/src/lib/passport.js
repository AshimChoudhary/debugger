import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import GitHubStrategy from 'passport-github2';
import User from '../models/user.model.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          user.googleId = profile.id;
          user.authProvider = 'google';
          if (!user.profilePic && profile.photos[0]) {
            user.profilePic = profile.photos[0].value;
          }
          await user.save();
          return done(null, user);
        }

        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          fullName: profile.displayName,
          profilePic: profile.photos[0] ? profile.photos[0].value : '',
          authProvider: 'google',
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/github/callback',
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (user) {
          return done(null, user);
        }
        const email =
          profile.emails?.[0]?.value || `${profile.username}@github.com`;

        user = await User.findOne({ email });

        if (user) {
          user.githubId = profile.id;
          user.authProvider = 'github';
          if (!user.profilePic && profile.photos[0]) {
            user.profilePic = profile.photos[0].value;
          }
          await user.save();
          return done(null, user);
        }

        const newUser = new User({
          githubId: profile.id,
          email,
          fullName: profile.displayName || profile.username,
          profilePic: profile.photos[0] ? profile.photos[0].value : '',
          authProvider: 'github',
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
