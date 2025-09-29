import mongoose, { Schema } from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

todoSchema.plugin(AutoIncrement, { inc_field: 'todo_id' });

const todo = mongoose.model('Todo', todoSchema);

export default todo;