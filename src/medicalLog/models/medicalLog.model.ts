import { Document, Schema, Types, model } from 'mongoose';

export interface IMedicalLog extends Document {
  walletAddress: string;
  patientProfileRef: Types.ObjectId;
  logRefs: Types.ObjectId[];
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MedicalLogSchema = new Schema<IMedicalLog>({
  walletAddress: {
    type: String,
    required: true,
    match: /^0x[a-fA-F0-9]{40}$/,
    index: true
  },
  patientProfileRef: {
    type: Schema.Types.ObjectId,
    ref: 'PatientProfile',
    required: true
  },
  logRefs: {
    type: [Schema.Types.ObjectId],
    ref: 'log',
    default: []
  },
  summary: {
    type: String,
    trim: true
  }
}, { timestamps: true });

export const MedicalLog = model<IMedicalLog>('MedicalLog', MedicalLogSchema);
