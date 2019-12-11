const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

//Mongoose Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'A name is required!'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name cannot be longer than 50 Character'],
      minlength: [10, 'Name cannot be less than 10 Character']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A duration is required!']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A group size is required!']
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is required!'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Dificulty can only be set to: easy, medium or difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be between 1 and 5'],
      max: [5, 'Rating must be between 1 and 5']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A price is required!']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(val) {
          return val < this.price;
        },
        message: 'Dicount price cannot be greator than the price!'
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A summary is required!']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'Image is required!']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

tourSchema.pre(/^find/, function(next) {
  this.find({
    secretTour: { $ne: true }
  });
  next();
});

tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
