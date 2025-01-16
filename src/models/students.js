const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Course title is required!'],
			trim: true,
		},
		duration: {
			type: Number, // Duration in hours
			required: [true, 'Course duration is required!'],
			min: [1, 'Duration must be at least 1 hour'],
		},
		instructor: {
			type: String, // Name of the instructor
			required: [true, 'Instructor name is required!'],
			trim: true,
		},
		students: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Student', // References the Student model
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
