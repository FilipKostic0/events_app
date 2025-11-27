import mongoose, { Document, Model, Schema, Types } from "mongoose";


// TypeScript interface defining the Booking document structure
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}


// Booking schema definition with validation rules
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string): boolean {
          // RFC 5322 compliant email validation regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        },
        message: (props: { value: string }) => `${props.value} is not a valid email address`,
      },
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);


// Add index on eventId for faster query performance
BookingSchema.index({ eventId: 1 });


// Pre-save hook to validate that the referenced Event exists
BookingSchema.pre<IBooking>("save", async function () {

  if (this.isModified("eventId") || this.isNew) {

    // Import Event model dynamically to avoid circular dependency issues
    const Event = mongoose.models.Event || (await import("./event.model")).default;

    // Check if the event exists in the database
    const eventExists = await Event.findById(this.eventId);

    if (!eventExists) {
      throw new Error(
        `Event with ID ${this.eventId} does not exist. Please provide a valid event ID.`
      );
    }
  }
});

 // Create and export the Booking model
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
