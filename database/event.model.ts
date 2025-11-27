import mongoose, { Document, Schema, models, model } from "mongoose";

// Typescript interface for Event document
export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string; // ISO 8601 format
  time: string; // HH:MM format
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}


// Event schema definition with validation rules
const EventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxLength: [100, 'Title cannot exceed 100 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      maxLength: [1000, 'Description cannot exceed 1000 characters']
    },
    overview: {
      type: String,
      required: [true, "Event overview is required"],
      trim: true,
      maxLength: [500, 'Overview cannot exceed 100 characters']
    },
    image: {
      type: String,
      required: [true, "Event image URL is required"],
      trim: true,
    },
    venue: {
      type: String,
      required: [true, "Event venue is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
    },
    mode: {
      type: String,
      required: [true, "Event mode is required"],
      enum: {
        values: ["online", "offline", "hybrid"],
        message: "Mode must be either online, offline, or hybrid",
      },
      trim: true,
    },
    audience: {
      type: String,
      required: [true, "Event audience is required"],
      trim: true,
    },
    agenda: {
      type: [String],
      required: [true, "Event agenda is required"],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "Agenda must contain at least one item",
      },
    },
    organizer: {
      type: String,
      required: [true, "Event organizer is required"],
      trim: true,
    },
    tags: {
      type: [String],
      required: [true, "Event tags are required"],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: "Tags must contain at least one item",
      },
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);


function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}


function normalizeDateToISO(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error(`Invalid date format: ${dateString}. Please provide a valid date.`);
  }

  // Return in ISO format (YYYY-MM-DD)
  return date.toISOString().split("T")[0];
}


function normalizeTime(timeString: string): string {
  // Match HH:MM format (24-hour)
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;

  if (!timeRegex.test(timeString)) {
    throw new Error(
      `Invalid time format: ${timeString}. Please use HH:MM format (e.g., 14:30).`
    );
  }

  // Ensure two-digit format
  const [hours, minutes] = timeString.split(":");
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}

//Pre-save hook to auto-generate slug and normalize date/time
EventSchema.pre<IEvent>("save", async function () {
  // Generate slug only if title is new or modified
  if (this.isModified("title")) {
    let baseSlug = generateSlug(this.title);
    let uniqueSlug = baseSlug;
    let counter = 1;

    // Ensure slug uniqueness by appending a counter if needed
    while (
      await mongoose.models.Event.findOne({
        slug: uniqueSlug,
        _id: { $ne: this._id },
      })
    ) {
      uniqueSlug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = uniqueSlug;
  }

  // Normalize date to ISO format if modified
  if (this.isModified("date")) {
    this.date = normalizeDateToISO(this.date);
  }

  // Normalize time format if modified
  if (this.isModified("time")) {
    this.time = normalizeTime(this.time);
  }
});

// Create compound index for common queries
EventSchema.index({ date: 1, mode: 1 });

// Create and export the Event model
const Event = models.Event || model<IEvent>('Event', EventSchema);


export default Event;
