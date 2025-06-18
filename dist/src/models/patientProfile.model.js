"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientProfile = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const PatientProfileSchema = new mongoose_1.Schema({
    profileId: {
        type: String,
        required: true,
        unique: true,
        default: () => (0, uuid_1.v4)()
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
exports.PatientProfile = (0, mongoose_1.model)('PatientProfile', PatientProfileSchema);
