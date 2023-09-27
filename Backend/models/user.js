import { Schema, model } from 'mongoose';
import { hash as _hash, compare } from 'bcryptjs';

const userSchema = Schema(
	{
		username: { type: String },
		email: { type: String },
		password: { type: String },
	},
	{ timestamp: true }
);

userSchema.pre('save', function (next) {
	let user = this;
	if (user.isModified('password')) {
		return _hash(user.password, 12, function (err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			return next();
		});
	} else {
		return next();
	}
});

userSchema.methods.comparePassword = function (password, next) {
	compare(password, this.password, function (err, match) {
		if (err) {
			return next(err, false);
		}

		return next(null, match);
	});
};

const User = model('User', userSchema);
export default User;