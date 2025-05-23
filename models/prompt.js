import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required.'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required.'],
    }
});

const Prompt = models.prompts || model('prompts', PromptSchema);

export default Prompt;