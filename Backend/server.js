
import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors())

const mongoURI = 'mongodb://127.0.0.1:27017/Task-Management-Application';
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(mongoURI, options)
	.then(() => {
		console.log('Connected to MongoDB');
		// Start your application or perform additional operations
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});

const port = 4000;

app.listen(port, () => {
	console.log(`server is running on port`, port);
});
