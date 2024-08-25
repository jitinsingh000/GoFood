const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://jitinsingh000:1AlGYDPYRyDewTEG@gofoodmern.yoxvutv.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const mongoURI = "mongodb+srv://jitinsingh000:RpeXKQslqiu7a6qW@gofoodmern.yoxvutv.mongodb.net/gofoodmern?retryWrites=true&w=majority"
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("DB connected");
        const foodItems_data = mongoose.connection.db.collection('food_items');
        const food_items = await foodItems_data.find({}).toArray();
        // console.log("Food Items Data: ", food_items);
 
        global.food_items = food_items;
        // console.log(global.food_items)
        
        const foodCategory_data = mongoose.connection.db.collection('food_catagories');
        const food_category = await foodCategory_data.find({}).toArray();
        // console.log("Food Category's Data: ", food_category);

        global.food_category = food_category; 
    } catch (err) {
        console.error("Error:", err);
    }
};

module.exports = connectToMongo;
