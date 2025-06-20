import { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

interface IMetadata {
  versionId: number;
  lastUpdated: Date;
  createdAt: Date;
  source: 'DrDCAI_interaction' | 'user_manual_entry' | 'health_report_generation' | 'other';
}

interface IDemographics {
  dateOfBirth?: Date;
  biologicalSex?: 'Male' | 'Female' | 'Intersex' | 'Other';
  ethnicity?: string[];
  race?: string[];
  preferredLanguage?: string;
  location?: {
    city?: string;
    regionOrState?: string;
    countryCode?: string;
  };
}

interface ICurrentConsultation {
  consultationDate?: Date;
  chiefComplaint?: IChiefComplaint;
  historyOfPresentIllness?: IHistoryOfPresentIllness;
}

interface IChiefComplaint {
  description: string;
  duration?: string;
  onsetDateTime?: Date;
}

interface IHistoryOfPresentIllness {
  narrative?: string;
  onsetDetails?: string;
  location?: string;
  character?: string;
  severity?: {
    scaleDescription?: string;
    currentValue?: number;
    worstValue?: number;
    averageValue?: number;
  };
  timingAndFrequency?: string;
  aggravatingFactors?: string[];
  alleviatingFactors?: string[];
  radiation?: string;
  associatedSymptoms?: Array<{
    symptomName: string;
    status: 'present' | 'absent' | 'unknown';
    details?: string;
  }>;
  treatmentsTried?: Array<{
    treatment: string;
    response: string;
    dateTried: Date;
  }>;
}

interface IMedicalCondition {
  condition: string;
  yearOfDiagnosis?: number;
  notes?: string;
  isOngoing?: boolean;
  management?: string;
  lastCheckupDate?: Date;
}

interface IMedication {
  name: string;
  genericName?: string;
  dosage?: string;
  form?: string;
  route?: string;
  frequency?: string;
  indication?: string;
  prescribingDoctor?: string;
  startDate?: Date;
  isStillTaking?: boolean;
}

interface IAllergy {
  agent: string;
  agentType: 'medication' | 'food' | 'environmental' | 'other';
  reactionDescription?: string;
  severity?: 'mild' | 'moderate' | 'severe' | 'anaphylactic';
  reactionType?: 'allergy' | 'intolerance' | 'side_effect';
  dateOfLastReaction?: Date;
  verificationStatus?: 'confirmed' | 'suspected';
}

interface IFamilyHistory {
  relative: string;
  condition: string;
  ageOfOnset?: number;
  isAlive?: boolean;
  causeOfDeath?: string;
  ageAtDeath?: number;
}

interface ISocialHistory {
  occupation?: {
    title?: string;
    industry?: string;
    exposures?: string;
  };
  educationLevel?: string;
  livingSituation?: {
    type?: 'alone' | 'with_partner' | 'with_family' | 'with_roommates';
    homeEnvironment?: string;
  };
  tobaccoUse?: {
    status?: 'never' | 'former' | 'current';
    productsUsed?: string[];
    amountPerDay?: string;
    yearsOfUse?: number;
    yearQuit?: number;
  };
  alcoholUse?: {
    status?: 'never' | 'former' | 'current' | 'social';
    typesConsumed?: string[];
    frequency?: string;
    typicalAmount?: string;
  };
  recreationalSubstanceUse?: Array<{
    substance: string;
    status: 'never' | 'former' | 'current';
    route?: string;
    frequency?: string;
    lastUse?: Date;
  }>;
  dietaryHabits?: {
    description?: string;
    commonMeals?: string;
    restrictions?: string[];
    waterIntakeLitersPerDay?: number;
  };
  physicalActivity?: Array<{
    type: string;
    frequencyPerWeek?: number;
    durationMinutesPerSession?: number;
    intensity?: 'low' | 'moderate' | 'high';
  }>;
  sleepPatterns?: {
    hoursPerNightAverage?: number;
    quality?: 'good' | 'fair' | 'poor' | 'variable';
    naps?: boolean;
    sleepAids?: string;
  };
  stress?: {
    level?: 'low' | 'moderate' | 'high';
    sources?: string[];
    copingMechanisms?: string[];
  };
  sexualHistory?: {
    activityStatus?: 'active' | 'inactive';
    partnersDescription?: string;
    contraceptionMethods?: string[];
    stiHistory?: string;
    concerns?: string;
  };
  travelHistory?: Array<{
    location: string;
    year?: number;
    duration?: string;
    purpose?: string;
  }>;
}

interface IReviewOfSystems {
  general?: string;
  integumentary?: string;
  headEyesEarsNoseThroat?: string;
  cardiovascular?: string;
  respiratory?: string;
  gastrointestinal?: string;
  genitourinary?: string;
  musculoskeletal?: string;
  neurological?: string;
  psychiatric?: string;
  endocrine?: string;
  hematologicLymphatic?: string;
}

interface IWomensHealth {
  menstrualHistory?: {
    ageOfMenarche?: number;
    lastMenstrualPeriodDate?: Date;
    cycleLengthDays?: number;
    cycleRegularity?: 'regular' | 'irregular';
    flow?: 'light' | 'moderate' | 'heavy';
    symptoms?: string;
  };
  obstetricHistory?: {
    pregnancies?: number;
    liveBirths?: number;
    miscarriagesOrAbortions?: number;
    complications?: string;
  };
  gynecologicalHistory?: {
    lastPapSmearDate?: Date;
    lastMammogramDate?: Date;
    conditions?: string;
  };
}

interface IMensHealth {
  prostateScreening?: {
    lastPSADate?: Date;
    result?: string;
  };
  testicularSelfExamAwareness?: boolean;
}

interface IGoalsAndPreferences {
  healthGoals?: string[];
  valuesAndBeliefs?: string;
  preferredProviderCommunicationStyle?: string;
}

interface ISafetyAndEnvironment {
  homeSafetyConcerns?: string[];
  occupationalHazards?: string[];
}

export interface IPatientProfile extends Document {
  profileId: string;
  walletId: string;
  meta: IMetadata;
  demographics: IDemographics;
  currentConsultationFocus?: ICurrentConsultation;
  pastMedicalHistory?: {
    childhoodIllnesses?: IMedicalCondition[];
    adultMedicalConditions?: IMedicalCondition[];
    previousSurgeries?: Array<{
      procedure: string;
      year?: number;
      reason?: string;
      hospital?: string;
    }>;
    previousHospitalizations?: Array<{
      reason: string;
      year?: number;
      durationDays?: number;
      hospital?: string;
    }>;
    immunizations?: Array<{
      vaccineName: string;
      administrationDates: Date[];
      seriesCompleted?: boolean;
      nextDueDate?: Date;
    }>;
    preventiveScreenings?: Array<{
      screeningType: string;
      lastDate?: Date;
      result?: string;
      nextRecommendedDate?: Date;
    }>;
    significantTrauma?: Array<{
      description: string;
      year?: number;
      residualEffects?: string;
    }>;
  };
  medicationsAndSupplements?: {
    prescribedMedications?: IMedication[];
    overTheCounterMedications?: IMedication[];
    supplements?: Array<IMedication & { supplementType?: string }>;
  };
  allergiesAndAdverseReactions?: IAllergy[];
  familyHistory?: IFamilyHistory[];
  socialHistoryAndLifestyle?: ISocialHistory;
  reviewOfSystemsBaseline?: IReviewOfSystems;
  womensHealth?: IWomensHealth;
  mensHealth?: IMensHealth;
  goalsAndPreferences?: IGoalsAndPreferences;
  safetyAndEnvironment?: ISafetyAndEnvironment;
}

const PatientProfileSchema = new Schema<IPatientProfile>({
  profileId: { 
    type: String, 
    required: true, 
    unique: true, 
    default: () => uuidv4() 
  },
  walletId: { 
    type: String, 
    required: true, 
    index: true,
    match: /^0x[a-fA-F0-9]{40}$/ 
  },
  meta: {
    versionId: { type: Number, required: true, default: 1 },
    lastUpdated: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    source: { 
      type: String, 
      enum: ['DrDCAI_interaction', 'user_manual_entry', 'health_report_generation', 'other'],
      required: true 
    }
  },
  demographics: {
    dateOfBirth: Date,
    biologicalSex: { 
      type: String, 
      enum: ['Male', 'Female', 'Intersex', 'Other'] 
    },
    ethnicity: [{ type: String }],
    race: [{ type: String }],
    preferredLanguage: {
      type: String,
      match: /^[a-z]{2}(-[A-Z]{2})?$/ // en-US format
    },
    location: {
      city: String,
      regionOrState: String,
      countryCode: {
        type: String,
        uppercase: true,
        match: /^[A-Z]{2}$/ // ISO country code
      }
    }
  },
  currentConsultationFocus: {
    consultationDate: Date,
    chiefComplaint: {
      description: String,
      duration: String,
      onsetDateTime: Date,
      location: String,
      character: String,
      severity: {
        scaleDescription: String,
        currentValue: {
          type: Number,
          min: 0,
          max: 10
        },
        worstValue: {
          type: Number,
          min: 0,
          max: 10
        },
        averageValue: {
          type: Number,
          min: 0,
          max: 10
        }
      }
    },
    historyOfPresentIllness: {
      narrative: String,
      onsetDetails: String,
      timingAndFrequency: String,
      aggravatingFactors: [String],
      alleviatingFactors: [String],
      radiation: String,
      associatedSymptoms: [{
        symptomName: String,
        status: {
          type: String,
          enum: ['present', 'absent', 'unknown']
        },
        details: String
      }],
      treatmentsTried: [{
        treatment: String,
        response: String,
        dateTried: Date
      }]
    }
  },
  pastMedicalHistory: {
    childhoodIllnesses: [{
      condition: String,
      yearOfDiagnosis: Number,
      notes: String
    }],
    adultMedicalConditions: [{
      condition: String,
      yearOfDiagnosis: Number,
      isOngoing: Boolean,
      management: String,
      lastCheckupDate: Date
    }],
    previousSurgeries: [{
      procedure: String,
      year: Number,
      reason: String,
      hospital: String
    }],
    previousHospitalizations: [{
      reason: String,
      year: Number,
      durationDays: Number,
      hospital: String
    }],
    immunizations: [{
      vaccineName: String,
      administrationDates: [Date],
      seriesCompleted: Boolean,
      nextDueDate: Date
    }],
    preventiveScreenings: [{
      screeningType: String,
      lastDate: Date,
      result: String,
      nextRecommendedDate: Date
    }],
    significantTrauma: [{
      description: String,
      year: Number,
      residualEffects: String
    }]
  },
  medicationsAndSupplements: {
    prescribedMedications: [{
      name: String,
      genericName: String,
      dosage: String,
      form: String,
      route: String,
      frequency: String,
      indication: String,
      prescribingDoctor: String,
      startDate: Date,
      isStillTaking: Boolean
    }],
    overTheCounterMedications: [{
      name: String,
      genericName: String,
      dosage: String,
      form: String,
      route: String,
      frequency: String,
      indication: String,
      startDate: Date,
      isStillTaking: Boolean
    }],
    supplements: [{
      name: String,
      genericName: String,
      dosage: String,
      form: String,
      route: String,
      frequency: String,
      supplementType: String,
      startDate: Date,
      isStillTaking: Boolean
    }]
  },
  allergiesAndAdverseReactions: [{
    agent: String,
    agentType: {
      type: String,
      enum: ['medication', 'food', 'environmental', 'other']
    },
    reactionDescription: String,
    severity: {
      type: String,
      enum: ['mild', 'moderate', 'severe', 'anaphylactic']
    },
    reactionType: {
      type: String,
      enum: ['allergy', 'intolerance', 'side_effect']
    },
    dateOfLastReaction: Date,
    verificationStatus: {
      type: String,
      enum: ['confirmed', 'suspected']
    }
  }],
  familyHistory: [{
    relative: String,
    condition: String,
    ageOfOnset: Number,
    isAlive: Boolean,
    causeOfDeath: String,
    ageAtDeath: Number
  }],
  socialHistoryAndLifestyle: {
    occupation: {
      title: String,
      industry: String,
      exposures: String
    },
    educationLevel: String,
    livingSituation: {
      type: {
        type: String,
        enum: ['alone', 'with_partner', 'with_family', 'with_roommates']
      },
      homeEnvironment: String
    },
    tobaccoUse: {
      status: {
        type: String,
        enum: ['never', 'former', 'current']
      },
      productsUsed: [String],
      amountPerDay: String,
      yearsOfUse: Number,
      yearQuit: Number
    },
    alcoholUse: {
      status: {
        type: String,
        enum: ['never', 'former', 'current', 'social']
      },
      typesConsumed: [String],
      frequency: String,
      typicalAmount: String
    },
    recreationalSubstanceUse: [{
      substance: String,
      status: {
        type: String,
        enum: ['never', 'former', 'current']
      },
      route: String,
      frequency: String,
      lastUse: Date
    }],
    dietaryHabits: {
      description: String,
      commonMeals: String,
      restrictions: [String],
      waterIntakeLitersPerDay: Number
    },
    physicalActivity: [{
      type: {
        type: String,
        required: true
      },
      frequencyPerWeek: Number,
      durationMinutesPerSession: Number,
      intensity: {
        type: String,
        enum: ['low', 'moderate', 'high']
      }
    }],
    sleepPatterns: {
      hoursPerNightAverage: Number,
      quality: {
        type: String,
        enum: ['good', 'fair', 'poor', 'variable']
      },
      naps: Boolean,
      sleepAids: String
    },
    stress: {
      level: {
        type: String,
        enum: ['low', 'moderate', 'high']
      },
      sources: [String],
      copingMechanisms: [String]
    },
    sexualHistory: {
      activityStatus: {
        type: String,
        enum: ['active', 'inactive']
      },
      partnersDescription: String,
      contraceptionMethods: [String],
      stiHistory: String,
      concerns: String
    },
    travelHistory: [{
      location: String,
      year: Number,
      duration: String,
      purpose: String
    }]
  },
  reviewOfSystemsBaseline: {
    general: String,
    integumentary: String,
    headEyesEarsNoseThroat: String,
    cardiovascular: String,
    respiratory: String,
    gastrointestinal: String,
    genitourinary: String,
    musculoskeletal: String,
    neurological: String,
    psychiatric: String,
    endocrine: String,
    hematologicLymphatic: String
  },
  womensHealth: {
    menstrualHistory: {
      ageOfMenarche: Number,
      lastMenstrualPeriodDate: Date,
      cycleLengthDays: Number,
      cycleRegularity: {
        type: String,
        enum: ['regular', 'irregular']
      },
      flow: {
        type: String,
        enum: ['light', 'moderate', 'heavy']
      },
      symptoms: String
    },
    obstetricHistory: {
      pregnancies: Number,
      liveBirths: Number,
      miscarriagesOrAbortions: Number,
      complications: String
    },
    gynecologicalHistory: {
      lastPapSmearDate: Date,
      lastMammogramDate: Date,
      conditions: String
    }
  },
  mensHealth: {
    prostateScreening: {
      lastPSADate: Date,
      result: String
    },
    testicularSelfExamAwareness: Boolean
  },
  goalsAndPreferences: {
    healthGoals: [String],
    valuesAndBeliefs: String,
    preferredProviderCommunicationStyle: String
  },
  safetyAndEnvironment: {
    homeSafetyConcerns: [String],
    occupationalHazards: [String]
  }
}, { 
  minimize: false,
  timestamps: false 
});

export const PatientProfile = model<IPatientProfile>('PatientProfile', PatientProfileSchema);