/**
 * Comprehensive Multilingual Voice Command Parser for HarvestRoute
 * Fully operates on ALL input sights and interactive features across:
 * 1. English ('en' / 'en-IN')
 * 2. Kannada ('kn' / 'kn-IN')
 * 3. Hindi ('hi' / 'hi-IN')
 * 
 * Supports:
 * - Origins: All 31 Karnataka Districts + Taluk Hubs with regional stems and inflections
 * - Crops: All 28 agricultural & horticultural produce in the HarvestRoute database
 * - Quantities: Digits, Kannada numerals (೦-೯), Hindi numerals (०-९), spoken number words, and ton-to-quintal conversions
 * - Freshness: Just harvested / Today (<6h), 1 day / Yesterday (24h), 2 days (48h)
 * - Vehicles: Auto (Three-Wheeler), Tata Ace (Chota Hathi), Bolero Maxi Truck, Eicher 14ft Canter, Cold-Van Reefer
 * - Sensitivity Overrides: High fuel, low fuel, hot weather / summer spoilage, winter spoilage, road speed, reset
 * - Action Commands: Calculate / find best mandi, open route map, open dispatch slip, open truck sharing, reset form
 */

// 1. All 31 Karnataka Districts + Synonyms & Regional Case Endings
export const ORIGIN_SYNONYMS = {
  'Davanagere': [
    'davanagere', 'davangere', 'davangiri', 'davangere district',
    'ದಾವಣಗೆರೆ', 'ದಾವಣಗೆರೆಯಿಂದ', 'ದಾವಣಗೆರೆಯ', 'ದಾವಣಗೆರೆಗೆ', 'ದಾಖಣಗೆರೆ',
    'दावणगेरे', 'दावणगेरी', 'दावणगेरे से'
  ],
  'Kolar': [
    'kolar', 'kolara', 'kolar gold fields', 'kgf',
    'ಕೋಲಾರ', 'ಕೋಲಾರದಿಂದ', 'ಕೋಲಾರದ', 'ಕೋಲಾರಕ್ಕೆ', 'ಕೋಲಾರ ಜಿಲ್ಲೆ',
    'कोलार', 'कोलार से', 'कोलार जिला'
  ],
  'Chamarajanagar': [
    'chamarajanagar', 'chamarajnagar', 'chamaraja nagar',
    'ಚಾಮರಾಜನಗರ', 'ಚಾಮರಾಜನಗರದಿಂದ', 'ಚಾಮರಾಜನಗರದ', 'ಚಾಮರಾಜನಗರಕ್ಕೆ',
    'चामराजनगर', 'चामराजनगर से'
  ],
  'Belagavi': [
    'belagavi', 'belgaum', 'belgaon',
    'ಬೆಳಗಾವಿ', 'ಬೆಳಗಾವಿಯಿಂದ', 'ಬೆಳಗಾವಿಯ', 'ಬೆಳಗಾಂ', 'ಬೆಳಗಾವಿಗೆ',
    'बेलगाम', 'बेलगावी', 'बेलगाम से'
  ],
  'Mysuru': [
    'mysuru', 'mysore', 'mysuru district',
    'ಮೈಸೂರು', 'ಮೈಸೂರಿನಿಂದ', 'ಮೈಸೂರಿನ', 'ಮೈಸೂರಿಗೆ', 'ಮೈಸುರು',
    'मैसूर', 'मैसुरु', 'मैसूर से'
  ],
  'Mandya': [
    'mandya', 'sugar city',
    'ಮಂಡ್ಯ', 'ಮಂಡ್ಯದಿಂದ', 'ಮಂಡ್ಯದ', 'ಮಂಡ್ಯಕ್ಕೆ',
    'मांड्या', 'मंड्या', 'मांड्या से'
  ],
  'Haveri': [
    'haveri', 'byadgi', 'byadagi',
    'ಹಾವೇರಿ', 'ಹಾವೇರಿಯಿಂದ', 'ಹಾವೇರಿಯ', 'ಹಾವೇರಿಗೆ', 'ಬ್ಯಾಡಗಿ',
    'हावेरी', 'हावेरी से'
  ],
  'Shivamogga': [
    'shivamogga', 'shimoga', 'malnad',
    'ಶಿವಮೊಗ್ಗ', 'ಶಿವಮೊಗ್ಗದಿಂದ', 'ಶಿವಮೊಗ್ಗದ', 'ಶಿವಮೊಗ್ಗಕ್ಕೆ', 'ಶಿಮೋಗ',
    'शिमोगा', 'शिवमोग्गा', 'शिमोगा से'
  ],
  'Bengaluru Rural': [
    'bengaluru rural', 'bangalore rural', 'devenahalli', 'hoskote', 'nelamangala',
    'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ', 'ಬೆಂಗಳೂರು ಗ್ರಾಮೀಣ', 'ದೇವನಹಳ್ಳಿ', 'ಹೊಸಕೋಟೆ', 'ನೆಲಮಂಗಲ',
    'बैंगलोर ग्रामीण', 'बेंगलुरु ग्रामीण', 'बेंगलुरु देहात'
  ],
  'Bengaluru Urban': [
    'bengaluru urban', 'bangalore urban', 'bangalore city', 'bengaluru city', 'bangalore', 'bengaluru',
    'ಬೆಂಗಳೂರು ನಗರ', 'ಬೆಂಗಳೂರು', 'ಬೆಂಗಳೂರಿನಿಂದ', 'ಬೆಂಗಳೂರಿಗೆ',
    'बैंगलोर शहर', 'बैंगलोर', 'बेंगलुरु', 'बैंगलोर से'
  ],
  'Chikkaballapur': [
    'chikkaballapur', 'chikkaballapura', 'chikballapur', 'chintamani',
    'ಚಿಕ್ಕಬಳ್ಳಾಪುರ', 'ಚಿಕ್ಕಬಳ್ಳಾಪುರದಿಂದ', 'ಚಿಕ್ಕಬಳ್ಳಾಪುರದ', 'ಚಿಂತಾಮಣಿ',
    'चिकबल्लापुर', 'चिक्काबल्लापुर', 'चिकबल्लापुर से'
  ],
  'Chikkamagaluru': [
    'chikkamagaluru', 'chikmagalur', 'chikmagaluru', 'tarikere',
    'ಚಿಕ್ಕಮಗಳೂರು', 'ಚಿಕ್ಕಮಗಳೂರಿನಿಂದ', 'ಚಿಕ್ಕಮಗಳೂರಿನ', 'ಚಿಕ್ಕಮಗಳೂರಿಗೆ',
    'चिकमगलूर', 'चिक्कमगलुरु', 'चिकमगलूर से'
  ],
  'Chitradurga': [
    'chitradurga', 'chtradurga', 'chitradurg', 'durga', 'challakere',
    'ಚಿತ್ರದುರ್ಗ', 'ಚಿತ್ರದುರ್ಗದಿಂದ', 'ಚಿತ್ರದುರ್ಗದ', 'ಚಿತ್ರದುರ್ಗಕ್ಕೆ', 'ಚಳ್ಳಕೆರೆ',
    'चित्रदुर्ग', 'चित्रदुर्ग से'
  ],
  'Dakshina Kannada': [
    'dakshina kannada', 'south canara', 'mangaluru', 'mangalore', 'puttur',
    'ದಕ್ಷಿಣ ಕನ್ನಡ', 'ದಕ್ಷಿಣ ಕನ್ನಡದಿಂದ', 'ಮಂಗಳೂರು', 'ಮಂಗಳೂರಿನಿಂದ', 'ಪುತ್ತೂರು',
    'दक्षिण कन्नड़', 'मंगलौर', 'मंगलुरु', 'दक्षिण कन्नड़ से'
  ],
  'Dharwad': [
    'dharwad', 'hubballi', 'hubli', 'dharwad hubli',
    'ಧಾರವಾಡ', 'ಧಾರವಾಡದಿಂದ', 'ಧಾರವಾಡದ', 'ಹುಬ್ಬಳ್ಳಿ', 'ಹುಬ್ಬಳ್ಳಿಯಿಂದ',
    'धारवाड़', 'हुबली', 'धारवाड़ से', 'हुबली से'
  ],
  'Gadag': [
    'gadag', 'gadag betageri',
    'ಗದಗ', 'ಗದಗದಿಂದ', 'ಗದಗದ', 'ಗದಗ್',
    'गदग', 'गदग से'
  ],
  'Hassan': [
    'hassan', 'sakleshpur', 'arsikere',
    'ಹಾಸನ', 'ಹಾಸನದಿಂದ', 'ಹಾಸನದ', 'ಹಾಸನಕ್ಕೆ', 'ಸಕಲೇಶಪುರ', 'ಅರಸೀಕೆರೆ',
    'हासन', 'हासन से'
  ],
  'Kalaburagi': [
    'kalaburagi', 'gulbarga',
    'ಕಲಬುರಗಿ', 'ಕಲಬುರ್ಗಿಯಿಂದ', 'ಕಲಬುರಗಿಯ', 'ಗುಲ್ಬರ್ಗ', 'ಗುಲ್ಬರ್ಗದಿಂದ',
    'कलबुर्गी', 'गुलबर्गा', 'कलबुर्गी से'
  ],
  'Kodagu': [
    'kodagu', 'coorg', 'madikeri',
    'ಕೊಡಗು', 'ಕೊಡಗಿನಿಂದ', 'ಕೊಡಗಿನ', 'ಮಡಿಕೇರಿ', 'ಮಡಿಕೇರಿಯಿಂದ',
    'कूर्ग', 'कोडागु', 'मडिकेरी', 'कूर्ग से'
  ],
  'Koppal': [
    'koppal', 'gangavathi',
    'ಕೊಪ್ಪಳ', 'ಕೊಪ್ಪಳದಿಂದ', 'ಕೊಪ್ಪಳದ', 'ಗಂಗಾವತಿ',
    'कोप्पल', 'कोप्पल से'
  ],
  'Raichur': [
    'raichur', 'sindhanur',
    'ರಾಯಚೂರು', 'ರಾಯಚೂರಿನಿಂದ', 'ರಾಯಚೂರಿನ', 'ಸಿಂಧನೂರು',
    'रायचूर', 'रायचूर से'
  ],
  'Ramanagara': [
    'ramanagara', 'ramnagar', 'channapatna', 'kanakapura',
    'ರಾಮನಗರ', 'ರಾಮನಗರದಿಂದ', 'ರಾಮನಗರದ', 'ಚನ್ನಪಟ್ಟಣ', 'ಕನಕಪುರ',
    'रामनगर', 'रामनगरा', 'रामनगर से'
  ],
  'Tumakuru': [
    'tumakuru', 'tumkur', 'sira', 'tiptur',
    'ತುಮಕೂರು', 'ತುಮಕೂರಿನಿಂದ', 'ತುಮಕೂರಿನ', 'ತಿಪಟೂರು', 'ಶಿರಾ',
    'तुमकुर', 'तुमकुुरु', 'तुमकुर से'
  ],
  'Udupi': [
    'udupi', 'udipi', 'kundapura', 'karkala',
    'ಉಡುಪಿ', 'ಉಡುಪಿಯಿಂದ', 'ಉಡುಪಿಯ', 'ಕುಂದಾಪುರ', 'ಕಾರ್ಕಳ',
    'उडुपी', 'उड़ुपी', 'उडुपी से'
  ],
  'Uttara Kannada': [
    'uttara kannada', 'north canara', 'karwar', 'sirsi',
    'ಉತ್ತರ ಕನ್ನಡ', 'ಉತ್ತರ ಕನ್ನಡದಿಂದ', 'ಕಾರವಾರ', 'ಶಿರಸಿ',
    'उत्तर कन्नड़', 'कारवार', 'सिरसी', 'उत्तर कन्नड़ से'
  ],
  'Vijayapura': [
    'vijayapura', 'bijapur',
    'ವಿಜಯಪುರ', 'ವಿಜಯಪುರದಿಂದ', 'ವಿಜಯಪುರದ', 'ಬಿಜಾಪುರ', 'ಬಿಜಾಪುರದಿಂದ',
    'विजयपुर', 'बीजापुर', 'विजयपुर से'
  ],
  'Yadgir': [
    'yadgir', 'yadgiri',
    'ಯಾದಗಿರಿ', 'ಯಾದಗಿರಿಯಿಂದ', 'ಯಾದಗೀರ್',
    'यादगीर', 'यादगिर', 'यादगीर से'
  ],
  'Vijayanagara': [
    'vijayanagara', 'vijayanagar', 'hospet', 'hosapete',
    'ವಿಜಯನಗರ', 'ವಿಜಯನಗರದಿಂದ', 'ಹೊಸಪೇಟೆ', 'ಹೊಸಪೇಟೆಯಿಂದ',
    'विजयनगर', 'होसपेट', 'विजयनगर से'
  ],
  'Bagalkot': [
    'bagalkot', 'bagalkote', 'jamkhandi',
    'ಬಾಗಲಕೋಟೆ', 'ಬಾಗಲಕೋಟ', 'ಬಾಗಲಕೋಟೆಯಿಂದ', 'ಜಮಖಂಡಿ',
    'बागलकोट', 'बागलकोट से'
  ],
  'Ballari': [
    'ballari', 'bellary',
    'ಬಳ್ಳಾರಿ', 'ಬಳ್ಳಾರಿಯಿಂದ', 'ಬಳ್ಳಾರಿಯ',
    'बल्लारी', 'बेल्लारी', 'बल्लारी से'
  ],
  'Bidar': [
    'bidar', 'humnabad', 'bhalki',
    'ಬೀದರ್', 'ಬೀದರ', 'ಬೀದರ್‌ನಿಂದ', 'ಹುಮ್ನಾಬಾದ್',
    'बीदर', 'बीदर से'
  ]
};

// Regional District Names for Natural Human Spoken Feedback
export const KN_DISTRICT_NAMES = {
  'Bagalkot': 'ಬಾಗಲಕೋಟೆ', 'Ballari': 'ಬಳ್ಳಾರಿ', 'Belagavi': 'ಬೆಳಗಾವಿ',
  'Bengaluru Urban': 'ಬೆಂಗಳೂರು ನಗರ', 'Bengaluru Rural': 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ',
  'Bidar': 'ಬೀದರ್', 'Chamarajanagar': 'ಚಾಮರಾಜನಗರ', 'Chikkaballapur': 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ',
  'Chikkamagaluru': 'ಚಿಕ್ಕಮಗಳೂರು', 'Chitradurga': 'ಚಿತ್ರದುರ್ಗ', 'Dakshina Kannada': 'ದಕ್ಷಿಣ ಕನ್ನಡ',
  'Davanagere': 'ದಾವಣಗೆರೆ', 'Dharwad': 'ಧಾರವಾಡ', 'Gadag': 'ಗದಗ', 'Hassan': 'ಹಾಸನ',
  'Haveri': 'ಹಾವೇರಿ', 'Kalaburagi': 'ಕಲಬುರಗಿ', 'Kodagu': 'ಕೊಡಗು', 'Kolar': 'ಕೋಲಾರ',
  'Koppal': 'ಕೊಪ್ಪಳ', 'Mandya': 'ಮಂಡ್ಯ', 'Mysuru': 'ಮೈಸೂರು', 'Raichur': 'ರಾಯಚೂರು',
  'Ramanagara': 'ರಾಮನಗರ', 'Shivamogga': 'ಶಿವಮೊಗ್ಗ', 'Tumakuru': 'ತುಮಕೂರು', 'Udupi': 'ಉಡುಪಿ',
  'Uttara Kannada': 'ಉತ್ತರ ಕನ್ನಡ', 'Vijayapura': 'ವಿಜಯಪುರ', 'Yadgir': 'ಯಾದಗಿರಿ', 'Vijayanagara': 'ವಿಜಯನಗರ'
};

export const HI_DISTRICT_NAMES = {
  'Bagalkot': 'बागलकोट', 'Ballari': 'बल्लारी', 'Belagavi': 'बेलगाम',
  'Bengaluru Urban': 'बेंगलुरु शहर', 'Bengaluru Rural': 'बेंगलुरु ग्रामीण',
  'Bidar': 'बीदर', 'Chamarajanagar': 'चामराजनगर', 'Chikkaballapur': 'चिकबल्लापुर',
  'Chikkamagaluru': 'चिक्कमगलुरु', 'Chitradurga': 'चित्रदुर्ग', 'Dakshina Kannada': 'दक्षिण कन्नड़',
  'Davanagere': 'दावणगेरे', 'Dharwad': 'धारवाड़', 'Gadag': 'गदग', 'Hassan': 'हासन',
  'Haveri': 'हावेरी', 'Kalaburagi': 'कलबुर्गी', 'Kodagu': 'कोडागु', 'Kolar': 'कोलार',
  'Koppal': 'कोप्पल', 'Mandya': 'मांड्या', 'Mysuru': 'मैसूर', 'Raichur': 'रायचूर',
  'Ramanagara': 'रामनगर', 'Shivamogga': 'शिमोगा', 'Tumakuru': 'तुमकुर', 'Udupi': 'उडुपी',
  'Uttara Kannada': 'उत्तर कन्नड़', 'Vijayapura': 'विजयपुर', 'Yadgir': 'यादगीर', 'Vijayanagara': 'विजयनगर'
};

// 2. All 28 Crops in HarvestRoute with Dialects & Synonyms
export const CROP_SYNONYMS = {
  'Tomato': [
    'tomato', 'tomatoes', 'tamatar',
    'ಟೊಮೇಟೊ', 'ಟೊಮ್ಯಾಟೊ', 'ಟೊಮ್ಯಾಟೋ', 'ಟೊಮೆಟೊ', 'ಟೊಮಾಟೊ', 'ಟೊಮೆಟೊಗಳು',
    'टमाटर', 'टमाटरों'
  ],
  'Potato': [
    'potato', 'potatoes', 'aloo', 'batata',
    'ಆಲೂಗಡ್ಡೆ', 'ಆಲೂ', 'ಆಲುಗಡ್ಡೆ', 'ಆಲೂಗೆಡ್ಡೆ', 'ಆಲೂಗಡ್ಡೆಗಳು',
    'आलू', 'आलुओं', 'बटाटा'
  ],
  'Onion': [
    'onion', 'onions', 'pyaz', 'kanda',
    'ಈರುಳ್ಳಿ', 'ಇರುಳ್ಳಿ', 'ಉಳ್ಳಾಗಡ್ಡಿ', 'ಈರುಳ್ಳಿಗಳು',
    'प्याज', 'प्याज़', 'कांदा'
  ],
  'Banana': [
    'banana', 'bananas', 'kela', 'plantain',
    'ಬಾಳೆಹಣ್ಣು', 'ಬಾಳೆ', 'ಬಾಳೆಕಾಯಿ', 'ಬಾಳೆಹಣ್ಣುಗಳು', 'ಏಲಕ್ಕಿ ಬಾಳೆ',
    'केला', 'केले'
  ],
  'Mango': [
    'mango', 'mangoes', 'aam', 'alphonso',
    'ಮಾವಿನಹಣ್ಣು', 'ಮಾವಿನ', 'ಮಾವಿನಕಾಯಿ', 'ಮಾವು', 'ಬಾದಾಮಿ ಮಾವು',
    'आम', 'आमों', 'केरी'
  ],
  'Dry Chilli': [
    'dry chilli', 'dry chili', 'red chilli', 'chilli', 'chili', 'chillies', 'mirchi',
    'ಒಣ ಮೆಣಸಿನಕಾಯಿ', 'ಮೆಣಸಿನಕಾಯಿ', 'ಒಣಮೆಣಸಿನಕಾಯಿ', 'ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ', 'ಮೆಣಸು',
    'मिर्च', 'सूखी मिर्च', 'लाल मिर्च'
  ],
  'Turmeric': [
    'turmeric', 'haldi',
    'ಅರಿಶಿನ', 'ಅರಿಶಿಣ', 'ಅರಶಿನ', 'ಅರಿಶಿನ ಕೊಂಬು',
    'हल्दी'
  ],
  'Black Pepper': [
    'black pepper', 'pepper', 'black gold', 'kali mirch',
    'ಕರಿಮೆಣಸು', 'ಕಾಳುಮೆಣಸು', 'ಕಪ್ಪು ಮೆಣಸು',
    'काली मिर्च', 'गोल मिर्च'
  ],
  'Cardamom': [
    'cardamom', 'elaichi', 'green cardamom',
    'ಏಲಕ್ಕಿ', 'ಯಾಲಕ್ಕಿ', 'ಏಲಕ್ಕಿಕಾಯಿ',
    'इलायची', 'छोटी इलायची'
  ],
  'Cashew': [
    'cashew', 'cashewnut', 'cashew nut', 'kaju',
    'ಗೋಡಂಬಿ', 'ಗೇರುಬೀಜ', 'ಗೇರು ಹಣ್ಣು',
    'काजू'
  ],
  'Coffee': [
    'coffee', 'coffee beans', 'arabica', 'robusta',
    'ಕಾಫಿ', 'ಕಾಫಿ ಬೀಜ', 'ಕಾಫೀ',
    'कॉफ़ी', 'कॉफी'
  ],
  'Cocoa': [
    'cocoa', 'cacao',
    'ಕೋಕೋ', 'ಕೋಕೋ ಬೀಜ', 'ಕೋಕಾ',
    'कोको'
  ],
  'Tea': [
    'tea', 'tea leaves', 'chai',
    'ಟೀ', 'ಚಹಾ', 'ಟೀ ಪುಡಿ', 'ಚಾ',
    'चाय', 'चायपत्ती'
  ],
  'Garlic': [
    'garlic', 'lahsun',
    'ಬೆಳ್ಳುಳ್ಳಿ', 'ಬೆಳ್ಳುಳ್ಳಿ ಗಡ್ಡೆ', 'ಬೆಳ್ಳುಳ್ಳಿಯ',
    'लहसुन', 'लसन'
  ],
  'Ginger': [
    'ginger', 'adrak', 'shunti',
    'ಶುಂಠಿ', 'ಹಸಿಶುಂಠಿ', 'ಶುಂಟಿ', 'ಅಲ್ಲ',
    'अदरक', 'आदी'
  ],
  'Arecanut': [
    'arecanut', 'areca nut', 'betel nut', 'supari', 'adike',
    'ಅಡಿಕೆ', 'ಅಡಕೆ', 'ಅಡಿಕೆ ಗೊನೆ', 'ಸುಪಾರಿ',
    'सुपारी', 'सुपारी का फल'
  ],
  'Coconut': [
    'coconut', 'copra', 'tengu', 'nariyal',
    'ತೆಂಗಿನಕಾಯಿ', 'ತೆಂಗು', 'ಕೊಬ್ಬರಿ', 'ತೆಂಗಿನ ಕಾಯಿ',
    'नारियल', 'खोपरा', 'श्रीफल'
  ],
  'Paddy': [
    'paddy', 'rice', 'dhan', 'chawal', 'bhatta',
    'ಭತ್ತ', 'ಅಕ್ಕಿ', 'ಭತ್ತದ ಬೆಳೆ', 'ನೆಲ್ಲು',
    'धान', 'चावल'
  ],
  'Ragi': [
    'ragi', 'finger millet',
    'ರಾಗಿ', 'ರಾಗಿ ಕಾಳು', 'ರಾಗಿ ಹಿಟ್ಟು',
    'रागी', 'मडुआ'
  ],
  'Maize': [
    'maize', 'corn', 'sweet corn', 'makka', 'bhutta',
    'ಮೆಕ್ಕೆಜೋಳ', 'ಜೋಳ', 'ಮಕ್ಕೆ ಜೋಳ', 'ಮಕ್ಕೆಜೋಳ',
    'मक्का', 'भुट्टा', 'ज्वार'
  ],
  'Cotton': [
    'cotton', 'kapas',
    'ಹತ್ತಿ', 'ಹತ್ತಿಯ', 'ಕಪಾಸು', 'ಕಪಾಸ್',
    'कपास', 'रुई'
  ],
  'Blackgram': [
    'blackgram', 'black gram', 'urad', 'uddina bele',
    'ಉದ್ದಿನ ಬೇಳೆ', 'ಉದ್ದು', 'ಉದ್ದಿನ ಕಾಳು',
    'उड़द', 'उड़द दाल', 'काली दाल'
  ],
  'Chickpea': [
    'chickpea', 'chana', 'bengal gram', 'gram', 'chole', 'kadale',
    'ಕಡಲೆ', 'ಕಡಲೆ ಕಾಳು', 'ಕಾಬುಲಿ ಕಡಲೆ', 'ಕಡಲೆ ಬೇಳೆ',
    'चना', 'चना दाल', 'छोले', 'काबुली चना'
  ],
  'Greengram': [
    'greengram', 'green gram', 'moong', 'hesaru kalu',
    'ಹೆಸರು ಕಾಳು', 'ಹೆಸರು ಬೇಳೆ', 'ಹೆಸರು',
    'मूंग', 'मूंग दाल', 'हरी मूंग'
  ],
  'Groundnut': [
    'groundnut', 'peanut', 'ground nut', 'shenga', 'moongphali',
    'ಕಡಲೆಕಾಯಿ', 'ಶೇಂಗಾ', 'ಶೇಂಗಾ ಬೀಜ', 'ನೆಲಗಡಲೆ',
    'मूंगफली', 'सिंगदाना'
  ],
  'Redgram': [
    'redgram', 'red gram', 'tur', 'toor', 'arhar', 'pigeon pea', 'togari bele',
    'ತೊಗರಿ', 'ತೊಗರಿ ಬೇಳೆ', 'ತೊಗರಿ ಕಾಳು', 'ತೊಗರಿ ಕಾಳುಗಳು',
    'अरहर', 'तूर', 'तुअर दाल', 'अरहर दाल'
  ],
  'Sugarcane': [
    'sugarcane', 'sugar cane', 'ganna', 'kabbu',
    'ಕಬ್ಬು', 'ಕಬ್ಬಿನ ರಸ', 'ಕಬ್ಬಿನ ಬೆಳೆ', 'ಗನ್ನಾ',
    'गन्ना', 'ईख'
  ],
  'Sunflower': [
    'sunflower', 'sunflower seeds', 'surajmukhi', 'suryakanthi',
    'ಸೂರ್ಯಕಾಂತಿ', 'ಸೂರ್ಯಕಾಂತಿ ಬೀಜ', 'ಸೂರ್ಯಕಾಂತಿ ಎಣ್ಣೆ',
    'सूरजमुखी', 'सूरजमुखी के बीज'
  ]
};

export const KN_CROP_NAMES = {
  'Tomato': 'ಟೊಮೇಟೊ', 'Potato': 'ಆಲೂಗಡ್ಡೆ', 'Onion': 'ಈರುಳ್ಳಿ', 'Banana': 'ಬಾಳೆಹಣ್ಣು',
  'Mango': 'ಮಾವಿನಹಣ್ಣು', 'Dry Chilli': 'ಒಣ ಮೆಣಸಿನಕಾಯಿ', 'Turmeric': 'ಅರಿಶಿನ',
  'Black Pepper': 'ಕರಿಮೆಣಸು', 'Cardamom': 'ಏಲಕ್ಕಿ', 'Cashew': 'ಗೋಡಂಬಿ', 'Coffee': 'ಕಾಫಿ',
  'Cocoa': 'ಕೋಕೋ', 'Tea': 'ಚಹಾ', 'Garlic': 'ಬೆಳ್ಳುಳ್ಳಿ', 'Ginger': 'ಶುಂಠಿ',
  'Arecanut': 'ಅಡಿಕೆ', 'Coconut': 'ತೆಂಗಿನಕಾಯಿ', 'Paddy': 'ಭತ್ತ', 'Ragi': 'ರಾಗಿ',
  'Maize': 'ಮೆಕ್ಕೆಜೋಳ', 'Cotton': 'ಹತ್ತಿ', 'Blackgram': 'ಉದ್ದಿನ ಬೇಳೆ', 'Chickpea': 'ಕಡಲೆ',
  'Greengram': 'ಹೆಸರು ಕಾಳು', 'Groundnut': 'ಕಡಲೆಕಾಯಿ', 'Redgram': 'ತೊಗರಿ ಬೇಳೆ',
  'Sugarcane': 'ಕಬ್ಬು', 'Sunflower': 'ಸೂರ್ಯಕಾಂತಿ'
};

export const HI_CROP_NAMES = {
  'Tomato': 'टमाटर', 'Potato': 'आलू', 'Onion': 'प्याज', 'Banana': 'केला',
  'Mango': 'आम', 'Dry Chilli': 'सूखी मिर्च', 'Turmeric': 'हल्दी',
  'Black Pepper': 'काली मिर्च', 'Cardamom': 'इलायची', 'Cashew': 'काजू', 'Coffee': 'कॉफ़ी',
  'Cocoa': 'कोको', 'Tea': 'चाय', 'Garlic': 'लहसुन', 'Ginger': 'अदरक',
  'Arecanut': 'सुपारी', 'Coconut': 'नारियल', 'Paddy': 'धान', 'Ragi': 'रागी',
  'Maize': 'मक्का', 'Cotton': 'कपास', 'Blackgram': 'उड़द', 'Chickpea': 'चना',
  'Greengram': 'मूंग', 'Groundnut': 'मूंगफली', 'Redgram': 'अरहर / तूर',
  'Sugarcane': 'गन्ना', 'Sunflower': 'सूरजमुखी'
};

// 3. Vehicles in Catalog with Colloquial Terms
export const VEHICLE_SYNONYMS = {
  'COLD_CHAIN_REEFER': [
    'reefer', 'cold chain', 'cold van', 'cold storage', 'refrigerated', 'refrigerated truck',
    'ac truck', 'chilled', 'cooler van',
    'ಕೋಲ್ಡ್ ವ್ಯಾನ್', 'ಕೋಲ್ಡ್ ಚೈನ್', 'ರೆಫ್ರಿಜರೇಟರ್', 'ಕೋಲ್ಡ್ ಸ್ಟೋರೇಜ್', 'ಶೀತಲೀಕೃತ', 'ತಂಪು ವಾಹನ', 'ಎಸಿ ಟ್ರಕ್', 'ರೀಫರ್', 'ರೀಫರ್ ಲಾರಿ',
    'रीफर', 'कोल्ड स्टोरेज', 'रेफ्रिजरेटेड', 'शीत भंडार', 'एसी ट्रक', 'कोल्ड वैन', 'प्रशीतित'
  ],
  'CANTER_TRUCK': [
    'canter truck', 'eicher 14ft', 'eicher', 'canter', '14ft', '14 feet', '407', 'tata 407', 'heavy truck', 'lorry', 'big truck',
    'ಕ್ಯಾಂಟರ್', 'ಐಷರ್', 'ಆಯಿಷರ್', '14 ಅಡಿ', '407', 'ಟಾಟಾ 407', 'ಲಾರಿ', 'ದೊಡ್ಡ ಲಾರಿ', 'ಕ್ಯಾಂಟರ್‌ನಲ್ಲಿ',
    'आयशर', 'कैंटर', '407', 'टाटा 407', 'लॉरी', 'बड़ा ट्रक', 'कैंटर में'
  ],
  'BOLERO_PICKUP': [
    'bolero pickup', 'bolero maxi', 'pickup truck', 'maxi truck', 'mahindra pickup', 'bolero', 'pickup',
    'ಬೊಲೆರೊ ಪಿಕಪ್', 'ಬೊಲೆರೊ', 'ಬೊಲೆರೋ', 'ಪಿಕಪ್', 'ಬೊಲೇರೊ', 'ಮ್ಯಾಕ್ಸಿ ಟ್ರಕ್', 'ಬೊಲೆರೊದಲ್ಲಿ', 'ಮಹೀಂದ್ರಾ',
    'बोलेरो पिकअप', 'बोलेरो', 'पिकअप', 'मैक्सी ट्रक', 'महिंद्रा', 'बोलेरो में'
  ],
  'CHOTA_HATHI': [
    'tata ace', 'chota hathi', 'chhota hathi', 'small tempo', 'ace', 'chota haathi', '15 quintal truck',
    'ಟಾಟಾ ಏಸ್', 'ಛೋಟಾ ಹಾತಿ', 'ಚೋಟಾ ಹಾತಿ', 'ಏಸ್', 'ಚಿಕ್ಕ ಟೆಂಪೋ', 'ಟಾಟಾ ಏಸ್‌ನಲ್ಲಿ',
    'टाटा ऐस', 'छोटा हाथी', 'ऐस', 'छोटा टेम्पो', 'टेंपो'
  ],
  'THREE_WHEELER': [
    'three wheeler', 'three-wheeler', 'auto rickshaw', '3 wheeler', 'piaggio ape', 'ape', 'auto',
    'ಆಟೋ ರಿಕ್ಷಾ', 'ಮೂರು ಚಕ್ರ', 'ಪಿಯಾಜಿಯೊ', 'ಏಪ್', 'ಆಟೋ', 'ಆಟೋದಲ್ಲಿ',
    'ऑटो रिक्शा', 'तीन पहिया', 'पियाजियो', 'ऑटो'
  ]
};

// 4. Freshness Windows
export const FRESHNESS_SYNONYMS = {
  6: [
    'fresh', 'just harvested', 'today', 'morning harvest', '6 hours', '6 hrs', 'six hours', 'zero delay', 'same day',
    'ತಾಜಾ', 'ಇವತ್ತು', 'ಇಂದು', 'ಈಗಷ್ಟೇ ಕೊಯ್ದದ್ದು', 'ಬೆಳಗ್ಗೆ ಕೊಯ್ದದ್ದು', 'ಇಂದಿನ ಬೆಳೆ', '೬ ಗಂಟೆ', '6 ಗಂಟೆ', 'ಆರು ಗಂಟೆ',
    'ताज़ा', 'आज', 'आज का', 'सुबह', 'अभी काटा', '६ घंटे', '6 घंटे', 'छह घंटे', 'ताजा'
  ],
  24: [
    'yesterday', 'one day', '1 day', '24 hours', '24 hrs', 'yesterday harvest', 'day old',
    'ನಿನ್ನೆ', 'ನಿನ್ನೆಯ ಬೆಳೆ', 'ಒಂದು ದಿನ', '೧ ದಿನ', '24 ಗಂಟೆ', '೨೪ ಗಂಟೆ', 'ಇಪ್ಪತ್ನಾಲ್ಕು ಗಂಟೆ',
    'कल', 'कल का', 'एक दिन', '१ दिन', '24 घंटे', '२४ घंटे', 'चौबीस घंटे'
  ],
  48: [
    'two days', '2 days', '48 hours', '48 hrs', 'day before yesterday', '2 days ago',
    'ಮೊನ್ನೆ', 'ಮೊನ್ನೆಯ ಬೆಳೆ', 'ಎರಡು ದಿನ', '೨ ದಿನ', '48 ಗಂಟೆ', '೪೮ ಗಂಟೆ', 'ನಲವತ್ತೆಂಟು ಗಂಟೆ',
    'परसों', 'दो दिन', '२ दिन', '48 घंटे', '४८ घंटे', 'अड़तालीस घंटे'
  ]
};

// 5. Sensitivity & Route Assumptions Keywords
export const SENSITIVITY_KEYWORDS = {
  fuelHigh: [
    'high fuel', 'fuel up', 'expensive diesel', 'fuel cost high', 'diesel hike',
    'ಡೀಸೆಲ್ ಬೆಲೆ ಜಾಸ್ತಿ', 'ಇಂಧನ ದುಬಾರಿ', 'ಡೀಸೆಲ್ ಹೆಚ್ಚು', 'ಹೆಚ್ಚು ಡೀಸೆಲ್', 'ಡಿಜೆಲ್ ಜಾಸ್ತಿ',
    'डीजल महंगा', 'ईंधन महंगा', 'डीजल ज्यादा'
  ],
  fuelLow: [
    'low fuel', 'cheap fuel', 'cheap diesel', 'fuel cost low',
    'ಡೀಸೆಲ್ ಕಡಿಮೆ', 'ಇಂಧನ ಕಡಿಮೆ', 'ಕಡಿಮೆ ಡೀಸೆಲ್',
    'डीजल सस्ता', 'ईंधन कम', 'सस्ता डीजल'
  ],
  fuelNormal: [
    'normal fuel', 'default fuel',
    'ಸಾಮಾನ್ಯ ಡೀಸೆಲ್', 'ಸಾಮಾನ್ಯ ಇಂಧನ',
    'सामान्य डीजल', 'सामान्य ईंधन'
  ],
  spoilageHigh: [
    'high spoilage', 'summer', 'hot weather', 'high heat', 'spoilage up', 'heavy rot',
    'ಬೇಸಿಗೆ', 'ಬಿಸಿಲು', 'ಹೆಚ್ಚು ನಷ್ಟ', 'ಕೊಳೆಯುವಿಕೆ ಜಾಸ್ತಿ', 'ಗರಿಷ್ಠ ನಷ್ಟ',
    'गर्मी', 'तेज धूप', 'ज्यादा नुकसान', 'खराबी ज्यादा'
  ],
  spoilageLow: [
    'low spoilage', 'winter', 'cool weather', 'cold weather', 'less rot',
    'ಚಳಿಗಾಲ', 'ಶೀತಲ', 'ಕಡಿಮೆ ನಷ್ಟ', 'ಕಡಿಮೆ ಕೊಳೆತ',
    'सर्दी', 'ठंडा मौसम', 'कम नुकसान', 'खराबी कम'
  ],
  spoilageNormal: [
    'normal spoilage', 'regular weather',
    'ಸಾಮಾನ್ಯ ಹವಾಮಾನ', 'ಸಾಮಾನ್ಯ ನಷ್ಟ',
    'सामान्य मौसम', 'सामान्य नुकसान'
  ],
  speedFast: [
    'fast speed', 'highway speed', 'high speed', 'speed up',
    'ವೇಗವಾಗಿ', 'ಹೆಚ್ಚು ವೇಗ', 'ಹೈವೇ ವೇಗ',
    'तेज रफ्तार', 'ज्यादा गति'
  ],
  speedSlow: [
    'slow speed', 'bad roads', 'traffic', 'slow down',
    'ನಿಧಾನ', 'ಕಡಿಮೆ ವೇಗ', 'ಖರಾಬು ರಸ್ತೆ', 'ಸಂಚಾರ ದಟ್ಟಣೆ',
    'धीमी गति', 'खराब सड़क', 'ट्रैफिक'
  ],
  resetSensitivity: [
    'reset sensitivity', 'reset sliders', 'reset assumptions', 'default sliders',
    'ಮರುಹೊಂದಿಸು', 'ಸ್ಲೈಡರ್ ಮರುಹೊಂದಿಸು', 'ಸಾಮಾನ್ಯಕ್ಕೆ ಬದಲಾಯಿಸು',
    'रीसेट करो', 'डिफ़ॉल्ट स्लाइ़डर', 'मूल स्थिति'
  ]
};

// 6. Action & Navigation Trigger Keywords
export const ACTION_KEYWORDS = {
  calculate: [
    'calculate', 'find market', 'check best mandi', 'best market', 'search mandi',
    'find best', 'run analysis', 'show top', 'compare',
    'ಲೆಕ್ಕ', 'ಲೆಕ್ಕಹಾಕು', 'ಲೆಕ್ಕ ಮಾಡಿ', 'ಉತ್ತಮ ಮಂಡಿ', 'ಮಂಡಿ ತೋರಿಸು', 'ಪರಿಶೀಲಿಸು', 'ವಿಶ್ಲೇಷಣೆ',
    'ಹಿಡಿಯು', 'हिसाब', 'गणना', 'गणना करो', 'मंडी बताओ', 'ढूंढो', 'चेक करो', 'कैलकुलेट', 'शीर्ष मंडी', 'तुलना करो'
  ],
  openMap: [
    'show map', 'open map', 'route map', 'view map', 'mandi map',
    'ನಕ್ಷೆ', 'ನಕ್ಷೆ ತೋರಿಸು', 'ಮ್ಯಾಪ್ ತೋರಿಸು', 'ಮಾರ್ಗ ನಕ್ಷೆ', 'ನಕಾಶೆ',
    'नक्शा', 'नक्शा दिखाओ', 'मैप दिखाओ', 'रूट मैप', 'मानचित्र'
  ],
  openSlip: [
    'open slip', 'dispatch slip', 'print slip', 'gate pass', 'receipt', 'bill', 'farmer slip',
    'ರಶೀದಿ', 'ಸ್ಲಿಪ್ ತೋರಿಸು', 'ಪಾವತಿ ಚೀಟಿ', 'ಗೇಟ್ ಪಾಸ್', 'ರಶೀದಿ ತೆರೆ', 'ಸ್ಲಿಪ್',
    'रसीद', 'पर्ची', 'स्लिप दिखाओ', 'बिल', 'गेट पास', 'चालान'
  ],
  openPooling: [
    'crop pooling', 'share truck', 'pooling hub', 'group freight', 'truck pooling',
    'ಟ್ರಕ್ ಹಂಚಿಕೆ', 'ಪೂಲಿಂಗ್', 'ಸರಕು ಹಂಚಿಕೆ', 'ಹಂಚಿಕೊಂಡ ಟ್ರಕ್',
    'ट्रक पूलिंग', 'ट्रक शेयर', 'साझा ट्रक', 'पूलिंग'
  ],
  resetForm: [
    'reset form', 'clear all', 'start over', 'new calculation',
    'ಹೊಸ ಲೆಕ್ಕ', 'ಕ್ಲಿಯರ್ ಮಾಡಿ', 'ಆರಂಭಿಸು',
    'नया हिसाब', 'सब साफ करो', 'रीसेट फॉर्म', 'शुरू से'
  ]
};

// 7. Kannada & Devanagari Digit Replacements
const INDIC_DIGIT_MAP = {
  '೦': '0', '೧': '1', '೨': '2', '೩': '3', '೪': '4', '೫': '5', '೬': '6', '೭': '7', '೮': '8', '೯': '9',
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
};

// 8. Word-to-Number Mappings across EN, KN, HI
const NUMBER_WORDS = {
  // English
  'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
  'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
  'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
  'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19,
  'twenty': 20, 'twenty five': 25, 'thirty': 30, 'thirty five': 35,
  'forty': 40, 'forty five': 45, 'fifty': 50, 'sixty': 60,
  'seventy': 70, 'eighty': 80, 'ninety': 90, 'hundred': 100,
  'two hundred': 200, 'three hundred': 300, 'five hundred': 500,

  // Kannada
  'ಒಂದು': 1, 'ಎರಡು': 2, 'ಮೂರು': 3, 'ನಾಲ್ಕು': 4, 'ಐದು': 5,
  'ಆರು': 6, 'ಏಳು': 7, 'ಎಂಟು': 8, 'ಒಂಬತ್ತು': 9, 'ಹತ್ತು': 10,
  'ಹನ್ನೊಂದು': 11, 'ಹನ್ನೆರಡು': 12, 'ಹದಿಮೂರು': 13, 'ಹದಿನಾಲ್ಕು': 14, 'ಹದಿನೈದು': 15,
  'ಹದಿನಾರು': 16, 'ಹದಿನೇಳು': 17, 'ಹದಿನೆಂಟು': 18, 'ಹತ್ತೊಂಬತ್ತು': 19,
  'ಇಪ್ಪತ್ತು': 20, 'ಇಪ್ಪತ್ತೈದು': 25, 'ಮೂವತ್ತು': 30, 'ಮೂವತ್ತೈದು': 35,
  'ನಲವತ್ತು': 40, 'ನಲವತ್ತೈದು': 45, 'ಐವತ್ತು': 50, 'ಅರವತ್ತು': 60,
  'ಎಪ್ಪತ್ತು': 70, 'ಎಂಬತ್ತು': 80, 'ತೊಂಬತ್ತು': 90, 'ನೂರು': 100,
  'ಇನ್ನೂರು': 200, 'ಮುನ್ನೂರು': 300, 'ಐನ್ನೂರು': 500,

  // Hindi
  'एक': 1, 'दो': 2, 'तीन': 3, 'चार': 4, 'पांच': 5,
  'छह': 6, 'सात': 7, 'आठ': 8, 'नौ': 9, 'दस': 10,
  'ग्यारह': 11, 'बारह': 12, 'तेरह': 13, 'चौदह': 14, 'पंद्रह': 15,
  'सोलह': 16, 'सत्रह': 17, 'अट्ठारह': 18, 'उन्नीस': 19,
  'बीस': 20, 'इक्कीस': 21, 'बाईस': 22, 'तेईस': 23, 'चौबीस': 24, 'पच्चीस': 25,
  'तीस': 30, 'पैंतीस': 35, 'चालीस': 40, 'पैंतालीस': 45, 'पचास': 50,
  'साठ': 60, 'सत्तर': 70, 'अस्सी': 80, 'नब्बे': 90, 'सौ': 100,
  'दो सौ': 200, 'तीन सौ': 300, 'पांच सौ': 500
};

/**
 * Normalizes Indic digits (Kannada & Devanagari) into standard ASCII numbers
 */
function normalizeDigits(str) {
  return str.replace(/[೦-೯०-९]/g, match => INDIC_DIGIT_MAP[match] || match);
}

/**
 * Parses numeric quantity in quintals from voice text.
 */
function extractQuantity(text) {
  const normalized = normalizeDigits(text);

  // 1. Check for ton/tonne conversion (1 ton = 10 quintals)
  const tonMatch = normalized.match(/(\d+(\.\d+)?)\s*(ton|tons|tonne|tonnes|ಟನ್|ಟನ್‌|टन)/i);
  if (tonMatch) {
    const tons = parseFloat(tonMatch[1]);
    if (!isNaN(tons) && tons > 0) {
      return Math.min(500, Math.round(tons * 10));
    }
  }

  // 2. Check for explicit quintal suffix
  const quintalMatch = normalized.match(/(\d+(\.\d+)?)\s*(qtl|qtls|quintal|quintals|ಕ್ವಿಂಟಾಲ್|ಕ್ವಿಂಟಲ್|ಕ್ವಿಂಟಾಲ|ಕ್ವಿಂಟಾಲ್‌|ಕ್ವಿಂಟಲ್‌|क्विंटल|क्विंटलों|क्विंतल)/i);
  if (quintalMatch) {
    const val = parseFloat(quintalMatch[1]);
    if (!isNaN(val) && val > 0 && val <= 500) {
      return val;
    }
  }

  // 3. Check for standalone digits (1 to 500)
  const digitMatches = normalized.match(/\b\d+(\.\d+)?\b/g);
  if (digitMatches) {
    for (const dm of digitMatches) {
      const val = parseFloat(dm);
      if (!isNaN(val) && val > 0 && val <= 500) {
        return val;
      }
    }
  }

  // 4. Check for word numbers
  const sortedWords = Object.entries(NUMBER_WORDS).sort((a, b) => b[0].length - a[0].length);
  for (const [word, num] of sortedWords) {
    if (normalized.includes(word)) {
      if (normalized.includes(word + ' ton') || normalized.includes(word + ' ಟನ್') || normalized.includes(word + ' टन')) {
        return Math.min(500, num * 10);
      }
      return num;
    }
  }

  return null;
}

/**
 * Core Voice Command Parser
 * @param {string|string[]} transcriptOrAlternatives - Spoken transcript or array of recognition alternatives
 * @returns {object} Extracted parameters, actions, and raw text
 */
export function parseVoiceCommand(transcriptOrAlternatives) {
  if (!transcriptOrAlternatives) return null;

  const alternatives = Array.isArray(transcriptOrAlternatives) 
    ? transcriptOrAlternatives 
    : [transcriptOrAlternatives];

  const primaryTranscript = alternatives[0] || '';
  const combinedText = alternatives.map(t => (t || '').toLowerCase().trim()).join(' ');

  const result = {
    matchedOrigin: null,
    matchedCrop: null,
    matchedQuantity: null,
    matchedVehicle: null,
    matchedFreshness: null,
    sensitivityUpdates: {},
    triggerCalculate: false,
    triggerOpenMap: false,
    triggerOpenSlip: false,
    triggerOpenPooling: false,
    triggerResetForm: false,
    rawText: primaryTranscript
  };

  // 1. Detect Origin District
  const sortedOrigins = Object.entries(ORIGIN_SYNONYMS);
  for (const [districtName, synonyms] of sortedOrigins) {
    const sortedSyns = [...synonyms].sort((a, b) => b.length - a.length);
    for (const syn of sortedSyns) {
      if (combinedText.includes(syn.toLowerCase())) {
        result.matchedOrigin = districtName;
        break;
      }
    }
    if (result.matchedOrigin) break;
  }

  // 2. Detect Crop
  const sortedCrops = Object.entries(CROP_SYNONYMS);
  for (const [cropName, synonyms] of sortedCrops) {
    const sortedSyns = [...synonyms].sort((a, b) => b.length - a.length);
    for (const syn of sortedSyns) {
      if (combinedText.includes(syn.toLowerCase())) {
        result.matchedCrop = cropName;
        break;
      }
    }
    if (result.matchedCrop) break;
  }

  // 3. Detect Vehicle Type
  for (const [vehicleKey, synonyms] of Object.entries(VEHICLE_SYNONYMS)) {
    const sortedSyns = [...synonyms].sort((a, b) => b.length - a.length);
    for (const syn of sortedSyns) {
      if (combinedText.includes(syn.toLowerCase())) {
        result.matchedVehicle = vehicleKey;
        break;
      }
    }
    if (result.matchedVehicle) break;
  }

  // 4. Detect Freshness / Harvest Timing Window
  for (const [freshnessVal, synonyms] of Object.entries(FRESHNESS_SYNONYMS)) {
    for (const syn of synonyms) {
      if (combinedText.includes(syn.toLowerCase())) {
        result.matchedFreshness = parseInt(freshnessVal, 10);
        break;
      }
    }
    if (result.matchedFreshness !== null) break;
  }

  // 5. Detect Quantity
  const qty = extractQuantity(combinedText);
  if (qty !== null) {
    if (result.matchedFreshness && (qty === 6 || qty === 24 || qty === 48)) {
      if (combinedText.includes('quintal') || combinedText.includes('ಕ್ವಿಂಟಾಲ್') || combinedText.includes('ಕ್ವಿಂಟಲ್') || combinedText.includes('क्विंटल')) {
        result.matchedQuantity = qty;
      }
    } else {
      result.matchedQuantity = qty;
    }
  }

  // 6. Detect Sensitivity Overrides
  if (SENSITIVITY_KEYWORDS.fuelHigh.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.sensitivityUpdates.fuelRateMultiplier = 1.25;
  } else if (SENSITIVITY_KEYWORDS.fuelLow.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.sensitivityUpdates.fuelRateMultiplier = 0.85;
  } else if (SENSITIVITY_KEYWORDS.fuelNormal.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.sensitivityUpdates.fuelRateMultiplier = 1.0;
  }

  if (SENSITIVITY_KEYWORDS.spoilageHigh.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.sensitivityUpdates.spoilageMultiplier = 1.30;
  } else if (SENSITIVITY_KEYWORDS.spoilageLow.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.sensitivityUpdates.spoilageMultiplier = 0.80;
  } else if (SENSITIVITY_KEYWORDS.spoilageNormal.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.sensitivityUpdates.spoilageMultiplier = 1.0;
  }

  if (SENSITIVITY_KEYWORDS.speedFast.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.sensitivityUpdates.speedKmph = 55;
  } else if (SENSITIVITY_KEYWORDS.speedSlow.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.sensitivityUpdates.speedKmph = 30;
  }

  if (SENSITIVITY_KEYWORDS.resetSensitivity.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.sensitivityUpdates.resetSensitivity = true;
  }

  // 7. Detect Actions & Navigation Triggers (Specialized targets check first)
  if (ACTION_KEYWORDS.openMap.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.triggerOpenMap = true;
  }
  if (ACTION_KEYWORDS.openSlip.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.triggerOpenSlip = true;
  }
  if (ACTION_KEYWORDS.openPooling.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.triggerOpenPooling = true;
  }
  if (ACTION_KEYWORDS.resetForm.some(kw => combinedText.includes(kw.toLowerCase()))) {
    result.triggerResetForm = true;
  }

  // Only trigger calculate if not an exclusive navigation target, or if explicitly requested
  if (!result.triggerOpenMap && !result.triggerOpenSlip && !result.triggerOpenPooling && !result.triggerResetForm) {
    if (ACTION_KEYWORDS.calculate.some(kw => combinedText.includes(kw.toLowerCase()))) {
      result.triggerCalculate = true;
    }
  } else {
    // If user said both (e.g. "calculate and show map")
    if (combinedText.includes('calculate') || combinedText.includes('ಲೆಕ್ಕ') || combinedText.includes('गणना') || combinedText.includes('हिसाब')) {
      result.triggerCalculate = true;
    }
  }

  return result;
}

/**
 * Generates natural, respectful regional spoken confirmation for the farmer
 * across Kannada, Hindi, and English with regional names.
 */
export function generateVoiceFeedback(parsed, lang = 'en', current = {}) {
  if (!parsed) return '';

  const originKey = parsed.matchedOrigin || current.originDistrict || 'Davanagere';
  const cropKey = parsed.matchedCrop || current.selectedCrop || 'Tomato';
  const qty = parsed.matchedQuantity !== null ? parsed.matchedQuantity : current.quantity;
  const vehicleKey = parsed.matchedVehicle || current.vehicleType || 'BOLERO_PICKUP';

  // Kannada Display Names
  const knVehicleNames = {
    'THREE_WHEELER': 'ಆಟೋ',
    'CHOTA_HATHI': 'ಟಾಟಾ ಏಸ್',
    'BOLERO_PICKUP': 'ಬೊಲೆರೊ',
    'CANTER_TRUCK': 'ಐಷರ್ ಕ್ಯಾಂಟರ್',
    'COLD_CHAIN_REEFER': 'ಶೀತಲೀಕೃತ ಕೋಲ್ಡ್ ವ್ಯಾನ್'
  };

  // Hindi Display Names
  const hiVehicleNames = {
    'THREE_WHEELER': 'ऑटो',
    'CHOTA_HATHI': 'टाटा ऐस',
    'BOLERO_PICKUP': 'बोलेरो',
    'CANTER_TRUCK': 'आयशर कैंटर',
    'COLD_CHAIN_REEFER': 'कोल्ड-स्टोरेज वैन'
  };

  // English Display Names
  const enVehicleNames = {
    'THREE_WHEELER': 'Auto',
    'CHOTA_HATHI': 'Tata Ace',
    'BOLERO_PICKUP': 'Bolero Pickup',
    'CANTER_TRUCK': 'Eicher Canter',
    'COLD_CHAIN_REEFER': 'Cold-Chain Reefer'
  };

  // Navigation / Action triggers
  if (parsed.triggerOpenMap) {
    if (lang === 'kn') return 'ಮಂಡಿ ಮಾರ್ಗ ಮತ್ತು ದೂರದ ನಕ್ಷೆ ತೆರೆಯಲಾಗುತ್ತಿದೆ.';
    if (lang === 'hi') return 'मंडी मार्ग और दूरी का नक्शा दिखाया जा रहा है।';
    return 'Opening route and distance map.';
  }

  if (parsed.triggerOpenSlip) {
    if (lang === 'kn') return 'ರೈತರ ಸರಕು ರವಾನೆ ಚೀಟಿ ಮತ್ತು ಗೇಟ್ ಪಾಸ್ ತೆರೆಯಲಾಗುತ್ತಿದೆ.';
    if (lang === 'hi') return 'किसान डिस्पैच रसीद और गेट पास खोला जा रहा है।';
    return 'Opening dispatch slip and gate pass.';
  }

  if (parsed.triggerOpenPooling) {
    if (lang === 'kn') return 'ವಾಹನ ಹಂಚಿಕೆ ಮತ್ತು ಕೃಷಿ ಪೂಲಿಂಗ್ ಕೇಂದ್ರ ತೆರೆಯಲಾಗುತ್ತಿದೆ.';
    if (lang === 'hi') return 'ट्रक पूलिंग केंद्र खोला जा रहा है।';
    return 'Opening truck sharing hub.';
  }

  if (parsed.triggerResetForm) {
    if (lang === 'kn') return 'ಎಲ್ಲಾ ವಿವರಗಳನ್ನು ಮೂಲ ಸ್ಥಿತಿಗೆ ಮರುಹೊಂದಿಸಲಾಗಿದೆ.';
    if (lang === 'hi') return 'सभी विवरण डिफ़ॉल्ट पर रीसेट कर दिए गए हैं।';
    return 'Reset all lot inputs to default values.';
  }

  if (parsed.sensitivityUpdates.resetSensitivity) {
    if (lang === 'kn') return 'ಖರ್ಚಿನ ಸ್ಲೈಡರ್‌ಗಳನ್ನು ಸಾಮಾನ್ಯ ಸ್ಥಿತಿಗೆ ಮರುಹೊಂದಿಸಲಾಗಿದೆ.';
    if (lang === 'hi') return 'लागत स्लाइडर सामान्य स्थिति पर रीसेट कर दिए गए हैं।';
    return 'Reset sensitivity cost assumptions to default.';
  }

  if (parsed.sensitivityUpdates.fuelRateMultiplier !== undefined) {
    const isHigh = parsed.sensitivityUpdates.fuelRateMultiplier > 1.0;
    if (lang === 'kn') return isHigh ? 'ಡೀಸೆಲ್ ಮತ್ತು ಇಂಧನ ದರವನ್ನು 25% ಹೆಚ್ಚಿಸಲಾಗಿದೆ.' : 'ಡೀಸೆಲ್ ದರವನ್ನು ಕಡಿಮೆ ಮಾಡಲಾಗಿದೆ.';
    if (lang === 'hi') return isHigh ? 'डीजल भाड़ा दर 25% बढ़ाई गई।' : 'डीजल भाड़ा दर कम की गई।';
    return isHigh ? 'Diesel freight rate increased by 25%.' : 'Diesel freight rate lowered.';
  }

  if (parsed.sensitivityUpdates.spoilageMultiplier !== undefined) {
    const isHigh = parsed.sensitivityUpdates.spoilageMultiplier > 1.0;
    if (lang === 'kn') return isHigh ? 'ಬೇಸಿಗೆಯ ಹವಾಮಾನ ಮತ್ತು ಕೊಳೆಯುವಿಕೆ ನಷ್ಟ ಹೆಚ್ಚಿಸಲಾಗಿದೆ.' : 'ಶೀತಲ ಹವಾಮಾನದ ನಷ್ಟ ಹೊಂದಿಸಲಾಗಿದೆ.';
    if (lang === 'hi') return isHigh ? 'गर्मी और फसल खराबी दर बढ़ाई गई।' : 'ठंडे मौसम की खराबी दर सेट की गई।';
    return isHigh ? 'High heat road spoilage applied.' : 'Low weather spoilage applied.';
  }

  // Count changed core lot attributes
  const changedList = [];
  if (parsed.matchedOrigin) changedList.push('origin');
  if (parsed.matchedCrop) changedList.push('crop');
  if (parsed.matchedQuantity) changedList.push('quantity');
  if (parsed.matchedVehicle) changedList.push('vehicle');
  if (parsed.matchedFreshness) changedList.push('freshness');

  const knOrigin = KN_DISTRICT_NAMES[originKey] || originKey;
  const knCrop = KN_CROP_NAMES[cropKey] || cropKey;
  const knVehicle = knVehicleNames[vehicleKey] || vehicleKey;

  const hiOrigin = HI_DISTRICT_NAMES[originKey] || originKey;
  const hiCrop = HI_CROP_NAMES[cropKey] || cropKey;
  const hiVehicle = hiVehicleNames[vehicleKey] || vehicleKey;

  const enVehicle = enVehicleNames[vehicleKey] || vehicleKey;

  if (lang === 'kn') {
    if (parsed.triggerCalculate) {
      return `${knOrigin}, ${knCrop}, ${qty} ಕ್ವಿಂಟಾಲ್, ${knVehicle} ವಾಹನ ಹೊಂದಿಸಲಾಗಿದೆ. ಅತ್ಯುತ್ತಮ ಮಂಡಿ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತಿದೆ.`;
    }
    if (changedList.length === 1) {
      if (parsed.matchedOrigin) return `ಮೂಲ ಸ್ಥಳ ${knOrigin} ಜಿಲ್ಲೆಗೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.`;
      if (parsed.matchedCrop) return `ಬೆಳೆ ${knCrop}ಗೆ ಹೊಂದಿಸಲಾಗಿದೆ.`;
      if (parsed.matchedQuantity) return `ಪ್ರಮಾಣ ${qty} ಕ್ವಿಂಟಾಲ್‌ಗೆ ಹೊಂದಿಸಲಾಗಿದೆ.`;
      if (parsed.matchedVehicle) return `ವಾಹನ ${knVehicle}ಗೆ ಬದಲಾಯಿಸಲಾಗಿದೆ.`;
      if (parsed.matchedFreshness) return `ಕಟಾವು ಸಮಯ ${parsed.matchedFreshness === 6 ? 'ಇಂದಿನ ತಾಜಾ' : parsed.matchedFreshness === 24 ? 'ನಿನ್ನೆಯ ಬೆಳೆ' : '2 ದಿನದ ಹಿಂದಿನದು'} ಎಂದು ಹೊಂದಿಸಲಾಗಿದೆ.`;
    }
    if (changedList.length > 0) {
      return `${knOrigin}, ${knCrop}, ${qty} ಕ್ವಿಂಟಾಲ್, ${knVehicle} ವಾಹನ ವಿವರಗಳನ್ನು ಹೊಂದಿಸಲಾಗಿದೆ.`;
    }
    return 'ವಿವರಗಳನ್ನು ನವೀಕರಿಸಲಾಗಿದೆ.';
  }

  if (lang === 'hi') {
    if (parsed.triggerCalculate) {
      return `${hiOrigin}, ${hiCrop}, ${qty} क्विंटल, ${hiVehicle} सेट किया गया। सर्वोत्तम मंडी का हिसाब लगाया जा रहा है।`;
    }
    if (changedList.length === 1) {
      if (parsed.matchedOrigin) return `स्थान ${hiOrigin} जिला सेट किया गया।`;
      if (parsed.matchedCrop) return `फसल ${hiCrop} चुनी गई।`;
      if (parsed.matchedQuantity) return `मात्रा ${qty} क्विंटल सेट की गई।`;
      if (parsed.matchedVehicle) return `वाहन ${hiVehicle} चुना गया।`;
      if (parsed.matchedFreshness) return `कटाई का समय ${parsed.matchedFreshness === 6 ? 'आज की ताज़ा' : parsed.matchedFreshness === 24 ? 'कल की' : 'दो दिन पहले की'} सेट किया गया।`;
    }
    if (changedList.length > 0) {
      return `${hiOrigin}, ${hiCrop}, ${qty} क्विंटल, ${hiVehicle} वाहन सेट किया गया।`;
    }
    return 'विवरण अपडेट कर दिया गया है।';
  }

  // English
  if (parsed.triggerCalculate) {
    return `Set ${originKey}, ${cropKey}, ${qty} quintals with ${enVehicle}. Calculating top take-home mandis.`;
  }
  if (changedList.length === 1) {
    if (parsed.matchedOrigin) return `Origin updated to ${originKey} district.`;
    if (parsed.matchedCrop) return `Crop set to ${cropKey}.`;
    if (parsed.matchedQuantity) return `Quantity set to ${qty} quintals.`;
    if (parsed.matchedVehicle) return `Vehicle updated to ${enVehicle}.`;
    if (parsed.matchedFreshness) return `Harvest timing set to ${parsed.matchedFreshness} hours.`;
  }
  if (changedList.length > 0) {
    return `Updated: ${originKey}, ${cropKey}, ${qty} quintals, ${enVehicle}.`;
  }
  return 'Lot details updated.';
}
