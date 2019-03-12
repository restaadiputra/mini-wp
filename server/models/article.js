const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: [true, 'An Article must have title.'],
    minlength: [5, `An article's title must be higher than 3 character`]
  },
  content: {
    type: String
  }
},
{ 
  timestamps: { 
    createdAt: 'created_at',
    updatedAt: 'updated_at' 
  }
});

const Artilce = mongoose.model('Article', articleSchema);

module.exports = Artilce;