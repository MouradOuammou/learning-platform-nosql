const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Course title is required!'],
			trim: true,
		},
		description: {
			type: String,
			required: [true, 'Course description is required!'],
			trim: true,
		},
		instructor: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User', // Assuming the instructor is a user in your system
			required: true,
		},
		students: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Student', // References the Student model
			},
		],
		duration: {
			type: Number, // Duration in hours
			required: [true, 'Course duration is required!'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
