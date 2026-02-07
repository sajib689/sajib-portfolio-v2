import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        image: { type: String, required: true },
        tags: [{ type: String }],
        github: { type: String, default: "#" },
        live: { type: String, default: "#" },
    },
    { timestamps: true }
);

const Project = models.Project || model("Project", ProjectSchema);
export default Project;
