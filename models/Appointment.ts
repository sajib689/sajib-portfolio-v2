import mongoose, { Schema, model, models } from "mongoose";

const AppointmentSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        time: { type: Date, required: true },
        roomId: { type: String, required: true },
    },
    { timestamps: true }
);

const Appointment = models.Appointment || model("Appointment", AppointmentSchema);
export default Appointment;
