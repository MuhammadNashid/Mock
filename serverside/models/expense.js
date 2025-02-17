import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  amount: {type: Number},
  description: {type: String},
  category: { type: String},
  date: {type: Date},
  billUrl: {type: String},  // URL to the uploaded bill (image/PDF)
});


export default mongoose.model.Expense||mongoose.model('expense',expenseSchema);