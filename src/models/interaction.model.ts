import { Document, Schema, model } from 'mongoose';

export interface IInteraction extends Document {
  walletAddress: string;
  patientProfileRef: Schema.Types.ObjectId; // Reference instead of embedded
  activityLog: any[];
  summary?: string;
}

const InteractionSchema = new Schema<IInteraction>({
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
  activityLog: {
    type: Schema.Types.Mixed,
    default: [],
    required: true
  },
  summary: String
}, { timestamps: true });

export const Interaction = model<IInteraction>('Interaction', InteractionSchema);