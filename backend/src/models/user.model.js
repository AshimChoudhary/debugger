import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function () {
        // Password is required only for local authentication
        return !this.googleId && !this.githubId;
      },
      minlength: 7,
    },
    profilePic: {
      type: String,
      default: '',
    },
    // OAuth fields
    googleId: {
      type: String,
      sparse: true,
    },
    githubId: {
      type: String,
      sparse: true,
    },
    authProvider: {
      type: String,
      enum: ['local', 'google', 'github'],
      default: 'local',
    },
  },
  { timestamps: true }
);
userSchema.index({ googleId: 1 }, { sparse: true });
userSchema.index({ githubId: 1 }, { sparse: true });

const user = mongoose.model('User', userSchema);

export default user;
