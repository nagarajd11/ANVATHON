const VERIFIED_TRANSPORTERS_DATASET = [
  {
    dealer_id: 'TRP_KA_001',
    dealer_name: 'Annadatha Kisan Logistics & Fleet',
    dealer_name_kn: 'ಅನ್ನದಾತ ಕಿಸಾನ್ ಲಾಜಿಸ್ಟಿಕ್ಸ್ & ಫ್ಲೀಟ್',
    contact_phone: '+91 94801 23456',
    whatsapp_number: '+91 94801 23456',
    district_base: 'Davanagere',
    apmc_stand: 'Davanagere Cotton Market Yard Gate 2',
    rating: 4.9,
    trips_completed: 340,
    verified: true,
    verification_badge: 'APMC Authorized Agri-Carrier',
    driver_in_charge: 'Suresh Gowda (KA-17 E-4482)',
    vehicles: [
      {
        vehicle_id: 'VH_DVG_01',
        vehicle_name: 'Tata Ace Gold (Chota Hathi)',
        vehicle_type: 'CHOTA_HATHI',
        capacity_quintals: 15,
        base_fare_inr: 650,
        rate_per_km_inr: 24,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 4
      },
      {
        vehicle_id: 'VH_DVG_02',
        vehicle_name: 'Mahindra Bolero Maxi Truck Plus',
        vehicle_type: 'BOLERO_PICKUP',
        capacity_quintals: 25,
        base_fare_inr: 850,
        rate_per_km_inr: 28,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 5
      },
      {
        vehicle_id: 'VH_DVG_03',
        vehicle_name: 'Eicher Pro 2049 14ft Canter',
        vehicle_type: 'CANTER_TRUCK',
        capacity_quintals: 50,
        base_fare_inr: 1400,
        rate_per_km_inr: 38,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 2
      }
    ]
  },
  {
    dealer_id: 'TRP_KA_002',
    dealer_name: 'Sri Gavimath Agro Logistics Union',
    dealer_name_kn: 'ಶ್ರೀ ಗವಿಮಠ ಕೃಷಿ ಸಾರಿಗೆ ಒಕ್ಕೂಟ',
    contact_phone: '+91 94801 98765',
    whatsapp_number: '+91 94801 98765',
    district_base: 'Koppal',
    apmc_stand: 'Koppal APMC Main Yard Drivers Union Stand',
    rating: 4.9,
    trips_completed: 420,
    verified: true,
    verification_badge: 'APMC Authorized Agri-Carrier',
    driver_in_charge: 'Basavaraj Patil (KA-37 M-8912)',
    vehicles: [
      {
        vehicle_id: 'VH_KPL_01',
        vehicle_name: 'Piaggio Ape Cargo Max',
        vehicle_type: 'THREE_WHEELER',
        capacity_quintals: 8,
        base_fare_inr: 400,
        rate_per_km_inr: 18,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 6
      },
      {
        vehicle_id: 'VH_KPL_02',
        vehicle_name: 'Mahindra Bolero City Pickup',
        vehicle_type: 'BOLERO_PICKUP',
        capacity_quintals: 25,
        base_fare_inr: 850,
        rate_per_km_inr: 28,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 4
      },
      {
        vehicle_id: 'VH_KPL_03',
        vehicle_name: 'Insulated Cold-Van (Reefer)',
        vehicle_type: 'COLD_CHAIN_REEFER',
        capacity_quintals: 35,
        base_fare_inr: 1900,
        rate_per_km_inr: 46,
        is_refrigerated: true,
        cooling_spoilage_reduction_pct: 85,
        available_units_now: 2
      }
    ]
  },
  {
    dealer_id: 'TRP_KA_003',
    dealer_name: 'Kolar Gold APMC Reefer & Freight Lines',
    dealer_name_kn: 'ಕೋಲಾರ ಗೋಲ್ಡ್ ಎಪಿಎಂಸಿ ಶೀತಲೀಕೃತ ಸಾರಿಗೆ',
    contact_phone: '+91 99805 11223',
    whatsapp_number: '+91 99805 11223',
    district_base: 'Kolar',
    apmc_stand: 'Kolar Tomato Market Terminal Gate 1',
    rating: 4.95,
    trips_completed: 680,
    verified: true,
    verification_badge: 'Cold-Chain Certified Carrier',
    driver_in_charge: 'Venkataramana Reddy (KA-07 F-3301)',
    vehicles: [
      {
        vehicle_id: 'VH_KLR_01',
        vehicle_name: 'Carrier Transicold Reefer Van (Cold Chain)',
        vehicle_type: 'COLD_CHAIN_REEFER',
        capacity_quintals: 35,
        base_fare_inr: 1900,
        rate_per_km_inr: 46,
        is_refrigerated: true,
        cooling_spoilage_reduction_pct: 85,
        available_units_now: 5
      },
      {
        vehicle_id: 'VH_KLR_02',
        vehicle_name: 'Mahindra Bolero Maxi Truck HD',
        vehicle_type: 'BOLERO_PICKUP',
        capacity_quintals: 25,
        base_fare_inr: 850,
        rate_per_km_inr: 28,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 7
      },
      {
        vehicle_id: 'VH_KLR_03',
        vehicle_name: 'Eicher 17ft Multi-Axle Canter',
        vehicle_type: 'CANTER_TRUCK',
        capacity_quintals: 50,
        base_fare_inr: 1400,
        rate_per_km_inr: 38,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 3
      }
    ]
  },
  {
    dealer_id: 'TRP_KA_004',
    dealer_name: 'Chamundeshwari Kisan Vahan Seva',
    dealer_name_kn: 'ಚಾಮುಂಡೇಶ್ವರಿ ಕಿಸಾನ್ ವಾಹನ ಸೇವೆ',
    contact_phone: '+91 98440 33455',
    whatsapp_number: '+91 98440 33455',
    district_base: 'Mysuru',
    apmc_stand: 'Mysuru Bandipalya APMC Yard Stand A',
    rating: 4.85,
    trips_completed: 530,
    verified: true,
    verification_badge: 'APMC Authorized Agri-Carrier',
    driver_in_charge: 'Manjunatha Urs (KA-09 TR-7744)',
    vehicles: [
      {
        vehicle_id: 'VH_MYS_01',
        vehicle_name: 'Tata Ace Gold Petrol (High Fuel-Economy)',
        vehicle_type: 'CHOTA_HATHI',
        capacity_quintals: 15,
        base_fare_inr: 650,
        rate_per_km_inr: 24,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 5
      },
      {
        vehicle_id: 'VH_MYS_02',
        vehicle_name: 'Mahindra Bolero Maxi Truck',
        vehicle_type: 'BOLERO_PICKUP',
        capacity_quintals: 25,
        base_fare_inr: 850,
        rate_per_km_inr: 28,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 4
      },
      {
        vehicle_id: 'VH_MYS_03',
        vehicle_name: 'BharatBenz 1015R 17ft Canter',
        vehicle_type: 'CANTER_TRUCK',
        capacity_quintals: 50,
        base_fare_inr: 1400,
        rate_per_km_inr: 38,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 2
      }
    ]
  },
  {
    dealer_id: 'TRP_KA_005',
    dealer_name: 'Basaveshwara Mandi Carriers & Heavy Haul',
    dealer_name_kn: 'ಬಸವೇಶ್ವರ ಮಂಡಿ ಕ್ಯಾರಿಯರ್ಸ್',
    contact_phone: '+91 96110 33445',
    whatsapp_number: '+91 96110 33445',
    district_base: 'Belagavi',
    apmc_stand: 'Belagavi APMC Vegetable Market Gate 3',
    rating: 4.9,
    trips_completed: 480,
    verified: true,
    verification_badge: 'State Highway Verified Logistics',
    driver_in_charge: 'Kallappa Kittur (KA-22 AB-6102)',
    vehicles: [
      {
        vehicle_id: 'VH_BLG_01',
        vehicle_name: 'Mahindra Bolero Camper Pickup',
        vehicle_type: 'BOLERO_PICKUP',
        capacity_quintals: 25,
        base_fare_inr: 850,
        rate_per_km_inr: 28,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 6
      },
      {
        vehicle_id: 'VH_BLG_02',
        vehicle_name: 'Eicher Pro 2059XP 16ft Canter',
        vehicle_type: 'CANTER_TRUCK',
        capacity_quintals: 50,
        base_fare_inr: 1400,
        rate_per_km_inr: 38,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 4
      },
      {
        vehicle_id: 'VH_BLG_03',
        vehicle_name: 'Thermo King Refrigerated Agro Carrier',
        vehicle_type: 'COLD_CHAIN_REEFER',
        capacity_quintals: 35,
        base_fare_inr: 1900,
        rate_per_km_inr: 46,
        is_refrigerated: true,
        cooling_spoilage_reduction_pct: 85,
        available_units_now: 2
      }
    ]
  },
  {
    dealer_id: 'TRP_KA_006',
    dealer_name: 'Byadgi Red Gold Express Freight Network',
    dealer_name_kn: 'ಬ್ಯಾಡಗಿ ರೆಡ್ ಗೋಲ್ಡ್ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಫ್ರೈಟ್',
    contact_phone: '+91 94482 77890',
    whatsapp_number: '+91 94482 77890',
    district_base: 'Haveri',
    apmc_stand: 'Byadgi Chilli Market Yard Gate 1',
    rating: 4.92,
    trips_completed: 590,
    verified: true,
    verification_badge: 'Spice Board & APMC Certified',
    driver_in_charge: 'Gangadharappa Hugar (KA-27 Y-5519)',
    vehicles: [
      {
        vehicle_id: 'VH_BYD_01',
        vehicle_name: 'Tata Ace Gold Plus',
        vehicle_type: 'CHOTA_HATHI',
        capacity_quintals: 15,
        base_fare_inr: 650,
        rate_per_km_inr: 24,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 4
      },
      {
        vehicle_id: 'VH_BYD_02',
        vehicle_name: 'Mahindra Bolero Maxi Truck',
        vehicle_type: 'BOLERO_PICKUP',
        capacity_quintals: 25,
        base_fare_inr: 850,
        rate_per_km_inr: 28,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 5
      },
      {
        vehicle_id: 'VH_BYD_03',
        vehicle_name: 'Eicher 14ft High-Deck Grain Canter',
        vehicle_type: 'CANTER_TRUCK',
        capacity_quintals: 50,
        base_fare_inr: 1400,
        rate_per_km_inr: 38,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 3
      }
    ]
  },
  {
    dealer_id: 'TRP_KA_007',
    dealer_name: 'Sahyadri Malnad Agri Cargo Fleet',
    dealer_name_kn: 'ಸಹ್ಯಾದ್ರಿ ಮಲೆನಾಡು ಕೃಷಿ ಕಾರ್ಗೋ ಫ್ಲೀಟ್',
    contact_phone: '+91 97412 45678',
    whatsapp_number: '+91 97412 45678',
    district_base: 'Shivamogga',
    apmc_stand: 'Shivamogga APMC Sagar Road Agro Hub',
    rating: 4.88,
    trips_completed: 390,
    verified: true,
    verification_badge: 'APMC Authorized Agri-Carrier',
    driver_in_charge: 'Raghunath Bhat (KA-14 Z-1920)',
    vehicles: [
      {
        vehicle_id: 'VH_SMG_01',
        vehicle_name: 'Piaggio Ape Extra LDX',
        vehicle_type: 'THREE_WHEELER',
        capacity_quintals: 8,
        base_fare_inr: 400,
        rate_per_km_inr: 18,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 3
      },
      {
        vehicle_id: 'VH_SMG_02',
        vehicle_name: 'Mahindra Bolero Camper 4x4',
        vehicle_type: 'BOLERO_PICKUP',
        capacity_quintals: 25,
        base_fare_inr: 850,
        rate_per_km_inr: 28,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 4
      },
      {
        vehicle_id: 'VH_SMG_03',
        vehicle_name: 'Cold-Chain Perishable Reefer Van',
        vehicle_type: 'COLD_CHAIN_REEFER',
        capacity_quintals: 35,
        base_fare_inr: 1900,
        rate_per_km_inr: 46,
        is_refrigerated: true,
        cooling_spoilage_reduction_pct: 85,
        available_units_now: 2
      }
    ]
  },
  {
    dealer_id: 'TRP_KA_008',
    dealer_name: 'Hampi Express Agro Transport Guild',
    dealer_name_kn: 'ಹಂಪಿ ಎಕ್ಸ್‌ಪ್ರೆಸ್ ಕೃಷಿ ಸಾರಿಗೆ ಒಕ್ಕೂಟ',
    contact_phone: '+91 98450 66554',
    whatsapp_number: '+91 98450 66554',
    district_base: 'Ballari',
    apmc_stand: 'Ballari APMC Anantapur Road Yard Stand',
    rating: 4.86,
    trips_completed: 460,
    verified: true,
    verification_badge: 'APMC Authorized Agri-Carrier',
    driver_in_charge: 'Thippeswamy Nayak (KA-34 P-9081)',
    vehicles: [
      {
        vehicle_id: 'VH_BLR_01',
        vehicle_name: 'Tata Ace Gold',
        vehicle_type: 'CHOTA_HATHI',
        capacity_quintals: 15,
        base_fare_inr: 650,
        rate_per_km_inr: 24,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 5
      },
      {
        vehicle_id: 'VH_BLR_02',
        vehicle_name: 'Mahindra Bolero Maxi Truck',
        vehicle_type: 'BOLERO_PICKUP',
        capacity_quintals: 25,
        base_fare_inr: 850,
        rate_per_km_inr: 28,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 4
      },
      {
        vehicle_id: 'VH_BLR_03',
        vehicle_name: 'Eicher 14ft Canter',
        vehicle_type: 'CANTER_TRUCK',
        capacity_quintals: 50,
        base_fare_inr: 1400,
        rate_per_km_inr: 38,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 3
      }
    ]
  },
  {
    dealer_id: 'TRP_KA_009',
    dealer_name: 'Kalyana Karnataka Dal & Grain Logistics',
    dealer_name_kn: 'ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ ಬೇಳೆಕಾಳು ಸಾರಿಗೆ',
    contact_phone: '+91 97413 99887',
    whatsapp_number: '+91 97413 99887',
    district_base: 'Kalaburagi',
    apmc_stand: 'Kalaburagi APMC Nehru Gunj Terminal',
    rating: 4.89,
    trips_completed: 510,
    verified: true,
    verification_badge: 'APMC Authorized Agri-Carrier',
    driver_in_charge: 'Mallikarjun Biradar (KA-32 N-4120)',
    vehicles: [
      {
        vehicle_id: 'VH_KLB_01',
        vehicle_name: 'Mahindra Bolero Maxi Truck Plus',
        vehicle_type: 'BOLERO_PICKUP',
        capacity_quintals: 25,
        base_fare_inr: 850,
        rate_per_km_inr: 28,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 6
      },
      {
        vehicle_id: 'VH_KLB_02',
        vehicle_name: 'Tata 1109 LPT 17ft Grain Truck',
        vehicle_type: 'CANTER_TRUCK',
        capacity_quintals: 50,
        base_fare_inr: 1400,
        rate_per_km_inr: 38,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 4
      }
    ]
  },
  {
    dealer_id: 'TRP_KA_010',
    dealer_name: 'Kaveri Green Express & Cold-Chain Logistics',
    dealer_name_kn: 'ಕಾವೇರಿ ಗ್ರೀನ್ ಎಕ್ಸ್‌ಪ್ರೆಸ್ & ಕೋಲ್ಡ್-ಚೈನ್',
    contact_phone: '+91 98450 78901',
    whatsapp_number: '+91 98450 78901',
    district_base: 'Bengaluru Rural',
    apmc_stand: 'Singena Agrahara & Nelamangala APMC Stand',
    rating: 4.94,
    trips_completed: 720,
    verified: true,
    verification_badge: 'National Highway Certified Carrier',
    driver_in_charge: 'Kiran Kumar Reddy (KA-43 T-8821)',
    vehicles: [
      {
        vehicle_id: 'VH_BLR_01',
        vehicle_name: 'Carrier Multi-Temp Cold Van',
        vehicle_type: 'COLD_CHAIN_REEFER',
        capacity_quintals: 35,
        base_fare_inr: 1900,
        rate_per_km_inr: 46,
        is_refrigerated: true,
        cooling_spoilage_reduction_pct: 85,
        available_units_now: 4
      },
      {
        vehicle_id: 'VH_BLR_02',
        vehicle_name: 'Mahindra Bolero Maxi Truck HD',
        vehicle_type: 'BOLERO_PICKUP',
        capacity_quintals: 25,
        base_fare_inr: 850,
        rate_per_km_inr: 28,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 5
      },
      {
        vehicle_id: 'VH_BLR_03',
        vehicle_name: 'Eicher Pro 2049 14ft Canter',
        vehicle_type: 'CANTER_TRUCK',
        capacity_quintals: 50,
        base_fare_inr: 1400,
        rate_per_km_inr: 38,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 3
      }
    ]
  }
];

module.exports = { VERIFIED_TRANSPORTERS_DATASET };
