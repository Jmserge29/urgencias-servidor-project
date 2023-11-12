import { Schema, model } from "mongoose";

const roleSchema = new Schema([
    {
        role: {
            type: String,
            require: true
        }
    },
])

export default model("Role", roleSchema)