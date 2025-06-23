import { Document, Schema, model } from 'mongoose';

export interface ILog extends Document {
  medicalLogRef: Schema.Types.ObjectId;
  data: any; // Flexible data field
  timestamp?: Date;
}

const LogSchema = new Schema<ILog>({
  medicalLogRef: {
    type: Schema.Types.ObjectId,
    ref: 'MedicalLog',
    required: true,
    index: true
  },
  data: {
    type: Schema.Types.Mixed,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export const Log = model<ILog>('Log', LogSchema);