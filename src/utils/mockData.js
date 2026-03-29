export const mockPatients = [
  {
    patient_id: "P-1042",
    raw_name: "Znypb Dhvaa",        
    dob: "1985-03-12",               
    vitals_parity: "ODD",
    corruption_status: "ENCRYPTED",
    ward_code: "3C",                 
    hex_bpm: ["0x4C", "0x4E", "0x50", "0x3C", "0x6E", "0x70", "0x4D"],
    hex_o2: ["0x7F", "0x00", "0x00", "0x81", "0x7E", "0x80"],  
    medications: [
      { scrambled: "Cvuvabtcvs", age_key: 40, dosage: "10mg", frequency: "Once daily" },
      { scrambled: "Nfcveva", age_key: 40, dosage: "81mg", frequency: "Once daily" }
    ]
  },
  {
    patient_id: "P-1042",           
    raw_name: "Ryyhf Jngfba",
    dob: "1990-07-22",              
    vitals_parity: "EVEN",
    corruption_status: "ENCRYPTED",
    ward_code: "2S",                
    hex_bpm: ["0x5A", "0x5C", "0x60", "0x62", "0x5E", "0x58", "0x5A"],
    hex_o2: ["0x7D", "0x7C", "0x00", "0x7B", "0x7E", "0x00", "0x7F"],
    medications: [
      { scrambled: "Zbecuvar", age_key: 35, dosage: "5mg", frequency: "Every 6 hours" }
    ]
  },
  {
    patient_id: "P-8821",
    raw_name: "Marcus Aurelius",
    dob: "1960-04-26",              
    vitals_parity: "EVEN",
    corruption_status: "CLEAN",
    ward_code: "1A",                
    hex_bpm: ["0x40", "0x42", "0x45", "0x46", "0x4A", "0x48", "0x4A"],
    hex_o2: ["0x61", "0x62", "0x60", "0x62", "0x61", "0x60", "0x62"], // 97,98,96,98,97,96,98
    medications: [
      { scrambled: "Lisinopril", age_key: 0, dosage: "20mg", frequency: "Daily" }
    ]
  },
  {
    patient_id: "P-2071",
    raw_name: "Wnpxvr Pbyyvaf",
    dob: "1972-11-05",             
    vitals_parity: "ODD",
    corruption_status: "ENCRYPTED",
    ward_code: "3N",                
    hex_bpm: ["0x38", "0x35", "0x33", "0x30", "0x2E", "0x2C", "0x2A"],  // Low BPM -> Critical
    hex_o2: ["0x78", "0x00", "0x7A", "0x7B", "0x00", "0x00", "0x7C"],
    medications: [
      { scrambled: "Yrirgrvenprgnz", age_key: 53, dosage: "500mg", frequency: "Twice daily" }
    ]
  },
  {
    patient_id: "P-3308",
    raw_name: "Fnen Pbaabyyl",
    dob: "2001-01-30",             
    vitals_parity: "EVEN",
    corruption_status: "ENCRYPTED",
    ward_code: "4O",                
    hex_bpm: ["0x64", "0x66", "0x68", "0x6C", "0x70", "0x72", "0x6E"], // High BPM -> Critical
    hex_o2: ["0x7E", "0x7D", "0x7F", "0x00", "0x7D", "0x7C", "0x7E"],
    medications: [
      { scrambled: "Qbkbehavpva", age_key: 24, dosage: "200mg", frequency: "Three times daily" },
      { scrambled: "Baqnafrgeha", age_key: 24, dosage: "4mg IV", frequency: "Before chemo" }
    ]
  },
  {
    patient_id: "P-5412",
    raw_name: "Sarah Connors",     
    dob: "1994-08-30",             
    vitals_parity: "ODD",
    corruption_status: "CLEAN",
    ward_code: "ER",                
    hex_bpm: ["0x55", "0x53", "0x5A", "0x5E", "0x61", "0x5D", "0x5F"], 
    hex_o2: ["0x61", "0x61", "0x60", "0x61", "0x5F", "0x61", "0x62"],
    medications: [
      { scrambled: "Ibuprofen", age_key: 0, dosage: "400mg", frequency: "PRN" }
    ]
  },
  {
    patient_id: "P-9123",
    raw_name: "John Doe",     
    dob: "1954-12-10",             
    vitals_parity: "ODD",
    corruption_status: "CLEAN",
    ward_code: "ICU",                
    hex_bpm: ["0x25", "0x23", "0x27", "0x25", "0x24", "0x23", "0x22"], // CRITICAL LOW
    hex_o2: ["0x55", "0x55", "0x54", "0x55", "0x56", "0x55", "0x54"], // CRITICAL O2
    medications: [
      { scrambled: "Epinephrine", age_key: 0, dosage: "1mg", frequency: "STAT IV" }
    ]
  },
  {
    patient_id: "P-7284",
    raw_name: "Evpxu Qnir",     
    dob: "1988-02-14",             
    vitals_parity: "EVEN",
    corruption_status: "ENCRYPTED",
    ward_code: "NICU",                
    hex_bpm: ["0x7A", "0x7B", "0x7D", "0x7A", "0x7F", "0x80", "0x7E"], 
    hex_o2: ["0x00", "0x00", "0x00", "0x7E", "0x7D", "0x7E", "0x7F"], // HEAVY DATA LOSS
    medications: [
      { scrambled: "Nzbkvpvyyva", age_key: 37, dosage: "250mg", frequency: "TID" }
    ]
  },
  {
    patient_id: "P-6611",
    raw_name: "Anna Smith",     
    dob: "1982-05-18",             
    vitals_parity: "EVEN",
    corruption_status: "CLEAN",
    ward_code: "LAB",                
    hex_bpm: ["0x3E", "0x3F", "0x41", "0x3F", "0x40", "0x40", "0x40"], 
    hex_o2: ["0x61", "0x62", "0x62", "0x63", "0x61", "0x62", "0x63"],
    medications: []
  },
  {
    patient_id: "P-4532",
    raw_name: "Gubznf Revpfba",     
    dob: "1940-09-08",             
    vitals_parity: "ODD",
    corruption_status: "ENCRYPTED",
    ward_code: "3C",                
    hex_bpm: ["0x30", "0x32", "0x2E", "0x30", "0x32", "0x2D", "0x30"], 
    hex_o2: ["0x78", "0x77", "0x00", "0x76", "0x75", "0x00", "0x74"], // Critical O2 lowering
    medications: [
      { scrambled: "Cebcenabyby", age_key: 85, dosage: "80mg", frequency: "Daily" }
    ]
  },
  {
    patient_id: "P-8812",
    raw_name: "Kevin Williams",     
    dob: "1999-07-02",             
    vitals_parity: "EVEN",
    corruption_status: "CLEAN",
    ward_code: "2S",                
    hex_bpm: ["0x45", "0x44", "0x48", "0x46", "0x49", "0x4C", "0x4A"], 
    hex_o2: ["0x60", "0x61", "0x5E", "0x60", "0x61", "0x62", "0x60"],
    medications: []
  },
  {
    patient_id: "P-1120",
    raw_name: "Yhpl Yhpnf",     
    dob: "2010-10-10",             
    vitals_parity: "ODD",
    corruption_status: "ENCRYPTED",
    ward_code: "PED",                
    hex_bpm: ["0x60", "0x62", "0x64", "0x66", "0x6A", "0x6F", "0x6C"], 
    hex_o2: ["0x7E", "0x00", "0x7D", "0x7E", "0x00", "0x7D", "0x7E"], 
    medications: [
      { scrambled: "Zryngbava", age_key: 15, dosage: "3mg", frequency: "At night" }
    ]
  }
];
