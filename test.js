// const mongoose = require('mongoose');

// // اتصال به پایگاه داده MongoDB
// mongoose.connect('mongodb://localhost:27017/shopDB', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB', err));

// // تعریف مدل کاربر
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   address: String,
//   phoneNumber: String,
//   registrationDate: { type: Date, default: Date.now },
//   lastLoginDate: Date
// });

// const User = mongoose.model('User', userSchema);

// // تعریف مدل محصول
// const productSchema = new mongoose.Schema({
//   productName: { type: String, required: true },
//   price: { type: Number, required: true },
//   description: String,
//   category: String,
//   images: [String],
//   inventory: Number,
//   creationDate: { type: Date, default: Date.now },
//   lastUpdatedDate: Date
// });

// const Product = mongoose.model('Product', productSchema);

// // تعریف مدل سبد خرید
// const cartSchema = new mongoose.Schema({
//   products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
//   quantities: [Number],
//   totalPrice: Number,
//   status: String
// });

// const Cart = mongoose.model('Cart', cartSchema);

// // تعریف مدل سفارش
// const orderSchema = new mongoose.Schema({
//   products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
//   quantities: [Number],
//   totalPrice: Number,
//   deliveryAddress: String,
//   receiverPhoneNumber: String,
//   status: String,
//   orderDate: { type: Date, default: Date.now }
// });

// const Order = mongoose.model('Order', orderSchema);

// // تعریف مدل محتوای تخفیف
// const discountContentSchema = new mongoose.Schema({
//   discountCode: { type: String, required: true, unique: true },
//   discountAmount: { type: Number, required: true },
//   startDate: Date,
//   endDate: Date,
//   conditions: String
// });

// const DiscountContent = mongoose.model('DiscountContent', discountContentSchema);

// // تعریف مدل نظرات
// const reviewSchema = new mongoose.Schema({
//   commentText: { type: String, required: true },
//   rating: { type: Number, min: 1, max: 5 },
//   submissionDate: { type: Date, default: Date.now },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
// });

// const Review = mongoose.model('Review', reviewSchema);

// // تعریف مدل صفحات محتوا
// const contentPageSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: String,
//   contentType: String
// });

// const ContentPage = mongoose.model('ContentPage', contentPageSchema);




////////////////////////////////

// const mongoose = require('mongoose');
// const moment = require('moment');
// const momentJalaali = require('moment-jalaali');

// // اتصال به پایگاه داده MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Could not connect to MongoDB', err));

// // تعریف مدل
// const MyModel = mongoose.model('MyModel', new mongoose.Schema({
//   name: String,
//   // فیلد زمانی به صورت میلادی
//   date: Date
// }));

// // تاریخ میلادی
// const miladiDate = new Date();

// // تبدیل تاریخ میلادی به تاریخ شمسی با استفاده از moment-jalaali
// const shamsiDate = moment(miladiDate).format('jYYYY/jMM/jDD HH:mm:ss');

// // ذخیره تاریخ شمسی در دیتابیس
// const myDocument = new MyModel({ name: 'Example', date: shamsiDate });
// myDocument.save()
//   .then(doc => console.log('Document saved:', doc))
//   .catch(err => console.error('Error saving document:', err));
