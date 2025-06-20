import { Document, Schema, model } from 'mongoose';

export interface ISessionLog extends Document {
  medicalLogRef: Schema.Types.ObjectId;
  data: any; // Flexible data field
  timestamp?: Date;
}

const SessionLogSchema = new Schema<ISessionLog>({
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

export const SessionLog = model<ISessionLog>('SessionLog', SessionLogSchema);