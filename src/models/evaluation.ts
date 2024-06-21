import mongoose from "mongoose"

export interface EvaluationSchema extends mongoose.Document {
    from: mongoose.Schema.Types.ObjectId,
    mark: mongoose.Schema.Types.Number,
    note: mongoose.Schema.Types.String
}

const evaluationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mark: {
        type: mongoose.Schema.Types.Number,
        required: true,
        min: 0,
        max: 5,
    },
    note: {
        type: mongoose.Schema.Types.String,
        minlength: 2,
        maxlength: 1000,
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    },
    updatedAt: {
        type: mongoose.Schema.Types.Date,
        default: Date.now
    }
})

const Evaluation = mongoose.models.Evaluation || mongoose.model<EvaluationSchema>('Evaluation', evaluationSchema)

export { Evaluation, evaluationSchema }
