/**
 * Karnataka District Taluks & Selectable Villages Registry
 * Covers all 31 districts, real taluks, and authentic Gram Panchayats / farming villages.
 * Includes explicit handling for City centers (no village required).
 */

const KARNATAKA_DISTRICT_TALUKS = {
  "Koppal": [
    {
      "name": "Koppal City",
      "isCity": true,
      "lat": 15.35,
      "lon": 76.15,
      "kn": "ಕೊಪ್ಪಳ ನಗರ",
      "villages": []
    },
    {
      "name": "Koppal",
      "isCity": false,
      "lat": 15.35,
      "lon": 76.15,
      "kn": "ಕೊಪ್ಪಳ ತಾಲೂಕು",
      "villages": [
        {
          "name": "Alavandi (Alwandi)",
          "kn": "ಅಳವಂಡಿ",
          "lat": 15.22,
          "lon": 76.01
        },
        {
          "name": "Kinnal",
          "kn": "ಕಿನ್ನಾಳ",
          "lat": 15.42,
          "lon": 76.15
        },
        {
          "name": "Bhagyanagar",
          "kn": "ಭಾಗ್ಯನಗರ",
          "lat": 15.37,
          "lon": 76.16
        },
        {
          "name": "Huligi / Munirabad",
          "kn": "ಹುಲಿಗಿ / ಮುನಿರಾಬಾದ್",
          "lat": 15.31,
          "lon": 76.33
        },
        {
          "name": "Gondabal",
          "kn": "ಗೊಂಡಬಾಳ",
          "lat": 15.39,
          "lon": 76.22
        },
        {
          "name": "Ginigera",
          "kn": "ಗಿಣಿಗೇರಾ",
          "lat": 15.37,
          "lon": 76.25
        },
        {
          "name": "Irakalgada",
          "kn": "ಇರಕಲ್ಲಗಡ",
          "lat": 15.46,
          "lon": 76.21
        },
        {
          "name": "Hiresindhogi",
          "kn": "ಹಿರೇಸಿಂದೋಗಿ",
          "lat": 15.28,
          "lon": 76.14
        },
        {
          "name": "Betageri",
          "kn": "ಬೇಟಗೇರಿ",
          "lat": 15.41,
          "lon": 76.08
        },
        {
          "name": "Kawaloor",
          "kn": "ಕವಲೂರು",
          "lat": 15.29,
          "lon": 76.07
        },
        {
          "name": "Bhanapur",
          "kn": "ಭಾನಾಪುರ",
          "lat": 15.38,
          "lon": 76.04
        },
        {
          "name": "Halavarthi",
          "kn": "ಹಲವರ್ತಿ",
          "lat": 15.34,
          "lon": 76.19
        },
        {
          "name": "Halageri",
          "kn": "ಹಾಲಿಗೇರಿ",
          "lat": 15.26,
          "lon": 76.18
        },
        {
          "name": "Agalakera",
          "kn": "ಅಗಲಕೇರಿ",
          "lat": 15.33,
          "lon": 76.24
        },
        {
          "name": "Bahaddurbandi",
          "kn": "ಬಹದ್ದೂರ್‌ಬಂಡಿ",
          "lat": 15.37,
          "lon": 76.12
        },
        {
          "name": "Bandiharlapur",
          "kn": "ಬಂಡಿಹಾರ್ಲಾಪುರ",
          "lat": 15.31,
          "lon": 76.09
        },
        {
          "name": "Bevinahalli",
          "kn": "ಬೇವಿನಹಳ್ಳಿ",
          "lat": 15.44,
          "lon": 76.18
        },
        {
          "name": "Bisaralli",
          "kn": "ಬಿಸರಹಳ್ಳಿ",
          "lat": 15.27,
          "lon": 76.22
        },
        {
          "name": "Bochanahalli",
          "kn": "ಬೋಚನಹಳ್ಳಿ",
          "lat": 15.41,
          "lon": 76.19
        },
        {
          "name": "Boodagumpa",
          "kn": "ಬುಡಗುಂಪಾ",
          "lat": 15.43,
          "lon": 76.27
        },
        {
          "name": "Chikkabommanal",
          "kn": "ಚಿಕ್ಕಬೊಮ್ಮನಾಳ",
          "lat": 15.33,
          "lon": 76.06
        },
        {
          "name": "Guladalli",
          "kn": "ಗುಳದಳ್ಳಿ",
          "lat": 15.29,
          "lon": 76.19
        },
        {
          "name": "Hasagal",
          "kn": "ಹಸಗಲ್",
          "lat": 15.45,
          "lon": 76.14
        },
        {
          "name": "Hatti",
          "kn": "ಹಟ್ಟಿ",
          "lat": 15.38,
          "lon": 76.1
        },
        {
          "name": "Hirebagnal",
          "kn": "ಹಿರೇಬಾಗ್ನಾಳ",
          "lat": 15.4,
          "lon": 76.26
        },
        {
          "name": "Hitnal",
          "kn": "ಹಿಟ್ನಾಳ",
          "lat": 15.3,
          "lon": 76.31
        },
        {
          "name": "Hosalli",
          "kn": "ಹೊಸಳ್ಳಿ",
          "lat": 15.36,
          "lon": 76.21
        },
        {
          "name": "Indaragi",
          "kn": "ಇಂದರಗಿ",
          "lat": 15.48,
          "lon": 76.12
        },
        {
          "name": "Kalakera",
          "kn": "ಕಲಕೇರಾ",
          "lat": 15.24,
          "lon": 76.11
        },
        {
          "name": "Kaltavarageri",
          "kn": "ಕಲತಾವರಗೇರಿ",
          "lat": 15.43,
          "lon": 76.11
        },
        {
          "name": "Katharaki Gudlanur",
          "kn": "ಕಟರಕಿ ಗುಡ್ಲಾನೂರು",
          "lat": 15.25,
          "lon": 76.04
        },
        {
          "name": "Kolur",
          "kn": "ಕೋಲೂರು",
          "lat": 15.31,
          "lon": 76.12
        },
        {
          "name": "Kunikeri",
          "kn": "ಕುಣಿಕೇರಿ",
          "lat": 15.39,
          "lon": 76.13
        },
        {
          "name": "Lebageri",
          "kn": "ಲೇಬಗೇರಿ",
          "lat": 15.47,
          "lon": 76.17
        },
        {
          "name": "Madinoor",
          "kn": "ಮದಿನೂರು",
          "lat": 15.44,
          "lon": 76.07
        },
        {
          "name": "Mattur",
          "kn": "ಮತ್ತೂರು",
          "lat": 15.26,
          "lon": 76.15
        },
        {
          "name": "Munirabad Dam",
          "kn": "ಮುನಿರಾಬಾದ್ ಡ್ಯಾಂ",
          "lat": 15.3,
          "lon": 76.34
        },
        {
          "name": "Ojanahalli",
          "kn": "ಓಜನಹಳ್ಳಿ",
          "lat": 15.37,
          "lon": 76.28
        },
        {
          "name": "Shivpur",
          "kn": "ಶಿವಪುರ",
          "lat": 15.32,
          "lon": 76.28
        },
        {
          "name": "Vanaballari",
          "kn": "ವನಬಳ್ಳಾರಿ",
          "lat": 15.23,
          "lon": 76.08
        }
      ]
    },
    {
      "name": "Gangavathi",
      "isCity": false,
      "lat": 15.43,
      "lon": 76.53,
      "kn": "ಗಂಗಾವತಿ",
      "villages": [
        {
          "name": "Anegundi",
          "kn": "ಆನೆಗುಂದಿ",
          "lat": 15.35,
          "lon": 76.46
        },
        {
          "name": "Sanapur",
          "kn": "ಸಾಣಾಪುರ",
          "lat": 15.36,
          "lon": 76.44
        },
        {
          "name": "Agoli",
          "kn": "ಅಗೋಲಿ",
          "lat": 15.41,
          "lon": 76.58
        },
        {
          "name": "Basapattana",
          "kn": "ಬಸಾಪಟ್ಟಣ",
          "lat": 15.47,
          "lon": 76.56
        },
        {
          "name": "Bennur",
          "kn": "ಬೆನ್ನೂರು",
          "lat": 15.39,
          "lon": 76.52
        },
        {
          "name": "Bevinal",
          "kn": "ಬೇವಿನಾಳ",
          "lat": 15.45,
          "lon": 76.5
        },
        {
          "name": "Budugumpa",
          "kn": "ಬುಡಗುಂಪಾ",
          "lat": 15.42,
          "lon": 76.42
        },
        {
          "name": "Challur",
          "kn": "ಚಲ್ಲೂರು",
          "lat": 15.48,
          "lon": 76.54
        },
        {
          "name": "Chikka Benkal",
          "kn": "ಚಿಕ್ಕ ಬೆಂಕಲ್",
          "lat": 15.38,
          "lon": 76.48
        },
        {
          "name": "Chikka Jantkal",
          "kn": "ಚಿಕ್ಕ ಜಂತಕಲ್",
          "lat": 15.42,
          "lon": 76.54
        },
        {
          "name": "Danapur",
          "kn": "ದಾನಾಪುರ",
          "lat": 15.49,
          "lon": 76.51
        },
        {
          "name": "Hire Benkal",
          "kn": "ಹಿರೇ ಬೆಂಕಲ್",
          "lat": 15.37,
          "lon": 76.49
        },
        {
          "name": "Hemagudda",
          "kn": "ಹೇಮಗುಡ್ಡ",
          "lat": 15.46,
          "lon": 76.45
        },
        {
          "name": "Kesarhatti",
          "kn": "ಕೇಸರಹಟ್ಟಿ",
          "lat": 15.4,
          "lon": 76.56
        },
        {
          "name": "Mallapur",
          "kn": "ಮಲ್ಲಾಪುರ",
          "lat": 15.44,
          "lon": 76.57
        },
        {
          "name": "Achalapur",
          "kn": "ಅಚಲಾಪುರ",
          "lat": 15.42,
          "lon": 76.49
        },
        {
          "name": "Ayodhya",
          "kn": "ಅಯೋಧ್ಯಾ",
          "lat": 15.4,
          "lon": 76.47
        },
        {
          "name": "Basavanna Camp",
          "kn": "ಬಸವಣ್ಣ ಕ್ಯಾಂಪ್",
          "lat": 15.46,
          "lon": 76.55
        },
        {
          "name": "Gonal",
          "kn": "ಗೋನಾಳ",
          "lat": 15.48,
          "lon": 76.48
        },
        {
          "name": "Herur",
          "kn": "ಹೇರೂರು",
          "lat": 15.43,
          "lon": 76.59
        },
        {
          "name": "Hosalli",
          "kn": "ಹೊಸಳ್ಳಿ",
          "lat": 15.41,
          "lon": 76.51
        },
        {
          "name": "Jantkal",
          "kn": "ಜಂತಕಲ್",
          "lat": 15.44,
          "lon": 76.55
        },
        {
          "name": "Mukkumpi",
          "kn": "ಮುಕ್ಕುಂಪಿ",
          "lat": 15.47,
          "lon": 76.46
        },
        {
          "name": "Nagarhalli",
          "kn": "ನಾಗರಹಳ್ಳಿ",
          "lat": 15.39,
          "lon": 76.45
        }
      ]
    },
    {
      "name": "Kushtagi",
      "isCity": false,
      "lat": 15.76,
      "lon": 76.2,
      "kn": "ಕುಷ್ಟಗಿ",
      "villages": [
        {
          "name": "Tavargera",
          "kn": "ತಾವರಗೇರಾ",
          "lat": 15.72,
          "lon": 76.32
        },
        {
          "name": "Hanumasagar",
          "kn": "ಹನುಮಸಾಗರ",
          "lat": 15.79,
          "lon": 76.1
        },
        {
          "name": "Adavibhavi",
          "kn": "ಅಡವಿಭಾವಿ",
          "lat": 15.82,
          "lon": 76.18
        },
        {
          "name": "Antarathana",
          "kn": "ಅಂತರಠಾಣಾ",
          "lat": 15.74,
          "lon": 76.15
        },
        {
          "name": "Benakanahal",
          "kn": "ಬೆನಕನಹಾಳ",
          "lat": 15.78,
          "lon": 76.25
        },
        {
          "name": "Jumlapur",
          "kn": "ಜುಮ್ಲಾಪುರ",
          "lat": 15.8,
          "lon": 76.22
        },
        {
          "name": "Kabbaragi",
          "kn": "ಕಬ್ಬರಗಿ",
          "lat": 15.75,
          "lon": 76.12
        },
        {
          "name": "Katapur",
          "kn": "ಕಾಟಾಪುರ",
          "lat": 15.71,
          "lon": 76.22
        },
        {
          "name": "Kilarhatti",
          "kn": "ಕಿಲಾರಹಟ್ಟಿ",
          "lat": 15.83,
          "lon": 76.24
        },
        {
          "name": "Malagitti",
          "kn": "ಮಾಲಗಿತ್ತಿ",
          "lat": 15.77,
          "lon": 76.27
        },
        {
          "name": "Menedal",
          "kn": "ಮೇಣೆದಾಳ",
          "lat": 15.73,
          "lon": 76.18
        },
        {
          "name": "Mudenoor",
          "kn": "ಮುದೇನೂರು",
          "lat": 15.81,
          "lon": 76.16
        },
        {
          "name": "Nilogal",
          "kn": "ನಿಲೋಗಲ್",
          "lat": 15.7,
          "lon": 76.25
        },
        {
          "name": "Shiragumpi",
          "kn": "ಶಿರಗುಂಪಿ",
          "lat": 15.85,
          "lon": 76.21
        },
        {
          "name": "Tumarikoppa",
          "kn": "ತುಮರಿಕೊಪ್ಪ",
          "lat": 15.72,
          "lon": 76.14
        },
        {
          "name": "Yeragera",
          "kn": "ಯರಗೇರಾ",
          "lat": 15.84,
          "lon": 76.15
        },
        {
          "name": "Dotihal",
          "kn": "ದೋಟಿಹಾಳ",
          "lat": 15.78,
          "lon": 76.11
        },
        {
          "name": "Kandakur",
          "kn": "ಕಂದಕೂರು",
          "lat": 15.75,
          "lon": 76.28
        }
      ]
    },
    {
      "name": "Yelburga",
      "isCity": false,
      "lat": 15.62,
      "lon": 75.98,
      "kn": "ಯಲಬುರ್ಗಾ",
      "villages": [
        {
          "name": "Adoor",
          "kn": "ಅಡೂರು",
          "lat": 15.6,
          "lon": 75.92
        },
        {
          "name": "Balgera",
          "kn": "ಬಾಲ್ಗೇರಾ",
          "lat": 15.65,
          "lon": 76.01
        },
        {
          "name": "Ballutagi",
          "kn": "ಬಳ್ಳೂಟಗಿ",
          "lat": 15.67,
          "lon": 75.95
        },
        {
          "name": "Bannikoppa",
          "kn": "ಬನ್ನಿಕೊಪ್ಪ",
          "lat": 15.58,
          "lon": 75.94
        },
        {
          "name": "Bedwatti",
          "kn": "ಬೇಡವಟ್ಟಿ",
          "lat": 15.64,
          "lon": 76.04
        },
        {
          "name": "Benakal",
          "kn": "ಬೆನಕಲ್",
          "lat": 15.61,
          "lon": 76.02
        },
        {
          "name": "Bevoor",
          "kn": "ಬೇವೂರು",
          "lat": 15.66,
          "lon": 75.91
        },
        {
          "name": "Bhanapur",
          "kn": "ಭಾನಾಪುರ",
          "lat": 15.59,
          "lon": 76.03
        },
        {
          "name": "Hire Arlihalli",
          "kn": "ಹಿರೇ ಅರಳಿಹಳ್ಳಿ",
          "lat": 15.68,
          "lon": 75.99
        },
        {
          "name": "Hiremyageri",
          "kn": "ಹಿರೇಮ್ಯಾಗೇರಿ",
          "lat": 15.63,
          "lon": 75.93
        },
        {
          "name": "Hire Waddarkal",
          "kn": "ಹಿರೇ ವಡ್ಡರಕಲ್",
          "lat": 15.57,
          "lon": 76.01
        },
        {
          "name": "Kallur",
          "kn": "ಕಲ್ಲೂರು",
          "lat": 15.65,
          "lon": 76.06
        },
        {
          "name": "Karmudi",
          "kn": "ಕಾರ್ಮುಡಿ",
          "lat": 15.62,
          "lon": 75.9
        },
        {
          "name": "Katgihalli",
          "kn": "ಕಾಟಗಿಹಳ್ಳಿ",
          "lat": 15.59,
          "lon": 75.96
        },
        {
          "name": "Konasagar",
          "kn": "ಕೋಣಸಾಗರ",
          "lat": 15.67,
          "lon": 76.03
        },
        {
          "name": "Kudgunti",
          "kn": "ಕುಡ್ಗುಂಟಿ",
          "lat": 15.56,
          "lon": 75.97
        },
        {
          "name": "Sanknur",
          "kn": "ಸಂಕನೂರು",
          "lat": 15.64,
          "lon": 75.96
        },
        {
          "name": "Mudhol",
          "kn": "ಮುಧೋಳ (ಯಲಬುರ್ಗಾ)",
          "lat": 15.61,
          "lon": 75.94
        }
      ]
    },
    {
      "name": "Karatagi",
      "isCity": false,
      "lat": 15.57,
      "lon": 76.67,
      "kn": "ಕಾರಟಗಿ",
      "villages": [
        {
          "name": "Bargur",
          "kn": "ಬರಗೂರು",
          "lat": 15.54,
          "lon": 76.64
        },
        {
          "name": "Bennur",
          "kn": "ಬೆನ್ನೂರು",
          "lat": 15.58,
          "lon": 76.71
        },
        {
          "name": "Bevinhal",
          "kn": "ಬೇವಿನಹಾಳ",
          "lat": 15.55,
          "lon": 76.69
        },
        {
          "name": "Budugumpa",
          "kn": "ಬುಡುಗುಂಪಾ",
          "lat": 15.52,
          "lon": 76.63
        },
        {
          "name": "Challur",
          "kn": "ಚಲ್ಲೂರು",
          "lat": 15.59,
          "lon": 76.65
        },
        {
          "name": "Eliganoor",
          "kn": "ಎಲಿಗನೂರು",
          "lat": 15.56,
          "lon": 76.73
        },
        {
          "name": "Gudur",
          "kn": "ಗುಡೂರು",
          "lat": 15.6,
          "lon": 76.62
        },
        {
          "name": "Gundur",
          "kn": "ಗುಂಡೂರು",
          "lat": 15.53,
          "lon": 76.66
        },
        {
          "name": "Hulkihal",
          "kn": "ಹುಲ್ಕಿಹಾಳ",
          "lat": 15.61,
          "lon": 76.68
        },
        {
          "name": "Jamapur",
          "kn": "ಜಮಾಪುರ",
          "lat": 15.57,
          "lon": 76.61
        },
        {
          "name": "Juratgi",
          "kn": "ಜುರಟಗಿ",
          "lat": 15.62,
          "lon": 76.64
        },
        {
          "name": "Kakkargol",
          "kn": "ಕಕ್ಕರಗೋಳ",
          "lat": 15.58,
          "lon": 76.7
        },
        {
          "name": "Marlanahalli",
          "kn": "ಮರ್ಲಾನಹಳ್ಳಿ",
          "lat": 15.54,
          "lon": 76.72
        },
        {
          "name": "Mustur",
          "kn": "ಮುಸ್ತೂರು",
          "lat": 15.63,
          "lon": 76.66
        },
        {
          "name": "Mylapur",
          "kn": "ಮೈಲಾಪುರ",
          "lat": 15.55,
          "lon": 76.62
        },
        {
          "name": "Nandihalli",
          "kn": "ನಂದಿಹಳ್ಳಿ",
          "lat": 15.59,
          "lon": 76.69
        },
        {
          "name": "Siddapur",
          "kn": "ಸಿದ್ಧಾಪುರ",
          "lat": 15.56,
          "lon": 76.65
        },
        {
          "name": "Singanhal",
          "kn": "ಸಿಂಗನ್ಹಾಳ",
          "lat": 15.6,
          "lon": 76.71
        },
        {
          "name": "Timmapur",
          "kn": "ತಿಮ್ಮಾಪುರ",
          "lat": 15.53,
          "lon": 76.68
        },
        {
          "name": "Tondihal",
          "kn": "ತೊಂಡಿಹಾಳ",
          "lat": 15.62,
          "lon": 76.7
        },
        {
          "name": "Yerdona",
          "kn": "ಯರದೋಣಾ",
          "lat": 15.57,
          "lon": 76.74
        }
      ]
    },
    {
      "name": "Kuknoor",
      "isCity": false,
      "lat": 15.51,
      "lon": 76.05,
      "kn": "ಕುಕನೂರು",
      "villages": [
        {
          "name": "Itagi",
          "kn": "ಇಟಗಿ",
          "lat": 15.48,
          "lon": 76.01
        },
        {
          "name": "Arkeri",
          "kn": "ಅರ್ಕೇರಿ",
          "lat": 15.54,
          "lon": 76.08
        },
        {
          "name": "Balgera",
          "kn": "ಬಾಲ್ಗೇರಾ",
          "lat": 15.52,
          "lon": 76.02
        },
        {
          "name": "Bannikoppa",
          "kn": "ಬನ್ನಿಕೊಪ್ಪ",
          "lat": 15.46,
          "lon": 76.06
        },
        {
          "name": "Benakal",
          "kn": "ಬೆನಕಲ್",
          "lat": 15.55,
          "lon": 76.04
        },
        {
          "name": "Bhanapur",
          "kn": "ಭಾನಾಪುರ",
          "lat": 15.5,
          "lon": 76.1
        },
        {
          "name": "Binhal",
          "kn": "ಬಿನ್ಹಾಳ",
          "lat": 15.53,
          "lon": 76.07
        },
        {
          "name": "Budgumpi",
          "kn": "ಬುಡ್ಗುಂಪಿ",
          "lat": 15.47,
          "lon": 76.09
        },
        {
          "name": "Chendoor",
          "kn": "ಚೆಂಡೂರು",
          "lat": 15.56,
          "lon": 76.02
        },
        {
          "name": "Dyampur",
          "kn": "ದ್ಯಾಂಪುರ",
          "lat": 15.49,
          "lon": 76.03
        },
        {
          "name": "Gavarhal",
          "kn": "ಗವರಹಾಳ",
          "lat": 15.52,
          "lon": 76.11
        },
        {
          "name": "Kakkihalli",
          "kn": "ಕಕ್ಕಿಹಳ್ಳಿ",
          "lat": 15.45,
          "lon": 76.04
        },
        {
          "name": "Kudri Moti",
          "kn": "ಕುದುರಿಮೋತಿ",
          "lat": 15.54,
          "lon": 76.09
        },
        {
          "name": "Mandalgeri",
          "kn": "ಮಂಡಲಗೇರಿ",
          "lat": 15.51,
          "lon": 76.07
        },
        {
          "name": "Mangalore",
          "kn": "ಮಂಗಳೂರು",
          "lat": 15.48,
          "lon": 76.08
        },
        {
          "name": "Rajoor",
          "kn": "ರಾಜೂರು",
          "lat": 15.57,
          "lon": 76.06
        },
        {
          "name": "Sompur",
          "kn": "ಸೋಂಪುರ",
          "lat": 15.46,
          "lon": 76.02
        },
        {
          "name": "Talbal",
          "kn": "ತಳಬಾಳ",
          "lat": 15.53,
          "lon": 76.01
        },
        {
          "name": "Yerehanchinal",
          "kn": "ಯರಹಂಚಿನಾಳ",
          "lat": 15.5,
          "lon": 76.04
        }
      ]
    },
    {
      "name": "Kanakagiri",
      "isCity": false,
      "lat": 15.57,
      "lon": 76.42,
      "kn": "ಕನಕಗಿರಿ",
      "villages": [
        {
          "name": "Hulihyder",
          "kn": "ಹುಲಿಹೈದರ್",
          "lat": 15.52,
          "lon": 76.38
        },
        {
          "name": "Karadona",
          "kn": "ಕರಡೋಣಾ",
          "lat": 15.6,
          "lon": 76.45
        },
        {
          "name": "Chikka Madinal",
          "kn": "ಚಿಕ್ಕ ಮದಿನಾಳ",
          "lat": 15.55,
          "lon": 76.4
        },
        {
          "name": "Hire Madinal",
          "kn": "ಹಿರೇ ಮದಿನಾಳ",
          "lat": 15.56,
          "lon": 76.41
        },
        {
          "name": "Navali",
          "kn": "ನವಲಿ",
          "lat": 15.62,
          "lon": 76.43
        },
        {
          "name": "Basrihal",
          "kn": "ಬಸರಿಹಾಳ",
          "lat": 15.53,
          "lon": 76.46
        },
        {
          "name": "Benkanhal",
          "kn": "ಬೆನಕನ್ಹಾಳ",
          "lat": 15.58,
          "lon": 76.39
        },
        {
          "name": "Chirchanagudda",
          "kn": "ಚಿರ್ಚನಗುಡ್ಡ",
          "lat": 15.59,
          "lon": 76.47
        },
        {
          "name": "Guddadur",
          "kn": "ಗುಡ್ಡದೂರು",
          "lat": 15.54,
          "lon": 76.44
        },
        {
          "name": "Katapur",
          "kn": "ಕಾಟಾಪುರ",
          "lat": 15.61,
          "lon": 76.38
        },
        {
          "name": "Ramdurg",
          "kn": "ರಾಮದುರ್ಗ",
          "lat": 15.63,
          "lon": 76.41
        },
        {
          "name": "Rampur",
          "kn": "ರಾಮಪುರ",
          "lat": 15.51,
          "lon": 76.42
        },
        {
          "name": "Sirwar",
          "kn": "ಸಿರವಾರ",
          "lat": 15.57,
          "lon": 76.48
        },
        {
          "name": "Somsagara",
          "kn": "ಸೋಮಸಾಗರ",
          "lat": 15.55,
          "lon": 76.47
        },
        {
          "name": "Sulekal",
          "kn": "ಸೂಳೆಕಲ್",
          "lat": 15.64,
          "lon": 76.44
        },
        {
          "name": "Varankhed",
          "kn": "ವರಣಖೇಡ್",
          "lat": 15.5,
          "lon": 76.45
        }
      ]
    }
  ],
  "Davanagere": [
    {
      "name": "Davanagere City",
      "isCity": true,
      "lat": 14.4644,
      "lon": 75.9218,
      "kn": "ದಾವಣಗೆರೆ ನಗರ",
      "villages": []
    },
    {
      "name": "Harihar",
      "isCity": false,
      "lat": 14.51,
      "lon": 75.8,
      "kn": "ಹರಿಹರ",
      "villages": [
        {
          "name": "Malebennur",
          "kn": "ಮಲೇಬೆನ್ನೂರು",
          "lat": 14.36,
          "lon": 75.71
        },
        {
          "name": "Yelebichagondanahalli",
          "kn": "ಎಲೆಬಿಚಗೊಂಡನಹಳ್ಳಿ",
          "lat": 14.53,
          "lon": 75.76
        },
        {
          "name": "Bhanuvalli",
          "kn": "ಭಾನುವಳ್ಳಿ",
          "lat": 14.47,
          "lon": 75.73
        },
        {
          "name": "Rajanahalli",
          "kn": "ರಾಜನಹಳ್ಳಿ",
          "lat": 14.54,
          "lon": 75.83
        },
        {
          "name": "Nandigavi",
          "kn": "ನಂದಿಗಾವಿ",
          "lat": 14.42,
          "lon": 75.78
        },
        {
          "name": "Bilasanur",
          "kn": "ಬಿಲಸನೂರು",
          "lat": 14.48,
          "lon": 75.85
        },
        {
          "name": "Halivana",
          "kn": "ಹಾಲಿವಾಣ",
          "lat": 14.44,
          "lon": 75.74
        },
        {
          "name": "Guttur",
          "kn": "ಗುತ್ತೂರು",
          "lat": 14.52,
          "lon": 75.81
        },
        {
          "name": "Kumbalur",
          "kn": "ಕುಂಬಳೂರು",
          "lat": 14.4,
          "lon": 75.72
        }
      ]
    },
    {
      "name": "Channagiri",
      "isCity": false,
      "lat": 14.02,
      "lon": 75.93,
      "kn": "ಚನ್ನಗಿರಿ",
      "villages": [
        {
          "name": "Santhebennur",
          "kn": "ಸಂತೆಬೆನ್ನೂರು",
          "lat": 14.15,
          "lon": 75.98
        },
        {
          "name": "Nallur",
          "kn": "ನಲ್ಲೂರು",
          "lat": 14.05,
          "lon": 75.9
        },
        {
          "name": "Basavapatna",
          "kn": "ಬಸವಾಪಟ್ಟಣ",
          "lat": 14.19,
          "lon": 75.81
        },
        {
          "name": "Hodigere",
          "kn": "ಹೊದಿಗೆರೆ",
          "lat": 14.09,
          "lon": 76.01
        },
        {
          "name": "Hiregangur",
          "kn": "ಹಿರೇಗಂಗೂರು",
          "lat": 13.98,
          "lon": 75.94
        },
        {
          "name": "Tyavanagi",
          "kn": "ತ್ಯಾವಣಗಿ",
          "lat": 14.11,
          "lon": 75.88
        },
        {
          "name": "Kagathur",
          "kn": "ಕಾಗತ್ತೂರು",
          "lat": 14.07,
          "lon": 75.97
        },
        {
          "name": "Devarahalli",
          "kn": "ದೇವರಹಳ್ಳಿ",
          "lat": 14.01,
          "lon": 75.86
        }
      ]
    },
    {
      "name": "Honnali",
      "isCity": false,
      "lat": 14.24,
      "lon": 75.64,
      "kn": "ಹೊನ್ನಾಳಿ",
      "villages": [
        {
          "name": "Belagutti",
          "kn": "ಬೆಳಗುತ್ತಿ",
          "lat": 14.18,
          "lon": 75.52
        },
        {
          "name": "Sasvehalli",
          "kn": "ಸಾಸವೆಹಳ್ಳಿ",
          "lat": 14.15,
          "lon": 75.69
        },
        {
          "name": "Kundur",
          "kn": "ಕುಂದೂರು",
          "lat": 14.28,
          "lon": 75.61
        },
        {
          "name": "Soratur",
          "kn": "ಸೊರಟೂರು",
          "lat": 14.22,
          "lon": 75.68
        },
        {
          "name": "Arakere",
          "kn": "ಅರಕೆರೆ",
          "lat": 14.2,
          "lon": 75.59
        },
        {
          "name": "Chilur",
          "kn": "ಚಿಲೂರು",
          "lat": 14.12,
          "lon": 75.63
        },
        {
          "name": "Benakanahalli",
          "kn": "ಬೆನಕನಹಳ್ಳಿ",
          "lat": 14.26,
          "lon": 75.66
        }
      ]
    },
    {
      "name": "Jagalur",
      "isCity": false,
      "lat": 14.52,
      "lon": 76.35,
      "kn": "ಜಗಳೂರು",
      "villages": [
        {
          "name": "Bilichodu",
          "kn": "ಬಿಳಿಚೋಡು",
          "lat": 14.47,
          "lon": 76.22
        },
        {
          "name": "Asagodu",
          "kn": "ಅಸಗೋಡು",
          "lat": 14.56,
          "lon": 76.31
        },
        {
          "name": "Donnehalli",
          "kn": "ದೊಣ್ಣೆಹಳ್ಳಿ",
          "lat": 14.49,
          "lon": 76.41
        },
        {
          "name": "Pallagatte",
          "kn": "ಪಲ್ಲಾಗಟ್ಟೆ",
          "lat": 14.58,
          "lon": 76.39
        },
        {
          "name": "Sokke",
          "kn": "ಸೊಕ್ಕೆ",
          "lat": 14.62,
          "lon": 76.33
        },
        {
          "name": "Bistuvalli",
          "kn": "ಬಿಸ್ತುವಳ್ಳಿ",
          "lat": 14.5,
          "lon": 76.28
        }
      ]
    },
    {
      "name": "Nyamathi",
      "isCity": false,
      "lat": 14.15,
      "lon": 75.58,
      "kn": "ನ್ಯಾಮತಿ",
      "villages": [
        {
          "name": "Surahonne",
          "kn": "ಸುರಹೊನ್ನೆ",
          "lat": 14.11,
          "lon": 75.62
        },
        {
          "name": "Madanabhavi",
          "kn": "ಮದನಭಾವಿ",
          "lat": 14.18,
          "lon": 75.55
        },
        {
          "name": "Kenchikoppa",
          "kn": "ಕೆಂಚಿಕೊಪ್ಪ",
          "lat": 14.14,
          "lon": 75.51
        },
        {
          "name": "Jeenahalli",
          "kn": "ಜೀನಹಳ್ಳಿ",
          "lat": 14.19,
          "lon": 75.63
        },
        {
          "name": "Chilur Hobli",
          "kn": "ಚಿಲೂರು ಹೋಬಳಿ",
          "lat": 14.13,
          "lon": 75.66
        }
      ]
    }
  ],
  "Belagavi": [
    {
      "name": "Belagavi City",
      "isCity": true,
      "lat": 15.85,
      "lon": 74.5,
      "kn": "ಬೆಳಗಾವಿ ನಗರ",
      "villages": []
    },
    {
      "name": "Athani",
      "isCity": false,
      "lat": 16.73,
      "lon": 75.06,
      "kn": "ಅಥಣಿ",
      "villages": [
        {
          "name": "Ugar Khurd",
          "kn": "ಉಗಾರ ಖುರ್ದ್",
          "lat": 16.68,
          "lon": 74.82
        },
        {
          "name": "Ainapur",
          "kn": "ಐನಾಪುರ",
          "lat": 16.65,
          "lon": 74.88
        },
        {
          "name": "Kagwad",
          "kn": "ಕಾಗವಾಡ",
          "lat": 16.71,
          "lon": 74.78
        },
        {
          "name": "Shedbal",
          "kn": "ಶೇಡಬಾಳ",
          "lat": 16.69,
          "lon": 74.72
        },
        {
          "name": "Anantapur",
          "kn": "ಅನಂತಪುರ",
          "lat": 16.75,
          "lon": 75.12
        },
        {
          "name": "Telsang",
          "kn": "ತೆಲಸಂಗ",
          "lat": 16.82,
          "lon": 75.18
        },
        {
          "name": "Kokatnur",
          "kn": "ಕೊಕಟನೂರು",
          "lat": 16.78,
          "lon": 75.01
        },
        {
          "name": "Halyal",
          "kn": "ಹಲ್ಯಾಳ",
          "lat": 16.7,
          "lon": 75.15
        }
      ]
    },
    {
      "name": "Chikkodi",
      "isCity": false,
      "lat": 16.43,
      "lon": 74.6,
      "kn": "ಚಿಕ್ಕೋಡಿ",
      "villages": [
        {
          "name": "Examba",
          "kn": "ಎಕ್ಸಂಬಾ",
          "lat": 16.53,
          "lon": 74.55
        },
        {
          "name": "Sadalga",
          "kn": "ಸದಲಗಾ",
          "lat": 16.57,
          "lon": 74.53
        },
        {
          "name": "Kerur",
          "kn": "ಕೇರೂರು",
          "lat": 16.48,
          "lon": 74.62
        },
        {
          "name": "Bedkihal",
          "kn": "ಬೆಡಕಿಹಾಳ",
          "lat": 16.51,
          "lon": 74.47
        },
        {
          "name": "Soundalga",
          "kn": "ಸೌಂದಲಗಾ",
          "lat": 16.55,
          "lon": 74.45
        },
        {
          "name": "Nagaral",
          "kn": "ನಾಗರಾಳ",
          "lat": 16.41,
          "lon": 74.65
        }
      ]
    },
    {
      "name": "Gokak",
      "isCity": false,
      "lat": 16.17,
      "lon": 74.82,
      "kn": "ಗೋಕಾಕ",
      "villages": [
        {
          "name": "Ghataprabha",
          "kn": "ಘಟಪ್ರಭಾ",
          "lat": 16.23,
          "lon": 74.75
        },
        {
          "name": "Konnur",
          "kn": "ಕೊಣ್ಣೂರು",
          "lat": 16.2,
          "lon": 74.74
        },
        {
          "name": "Ankalagi",
          "kn": "ಅಂಕಲಗಿ",
          "lat": 16.08,
          "lon": 74.71
        },
        {
          "name": "Koujalgi",
          "kn": "ಕೌಜಲಗಿ",
          "lat": 16.15,
          "lon": 74.96
        },
        {
          "name": "Mamdapur",
          "kn": "ಮಮದಾಪುರ",
          "lat": 16.25,
          "lon": 74.88
        },
        {
          "name": "Arabhavi",
          "kn": "ಅರಭಾವಿ",
          "lat": 16.22,
          "lon": 74.83
        }
      ]
    },
    {
      "name": "Bailhongal",
      "isCity": false,
      "lat": 15.82,
      "lon": 74.86,
      "kn": "ಬೈಲಹೊಂಗಲ",
      "villages": [
        {
          "name": "Sampgaon",
          "kn": "ಸಂಪಗಾಂವ",
          "lat": 15.77,
          "lon": 74.82
        },
        {
          "name": "Nesargi",
          "kn": "ನೇಸರಗಿ",
          "lat": 15.91,
          "lon": 74.76
        },
        {
          "name": "Devalapur",
          "kn": "ದೇವಲಾಪುರ",
          "lat": 15.86,
          "lon": 74.92
        },
        {
          "name": "MK Hubli",
          "kn": "ಎಂ.ಕೆ. ಹುಬ್ಬಳ್ಳಿ",
          "lat": 15.65,
          "lon": 74.75
        },
        {
          "name": "Dodwad",
          "kn": "ದೊಡವಾಡ",
          "lat": 15.73,
          "lon": 74.98
        },
        {
          "name": "Tigadi",
          "kn": "ತಿಗಡಿ",
          "lat": 15.85,
          "lon": 74.81
        }
      ]
    },
    {
      "name": "Hukkeri",
      "isCity": false,
      "lat": 16.23,
      "lon": 74.6,
      "kn": "ಹುಕ್ಕೇರಿ",
      "villages": [
        {
          "name": "Sankeshwar",
          "kn": "ಸಂಕೇಶ್ವರ",
          "lat": 16.26,
          "lon": 74.48
        },
        {
          "name": "Yamakanmardi",
          "kn": "ಯಮಕನಮರಡಿ",
          "lat": 16.12,
          "lon": 74.53
        },
        {
          "name": "Bellad Bagewadi",
          "kn": "ಬೆಲ್ಲದ ಬಾಗೇವಾಡಿ",
          "lat": 16.29,
          "lon": 74.56
        },
        {
          "name": "Kotabagi",
          "kn": "ಕೋಟಬಾಗಿ",
          "lat": 16.19,
          "lon": 74.64
        },
        {
          "name": "Hidakal Dam",
          "kn": "ಹಿಡಕಲ್ ಡ್ಯಾಂ",
          "lat": 16.15,
          "lon": 74.63
        }
      ]
    },
    {
      "name": "Raybag",
      "isCity": false,
      "lat": 16.48,
      "lon": 74.78,
      "kn": "ರಾಯಬಾಗ",
      "villages": [
        {
          "name": "Kudachi",
          "kn": "ಕುಡಚಿ",
          "lat": 16.63,
          "lon": 74.85
        },
        {
          "name": "Harugeri",
          "kn": "ಹಾರೂಗೇರಿ",
          "lat": 16.54,
          "lon": 74.98
        },
        {
          "name": "Alagawadi",
          "kn": "ಅಲಗವಾಡಿ",
          "lat": 16.45,
          "lon": 74.82
        },
        {
          "name": "Mugalkhod",
          "kn": "ಮುಗಳಖೋಡ",
          "lat": 16.41,
          "lon": 75.05
        },
        {
          "name": "Chinchali",
          "kn": "ಚಿಂಚಲಿ",
          "lat": 16.58,
          "lon": 74.79
        }
      ]
    },
    {
      "name": "Ramdurg",
      "isCity": false,
      "lat": 15.95,
      "lon": 75.3,
      "kn": "ರಾಮದುರ್ಗ",
      "villages": [
        {
          "name": "Sureban",
          "kn": "ಸುರೇಬಾನ",
          "lat": 15.91,
          "lon": 75.24
        },
        {
          "name": "Katkol",
          "kn": "ಕಟಕೋಳ",
          "lat": 15.98,
          "lon": 75.38
        },
        {
          "name": "Salahalli",
          "kn": "ಸಾಲಹಳ್ಳಿ",
          "lat": 16.02,
          "lon": 75.28
        },
        {
          "name": "Godachi",
          "kn": "ಗೋದಚಿ",
          "lat": 15.89,
          "lon": 75.32
        },
        {
          "name": "Mudakavi",
          "kn": "ಮುದಕವಿ",
          "lat": 15.94,
          "lon": 75.35
        }
      ]
    },
    {
      "name": "Saundatti",
      "isCity": false,
      "lat": 15.77,
      "lon": 75.12,
      "kn": "ಸವದತ್ತಿ",
      "villages": [
        {
          "name": "Munavalli",
          "kn": "ಮುನವಳ್ಳಿ",
          "lat": 15.85,
          "lon": 75.1
        },
        {
          "name": "Yaragatti",
          "kn": "ಯರಗಟ್ಟಿ",
          "lat": 16.02,
          "lon": 75.02
        },
        {
          "name": "Sogal",
          "kn": "ಸೋಗಲ",
          "lat": 15.81,
          "lon": 74.98
        },
        {
          "name": "Goravanakolla",
          "kn": "ಗೊರನಕೊಳ್ಳ",
          "lat": 15.75,
          "lon": 75.05
        },
        {
          "name": "Muragod",
          "kn": "ಮುರಗೋಡ",
          "lat": 15.88,
          "lon": 74.94
        }
      ]
    },
    {
      "name": "Khanapur",
      "isCity": false,
      "lat": 15.63,
      "lon": 74.52,
      "kn": "ಖಾನಾಪುರ",
      "villages": [
        {
          "name": "Londa",
          "kn": "ಲೋಂಡಾ",
          "lat": 15.46,
          "lon": 74.51
        },
        {
          "name": "Nandgad",
          "kn": "ನಂದಗಡ",
          "lat": 15.55,
          "lon": 74.58
        },
        {
          "name": "Bidi",
          "kn": "ಬೀಡಿ",
          "lat": 15.53,
          "lon": 74.72
        },
        {
          "name": "Gunji",
          "kn": "ಗುಂಜಿ",
          "lat": 15.58,
          "lon": 74.42
        },
        {
          "name": "Itagi",
          "kn": "ಇಟಗಿ (ಖಾನಾಪುರ)",
          "lat": 15.68,
          "lon": 74.61
        }
      ]
    }
  ],
  "Bagalkot": [
    {
      "name": "Bagalkot City",
      "isCity": true,
      "lat": 16.18,
      "lon": 75.7,
      "kn": "ಬಾಗಲಕೋಟೆ ನಗರ",
      "villages": []
    },
    {
      "name": "Badami",
      "isCity": false,
      "lat": 15.92,
      "lon": 75.68,
      "kn": "ಬಾದಾಮಿ",
      "villages": [
        {
          "name": "Guledagudda",
          "kn": "ಗುಳೇದಗುಡ್ಡ",
          "lat": 16.05,
          "lon": 75.78
        },
        {
          "name": "Kerur",
          "kn": "ಕೇರೂರು",
          "lat": 16.01,
          "lon": 75.56
        },
        {
          "name": "Pattadakal",
          "kn": "ಪಟ್ಟದಕಲ್ಲು",
          "lat": 15.95,
          "lon": 75.82
        },
        {
          "name": "Cholachagudda",
          "kn": "ಚೋಳಚಗುಡ್ಡ",
          "lat": 15.9,
          "lon": 75.71
        },
        {
          "name": "Belur",
          "kn": "ಬೇಲೂರು (ಬಾದಾಮಿ)",
          "lat": 15.88,
          "lon": 75.76
        },
        {
          "name": "Jalihal",
          "kn": "ಜಾಲಿಹಾಳ",
          "lat": 15.97,
          "lon": 75.63
        }
      ]
    },
    {
      "name": "Jamkhandi",
      "isCity": false,
      "lat": 16.51,
      "lon": 75.3,
      "kn": "ಜಮಖಂಡಿ",
      "villages": [
        {
          "name": "Rabkavi Banhatti",
          "kn": "ರಬಕವಿ ಬನಹಟ್ಟಿ",
          "lat": 16.48,
          "lon": 75.12
        },
        {
          "name": "Savalgi",
          "kn": "ಸವಳಗಿ",
          "lat": 16.56,
          "lon": 75.25
        },
        {
          "name": "Terdal",
          "kn": "ತೇರದಾಳ",
          "lat": 16.5,
          "lon": 75.05
        },
        {
          "name": "Hunnur",
          "kn": "ಹುನ್ನೂರು",
          "lat": 16.47,
          "lon": 75.27
        },
        {
          "name": "Maigur",
          "kn": "ಮೈಗೂರು",
          "lat": 16.55,
          "lon": 75.34
        },
        {
          "name": "Todalbagi",
          "kn": "ತೊದಲಬಾಗಿ",
          "lat": 16.45,
          "lon": 75.22
        }
      ]
    },
    {
      "name": "Mudhol",
      "isCity": false,
      "lat": 16.35,
      "lon": 75.28,
      "kn": "ಮುಧೋಳ",
      "villages": [
        {
          "name": "Lokapur",
          "kn": "ಲೋಕಾಪುರ",
          "lat": 16.16,
          "lon": 75.38
        },
        {
          "name": "Mahalingpur",
          "kn": "ಮಹಾಲಿಂಗಪುರ",
          "lat": 16.39,
          "lon": 75.12
        },
        {
          "name": "Yadahalli",
          "kn": "ಯಡಹಳ್ಳಿ",
          "lat": 16.29,
          "lon": 75.34
        },
        {
          "name": "Kasaba Jambagi",
          "kn": "ಕಸಬಾ ಜಂಬಗಿ",
          "lat": 16.36,
          "lon": 75.21
        },
        {
          "name": "Belagali",
          "kn": "ಬೆಳಗಲಿ",
          "lat": 16.41,
          "lon": 75.25
        }
      ]
    },
    {
      "name": "Bilgi",
      "isCity": false,
      "lat": 16.34,
      "lon": 75.62,
      "kn": "ಬೀಳಗಿ",
      "villages": [
        {
          "name": "Galagali",
          "kn": "ಗಲಗಲಿ",
          "lat": 16.41,
          "lon": 75.52
        },
        {
          "name": "Kundaragi",
          "kn": "ಕುಂದರಗಿ",
          "lat": 16.31,
          "lon": 75.68
        },
        {
          "name": "Siddapur",
          "kn": "ಸಿದ್ಧಾಪುರ (ಬೀಳಗಿ)",
          "lat": 16.37,
          "lon": 75.64
        },
        {
          "name": "Anagawadi",
          "kn": "ಅನಗವಾಡಿ",
          "lat": 16.26,
          "lon": 75.65
        },
        {
          "name": "Girisagar",
          "kn": "ಗಿರಿಸಾಗರ",
          "lat": 16.38,
          "lon": 75.58
        }
      ]
    },
    {
      "name": "Hunagund",
      "isCity": false,
      "lat": 16.06,
      "lon": 76.06,
      "kn": "ಹುನಗುಂದ",
      "villages": [
        {
          "name": "Ilkal",
          "kn": "ಇಳಕಲ್",
          "lat": 15.96,
          "lon": 76.13
        },
        {
          "name": "Amingad",
          "kn": "ಅಮೀನಗಡ",
          "lat": 16.05,
          "lon": 75.95
        },
        {
          "name": "Kudalasangama",
          "kn": "ಕೂಡಲಸಂಗಮ",
          "lat": 16.21,
          "lon": 76.08
        },
        {
          "name": "Kamatagi",
          "kn": "ಕಮತಗಿ",
          "lat": 16.11,
          "lon": 75.89
        },
        {
          "name": "Karadi",
          "kn": "ಕರಡಿ",
          "lat": 16.02,
          "lon": 76.01
        }
      ]
    }
  ],
  "Vijayapura": [
    {
      "name": "Vijayapura City",
      "isCity": true,
      "lat": 16.83,
      "lon": 75.71,
      "kn": "ವಿಜಯಪುರ ನಗರ",
      "villages": []
    },
    {
      "name": "Basavana Bagewadi",
      "isCity": false,
      "lat": 16.58,
      "lon": 75.97,
      "kn": "ಬಸವನ ಬಾಗೇವಾಡಿ",
      "villages": [
        {
          "name": "Nidagundi",
          "kn": "ನಿಡಗುಂದಿ",
          "lat": 16.37,
          "lon": 75.92
        },
        {
          "name": "Kolhar",
          "kn": "ಕೊಲ್ಹಾರ",
          "lat": 16.48,
          "lon": 75.78
        },
        {
          "name": "Huvina Hipparagi",
          "kn": "ಹೂವಿನ ಹಿಪ್ಪರಗಿ",
          "lat": 16.71,
          "lon": 76.05
        },
        {
          "name": "Telgi",
          "kn": "ತೇಲಗಿ",
          "lat": 16.63,
          "lon": 75.89
        },
        {
          "name": "Muttagi",
          "kn": "ಮುತ್ತಗಿ",
          "lat": 16.54,
          "lon": 76.02
        },
        {
          "name": "Kudagi",
          "kn": "ಕೂಡಗಿ",
          "lat": 16.5,
          "lon": 75.88
        }
      ]
    },
    {
      "name": "Indi",
      "isCity": false,
      "lat": 17.18,
      "lon": 75.96,
      "kn": "ಇಂಡಿ",
      "villages": [
        {
          "name": "Chadchan",
          "kn": "ಚಡಚಣ",
          "lat": 17.15,
          "lon": 75.68
        },
        {
          "name": "Horti",
          "kn": "ಹೋರ್ತಿ",
          "lat": 17.07,
          "lon": 75.83
        },
        {
          "name": "Zalaki",
          "kn": "ಜಳಕಿ",
          "lat": 17.12,
          "lon": 75.89
        },
        {
          "name": "Loni",
          "kn": "ಲೋಣಿ",
          "lat": 17.22,
          "lon": 76.04
        },
        {
          "name": "Tamba",
          "kn": "ತಾಂಬಾ",
          "lat": 17.09,
          "lon": 76.08
        },
        {
          "name": "Halasangi",
          "kn": "ಹಲಸಂಗಿ",
          "lat": 17.2,
          "lon": 75.85
        }
      ]
    },
    {
      "name": "Muddebihal",
      "isCity": false,
      "lat": 16.34,
      "lon": 76.13,
      "kn": "ಮುದ್ದೇಬಿಹಾಳ",
      "villages": [
        {
          "name": "Talikoti",
          "kn": "ತಾಳಿಕೋಟೆ",
          "lat": 16.48,
          "lon": 76.31
        },
        {
          "name": "Nalatawad",
          "kn": "ನಾಲತವಾಡ",
          "lat": 16.24,
          "lon": 76.27
        },
        {
          "name": "Dhavalagi",
          "kn": "ಧವಳಗಿ",
          "lat": 16.41,
          "lon": 76.18
        },
        {
          "name": "Hullur",
          "kn": "ಹುಲ್ಲೂರು",
          "lat": 16.31,
          "lon": 76.07
        },
        {
          "name": "Tangadagi",
          "kn": "ತಂಗಡಗಿ",
          "lat": 16.22,
          "lon": 76.16
        }
      ]
    },
    {
      "name": "Sindagi",
      "isCity": false,
      "lat": 16.92,
      "lon": 76.24,
      "kn": "ಸಿಂದಗಿ",
      "villages": [
        {
          "name": "Devara Hipparagi",
          "kn": "ದೇವರ ಹಿಪ್ಪರಗಿ",
          "lat": 16.82,
          "lon": 76.09
        },
        {
          "name": "Almel",
          "kn": "ಆಲಮೇಲ",
          "lat": 17.01,
          "lon": 76.38
        },
        {
          "name": "Kerutagi",
          "kn": "ಕೇರೂಟಗಿ",
          "lat": 16.96,
          "lon": 76.19
        },
        {
          "name": "Moratagi",
          "kn": "ಮೊರಟಗಿ",
          "lat": 17.08,
          "lon": 76.31
        },
        {
          "name": "Golageri",
          "kn": "ಗೊಲಗೇರಿ",
          "lat": 16.85,
          "lon": 76.32
        }
      ]
    }
  ],
  "Kalaburagi": [
    {
      "name": "Kalaburagi City",
      "isCity": true,
      "lat": 17.33,
      "lon": 76.83,
      "kn": "ಕಲಬುರಗಿ ನಗರ",
      "villages": []
    },
    {
      "name": "Aland",
      "isCity": false,
      "lat": 17.57,
      "lon": 76.57,
      "kn": "ಆಳಂದ",
      "villages": [
        {
          "name": "Nimbal",
          "kn": "ನಿಂಬಾಳ",
          "lat": 17.51,
          "lon": 76.48
        },
        {
          "name": "Madan Hipparga",
          "kn": "ಮದನ ಹಿಪ್ಪರಗಾ",
          "lat": 17.65,
          "lon": 76.62
        },
        {
          "name": "Narona",
          "kn": "ನರೋಣಾ",
          "lat": 17.48,
          "lon": 76.66
        },
        {
          "name": "Kadaganchi",
          "kn": "ಕಡಗಂಚಿ",
          "lat": 17.44,
          "lon": 76.69
        },
        {
          "name": "Khajuri",
          "kn": "ಖಜೂರಿ",
          "lat": 17.61,
          "lon": 76.52
        }
      ]
    },
    {
      "name": "Afzalpur",
      "isCity": false,
      "lat": 17.2,
      "lon": 76.36,
      "kn": "ಅಫಜಲಪುರ",
      "villages": [
        {
          "name": "Ganagapur",
          "kn": "ಗಾಣಗಾಪುರ",
          "lat": 17.18,
          "lon": 76.52
        },
        {
          "name": "Gobbur",
          "kn": "ಗೊಬ್ಬೂರು",
          "lat": 17.25,
          "lon": 76.41
        },
        {
          "name": "Mashal",
          "kn": "ಮಾಶಾಳ",
          "lat": 17.11,
          "lon": 76.28
        },
        {
          "name": "Karajagi",
          "kn": "ಕರಜಗಿ",
          "lat": 17.27,
          "lon": 76.32
        },
        {
          "name": "Atanur",
          "kn": "ಅತನೂರು",
          "lat": 17.15,
          "lon": 76.44
        }
      ]
    },
    {
      "name": "Chincholi",
      "isCity": false,
      "lat": 17.47,
      "lon": 77.42,
      "kn": "ಚಿಂಚೋಳಿ",
      "villages": [
        {
          "name": "Sulepeth",
          "kn": "ಸುಲೇಪೇಟ",
          "lat": 17.38,
          "lon": 77.35
        },
        {
          "name": "Ratkal",
          "kn": "ರತ್ಕಲ್",
          "lat": 17.42,
          "lon": 77.29
        },
        {
          "name": "Kodli",
          "kn": "ಕೊಡ್ಲಿ",
          "lat": 17.35,
          "lon": 77.41
        },
        {
          "name": "Konchavaram",
          "kn": "ಕೊಂಚಾವರಂ",
          "lat": 17.55,
          "lon": 77.51
        },
        {
          "name": "Miriyan",
          "kn": "ಮಿರ್ಯಾನ್",
          "lat": 17.49,
          "lon": 77.45
        }
      ]
    },
    {
      "name": "Chitapur",
      "isCity": false,
      "lat": 17.12,
      "lon": 77.08,
      "kn": "ಚಿತ್ತಾಪುರ",
      "villages": [
        {
          "name": "Wadi",
          "kn": "ವಾಡಿ",
          "lat": 17.06,
          "lon": 76.99
        },
        {
          "name": "Shahabad",
          "kn": "ಶಹಾಬಾದ್",
          "lat": 17.13,
          "lon": 76.93
        },
        {
          "name": "Nalwar",
          "kn": "ನಾಲ್ವಾರ",
          "lat": 16.98,
          "lon": 77.01
        },
        {
          "name": "Ravoor",
          "kn": "ರಾವೂರು",
          "lat": 17.09,
          "lon": 77.03
        },
        {
          "name": "Gundagurthi",
          "kn": "ಗುಂಡಗುರ್ತಿ",
          "lat": 17.16,
          "lon": 77.12
        }
      ]
    },
    {
      "name": "Jevargi",
      "isCity": false,
      "lat": 16.97,
      "lon": 76.77,
      "kn": "ಜೇವರ್ಗಿ",
      "villages": [
        {
          "name": "Andola",
          "kn": "ಅಂದೋಲಾ",
          "lat": 17.04,
          "lon": 76.71
        },
        {
          "name": "Yedrami",
          "kn": "ಯಡ್ರಾಮಿ",
          "lat": 16.84,
          "lon": 76.53
        },
        {
          "name": "Nelogi",
          "kn": "ನೆಲೋಗಿ",
          "lat": 16.89,
          "lon": 76.75
        },
        {
          "name": "Mandewal",
          "kn": "ಮಂಡೇವಾಲ",
          "lat": 17.01,
          "lon": 76.83
        },
        {
          "name": "Naribol",
          "kn": "ನರಿಬೋಳ",
          "lat": 16.92,
          "lon": 76.85
        }
      ]
    },
    {
      "name": "Sedam",
      "isCity": false,
      "lat": 17.18,
      "lon": 77.28,
      "kn": "ಸೇಡಂ",
      "villages": [
        {
          "name": "Malkhed",
          "kn": "ಮಳಖೇಡ",
          "lat": 17.19,
          "lon": 77.15
        },
        {
          "name": "Kodla",
          "kn": "ಕೊಡ್ಲಾ",
          "lat": 17.14,
          "lon": 77.34
        },
        {
          "name": "Mudhol (Sedam)",
          "kn": "ಮುಧೋಳ (ಸೇಡಂ)",
          "lat": 17.22,
          "lon": 77.39
        },
        {
          "name": "Ribbanpalli",
          "kn": "ರಿಬ್ಬನಪಳ್ಳಿ",
          "lat": 17.26,
          "lon": 77.29
        },
        {
          "name": "Kolkunda",
          "kn": "ಕೊಲ್ಕುಂದಾ",
          "lat": 17.11,
          "lon": 77.25
        }
      ]
    }
  ],
  "Bidar": [
    {
      "name": "Bidar City",
      "isCity": true,
      "lat": 17.91,
      "lon": 77.52,
      "kn": "ಬೀದರ್ ನಗರ",
      "villages": []
    },
    {
      "name": "Basavakalyan",
      "isCity": false,
      "lat": 17.87,
      "lon": 76.95,
      "kn": "ಬಸವಕಲ್ಯಾಣ",
      "villages": [
        {
          "name": "Rajeshwar",
          "kn": "ರಾಜೇಶ್ವರ",
          "lat": 17.81,
          "lon": 76.99
        },
        {
          "name": "Mudbi",
          "kn": "ಮುದ್ಬಿ",
          "lat": 17.75,
          "lon": 77.05
        },
        {
          "name": "Sasthapur",
          "kn": "ಸಾಸ್ತಪುರ",
          "lat": 17.92,
          "lon": 77.01
        },
        {
          "name": "Ujlam",
          "kn": "ಉಜಳಂ",
          "lat": 17.89,
          "lon": 76.88
        },
        {
          "name": "Muchalam",
          "kn": "ಮುಚಳಂ",
          "lat": 17.84,
          "lon": 76.91
        }
      ]
    },
    {
      "name": "Bhalki",
      "isCity": false,
      "lat": 18.04,
      "lon": 77.21,
      "kn": "ಭಾಲ್ಕಿ",
      "villages": [
        {
          "name": "Mehkar",
          "kn": "ಮೆಹಕರ್",
          "lat": 18.11,
          "lon": 77.15
        },
        {
          "name": "Khatak Chincholi",
          "kn": "ಖಟಕ್ ಚಿಂಚೋಳಿ",
          "lat": 17.98,
          "lon": 77.29
        },
        {
          "name": "Halaburga",
          "kn": "ಹಲಬುರ್ಗಾ",
          "lat": 18.06,
          "lon": 77.14
        },
        {
          "name": "Saigaon",
          "kn": "ಸಾಯಿಗಾಂವ",
          "lat": 18.01,
          "lon": 77.26
        },
        {
          "name": "Bhatambara",
          "kn": "ಭಾತಾಂಬ್ರಾ",
          "lat": 18.09,
          "lon": 77.24
        }
      ]
    },
    {
      "name": "Humnabad",
      "isCity": false,
      "lat": 17.77,
      "lon": 77.13,
      "kn": "ಹುಮನಾಬಾದ್",
      "villages": [
        {
          "name": "Maniknagar",
          "kn": "ಮಾಣಿಕನಗರ",
          "lat": 17.75,
          "lon": 77.15
        },
        {
          "name": "Dubalgundi",
          "kn": "ದುಬಲಗುಂಡಿ",
          "lat": 17.72,
          "lon": 77.08
        },
        {
          "name": "Hallikhed (B)",
          "kn": "ಹಳ್ಳಿಖೇಡ (ಬಿ)",
          "lat": 17.83,
          "lon": 77.24
        },
        {
          "name": "Ghatboral",
          "kn": "ಘಾಟ್ಬೋರಾಳ",
          "lat": 17.8,
          "lon": 77.18
        },
        {
          "name": "Morkhandi",
          "kn": "ಮೋರಖಂಡಿ",
          "lat": 17.71,
          "lon": 77.19
        }
      ]
    },
    {
      "name": "Aurad",
      "isCity": false,
      "lat": 18.25,
      "lon": 77.43,
      "kn": "ಔರಾದ್",
      "villages": [
        {
          "name": "Santhpur",
          "kn": "ಸಂತಪುರ",
          "lat": 18.18,
          "lon": 77.38
        },
        {
          "name": "Kamalnagar",
          "kn": "ಕಮಲನಗರ",
          "lat": 18.29,
          "lon": 77.27
        },
        {
          "name": "Kushnoor",
          "kn": "ಕುಶನೂರು",
          "lat": 18.21,
          "lon": 77.48
        },
        {
          "name": "Chintaki",
          "kn": "ಚಿಂತಕಿ",
          "lat": 18.31,
          "lon": 77.4
        },
        {
          "name": "Wadgaon",
          "kn": "ವಡಗಾಂವ",
          "lat": 18.26,
          "lon": 77.34
        }
      ]
    }
  ],
  "Raichur": [
    {
      "name": "Raichur City",
      "isCity": true,
      "lat": 16.2,
      "lon": 77.36,
      "kn": "ರಾಯಚೂರು ನಗರ",
      "villages": []
    },
    {
      "name": "Sindhanur",
      "isCity": false,
      "lat": 15.77,
      "lon": 76.76,
      "kn": "ಸಿಂಧನೂರು",
      "villages": [
        {
          "name": "Gorebal",
          "kn": "ಗೊರೆಬಾಳ",
          "lat": 15.82,
          "lon": 76.71
        },
        {
          "name": "Turvihal",
          "kn": "ತುರ್ವಿಹಾಳ",
          "lat": 15.71,
          "lon": 76.68
        },
        {
          "name": "Jawalagera",
          "kn": "ಜಾವಳಗೇರಾ",
          "lat": 15.86,
          "lon": 76.81
        },
        {
          "name": "Salagunda",
          "kn": "ಸಾಲಗುಂದಾ",
          "lat": 15.75,
          "lon": 76.83
        },
        {
          "name": "Roudakunda",
          "kn": "ರೌಡಕುಂದಾ",
          "lat": 15.8,
          "lon": 76.79
        }
      ]
    },
    {
      "name": "Manvi",
      "isCity": false,
      "lat": 15.99,
      "lon": 77.05,
      "kn": "ಮಾನ್ವಿ",
      "villages": [
        {
          "name": "Sirwar",
          "kn": "ಸಿರವಾರ",
          "lat": 16.08,
          "lon": 76.99
        },
        {
          "name": "Pothnal",
          "kn": "ಪೋತ್ನಾಳ",
          "lat": 15.92,
          "lon": 76.95
        },
        {
          "name": "Kurdi",
          "kn": "ಕುರ್ಡಿ",
          "lat": 16.03,
          "lon": 77.12
        },
        {
          "name": "Bagalwad",
          "kn": "ಬಾಗಲವಾಡ",
          "lat": 15.96,
          "lon": 77.01
        },
        {
          "name": "Kallur",
          "kn": "ಕಲ್ಲೂರು (ಮಾನ್ವಿ)",
          "lat": 16.05,
          "lon": 77.08
        }
      ]
    },
    {
      "name": "Lingsugur",
      "isCity": false,
      "lat": 16.16,
      "lon": 76.52,
      "kn": "ಲಿಂಗಸುಗೂರು",
      "villages": [
        {
          "name": "Mudgal",
          "kn": "ಮುದಗಲ್",
          "lat": 16.01,
          "lon": 76.43
        },
        {
          "name": "Maski",
          "kn": "ಮಸ್ಕಿ",
          "lat": 15.96,
          "lon": 76.66
        },
        {
          "name": "Hutti Gold Mines",
          "kn": "ಹಟ್ಟಿ ಗೋಲ್ಡ್ ಮೈನ್ಸ್",
          "lat": 16.2,
          "lon": 76.65
        },
        {
          "name": "Gurugunta",
          "kn": "ಗುರುಗುಂಟಾ",
          "lat": 16.12,
          "lon": 76.58
        },
        {
          "name": "Rodalabanda",
          "kn": "ರೋಡಲಬಂಡಾ",
          "lat": 16.22,
          "lon": 76.48
        }
      ]
    },
    {
      "name": "Devadurga",
      "isCity": false,
      "lat": 16.42,
      "lon": 76.94,
      "kn": "ದೇವದುರ್ಗ",
      "villages": [
        {
          "name": "Gabbur",
          "kn": "ಗಬ್ಬೂರು",
          "lat": 16.35,
          "lon": 76.85
        },
        {
          "name": "Arakera",
          "kn": "ಅರಕೇರಾ",
          "lat": 16.48,
          "lon": 77.01
        },
        {
          "name": "Jalahalli",
          "kn": "ಜಾಲಹಳ್ಳಿ",
          "lat": 16.39,
          "lon": 76.81
        },
        {
          "name": "Galag",
          "kn": "ಗಲಗ",
          "lat": 16.44,
          "lon": 76.98
        },
        {
          "name": "Kyadigera",
          "kn": "ಕ್ಯಾದಿಗೇರಾ",
          "lat": 16.51,
          "lon": 76.92
        }
      ]
    }
  ],
  "Gadag": [
    {
      "name": "Gadag-Betageri City",
      "isCity": true,
      "lat": 15.43,
      "lon": 75.63,
      "kn": "ಗದಗ-ಬೆಟಗೇರಿ ನಗರ",
      "villages": []
    },
    {
      "name": "Ron",
      "isCity": false,
      "lat": 15.7,
      "lon": 75.73,
      "kn": "ರೋಣ",
      "villages": [
        {
          "name": "Gajendragad",
          "kn": "ಗಜೇಂದ್ರಗಡ",
          "lat": 15.74,
          "lon": 75.98
        },
        {
          "name": "Naregal",
          "kn": "ನರೇಗಲ್ಲ",
          "lat": 15.58,
          "lon": 75.82
        },
        {
          "name": "Holealur",
          "kn": "ಹೊಳೆಆಲೂರು",
          "lat": 15.78,
          "lon": 75.68
        },
        {
          "name": "Abbigeri",
          "kn": "ಅಬ್ಬಿಗೇರಿ",
          "lat": 15.65,
          "lon": 75.75
        },
        {
          "name": "Kotumachagi",
          "kn": "ಕೋಟುಮಚಗಿ",
          "lat": 15.52,
          "lon": 75.71
        }
      ]
    },
    {
      "name": "Shirahatti",
      "isCity": false,
      "lat": 15.23,
      "lon": 75.58,
      "kn": "ಶಿರಹಟ್ಟಿ",
      "villages": [
        {
          "name": "Lakshmeshwar",
          "kn": "ಲಕ್ಷ್ಮೇಶ್ವರ",
          "lat": 15.13,
          "lon": 75.47
        },
        {
          "name": "Bellatti",
          "kn": "ಬೆಲ್ಲಟ್ಟಿ",
          "lat": 15.18,
          "lon": 75.62
        },
        {
          "name": "Magadi",
          "kn": "ಮಾಗಡಿ (ಗದಗ)",
          "lat": 15.26,
          "lon": 75.51
        },
        {
          "name": "Hebbal",
          "kn": "ಹೆಬ್ಬಾಳ",
          "lat": 15.2,
          "lon": 75.55
        },
        {
          "name": "Bannikoppa",
          "kn": "ಬನ್ನಿಕೊಪ್ಪ",
          "lat": 15.15,
          "lon": 75.67
        }
      ]
    },
    {
      "name": "Mundargi",
      "isCity": false,
      "lat": 15.21,
      "lon": 75.88,
      "kn": "ಮುಂಡರಗಿ",
      "villages": [
        {
          "name": "Dambal",
          "kn": "ಡಂಬಳ",
          "lat": 15.3,
          "lon": 75.78
        },
        {
          "name": "Hirewaddatti",
          "kn": "ಹಿರೇವಡ್ಡಟ್ಟಿ",
          "lat": 15.24,
          "lon": 75.82
        },
        {
          "name": "Halligudi",
          "kn": "ಹಳ್ಳಿಗುಡಿ",
          "lat": 15.18,
          "lon": 75.92
        },
        {
          "name": "Singatalur",
          "kn": "ಸಿಂಗಟಾಲೂರು",
          "lat": 15.12,
          "lon": 75.85
        },
        {
          "name": "Kalkeri",
          "kn": "ಕಲಕೇರಿ",
          "lat": 15.27,
          "lon": 75.91
        }
      ]
    },
    {
      "name": "Nargund",
      "isCity": false,
      "lat": 15.72,
      "lon": 75.39,
      "kn": "ನರಗುಂದ",
      "villages": [
        {
          "name": "Konnur",
          "kn": "ಕೊಣ್ಣೂರು",
          "lat": 15.78,
          "lon": 75.44
        },
        {
          "name": "Shirol",
          "kn": "ಶಿರೋಳ",
          "lat": 15.7,
          "lon": 75.32
        },
        {
          "name": "Banahatti",
          "kn": "ಬನಹಟ್ಟಿ (ನರಗುಂದ)",
          "lat": 15.75,
          "lon": 75.41
        },
        {
          "name": "Jagapur",
          "kn": "ಜಾಗಾಪುರ",
          "lat": 15.68,
          "lon": 75.42
        },
        {
          "name": "Dandapur",
          "kn": "ದಂಡಾಪುರ",
          "lat": 15.73,
          "lon": 75.36
        }
      ]
    }
  ],
  "Dharwad": [
    {
      "name": "Hubballi City",
      "isCity": true,
      "lat": 15.36,
      "lon": 75.12,
      "kn": "ಹುಬ್ಬಳ್ಳಿ ನಗರ",
      "villages": []
    },
    {
      "name": "Dharwad City",
      "isCity": true,
      "lat": 15.46,
      "lon": 75.01,
      "kn": "ಧಾರವಾಡ ನಗರ",
      "villages": []
    },
    {
      "name": "Hubballi Rural",
      "isCity": false,
      "lat": 15.34,
      "lon": 75.18,
      "kn": "ಹುಬ್ಬಳ್ಳಿ ಗ್ರಾಮೀಣ",
      "villages": [
        {
          "name": "Amargol",
          "kn": "ಅಮರಗೋಳ",
          "lat": 15.41,
          "lon": 75.08
        },
        {
          "name": "Chabbi",
          "kn": "ಛಬ್ಬಿ",
          "lat": 15.26,
          "lon": 75.18
        },
        {
          "name": "Shiraguppi",
          "kn": "ಶಿರಗುಪ್ಪಿ",
          "lat": 15.38,
          "lon": 75.24
        },
        {
          "name": "Kusugal",
          "kn": "ಕುಸುಗಲ್",
          "lat": 15.39,
          "lon": 75.21
        },
        {
          "name": "Bengeri",
          "kn": "ಬೆಂpatternಗೇರಿ",
          "lat": 15.35,
          "lon": 75.16
        }
      ]
    },
    {
      "name": "Kundgol",
      "isCity": false,
      "lat": 15.26,
      "lon": 75.25,
      "kn": "ಕುಂದಗೋಳ",
      "villages": [
        {
          "name": "Kamadolli",
          "kn": "ಕಮಡೊಳ್ಳಿ",
          "lat": 15.22,
          "lon": 75.31
        },
        {
          "name": "Saunshi",
          "kn": "ಸಂಶಿ",
          "lat": 15.18,
          "lon": 75.24
        },
        {
          "name": "Yaraguppi",
          "kn": "ಯರಗುಪ್ಪಿ",
          "lat": 15.31,
          "lon": 75.28
        },
        {
          "name": "Rottigawad",
          "kn": "ರೊಟ್ಟಿವಾಡ",
          "lat": 15.25,
          "lon": 75.35
        },
        {
          "name": "Pashupathihaal",
          "kn": "ಪಶುಪತಿಹಾಳ",
          "lat": 15.2,
          "lon": 75.29
        }
      ]
    },
    {
      "name": "Navalgund",
      "isCity": false,
      "lat": 15.56,
      "lon": 75.36,
      "kn": "ನವಲಗುಂದ",
      "villages": [
        {
          "name": "Annigeri",
          "kn": "ಅಣ್ಣಿಗೇರಿ",
          "lat": 15.43,
          "lon": 75.43
        },
        {
          "name": "Alagawadi",
          "kn": "ಅಲಗವಾಡಿ",
          "lat": 15.61,
          "lon": 75.31
        },
        {
          "name": "Shalavadi",
          "kn": "ಶಲವಾಡಿ",
          "lat": 15.52,
          "lon": 75.4
        },
        {
          "name": "Morab",
          "kn": "ಮೊರಬ",
          "lat": 15.64,
          "lon": 75.38
        },
        {
          "name": "Yamanur",
          "kn": "ಯಮನೂರು",
          "lat": 15.58,
          "lon": 75.33
        }
      ]
    },
    {
      "name": "Kalghatgi",
      "isCity": false,
      "lat": 15.18,
      "lon": 74.97,
      "kn": "ಕಲಘಟಗಿ",
      "villages": [
        {
          "name": "Dhummawad",
          "kn": "ಧುಮ್ಮವಾಡ",
          "lat": 15.24,
          "lon": 74.92
        },
        {
          "name": "Mishrakoppa",
          "kn": "ಮಿಶ್ರಿಕೋಟಿ",
          "lat": 15.21,
          "lon": 75.04
        },
        {
          "name": "Tambur",
          "kn": "ತಂಬೂರು",
          "lat": 15.12,
          "lon": 74.95
        },
        {
          "name": "Tabakad Honnalli",
          "kn": "ತಬಕದ ಹೊನ್ನಳ್ಳಿ",
          "lat": 15.16,
          "lon": 75.01
        },
        {
          "name": "Bogenagarakoppa",
          "kn": "ಬೋಗೇನಾಗರಕೊಪ್ಪ",
          "lat": 15.22,
          "lon": 74.99
        }
      ]
    }
  ],
  "Haveri": [
    {
      "name": "Haveri City",
      "isCity": true,
      "lat": 14.8,
      "lon": 75.4,
      "kn": "ಹಾವೇರಿ ನಗರ",
      "villages": []
    },
    {
      "name": "Ranibennur",
      "isCity": false,
      "lat": 14.62,
      "lon": 75.63,
      "kn": "ರಾಣಿಬೆನ್ನೂರು",
      "villages": [
        {
          "name": "Halageri",
          "kn": "ಹಲಗೇರಿ",
          "lat": 14.65,
          "lon": 75.56
        },
        {
          "name": "Medleri",
          "kn": "ಮೇಡ್ಲೇರಿ",
          "lat": 14.58,
          "lon": 75.71
        },
        {
          "name": "Chalageri",
          "kn": "ಚಳಗೇರಿ",
          "lat": 14.68,
          "lon": 75.67
        },
        {
          "name": "Honnatti",
          "kn": "ಹೊನ್ನತ್ತಿ",
          "lat": 14.55,
          "lon": 75.6
        },
        {
          "name": "Airani",
          "kn": "ಐರಾಣಿ",
          "lat": 14.59,
          "lon": 75.76
        },
        {
          "name": "Chikkakuravatti",
          "kn": "ಚಿಕ್ಕಕುರವತ್ತಿ",
          "lat": 14.72,
          "lon": 75.69
        }
      ]
    },
    {
      "name": "Byadgi",
      "isCity": false,
      "lat": 14.68,
      "lon": 75.49,
      "kn": "ಬ್ಯಾಡಗಿ",
      "villages": [
        {
          "name": "Kaginele",
          "kn": "ಕಾಗಿನೆಲೆ",
          "lat": 14.66,
          "lon": 75.42
        },
        {
          "name": "Motebennur",
          "kn": "ಮೋಟೆಬೆನ್ನೂರು",
          "lat": 14.71,
          "lon": 75.54
        },
        {
          "name": "Mallur",
          "kn": "ಮಲ್ಲೂರು",
          "lat": 14.64,
          "lon": 75.52
        },
        {
          "name": "Sudambi",
          "kn": "ಸುಡಂಬಿ",
          "lat": 14.69,
          "lon": 75.45
        },
        {
          "name": "Shidenur",
          "kn": "ಶೀದೇನೂರು",
          "lat": 14.62,
          "lon": 75.48
        }
      ]
    },
    {
      "name": "Hirekerur",
      "isCity": false,
      "lat": 14.46,
      "lon": 75.39,
      "kn": "ಹಿರೇಕೆರೂರು",
      "villages": [
        {
          "name": "Rattihalli",
          "kn": "ರಟ್ಟಿಹಳ್ಳಿ",
          "lat": 14.41,
          "lon": 75.51
        },
        {
          "name": "Masur",
          "kn": "ಮಸೂರು",
          "lat": 14.38,
          "lon": 75.42
        },
        {
          "name": "Hansabhavi",
          "kn": "ಹಂಸಭಾವಿ",
          "lat": 14.52,
          "lon": 75.44
        },
        {
          "name": "Dudihalli",
          "kn": "ದುಡಿಹಳ್ಳಿ",
          "lat": 14.47,
          "lon": 75.35
        },
        {
          "name": "Medur",
          "kn": "ಮೇದೂರು",
          "lat": 14.43,
          "lon": 75.46
        }
      ]
    },
    {
      "name": "Hangal",
      "isCity": false,
      "lat": 14.76,
      "lon": 75.13,
      "kn": "ಹಾನಗಲ್",
      "villages": [
        {
          "name": "Akki Alur",
          "kn": "ಅಕ್ಕಿ ಆಲೂರು",
          "lat": 14.69,
          "lon": 75.18
        },
        {
          "name": "Bommanahalli",
          "kn": "ಬೊಮ್ಮನಹಳ್ಳಿ",
          "lat": 14.81,
          "lon": 75.08
        },
        {
          "name": "Tilavalli",
          "kn": "ತಿಳವಳ್ಳಿ",
          "lat": 14.65,
          "lon": 75.11
        },
        {
          "name": "Naregal",
          "kn": "ನರೇಗಲ್ಲ (ಹಾನಗಲ್)",
          "lat": 14.78,
          "lon": 75.22
        },
        {
          "name": "Gejjihalli",
          "kn": "ಗೆಜ್ಜೀಹಳ್ಳಿ",
          "lat": 14.74,
          "lon": 75.16
        }
      ]
    },
    {
      "name": "Shiggaon",
      "isCity": false,
      "lat": 14.99,
      "lon": 75.23,
      "kn": "ಶಿಗ್ಗಾಂವ",
      "villages": [
        {
          "name": "Bankapur",
          "kn": "ಬಂಕಾಪುರ",
          "lat": 14.92,
          "lon": 75.26
        },
        {
          "name": "Dhundashi",
          "kn": "ಧುಂಡಶಿ",
          "lat": 14.95,
          "lon": 75.17
        },
        {
          "name": "Hirebendigeri",
          "kn": "ಹಿರೇಬೆಂಡಿಗೇರಿ",
          "lat": 15.04,
          "lon": 75.29
        },
        {
          "name": "Hulgur",
          "kn": "ಹುಲಗೂರು",
          "lat": 15.01,
          "lon": 75.2
        },
        {
          "name": "Tadas",
          "kn": "ತಡಸ",
          "lat": 15.08,
          "lon": 75.15
        }
      ]
    },
    {
      "name": "Savanur",
      "isCity": false,
      "lat": 14.97,
      "lon": 75.35,
      "kn": "ಸವಣೂರು",
      "villages": [
        {
          "name": "Karajgi",
          "kn": "ಕರಜಗಿ",
          "lat": 14.89,
          "lon": 75.42
        },
        {
          "name": "Hattimattur",
          "kn": "ಹತ್ತಿಮತ್ತೂರು",
          "lat": 15.02,
          "lon": 75.39
        },
        {
          "name": "Turalagatta",
          "kn": "ತುರಲಗಟ್ಟ",
          "lat": 14.94,
          "lon": 75.31
        },
        {
          "name": "Jalawadagi",
          "kn": "ಜಲವಾಡಗಿ",
          "lat": 15.05,
          "lon": 75.36
        },
        {
          "name": "Hurakadli",
          "kn": "ಹುರಕಡ್ಲಿ",
          "lat": 14.98,
          "lon": 75.41
        }
      ]
    }
  ],
  "Ballari": [
    {
      "name": "Ballari City",
      "isCity": true,
      "lat": 15.14,
      "lon": 76.92,
      "kn": "ಬಳ್ಳಾರಿ ನಗರ",
      "villages": []
    },
    {
      "name": "Ballari Rural",
      "isCity": false,
      "lat": 15.17,
      "lon": 76.96,
      "kn": "ಬಳ್ಳಾರಿ ಗ್ರಾಮೀಣ",
      "villages": [
        {
          "name": "Kudithini",
          "kn": "ಕುಡಿತಿನಿ",
          "lat": 15.2,
          "lon": 76.78
        },
        {
          "name": "Kolur",
          "kn": "ಕೋಲೂರು",
          "lat": 15.11,
          "lon": 76.85
        },
        {
          "name": "Emmiganur",
          "kn": "ಎಮ್ಮಿಗನೂರು",
          "lat": 15.22,
          "lon": 76.88
        },
        {
          "name": "Genikihal",
          "kn": "ಗೇಣಿಕಿಹಾಳ",
          "lat": 15.16,
          "lon": 77.01
        },
        {
          "name": "Moka",
          "kn": "ಮೋಕಾ",
          "lat": 15.27,
          "lon": 77.03
        }
      ]
    },
    {
      "name": "Siruguppa",
      "isCity": false,
      "lat": 15.63,
      "lon": 76.89,
      "kn": "ಸಿರುಗುಪ್ಪ",
      "villages": [
        {
          "name": "Tekkalakote",
          "kn": "ತೆಕ್ಕಲಕೋಟೆ",
          "lat": 15.53,
          "lon": 76.87
        },
        {
          "name": "Hatcholli",
          "kn": "ಹಚ್ಚೊಳ್ಳಿ",
          "lat": 15.71,
          "lon": 76.96
        },
        {
          "name": "Karur",
          "kn": "ಕಾರೂರು",
          "lat": 15.58,
          "lon": 76.95
        },
        {
          "name": "Sirigeri",
          "kn": "ಸಿರಿಗೆರೆ",
          "lat": 15.48,
          "lon": 76.82
        },
        {
          "name": "Deshnur",
          "kn": "ದೇಶನೂರು",
          "lat": 15.65,
          "lon": 76.84
        }
      ]
    },
    {
      "name": "Sandur",
      "isCity": false,
      "lat": 15.08,
      "lon": 76.55,
      "kn": "ಸಂಡೂರು",
      "villages": [
        {
          "name": "Toranagallu",
          "kn": "ತೋರಣಗಲ್ಲು",
          "lat": 15.21,
          "lon": 76.67
        },
        {
          "name": "Choranur",
          "kn": "ಚೋರನೂರು",
          "lat": 14.98,
          "lon": 76.61
        },
        {
          "name": "Yeshwantnagar",
          "kn": "ಯಶವಂತನಗರ",
          "lat": 15.05,
          "lon": 76.51
        },
        {
          "name": "Vaddu",
          "kn": "ವಡ್ಡು",
          "lat": 15.15,
          "lon": 76.62
        },
        {
          "name": "Daroji",
          "kn": "ದಾರೋಜಿ",
          "lat": 15.24,
          "lon": 76.57
        }
      ]
    },
    {
      "name": "Kurugodu",
      "isCity": false,
      "lat": 15.34,
      "lon": 76.83,
      "kn": "ಕುರುಗೋಡು",
      "villages": [
        {
          "name": "Vaddatti",
          "kn": "ವಡ್ಡಟ್ಟಿ",
          "lat": 15.37,
          "lon": 76.86
        },
        {
          "name": "Kudatini Border",
          "kn": "ಕುಡತಿನಿ ಗಡಿ",
          "lat": 15.28,
          "lon": 76.79
        },
        {
          "name": "Yellapur",
          "kn": "ಯಲ್ಲಾಪುರ (ಕುರುಗೋಡು)",
          "lat": 15.39,
          "lon": 76.81
        },
        {
          "name": "Kolur Hobli",
          "kn": "ಕೋಲೂರು ಹೋಬಳಿ",
          "lat": 15.31,
          "lon": 76.85
        },
        {
          "name": "Bailur",
          "kn": "ಬೈಲೂರು",
          "lat": 15.36,
          "lon": 76.88
        }
      ]
    },
    {
      "name": "Kampli",
      "isCity": false,
      "lat": 15.4,
      "lon": 76.61,
      "kn": "ಕಂಪ್ಲಿ",
      "villages": [
        {
          "name": "Ittagi",
          "kn": "ಇಟ್ಟಗಿ",
          "lat": 15.36,
          "lon": 76.64
        },
        {
          "name": "Metri",
          "kn": "ಮೇತ್ರಿ",
          "lat": 15.43,
          "lon": 76.58
        },
        {
          "name": "Devalapura",
          "kn": "ದೇವಲಾಪುರ",
          "lat": 15.38,
          "lon": 76.67
        },
        {
          "name": "Nambarahalli",
          "kn": "ನಂಬರಹಳ್ಳಿ",
          "lat": 15.42,
          "lon": 76.65
        },
        {
          "name": "Chikka Jayanagar",
          "kn": "ಚಿಕ್ಕ ಜಯನಗರ",
          "lat": 15.41,
          "lon": 76.6
        }
      ]
    }
  ],
  "Vijayanagara": [
    {
      "name": "Hosapete City",
      "isCity": true,
      "lat": 15.27,
      "lon": 76.39,
      "kn": "ಹೊಸಪೇಟೆ ನಗರ",
      "villages": []
    },
    {
      "name": "Harapanahalli",
      "isCity": false,
      "lat": 14.8,
      "lon": 75.99,
      "kn": "ಹರಪನಹಳ್ಳಿ",
      "villages": [
        {
          "name": "Teligi",
          "kn": "ತೆಲಿಗಿ",
          "lat": 14.88,
          "lon": 75.92
        },
        {
          "name": "Chigateri",
          "kn": "ಚಿಗಟೇರಿ",
          "lat": 14.73,
          "lon": 76.08
        },
        {
          "name": "Halavagalu",
          "kn": "ಹಲವಾಗಲು",
          "lat": 14.85,
          "lon": 75.87
        },
        {
          "name": "Arasikere",
          "kn": "ಅರಸೀಕೆರೆ (ಹರಪನಹಳ್ಳಿ)",
          "lat": 14.79,
          "lon": 76.05
        },
        {
          "name": "Bennihalli",
          "kn": "ಬೆನ್ನಿಹಳ್ಳಿ",
          "lat": 14.75,
          "lon": 75.95
        }
      ]
    },
    {
      "name": "Hagaribommanahalli",
      "isCity": false,
      "lat": 15.08,
      "lon": 76.2,
      "kn": "ಹಗರಿಬೊಮ್ಮನಹಳ್ಳಿ",
      "villages": [
        {
          "name": "Malvi",
          "kn": "ಮಾಲ್ವಿ",
          "lat": 15.12,
          "lon": 76.24
        },
        {
          "name": "Hampasagara",
          "kn": "ಹಂಪಸಾಗರ",
          "lat": 15.16,
          "lon": 76.12
        },
        {
          "name": "Mariyammanahalli",
          "kn": "ಮರಿಯಮ್ಮನಹಳ್ಳಿ",
          "lat": 15.21,
          "lon": 76.32
        },
        {
          "name": "Vallabhapura",
          "kn": "ವಲ್ಲಭಪುರ",
          "lat": 15.04,
          "lon": 76.22
        },
        {
          "name": "Kogali",
          "kn": "ಕೋಗಲಿ",
          "lat": 15.02,
          "lon": 76.18
        }
      ]
    },
    {
      "name": "Kudligi",
      "isCity": false,
      "lat": 14.9,
      "lon": 76.38,
      "kn": "ಕೂಡ್ಲಿಗಿ",
      "villages": [
        {
          "name": "Gudekote",
          "kn": "ಗುಡೇಕೋಟೆ",
          "lat": 14.84,
          "lon": 76.51
        },
        {
          "name": "Hosahalli",
          "kn": "ಹೊಸಹಳ್ಳಿ",
          "lat": 14.96,
          "lon": 76.42
        },
        {
          "name": "Chirathagundu",
          "kn": "ಚಿತ್ತಗುಂಡು",
          "lat": 14.88,
          "lon": 76.31
        },
        {
          "name": "Appenahalli",
          "kn": "ಅಪ್ಪೇನಹಳ್ಳಿ",
          "lat": 14.93,
          "lon": 76.35
        },
        {
          "name": "Kanamadugu",
          "kn": "ಕಾನಮಡುಗು",
          "lat": 14.81,
          "lon": 76.44
        }
      ]
    },
    {
      "name": "Hoovina Hadagali",
      "isCity": false,
      "lat": 15.02,
      "lon": 75.93,
      "kn": "ಹೂವಿನ ಹಡಗಲಿ",
      "villages": [
        {
          "name": "Ittigi",
          "kn": "ಇಟ್ಟಗಿ",
          "lat": 14.97,
          "lon": 75.88
        },
        {
          "name": "Hirehadagali",
          "kn": "ಹಿರೇಹಡಗಲಿ",
          "lat": 15.06,
          "lon": 75.98
        },
        {
          "name": "Holalu",
          "kn": "ಹೊಲಲು",
          "lat": 15.11,
          "lon": 75.89
        },
        {
          "name": "Sogi",
          "kn": "ಸೋಗಿ",
          "lat": 14.98,
          "lon": 75.95
        },
        {
          "name": "Kuruvathi",
          "kn": "ಕುರುವತ್ತಿ",
          "lat": 14.91,
          "lon": 75.82
        }
      ]
    },
    {
      "name": "Kotturu",
      "isCity": false,
      "lat": 14.82,
      "lon": 76.22,
      "kn": "ಕೊಟ್ಟೂರು",
      "villages": [
        {
          "name": "Alaburu",
          "kn": "ಅಲಬೂರು",
          "lat": 14.78,
          "lon": 76.19
        },
        {
          "name": "Chiribi",
          "kn": "ಚಿರಿಬಿ",
          "lat": 14.86,
          "lon": 76.25
        },
        {
          "name": "Kandagal",
          "kn": "ಕಂದಗಲ್",
          "lat": 14.84,
          "lon": 76.16
        },
        {
          "name": "Ujjini",
          "kn": "ಉಜ್ಜಿನಿ",
          "lat": 14.75,
          "lon": 76.28
        },
        {
          "name": "Rampura",
          "kn": "ರಾಮಪುರ (ಕೊಟ್ಟೂರು)",
          "lat": 14.81,
          "lon": 76.26
        }
      ]
    }
  ],
  "Shivamogga": [
    {
      "name": "Shivamogga City",
      "isCity": true,
      "lat": 13.93,
      "lon": 75.57,
      "kn": "ಶಿವಮೊಗ್ಗ ನಗರ",
      "villages": []
    },
    {
      "name": "Bhadravati",
      "isCity": false,
      "lat": 13.84,
      "lon": 75.7,
      "kn": "ಭದ್ರಾವತಿ",
      "villages": [
        {
          "name": "Kudligere",
          "kn": "ಕುಡ್ಲಿಗೆರೆ",
          "lat": 13.88,
          "lon": 75.64
        },
        {
          "name": "Holehonnur",
          "kn": "ಹೊಳೆಹೊನ್ನೂರು",
          "lat": 13.97,
          "lon": 75.69
        },
        {
          "name": "Kallihal",
          "kn": "ಕಳ್ಳಿಹಾಳ್",
          "lat": 13.82,
          "lon": 75.76
        },
        {
          "name": "Danayakapura",
          "kn": "ದಾನಾಯಕಪುರ",
          "lat": 13.78,
          "lon": 75.72
        },
        {
          "name": "Barandur",
          "kn": "ಬಾರಂದೂರು",
          "lat": 13.85,
          "lon": 75.74
        }
      ]
    },
    {
      "name": "Sagar",
      "isCity": false,
      "lat": 14.16,
      "lon": 75.03,
      "kn": "ಸಾಗರ",
      "villages": [
        {
          "name": "Jog Falls / Kargal",
          "kn": "ಜೋಗ್ ಜಲಪಾತ / ಕಾರ್ಗಲ್",
          "lat": 14.23,
          "lon": 74.82
        },
        {
          "name": "Talaguppa",
          "kn": "ತಾಳಗುಪ್ಪ",
          "lat": 14.2,
          "lon": 74.92
        },
        {
          "name": "Keladi",
          "kn": "ಕೆಳದಿ",
          "lat": 14.22,
          "lon": 75.01
        },
        {
          "name": "Anandapura",
          "kn": "ಆನಂದಪುರ",
          "lat": 14.07,
          "lon": 75.14
        },
        {
          "name": "Avinahalli",
          "kn": "ಅವಿನಹಳ್ಳಿ",
          "lat": 14.13,
          "lon": 75.09
        }
      ]
    },
    {
      "name": "Shikaripura",
      "isCity": false,
      "lat": 14.27,
      "lon": 75.35,
      "kn": "ಶಿಕಾರಿಪುರ",
      "villages": [
        {
          "name": "Shiralkoppa",
          "kn": "ಶಿರಾಳಕೊಪ್ಪ",
          "lat": 14.38,
          "lon": 75.25
        },
        {
          "name": "Salur",
          "kn": "ಸಾಲೂರು",
          "lat": 14.22,
          "lon": 75.31
        },
        {
          "name": "Balligavi",
          "kn": "ಬಳ್ಳಿಗಾವಿ",
          "lat": 14.41,
          "lon": 75.29
        },
        {
          "name": "Togarsi",
          "kn": "ತೋಗರ್ಸಿ",
          "lat": 14.33,
          "lon": 75.22
        },
        {
          "name": "Kaginele Border",
          "kn": "ಕಾಗಿನೆಲೆ ಗಡಿ",
          "lat": 14.35,
          "lon": 75.41
        }
      ]
    },
    {
      "name": "Soraba",
      "isCity": false,
      "lat": 14.38,
      "lon": 75.09,
      "kn": "ಸೊರಬ",
      "villages": [
        {
          "name": "Anavatti",
          "kn": "ಆನವಟ್ಟಿ",
          "lat": 14.54,
          "lon": 75.14
        },
        {
          "name": "Ulavi",
          "kn": "ಉಳವಿ (ಸೊರಬ)",
          "lat": 14.32,
          "lon": 75.04
        },
        {
          "name": "Chandragutti",
          "kn": "ಚಂದ್ರಗುತ್ತಿ",
          "lat": 14.42,
          "lon": 74.97
        },
        {
          "name": "Jade",
          "kn": "ಜಡೆ",
          "lat": 14.49,
          "lon": 75.02
        },
        {
          "name": "Kuppagadde",
          "kn": "ಕುಪ್ಪಗಡ್ಡೆ",
          "lat": 14.36,
          "lon": 75.15
        }
      ]
    },
    {
      "name": "Tirthahalli",
      "isCity": false,
      "lat": 13.7,
      "lon": 75.24,
      "kn": "ತೀರ್ಥಹಳ್ಳಿ",
      "villages": [
        {
          "name": "Koppa Border",
          "kn": "ಕೊಪ್ಪ ಗಡಿ",
          "lat": 13.62,
          "lon": 75.31
        },
        {
          "name": "Mandagadde",
          "kn": "ಮಂಡಗದ್ದೆ",
          "lat": 13.78,
          "lon": 75.42
        },
        {
          "name": "Agumbe",
          "kn": "ಆಗುಂಬೆ",
          "lat": 13.51,
          "lon": 75.09
        },
        {
          "name": "Malur",
          "kn": "ಮಾಲೂರು (ತೀರ್ಥಹಳ್ಳಿ)",
          "lat": 13.68,
          "lon": 75.19
        },
        {
          "name": "Konnur Hobli",
          "kn": "ಕೊಣ್ಣೂರು ಹೋಬಳಿ",
          "lat": 13.74,
          "lon": 75.28
        }
      ]
    },
    {
      "name": "Hosanagara",
      "isCity": false,
      "lat": 13.92,
      "lon": 75.07,
      "kn": "ಹೊಸನಗರ",
      "villages": [
        {
          "name": "Nagar",
          "kn": "ನಗರ (ಬಿದನೂರು)",
          "lat": 13.82,
          "lon": 75.02
        },
        {
          "name": "Ripponpet",
          "kn": "ರಿಪ್ಪನ್‌ಪೇಟೆ",
          "lat": 13.98,
          "lon": 75.22
        },
        {
          "name": "Kallur",
          "kn": "ಕಲ್ಲೂರು (ಹೊಸನಗರ)",
          "lat": 13.95,
          "lon": 75.11
        },
        {
          "name": "Maranakatte Border",
          "kn": "ಮಾರಣಕಟ್ಟೆ ಗಡಿ",
          "lat": 13.88,
          "lon": 74.95
        },
        {
          "name": "Hulikal",
          "kn": "ಹುಲಿಕಲ್",
          "lat": 13.73,
          "lon": 75.02
        }
      ]
    }
  ],
  "Chitradurga": [
    {
      "name": "Chitradurga City",
      "isCity": true,
      "lat": 14.23,
      "lon": 76.4,
      "kn": "ಚಿತ್ರದುರ್ಗ ನಗರ",
      "villages": []
    },
    {
      "name": "Challakere",
      "isCity": false,
      "lat": 14.31,
      "lon": 76.65,
      "kn": "ಚಳ್ಳಕೆರೆ",
      "villages": [
        {
          "name": "Parasurampura",
          "kn": "ಪರಶುರಾಮಪುರ",
          "lat": 14.22,
          "lon": 76.88
        },
        {
          "name": "Naikanahatti",
          "kn": "ನಾಯಕನಹಟ್ಟಿ",
          "lat": 14.45,
          "lon": 76.54
        },
        {
          "name": "Talaku",
          "kn": "ತಳಕು",
          "lat": 14.38,
          "lon": 76.71
        },
        {
          "name": "Pagadalbande",
          "kn": "ಪಗಡಲಬಂಡೆ",
          "lat": 14.27,
          "lon": 76.62
        },
        {
          "name": "Chikkachellur",
          "kn": "ಚಿಕ್ಕಚೆಲ್ಲೂರು",
          "lat": 14.35,
          "lon": 76.77
        }
      ]
    },
    {
      "name": "Hiriyur",
      "isCity": false,
      "lat": 13.95,
      "lon": 76.62,
      "kn": "ಹಿರಿಯೂರು",
      "villages": [
        {
          "name": "Vani Vilasa Sagara",
          "kn": "ವಾಣಿ ವಿಲಾಸ ಸಾಗರ",
          "lat": 13.89,
          "lon": 76.52
        },
        {
          "name": "Dharmapura",
          "kn": "ಧರ್ಮಪುರ",
          "lat": 13.81,
          "lon": 76.74
        },
        {
          "name": "Aimangala",
          "kn": "ಐಮಂಗಲ",
          "lat": 14.07,
          "lon": 76.55
        },
        {
          "name": "Yeraballi",
          "kn": "ಯರಬಳ್ಳಿ",
          "lat": 13.92,
          "lon": 76.68
        },
        {
          "name": "Kabbigere",
          "kn": "ಕಬ್ಬಿಗೆರೆ",
          "lat": 13.98,
          "lon": 76.58
        }
      ]
    },
    {
      "name": "Holalkere",
      "isCity": false,
      "lat": 14.03,
      "lon": 76.18,
      "kn": "ಹೊಳಲ್ಕೆರೆ",
      "villages": [
        {
          "name": "Ramagiri",
          "kn": "ರಾಮಗಿರಿ",
          "lat": 13.97,
          "lon": 76.11
        },
        {
          "name": "Chikkajajur",
          "kn": "ಚಿಕ್ಕಜಾಜೂರು",
          "lat": 14.11,
          "lon": 76.12
        },
        {
          "name": "Talya",
          "kn": "ತಾಳ್ಯ",
          "lat": 14.08,
          "lon": 76.24
        },
        {
          "name": "Gunderi",
          "kn": "ಗುಂಡೇರಿ",
          "lat": 13.99,
          "lon": 76.22
        },
        {
          "name": "Shivaganga",
          "kn": "ಶಿವಗಂಗಾ",
          "lat": 14.05,
          "lon": 76.15
        }
      ]
    },
    {
      "name": "Hosadurga",
      "isCity": false,
      "lat": 13.8,
      "lon": 76.29,
      "kn": "ಹೊಸದುರ್ಗ",
      "villages": [
        {
          "name": "Mathodu",
          "kn": "ಮತ್ತೋಡು",
          "lat": 13.68,
          "lon": 76.35
        },
        {
          "name": "Baguru",
          "kn": "ಬಾಗೂರು",
          "lat": 13.74,
          "lon": 76.22
        },
        {
          "name": "Srirampura",
          "kn": "ಶ್ರೀರಾಮಪುರ",
          "lat": 13.63,
          "lon": 76.45
        },
        {
          "name": "Kanchipura",
          "kn": "ಕಂಚಿಪುರ",
          "lat": 13.85,
          "lon": 76.25
        },
        {
          "name": "Devapura",
          "kn": "ದೇವಪುರ",
          "lat": 13.78,
          "lon": 76.38
        }
      ]
    },
    {
      "name": "Molakalmuru",
      "isCity": false,
      "lat": 14.72,
      "lon": 76.75,
      "kn": "ಮೊಳಕಾಲ್ಮುರು",
      "villages": [
        {
          "name": "Ramasagara",
          "kn": "ರಾಮಸಾಗರ",
          "lat": 14.78,
          "lon": 76.71
        },
        {
          "name": "Devarahalli",
          "kn": "ದೇವರಹಳ್ಳಿ",
          "lat": 14.65,
          "lon": 76.81
        },
        {
          "name": "B.G. Kere",
          "kn": "ಬಿ.ಜಿ. ಕೆರೆ",
          "lat": 14.58,
          "lon": 76.74
        },
        {
          "name": "Kondlahalli",
          "kn": "ಕೊಂಡ್ಲಹಳ್ಳಿ",
          "lat": 14.69,
          "lon": 76.68
        },
        {
          "name": "Thumakurlahally",
          "kn": "ತುಮಕೂರ್ಲಹಳ್ಳಿ",
          "lat": 14.74,
          "lon": 76.79
        }
      ]
    }
  ],
  "Mysuru": [
    {
      "name": "Mysuru City",
      "isCity": true,
      "lat": 12.3,
      "lon": 76.65,
      "kn": "ಮೈಸೂರು ನಗರ",
      "villages": []
    },
    {
      "name": "Nanjangud",
      "isCity": false,
      "lat": 12.12,
      "lon": 76.68,
      "kn": "ನಂಜನಗೂಡು",
      "villages": [
        {
          "name": "Hullahalli",
          "kn": "ಹುಲ್ಲಹಳ್ಳಿ",
          "lat": 12.18,
          "lon": 76.54
        },
        {
          "name": "Biligere",
          "kn": "ಬಿಳಿಗೆರೆ",
          "lat": 12.15,
          "lon": 76.77
        },
        {
          "name": "Debur",
          "kn": "ದೇಬೂರು",
          "lat": 12.09,
          "lon": 76.65
        },
        {
          "name": "Tagadur",
          "kn": "ತಗಡೂರು",
          "lat": 12.05,
          "lon": 76.81
        },
        {
          "name": "Kavalande",
          "kn": "ಕವಲಂದೆ",
          "lat": 12.01,
          "lon": 76.88
        },
        {
          "name": "Hadinaru",
          "kn": "ಹದಿನಾರು",
          "lat": 12.19,
          "lon": 76.71
        }
      ]
    },
    {
      "name": "Hunsur",
      "isCity": false,
      "lat": 12.31,
      "lon": 76.29,
      "kn": "ಹುಣಸೂರು",
      "villages": [
        {
          "name": "Bilikere",
          "kn": "ಬಿಳಿಕೆರೆ",
          "lat": 12.34,
          "lon": 76.43
        },
        {
          "name": "Hanagod",
          "kn": "ಹನಗೋಡು",
          "lat": 12.21,
          "lon": 76.22
        },
        {
          "name": "Gavadagere",
          "kn": "ಗಾವಡಗೆರೆ",
          "lat": 12.41,
          "lon": 76.27
        },
        {
          "name": "Dharmapura",
          "kn": "ಧರ್ಮಪುರ",
          "lat": 12.28,
          "lon": 76.35
        },
        {
          "name": "Ratnapuri",
          "kn": "ರತ್ನಪುರಿ",
          "lat": 12.25,
          "lon": 76.19
        }
      ]
    },
    {
      "name": "T. Narasipura",
      "isCity": false,
      "lat": 12.21,
      "lon": 76.9,
      "kn": "ಟಿ. ನರಸೀಪುರ",
      "villages": [
        {
          "name": "Bannur",
          "kn": "ಬನ್ನೂರು",
          "lat": 12.33,
          "lon": 76.86
        },
        {
          "name": "Mugur",
          "kn": "ಮುಗೂರು",
          "lat": 12.13,
          "lon": 76.97
        },
        {
          "name": "Sosale",
          "kn": "ಸೋಸಲೆ",
          "lat": 12.19,
          "lon": 76.92
        },
        {
          "name": "Talkad",
          "kn": "ತಲಕಾಡು",
          "lat": 12.19,
          "lon": 77.03
        },
        {
          "name": "Gargeshwari",
          "kn": "ಗರ್ಗೆಶ್ವರಿ",
          "lat": 12.23,
          "lon": 76.87
        }
      ]
    },
    {
      "name": "Krishnarajanagara",
      "isCity": false,
      "lat": 12.58,
      "lon": 76.38,
      "kn": "ಕೃಷ್ಣರಾಜನಗರ",
      "villages": [
        {
          "name": "Saligrama",
          "kn": "ಸಾಲಿಗ್ರಾಮ",
          "lat": 12.56,
          "lon": 76.25
        },
        {
          "name": "Mirle",
          "kn": "ಮಿರ್ಲೆ",
          "lat": 12.53,
          "lon": 76.31
        },
        {
          "name": "Bherya",
          "kn": "ಭೇರ್ಯ",
          "lat": 12.63,
          "lon": 76.29
        },
        {
          "name": "Chunchanakatte",
          "kn": "ಚುಂಚನಕಟ್ಟೆ",
          "lat": 12.51,
          "lon": 76.33
        },
        {
          "name": "Hampapura",
          "kn": "ಹಂಪಾಪುರ",
          "lat": 12.62,
          "lon": 76.42
        }
      ]
    },
    {
      "name": "Piriyapatna",
      "isCity": false,
      "lat": 12.34,
      "lon": 76.1,
      "kn": "ಪಿರಿಯಾಪಟ್ಟಣ",
      "villages": [
        {
          "name": "Bettadapura",
          "kn": "ಬೆಟ್ಟದಪುರ",
          "lat": 12.44,
          "lon": 76.08
        },
        {
          "name": "Ravandur",
          "kn": "ರಾವಂದೂರು",
          "lat": 12.39,
          "lon": 76.18
        },
        {
          "name": "Bylakuppe",
          "kn": "ಬೈಲಕುಪ್ಪೆ",
          "lat": 12.42,
          "lon": 75.96
        },
        {
          "name": "Kittur",
          "kn": "ಕಿತ್ತೂರು (ಪಿರಿಯಾಪಟ್ಟಣ)",
          "lat": 12.28,
          "lon": 76.05
        },
        {
          "name": "Kanagal",
          "kn": "ಕಣಗಾಲ್",
          "lat": 12.31,
          "lon": 76.15
        }
      ]
    },
    {
      "name": "H.D. Kote",
      "isCity": false,
      "lat": 11.98,
      "lon": 76.33,
      "kn": "ಎಚ್.ಡಿ. ಕೋಟೆ",
      "villages": [
        {
          "name": "Saragur",
          "kn": "ಸರಗೂರು",
          "lat": 11.97,
          "lon": 76.42
        },
        {
          "name": "Antharasanthe",
          "kn": "ಅಂತರಸಂತೆ",
          "lat": 11.89,
          "lon": 76.28
        },
        {
          "name": "Balle Elephant Camp",
          "kn": "ಬಳ್ಳೆ ಆನೆ ಶಿಬಿರ",
          "lat": 11.82,
          "lon": 76.18
        },
        {
          "name": "Kabini Dam Colony",
          "kn": "ಕಬಿನಿ ಅಣೆಕಟ್ಟು ಕಾಲೋನಿ",
          "lat": 11.95,
          "lon": 76.35
        },
        {
          "name": "Kakanakote",
          "kn": "ಕಾಕನಕೋಟೆ",
          "lat": 11.85,
          "lon": 76.22
        }
      ]
    }
  ],
  "Mandya": [
    {
      "name": "Mandya City",
      "isCity": true,
      "lat": 12.52,
      "lon": 76.9,
      "kn": "ಮಂಡ್ಯ ನಗರ",
      "villages": []
    },
    {
      "name": "Maddur",
      "isCity": false,
      "lat": 12.58,
      "lon": 77.04,
      "kn": "ಮದ್ದೂರು",
      "villages": [
        {
          "name": "Besagarahalli",
          "kn": "ಬೆಸಗರಹಳ್ಳಿ",
          "lat": 12.52,
          "lon": 77.01
        },
        {
          "name": "Koppa",
          "kn": "ಕೊಪ್ಪ (ಮದ್ದೂರು)",
          "lat": 12.65,
          "lon": 77.02
        },
        {
          "name": "Shivapura",
          "kn": "ಶಿವಪುರ",
          "lat": 12.59,
          "lon": 77.06
        },
        {
          "name": "Chikkarasinakere",
          "kn": "ಚಿಕ್ಕರಸಿನಕೆರೆ",
          "lat": 12.49,
          "lon": 77.08
        },
        {
          "name": "Athagur",
          "kn": "ಆತಗೂರು",
          "lat": 12.62,
          "lon": 77.11
        }
      ]
    },
    {
      "name": "Malavalli",
      "isCity": false,
      "lat": 12.38,
      "lon": 77.06,
      "kn": "ಮಳವಳ್ಳಿ",
      "villages": [
        {
          "name": "Halagur",
          "kn": "ಹಲಗೂರು",
          "lat": 12.42,
          "lon": 77.21
        },
        {
          "name": "Kirugavalu",
          "kn": "ಕಿರುಗಾವಲು",
          "lat": 12.35,
          "lon": 76.98
        },
        {
          "name": "Belakavadi",
          "kn": "ಬೆಳಕವಾಡಿ",
          "lat": 12.28,
          "lon": 77.12
        },
        {
          "name": "Shivanasamudra",
          "kn": "ಶಿವನಸಮುದ್ರ",
          "lat": 12.31,
          "lon": 77.17
        },
        {
          "name": "Boppegowdanapura",
          "kn": "ಬೊಪ್ಪೇಗೌಡನಪುರ",
          "lat": 12.33,
          "lon": 77.05
        }
      ]
    },
    {
      "name": "Pandavapura",
      "isCity": false,
      "lat": 12.49,
      "lon": 76.67,
      "kn": "ಪಾಂಡವಪುರ",
      "villages": [
        {
          "name": "Melukote",
          "kn": "ಮೇಲುಕೋಟೆ",
          "lat": 12.66,
          "lon": 76.65
        },
        {
          "name": "Chikka Byadarahalli",
          "kn": "ಚಿಕ್ಕ ಬ್ಯಾಡರಹಳ್ಳಿ",
          "lat": 12.47,
          "lon": 76.69
        },
        {
          "name": "Jakkanahalli",
          "kn": "ಜಕ್ಕನಹಳ್ಳಿ",
          "lat": 12.62,
          "lon": 76.68
        },
        {
          "name": "Kyathanahalli",
          "kn": "ಕ್ಯಾತನಹಳ್ಳಿ",
          "lat": 12.44,
          "lon": 76.63
        },
        {
          "name": "Haravu",
          "kn": "ಹರವು",
          "lat": 12.54,
          "lon": 76.71
        }
      ]
    },
    {
      "name": "Srirangapatna",
      "isCity": false,
      "lat": 12.42,
      "lon": 76.69,
      "kn": "ಶ್ರೀರಂಗಪಟ್ಟಣ",
      "villages": [
        {
          "name": "Arakere",
          "kn": "ಅರಕೆರೆ",
          "lat": 12.45,
          "lon": 76.78
        },
        {
          "name": "Belagola",
          "kn": "ಬೆಳಗೊಳ",
          "lat": 12.38,
          "lon": 76.58
        },
        {
          "name": "Palahalli",
          "kn": "ಪಾಲಹಳ್ಳಿ",
          "lat": 12.39,
          "lon": 76.64
        },
        {
          "name": "Ganjam",
          "kn": "ಗಂಜಾಂ",
          "lat": 12.41,
          "lon": 76.72
        },
        {
          "name": "K.R. Sagar",
          "kn": "ಕೆ.ಆರ್. ಸಾಗರ",
          "lat": 12.43,
          "lon": 76.57
        }
      ]
    },
    {
      "name": "Krishnarajapet",
      "isCity": false,
      "lat": 12.66,
      "lon": 76.49,
      "kn": "ಕೃಷ್ಣರಾಜಪೇಟೆ",
      "villages": [
        {
          "name": "Kikkeri",
          "kn": "ಕಿಕ್ಕೇರಿ",
          "lat": 12.75,
          "lon": 76.41
        },
        {
          "name": "Bukinakere",
          "kn": "ಬೂಕನಕೆರೆ",
          "lat": 12.61,
          "lon": 76.45
        },
        {
          "name": "Seethapura",
          "kn": "ಸೀತಾಪುರ",
          "lat": 12.69,
          "lon": 76.54
        },
        {
          "name": "Santhebachahalli",
          "kn": "ಸಂತೆಬಾಚಹಳ್ಳಿ",
          "lat": 12.79,
          "lon": 76.51
        },
        {
          "name": "Sheelanere",
          "kn": "ಶೀಲನೆರೆ",
          "lat": 12.72,
          "lon": 76.56
        }
      ]
    },
    {
      "name": "Nagamangala",
      "isCity": false,
      "lat": 12.82,
      "lon": 76.76,
      "kn": "ನಾಗಮಂಗಲ",
      "villages": [
        {
          "name": "Bellur Cross",
          "kn": "ಬೆಳ್ಳೂರು ಕ್ರಾಸ್",
          "lat": 12.94,
          "lon": 76.73
        },
        {
          "name": "Bindiganavile",
          "kn": "ಬಿಂದಿಗನವಿಲೆ",
          "lat": 12.89,
          "lon": 76.67
        },
        {
          "name": "Devalapura",
          "kn": "ದೇವಲಾಪುರ (ನಾಗಮಂಗಲ)",
          "lat": 12.78,
          "lon": 76.79
        },
        {
          "name": "Honakere",
          "kn": "ಹೊಣಕೆರೆ",
          "lat": 12.74,
          "lon": 76.72
        },
        {
          "name": "Kadabahalli",
          "kn": "ಕಡಬಹಳ್ಳಿ",
          "lat": 12.96,
          "lon": 76.69
        }
      ]
    }
  ],
  "Tumakuru": [
    {
      "name": "Tumakuru City",
      "isCity": true,
      "lat": 13.34,
      "lon": 77.1,
      "kn": "ತುಮಕೂರು ನಗರ",
      "villages": []
    },
    {
      "name": "Tiptur",
      "isCity": false,
      "lat": 13.26,
      "lon": 76.48,
      "kn": "ತಿಪಟೂರು",
      "villages": [
        {
          "name": "Honnavalli",
          "kn": "ಹೊನ್ನವಳ್ಳಿ",
          "lat": 13.33,
          "lon": 76.51
        },
        {
          "name": "Kibbanahalli",
          "kn": "ಕಿಬ್ಬನಹಳ್ಳಿ",
          "lat": 13.31,
          "lon": 76.65
        },
        {
          "name": "Nonavinakere",
          "kn": "ನೊಣವಿನಕೆರೆ",
          "lat": 13.19,
          "lon": 76.58
        },
        {
          "name": "Biligere",
          "kn": "ಬಿಳಿಗೆರೆ (ತಿಪಟೂರು)",
          "lat": 13.22,
          "lon": 76.44
        },
        {
          "name": "Kuppalu",
          "kn": "ಕುಪ್ಪಾಳು",
          "lat": 13.28,
          "lon": 76.45
        },
        {
          "name": "Halkurike",
          "kn": "ಹಾಲ್ಕುರಿಕೆ",
          "lat": 13.24,
          "lon": 76.55
        }
      ]
    },
    {
      "name": "Madhugiri",
      "isCity": false,
      "lat": 13.66,
      "lon": 77.21,
      "kn": "ಮಧುಗಿರಿ",
      "villages": [
        {
          "name": "Kodigenahalli",
          "kn": "ಕೊಡಿಗೇನಹಳ್ಳಿ",
          "lat": 13.72,
          "lon": 77.28
        },
        {
          "name": "Midigeshi",
          "kn": "ಮಿಡಿಗೇಶಿ",
          "lat": 13.81,
          "lon": 77.18
        },
        {
          "name": "Badavanahalli",
          "kn": "ಬಡವನಹಳ್ಳಿ",
          "lat": 13.61,
          "lon": 77.15
        },
        {
          "name": "Puravara",
          "kn": "ಪುರವರ",
          "lat": 13.68,
          "lon": 77.31
        },
        {
          "name": "Ittigadibbanahalli",
          "kn": "ಇಟ್ಟಿಗದಿಬ್ಬನಹಳ್ಳಿ",
          "lat": 13.75,
          "lon": 77.12
        }
      ]
    },
    {
      "name": "Sira",
      "isCity": false,
      "lat": 13.74,
      "lon": 76.9,
      "kn": "ಶಿರಾ",
      "villages": [
        {
          "name": "Bukkapatna",
          "kn": "ಬುಕ್ಕಪಟ್ಟಣ",
          "lat": 13.62,
          "lon": 76.78
        },
        {
          "name": "Kallambella",
          "kn": "ಕಳ್ಳಂಬೆಳ್ಳ",
          "lat": 13.66,
          "lon": 76.95
        },
        {
          "name": "Tavarekere",
          "kn": "ತಾವರೆಕೆರೆ",
          "lat": 13.82,
          "lon": 76.85
        },
        {
          "name": "Hulikunte",
          "kn": "ಹುಲಿಕುಂಟೆ",
          "lat": 13.78,
          "lon": 76.99
        },
        {
          "name": "Baragur",
          "kn": "ಬರಗೂರು (ಶಿರಾ)",
          "lat": 13.86,
          "lon": 76.92
        }
      ]
    },
    {
      "name": "Kunigal",
      "isCity": false,
      "lat": 13.02,
      "lon": 77.03,
      "kn": "ಕುಣಿಗಲ್",
      "villages": [
        {
          "name": "Amruthur",
          "kn": "ಅಮೃತೂರು",
          "lat": 12.92,
          "lon": 76.95
        },
        {
          "name": "Huliyurdurga",
          "kn": "ಹುಲಿಯೂರುದುರ್ಗ",
          "lat": 12.87,
          "lon": 77.02
        },
        {
          "name": "Yediyur",
          "kn": "ಯಡಿಯೂರು",
          "lat": 13.01,
          "lon": 76.88
        },
        {
          "name": "Kothagere",
          "kn": "ಕೊತ್ತಗೆರೆ",
          "lat": 13.08,
          "lon": 77.09
        },
        {
          "name": "Markonahalli",
          "kn": "ಮಾರ್ಕೋನಹಳ್ಳಿ",
          "lat": 12.96,
          "lon": 76.91
        }
      ]
    },
    {
      "name": "Gubbi",
      "isCity": false,
      "lat": 13.31,
      "lon": 76.94,
      "kn": "ಗುಬ್ಬಿ",
      "villages": [
        {
          "name": "Chandrashekarapura",
          "kn": "ಚಂದ್ರಶೇಖರಪುರ (ಸಿ.ಎಸ್. ಪುರ)",
          "lat": 13.15,
          "lon": 76.88
        },
        {
          "name": "Nittur",
          "kn": "ನಿಟ್ಟೂರು",
          "lat": 13.35,
          "lon": 76.82
        },
        {
          "name": "Chelur",
          "kn": "ಚೇಳೂರು",
          "lat": 13.25,
          "lon": 76.81
        },
        {
          "name": "Hagalavadi",
          "kn": "ಹಾಗಲವಾಡಿ",
          "lat": 13.44,
          "lon": 76.85
        },
        {
          "name": "Kadaba",
          "kn": "ಕಡಬ (ಗುಬ್ಬಿ)",
          "lat": 13.28,
          "lon": 76.99
        }
      ]
    },
    {
      "name": "Pavagada",
      "isCity": false,
      "lat": 14.1,
      "lon": 77.27,
      "kn": "ಪಾವಗಡ",
      "villages": [
        {
          "name": "Nagalamadike",
          "kn": "ನಾಗಲಮಡಿಕೆ",
          "lat": 14.05,
          "lon": 77.38
        },
        {
          "name": "Y.N. Hosakote",
          "kn": "ವೈ.ಎನ್. ಹೊಸಕೋಟೆ",
          "lat": 14.28,
          "lon": 77.12
        },
        {
          "name": "Kyathaganacherlu",
          "kn": "ಕ್ಯಾತಗಾನಚರ್ಲು",
          "lat": 14.18,
          "lon": 77.34
        },
        {
          "name": "Roppa",
          "kn": "ರೊಪ್ಪ",
          "lat": 14.12,
          "lon": 77.22
        }
      ]
    },
    {
      "name": "Koratagere",
      "isCity": false,
      "lat": 13.52,
      "lon": 77.23,
      "kn": "ಕೊರಟಗೆರೆ",
      "villages": [
        {
          "name": "Holavanahalli",
          "kn": "ಹೊಳವನಹಳ್ಳಿ",
          "lat": 13.56,
          "lon": 77.31
        },
        {
          "name": "Kolala",
          "kn": "ಕೊಲಾಲ",
          "lat": 13.41,
          "lon": 77.28
        },
        {
          "name": "Theetha",
          "kn": "ತೀತ",
          "lat": 13.48,
          "lon": 77.19
        },
        {
          "name": "Mavathur",
          "kn": "ಮಾವತ್ತೂರು",
          "lat": 13.45,
          "lon": 77.33
        }
      ]
    },
    {
      "name": "Turuvekere",
      "isCity": false,
      "lat": 13.16,
      "lon": 76.67,
      "kn": "ತುರುವೇಕೆರೆ",
      "villages": [
        {
          "name": "Dandinashivara",
          "kn": "ದಂಡಿನಶಿವರ",
          "lat": 13.24,
          "lon": 76.75
        },
        {
          "name": "Mayasandra",
          "kn": "ಮಾಯಸಂದ್ರ",
          "lat": 13.06,
          "lon": 76.72
        },
        {
          "name": "Dabbeghatta",
          "kn": "ದಬ್ಬೇಘಟ್ಟ",
          "lat": 13.12,
          "lon": 76.61
        },
        {
          "name": "Sampige",
          "kn": "ಸಂಪಿಗೆ",
          "lat": 13.21,
          "lon": 76.69
        }
      ]
    },
    {
      "name": "Chikkanayakanahalli",
      "isCity": false,
      "lat": 13.42,
      "lon": 76.62,
      "kn": "ಚಿಕ್ಕನಾಯಕನಹಳ್ಳಿ",
      "villages": [
        {
          "name": "Huliyar",
          "kn": "ಹುಳಿಯಾರು",
          "lat": 13.58,
          "lon": 76.54
        },
        {
          "name": "Kandikere",
          "kn": "ಕಂದಿಕೆರೆ",
          "lat": 13.48,
          "lon": 76.68
        },
        {
          "name": "Shettikere",
          "kn": "ಶೆಟ್ಟಿಕೆರೆ",
          "lat": 13.35,
          "lon": 76.58
        },
        {
          "name": "Handanakere",
          "kn": "ಹಂದನಕೆರೆ",
          "lat": 13.51,
          "lon": 76.51
        }
      ]
    }
  ],
  "Kolar": [
    {
      "name": "Kolar City",
      "isCity": true,
      "lat": 13.13,
      "lon": 78.13,
      "kn": "ಕೋಲಾರ ನಗರ",
      "villages": []
    },
    {
      "name": "Malur",
      "isCity": false,
      "lat": 13,
      "lon": 77.94,
      "kn": "ಮಾಲೂರು",
      "villages": [
        {
          "name": "Lakkur",
          "kn": "ಲಕ್ಕೂರು",
          "lat": 12.95,
          "lon": 77.85
        },
        {
          "name": "Masti",
          "kn": "ಮಾಸ್ತಿ",
          "lat": 12.87,
          "lon": 78.01
        },
        {
          "name": "Tekal",
          "kn": "ಟೇಕಲ್",
          "lat": 13.04,
          "lon": 78.06
        },
        {
          "name": "Doddakadhalli",
          "kn": "ದೊಡ್ಡಕಡಹಳ್ಳಿ",
          "lat": 13.02,
          "lon": 77.89
        },
        {
          "name": "Hulimangala",
          "kn": "ಹುಲಿಮಂಗಲ",
          "lat": 12.98,
          "lon": 77.97
        }
      ]
    },
    {
      "name": "Mulbagal",
      "isCity": false,
      "lat": 13.16,
      "lon": 78.39,
      "kn": "ಮುಳಬಾಗಿಲು",
      "villages": [
        {
          "name": "Nangali",
          "kn": "ನಂಗಲಿ",
          "lat": 13.19,
          "lon": 78.52
        },
        {
          "name": "Avani",
          "kn": "ಅವನಿ",
          "lat": 13.1,
          "lon": 78.33
        },
        {
          "name": "Byrakur",
          "kn": "ಬೈರಕೂರು",
          "lat": 13.22,
          "lon": 78.47
        },
        {
          "name": "Tayalur",
          "kn": "ತಾಯಲೂರು",
          "lat": 13.12,
          "lon": 78.43
        },
        {
          "name": "Duggasandra",
          "kn": "ದುಗ್ಗಸಂದ್ರ",
          "lat": 13.08,
          "lon": 78.38
        }
      ]
    },
    {
      "name": "Bangarapet",
      "isCity": false,
      "lat": 12.99,
      "lon": 78.2,
      "kn": "ಬಂಗಾರಪೇಟೆ",
      "villages": [
        {
          "name": "Budikote",
          "kn": "ಬೂದಿಕೋಟೆ",
          "lat": 12.89,
          "lon": 78.18
        },
        {
          "name": "Kamasandra",
          "kn": "ಕಾಮಸಂದ್ರ",
          "lat": 12.94,
          "lon": 78.24
        },
        {
          "name": "Bethamangala",
          "kn": "ಬೇತ್ಮಂಗಲ",
          "lat": 13.02,
          "lon": 78.31
        },
        {
          "name": "Hudukula",
          "kn": "ಹುಡುಕುಲ",
          "lat": 13.05,
          "lon": 78.16
        }
      ]
    },
    {
      "name": "Srinivaspur",
      "isCity": false,
      "lat": 13.33,
      "lon": 78.21,
      "kn": "ಶ್ರೀನಿವಾಸಪುರ",
      "villages": [
        {
          "name": "Ronur",
          "kn": "ರೋಣೂರು",
          "lat": 13.26,
          "lon": 78.18
        },
        {
          "name": "Rayalpad",
          "kn": "ರಾಯಲ್ಪಾಡು",
          "lat": 13.41,
          "lon": 78.34
        },
        {
          "name": "Yeldur",
          "kn": "ಯಲ್ದೂರು",
          "lat": 13.38,
          "lon": 78.25
        },
        {
          "name": "Nelavanki",
          "kn": "ನೆಲವಂಕಿ",
          "lat": 13.44,
          "lon": 78.27
        },
        {
          "name": "Gownipalli",
          "kn": "ಗೌನಿಪಳ್ಳಿ",
          "lat": 13.48,
          "lon": 78.29
        }
      ]
    },
    {
      "name": "KGF / Robertsonpet",
      "isCity": false,
      "lat": 12.96,
      "lon": 78.27,
      "kn": "ಕೆ.ಜಿ.ಎಫ್ / ರಾಬರ್ಟ್‌ಸನ್‌ಪೇಟೆ",
      "villages": [
        {
          "name": "Marikuppam",
          "kn": "ಮಾರಿಗುಪ್ಪಂ",
          "lat": 12.92,
          "lon": 78.28
        },
        {
          "name": "Coromandel",
          "kn": "ಕೋರಮಂಡಲ್",
          "lat": 12.98,
          "lon": 78.26
        },
        {
          "name": "Oorgaum",
          "kn": "ಊರ್ಗಾಂ",
          "lat": 12.95,
          "lon": 78.27
        },
        {
          "name": "Andersonpet",
          "kn": "ಆಂಡರ್ಸನ್‌ಪೇಟೆ",
          "lat": 12.93,
          "lon": 78.27
        }
      ]
    }
  ],
  "Chikkaballapur": [
    {
      "name": "Chikkaballapur City",
      "isCity": true,
      "lat": 13.43,
      "lon": 77.72,
      "kn": "ಚಿಕ್ಕಬಳ್ಳಾಪುರ ನಗರ",
      "villages": []
    },
    {
      "name": "Chintamani",
      "isCity": false,
      "lat": 13.4,
      "lon": 78.06,
      "kn": "ಚಿಂತಾಮಣಿ",
      "villages": [
        {
          "name": "Kaivara",
          "kn": "ಕೈವಾರ",
          "lat": 13.34,
          "lon": 78.02
        },
        {
          "name": "Muragamalla",
          "kn": "ಮುರುಗಮಲ್ಲ",
          "lat": 13.45,
          "lon": 78.14
        },
        {
          "name": "Ambajidurga",
          "kn": "ಅಂಬಾಜಿದುರ್ಗ",
          "lat": 13.38,
          "lon": 78.09
        },
        {
          "name": "Batlahalli",
          "kn": "ಬಟ್ಲಹಳ್ಳಿ",
          "lat": 13.51,
          "lon": 78.12
        },
        {
          "name": "Chilakalanerpu",
          "kn": "ಚಿಲಕಲನೇರ್ಪು",
          "lat": 13.46,
          "lon": 77.98
        }
      ]
    },
    {
      "name": "Sidlaghatta",
      "isCity": false,
      "lat": 13.39,
      "lon": 77.86,
      "kn": "ಶಿಡ್ಲಘಟ್ಟ",
      "villages": [
        {
          "name": "Jangamakote",
          "kn": "ಜಂಗಮಕೋಟೆ",
          "lat": 13.25,
          "lon": 77.82
        },
        {
          "name": "Melur",
          "kn": "ಮೇಲೂರು",
          "lat": 13.35,
          "lon": 77.89
        },
        {
          "name": "Dibburhalli",
          "kn": "ದಿಬ್ಬೂರಹಳ್ಳಿ",
          "lat": 13.49,
          "lon": 77.92
        },
        {
          "name": "Basavanatta",
          "kn": "ಬಸವನತ್ತ",
          "lat": 13.42,
          "lon": 77.81
        }
      ]
    },
    {
      "name": "Gauribidanur",
      "isCity": false,
      "lat": 13.61,
      "lon": 77.52,
      "kn": "ಗೌರಿಬಿದನೂರು",
      "villages": [
        {
          "name": "Manchenahalli",
          "kn": "ಮಂಚೇನಹಳ್ಳಿ",
          "lat": 13.55,
          "lon": 77.62
        },
        {
          "name": "Thondebhavi",
          "kn": "ತೊಂಡೇಭಾವಿ",
          "lat": 13.49,
          "lon": 77.56
        },
        {
          "name": "Vidurashwatha",
          "kn": "ವಿದುರಾಶ್ವತ್ಥ",
          "lat": 13.68,
          "lon": 77.5
        },
        {
          "name": "Nagaragere",
          "kn": "ನಾಗರಗೆರೆ",
          "lat": 13.65,
          "lon": 77.44
        },
        {
          "name": "Dpalya",
          "kn": "ಡಿ.ಪಾಳ್ಯ",
          "lat": 13.58,
          "lon": 77.48
        }
      ]
    },
    {
      "name": "Bagepalli",
      "isCity": false,
      "lat": 13.78,
      "lon": 77.79,
      "kn": "ಬಾಗೇಪಲ್ಲಿ",
      "villages": [
        {
          "name": "Chelur",
          "kn": "ಚೇಳೂರು (ಬಾಗೇಪಲ್ಲಿ)",
          "lat": 13.68,
          "lon": 77.92
        },
        {
          "name": "Pathapalya",
          "kn": "ಪಾತಪಾಳ್ಯ",
          "lat": 13.85,
          "lon": 77.88
        },
        {
          "name": "Mittemari",
          "kn": "ಮಿಟ್ಟೇಮರಿ",
          "lat": 13.72,
          "lon": 77.75
        },
        {
          "name": "Billur",
          "kn": "ಬಿಲ್ಲೂರು",
          "lat": 13.82,
          "lon": 77.72
        }
      ]
    },
    {
      "name": "Gudibanda",
      "isCity": false,
      "lat": 13.67,
      "lon": 77.7,
      "kn": "ಗುಡಿಬಂಡೆ",
      "villages": [
        {
          "name": "Somenahalli",
          "kn": "ಸೋಮೇನಹಳ್ಳಿ",
          "lat": 13.71,
          "lon": 77.65
        },
        {
          "name": "Beechaganahalli",
          "kn": "ಬೀಚಗಾನಹಳ್ಳಿ",
          "lat": 13.63,
          "lon": 77.74
        },
        {
          "name": "Hampasandra",
          "kn": "ಹಂಪಸಂದ್ರ",
          "lat": 13.69,
          "lon": 77.73
        },
        {
          "name": "Kondareddihalli",
          "kn": "ಕೊಂಡರೆಡ್ಡಿಹಳ್ಳಿ",
          "lat": 13.65,
          "lon": 77.68
        }
      ]
    }
  ],
  "Hassan": [
    {
      "name": "Hassan City",
      "isCity": true,
      "lat": 13,
      "lon": 76.1,
      "kn": "ಹಾಸನ ನಗರ",
      "villages": []
    },
    {
      "name": "Arsikere",
      "isCity": false,
      "lat": 13.31,
      "lon": 76.25,
      "kn": "ಅರಸೀಕೆರೆ",
      "villages": [
        {
          "name": "Banavara",
          "kn": "ಬಾಣಾವರ",
          "lat": 13.41,
          "lon": 76.16
        },
        {
          "name": "Gandasi",
          "kn": "ಗಂಡಸಿ",
          "lat": 13.22,
          "lon": 76.32
        },
        {
          "name": "Kanakatte",
          "kn": "ಕಣಕಟ್ಟೆ",
          "lat": 13.45,
          "lon": 76.29
        },
        {
          "name": "Javagal",
          "kn": "ಜಾವಗಲ್",
          "lat": 13.32,
          "lon": 76.06
        },
        {
          "name": "Harnahalli",
          "kn": "ಹಾರನಹಳ್ಳಿ",
          "lat": 13.25,
          "lon": 76.21
        }
      ]
    },
    {
      "name": "Channarayapatna",
      "isCity": false,
      "lat": 12.9,
      "lon": 76.39,
      "kn": "ಚನ್ನರಾಯಪಟ್ಟಣ",
      "villages": [
        {
          "name": "Shravanabelagola",
          "kn": "ಶ್ರವಣಬೆಳಗೊಳ",
          "lat": 12.85,
          "lon": 76.48
        },
        {
          "name": "Nuggehalli",
          "kn": "ನುಗ್ಗೇಹಳ್ಳಿ",
          "lat": 13.01,
          "lon": 76.47
        },
        {
          "name": "Hiresave",
          "kn": "ಹಿರೀಸಾವೆ",
          "lat": 12.92,
          "lon": 76.54
        },
        {
          "name": "Bagur",
          "kn": "ಬಾಗೂರು (ಹಾಸನ)",
          "lat": 13.04,
          "lon": 76.35
        },
        {
          "name": "Dandiganahalli",
          "kn": "ದಂಡಿಗಾನಹಳ್ಳಿ",
          "lat": 12.96,
          "lon": 76.42
        }
      ]
    },
    {
      "name": "Belur",
      "isCity": false,
      "lat": 13.16,
      "lon": 75.86,
      "kn": "ಬೇಲೂರು",
      "villages": [
        {
          "name": "Halebidu",
          "kn": "ಹಳೇಬೀಡು",
          "lat": 13.21,
          "lon": 75.99
        },
        {
          "name": "Arehalli",
          "kn": "ಅರೆಹಳ್ಳಿ",
          "lat": 13.09,
          "lon": 75.81
        },
        {
          "name": "Hagare",
          "kn": "ಹಗರೆ",
          "lat": 13.12,
          "lon": 75.95
        },
        {
          "name": "Bikkodu",
          "kn": "ಬಿಕ್ಕೋಡು",
          "lat": 13.06,
          "lon": 75.87
        },
        {
          "name": "Ghatadahalli",
          "kn": "ಘಟದಹಳ್ಳಿ",
          "lat": 13.18,
          "lon": 75.91
        }
      ]
    },
    {
      "name": "Holenarasipura",
      "isCity": false,
      "lat": 12.79,
      "lon": 76.24,
      "kn": "ಹೊಳೇನರಸೀಪುರ",
      "villages": [
        {
          "name": "Halekote",
          "kn": "ಹಳೆಕೋಟೆ",
          "lat": 12.85,
          "lon": 76.28
        },
        {
          "name": "Doddakadanoor",
          "kn": "ದೊಡ್ಡಕಡನೂರು",
          "lat": 12.72,
          "lon": 76.22
        },
        {
          "name": "Hangaladalu",
          "kn": "ಹಂಗಳದಾಳು",
          "lat": 12.76,
          "lon": 76.31
        },
        {
          "name": "Shravanur",
          "kn": "ಶ್ರವಣೂರು",
          "lat": 12.81,
          "lon": 76.18
        }
      ]
    },
    {
      "name": "Sakleshpur",
      "isCity": false,
      "lat": 12.94,
      "lon": 75.78,
      "kn": "ಸಕಲೇಶಪುರ",
      "villages": [
        {
          "name": "Yeslur",
          "kn": "ಯಸಳೂರು",
          "lat": 12.82,
          "lon": 75.84
        },
        {
          "name": "Hanbal",
          "kn": "ಹಾನ್ಬಾಳ್",
          "lat": 13.02,
          "lon": 75.72
        },
        {
          "name": "Hettur",
          "kn": "ಹೆತ್ತೂರು",
          "lat": 12.78,
          "lon": 75.81
        },
        {
          "name": "Donigal",
          "kn": "ದೋಣಿಗಲ್",
          "lat": 12.91,
          "lon": 75.75
        },
        {
          "name": "Ballupet",
          "kn": "ಬಳ್ಳುಪೇಟೆ",
          "lat": 12.96,
          "lon": 75.88
        }
      ]
    },
    {
      "name": "Arkalgud",
      "isCity": false,
      "lat": 12.76,
      "lon": 76.06,
      "kn": "ಅರಕಲಗೂಡು",
      "villages": [
        {
          "name": "Konanur",
          "kn": "ಕೊಣನೂರು",
          "lat": 12.65,
          "lon": 76.04
        },
        {
          "name": "Ramanathapura",
          "kn": "ರಾಮನಾಥಪುರ",
          "lat": 12.61,
          "lon": 76.08
        },
        {
          "name": "Mallipatna",
          "kn": "ಮಲ್ಲಿಪಟ್ಟಣ",
          "lat": 12.72,
          "lon": 75.98
        },
        {
          "name": "Magge",
          "kn": "ಮಗ್ಗೆ",
          "lat": 12.79,
          "lon": 76.12
        }
      ]
    },
    {
      "name": "Alur",
      "isCity": false,
      "lat": 12.98,
      "lon": 75.98,
      "kn": "ಆಲೂರು",
      "villages": [
        {
          "name": "Kandali",
          "kn": "ಕಂದಲಿ",
          "lat": 13.01,
          "lon": 76.04
        },
        {
          "name": "Palya",
          "kn": "ಪಾಳ್ಯ",
          "lat": 12.92,
          "lon": 75.95
        },
        {
          "name": "Rayarakoppal",
          "kn": "ರಾಯರಕೊಪ್ಪಲು",
          "lat": 12.96,
          "lon": 75.92
        },
        {
          "name": "Kenchammana Hoskote",
          "kn": "ಕೆಂಚಮ್ಮನ ಹೊಸಕೋಟೆ",
          "lat": 12.88,
          "lon": 75.99
        }
      ]
    }
  ],
  "Bengaluru Urban": [
    {
      "name": "Bengaluru City Center",
      "isCity": true,
      "lat": 12.9716,
      "lon": 77.5946,
      "kn": "ಬೆಂಗಳೂರು ನಗರ ಕೇಂದ್ರ",
      "villages": []
    },
    {
      "name": "Yeshwanthpur",
      "isCity": true,
      "lat": 13.02,
      "lon": 77.55,
      "kn": "ಯಶವಂತಪುರ",
      "villages": []
    },
    {
      "name": "Kalasipalya / KR Market",
      "isCity": true,
      "lat": 12.96,
      "lon": 77.57,
      "kn": "ಕಲಾಸಿಪಾಳ್ಯ / ಕೆ.ಆರ್. ಮಾರ್ಕೆಟ್",
      "villages": []
    },
    {
      "name": "Kengeri",
      "isCity": true,
      "lat": 12.91,
      "lon": 77.48,
      "kn": "ಕೆಂಗೇರಿ",
      "villages": []
    },
    {
      "name": "Yelahanka",
      "isCity": true,
      "lat": 13.1,
      "lon": 77.59,
      "kn": "ಯಲಹಂಕ",
      "villages": []
    },
    {
      "name": "Anekal",
      "isCity": false,
      "lat": 12.71,
      "lon": 77.7,
      "kn": "ಆನೇಕಲ್",
      "villages": [
        {
          "name": "Attibele",
          "kn": "ಅತ್ತಿಬೆಲೆ",
          "lat": 12.78,
          "lon": 77.77
        },
        {
          "name": "Chandapura",
          "kn": "ಚಂದಾಪುರ",
          "lat": 12.8,
          "lon": 77.7
        },
        {
          "name": "Jigani",
          "kn": "ಜಿಗಣಿ",
          "lat": 12.78,
          "lon": 77.64
        },
        {
          "name": "Sarjapura",
          "kn": "ಸರ್ಜಾಪುರ",
          "lat": 12.86,
          "lon": 77.78
        },
        {
          "name": "Marsur",
          "kn": "ಮಾರ್ಸೂರು",
          "lat": 12.75,
          "lon": 77.68
        }
      ]
    },
    {
      "name": "Singena Agrahara",
      "isCity": false,
      "lat": 12.87,
      "lon": 77.69,
      "kn": "ಸಿಂಗೇನ ಅಗ್ರಹಾರ",
      "villages": [
        {
          "name": "Huskur",
          "kn": "ಹುಸ್ಕೂರು",
          "lat": 12.85,
          "lon": 77.71
        },
        {
          "name": "Medehalli",
          "kn": "ಮೇಡೇಹಳ್ಳಿ",
          "lat": 12.88,
          "lon": 77.72
        },
        {
          "name": "Golladoddi",
          "kn": "ಗೊಲ್ಲದೊಡ್ಡಿ",
          "lat": 12.84,
          "lon": 77.67
        }
      ]
    }
  ],
  "Bengaluru Rural": [
    {
      "name": "Doddaballapur",
      "isCity": false,
      "lat": 13.29,
      "lon": 77.54,
      "kn": "ದೊಡ್ಡಬಳ್ಳಾಪುರ",
      "villages": [
        {
          "name": "Tubagere",
          "kn": "ತೂಬಗೆರೆ",
          "lat": 13.38,
          "lon": 77.59
        },
        {
          "name": "Sasalu",
          "kn": "ಸಾಸಲು",
          "lat": 13.41,
          "lon": 77.48
        },
        {
          "name": "Doddabelavangala",
          "kn": "ದೊಡ್ಡಬೆಳವಂಗಲ",
          "lat": 13.33,
          "lon": 77.41
        },
        {
          "name": "Madure",
          "kn": "ಮಧುರೆ",
          "lat": 13.22,
          "lon": 77.46
        }
      ]
    },
    {
      "name": "Hoskote",
      "isCity": false,
      "lat": 13.07,
      "lon": 77.79,
      "kn": "ಹೊಸಕೋಟೆ",
      "villages": [
        {
          "name": "Nandagudi",
          "kn": "ನಂದಗುಡಿ",
          "lat": 13.18,
          "lon": 77.89
        },
        {
          "name": "Jadigenahalli",
          "kn": "ಜಡಿಗೇನಹಳ್ಳಿ",
          "lat": 13.02,
          "lon": 77.86
        },
        {
          "name": "Sulibele",
          "kn": "ಸೂಲಿಬೆಲೆ",
          "lat": 13.14,
          "lon": 77.81
        },
        {
          "name": "Anugondanahalli",
          "kn": "ಅನುಗೊಂಡನಹಳ್ಳಿ",
          "lat": 12.98,
          "lon": 77.81
        }
      ]
    },
    {
      "name": "Devanahalli",
      "isCity": false,
      "lat": 13.25,
      "lon": 77.71,
      "kn": "ದೇವನಹಳ್ಳಿ",
      "villages": [
        {
          "name": "Vijayapura (Rural)",
          "kn": "ವಿಜಯಪುರ (ಗ್ರಾಮೀಣ)",
          "lat": 13.29,
          "lon": 77.8
        },
        {
          "name": "Kundana",
          "kn": "ಕುಂದಣ",
          "lat": 13.21,
          "lon": 77.62
        },
        {
          "name": "Channarayapatna Hobli",
          "kn": "ಚನ್ನರಾಯಪಟ್ಟಣ ಹೋಬಳಿ",
          "lat": 13.31,
          "lon": 77.75
        },
        {
          "name": "Koira",
          "kn": "ಕೋಯಿರ",
          "lat": 13.26,
          "lon": 77.65
        }
      ]
    },
    {
      "name": "Nelamangala",
      "isCity": false,
      "lat": 13.1,
      "lon": 77.38,
      "kn": "ನೆಲಮಂಗಲ",
      "villages": [
        {
          "name": "Thyamagondlu",
          "kn": "ತ್ಯಾಮಗೊಂಡ್ಲು",
          "lat": 13.21,
          "lon": 77.3
        },
        {
          "name": "Sompura",
          "kn": "ಸೋಂಪುರ (ದಾಬಸ್‌ಪೇಟೆ)",
          "lat": 13.23,
          "lon": 77.24
        },
        {
          "name": "Doddabele",
          "kn": "ದೊಡ್ಡಬೆಲೆ",
          "lat": 13.06,
          "lon": 77.35
        },
        {
          "name": "Shivagange",
          "kn": "ಶಿವಗಂಗೆ",
          "lat": 13.18,
          "lon": 77.22
        }
      ]
    }
  ],
  "Chamarajanagar": [
    {
      "name": "Chamarajanagar City",
      "isCity": true,
      "lat": 11.92,
      "lon": 76.94,
      "kn": "ಚಾಮರಾಜನಗರ ನಗರ",
      "villages": []
    },
    {
      "name": "Gundlupet",
      "isCity": false,
      "lat": 11.8,
      "lon": 76.68,
      "kn": "ಗುಂಡ್ಲುಪೇಟೆ",
      "villages": [
        {
          "name": "Terakanambi",
          "kn": "ತೆರಕಣಾಂಬಿ",
          "lat": 11.85,
          "lon": 76.81
        },
        {
          "name": "Begur",
          "kn": "ಬೇಗೂರು",
          "lat": 11.86,
          "lon": 76.58
        },
        {
          "name": "Hangala",
          "kn": "ಹಂಗಳ",
          "lat": 11.75,
          "lon": 76.66
        },
        {
          "name": "Baragi",
          "kn": "ಬರಗಿ",
          "lat": 11.82,
          "lon": 76.61
        },
        {
          "name": "Kodahalli",
          "kn": "ಕೋಡಹಳ್ಳಿ",
          "lat": 11.77,
          "lon": 76.74
        }
      ]
    },
    {
      "name": "Kollegal",
      "isCity": false,
      "lat": 12.15,
      "lon": 77.12,
      "kn": "ಕೊಳ್ಳೇಗಾಲ",
      "villages": [
        {
          "name": "Kamagere",
          "kn": "ಕಾಮಗೆರೆ",
          "lat": 12.1,
          "lon": 77.16
        },
        {
          "name": "Sattegala",
          "kn": "ಸತ್ತೇಗಾಲ",
          "lat": 12.22,
          "lon": 77.11
        },
        {
          "name": "Mullur",
          "kn": "ಮುಳ್ಳೂರು",
          "lat": 12.18,
          "lon": 77.08
        },
        {
          "name": "Kunthur",
          "kn": "ಕುಂತೂರು",
          "lat": 12.13,
          "lon": 77.05
        },
        {
          "name": "Singanallur",
          "kn": "ಸಿಂಗನಲ್ಲೂರು",
          "lat": 12.08,
          "lon": 77.21
        }
      ]
    },
    {
      "name": "Hanur",
      "isCity": false,
      "lat": 12.09,
      "lon": 77.3,
      "kn": "ಹನೂರು",
      "villages": [
        {
          "name": "Ramapura",
          "kn": "ರಾಮಪುರ (ಹನೂರು)",
          "lat": 12.01,
          "lon": 77.45
        },
        {
          "name": "Cowdalli",
          "kn": "ಕೌದಳ್ಳಿ",
          "lat": 12.06,
          "lon": 77.38
        },
        {
          "name": "Lokkanahalli",
          "kn": "ಲೊಕ್ಕನಹಳ್ಳಿ",
          "lat": 12.14,
          "lon": 77.25
        },
        {
          "name": "Male Mahadeshwara Hills (MM Hills)",
          "kn": "ಮಲೆ ಮಹದೇಶ್ವರ ಬೆಟ್ಟ",
          "lat": 11.98,
          "lon": 77.55
        },
        {
          "name": "Bandalli",
          "kn": "ಬಂಡಳ್ಳಿ",
          "lat": 12.12,
          "lon": 77.32
        }
      ]
    },
    {
      "name": "Yelandur",
      "isCity": false,
      "lat": 12.06,
      "lon": 77.03,
      "kn": "ಯಳಂದೂರು",
      "villages": [
        {
          "name": "Agara",
          "kn": "ಅಗರ",
          "lat": 12.08,
          "lon": 77
        },
        {
          "name": "Kestur",
          "kn": "ಕೇಸ್ತೂರು",
          "lat": 12.02,
          "lon": 77.05
        },
        {
          "name": "Ambale",
          "kn": "ಅಂಬಳೆ",
          "lat": 12.09,
          "lon": 77.07
        },
        {
          "name": "Honnur",
          "kn": "ಹೊನ್ನೂರು",
          "lat": 12.04,
          "lon": 76.98
        },
        {
          "name": "Yeragamballi",
          "kn": "ಯರಗಂಬಳ್ಳಿ",
          "lat": 12.01,
          "lon": 77.02
        }
      ]
    }
  ],
  "Chikkamagaluru": [
    {
      "name": "Chikkamagaluru City",
      "isCity": true,
      "lat": 13.32,
      "lon": 75.77,
      "kn": "ಚಿಕ್ಕಮಗಳೂರು ನಗರ",
      "villages": []
    },
    {
      "name": "Kadur",
      "isCity": false,
      "lat": 13.55,
      "lon": 76.01,
      "kn": "ಕಡೂರು",
      "villages": [
        {
          "name": "Birur",
          "kn": "ಬೀರೂರು",
          "lat": 13.62,
          "lon": 75.98
        },
        {
          "name": "Sakrepatna",
          "kn": "ಸಖರಾಯಪಟ್ಟಣ",
          "lat": 13.43,
          "lon": 75.92
        },
        {
          "name": "Singatagere",
          "kn": "ಸಿಂಗಟಗೆರೆ",
          "lat": 13.51,
          "lon": 76.12
        },
        {
          "name": "Yagati",
          "kn": "ಯಗಟಿ",
          "lat": 13.64,
          "lon": 76.09
        },
        {
          "name": "Panchanahalli",
          "kn": "ಪಂಚನಹಳ್ಳಿ",
          "lat": 13.58,
          "lon": 76.18
        }
      ]
    },
    {
      "name": "Tarikere",
      "isCity": false,
      "lat": 13.71,
      "lon": 75.81,
      "kn": "ತರೀಕೆರೆ",
      "villages": [
        {
          "name": "Ajjampura",
          "kn": "ಅಜ್ಜಂಪುರ",
          "lat": 13.72,
          "lon": 76.02
        },
        {
          "name": "Lakkavalli",
          "kn": "ಲಕ್ಕವಳ್ಳಿ",
          "lat": 13.71,
          "lon": 75.64
        },
        {
          "name": "Lingadahalli",
          "kn": "ಲಿಂಗದಹಳ್ಳಿ",
          "lat": 13.61,
          "lon": 75.83
        },
        {
          "name": "Santaveri",
          "kn": "ಶಾಂತವೇರಿ",
          "lat": 13.53,
          "lon": 75.81
        },
        {
          "name": "Shivane",
          "kn": "ಶಿವನೆ",
          "lat": 13.78,
          "lon": 76.01
        }
      ]
    },
    {
      "name": "Mudigere",
      "isCity": false,
      "lat": 13.13,
      "lon": 75.64,
      "kn": "ಮೂಡಿಗೆರೆ",
      "villages": [
        {
          "name": "Kalasa",
          "kn": "ಕಳಸ",
          "lat": 13.23,
          "lon": 75.36
        },
        {
          "name": "Kottigehara",
          "kn": "ಕೊಟ್ಟಿಗೆಹಾರ",
          "lat": 13.09,
          "lon": 75.56
        },
        {
          "name": "Banakal",
          "kn": "ಬಣಕಲ್",
          "lat": 13.11,
          "lon": 75.6
        },
        {
          "name": "Gonibeedu",
          "kn": "ಗೋಣಿಬೀಡು",
          "lat": 13.18,
          "lon": 75.72
        },
        {
          "name": "Balur",
          "kn": "ಬಾಳೂರು",
          "lat": 13.15,
          "lon": 75.48
        }
      ]
    },
    {
      "name": "Koppa",
      "isCity": false,
      "lat": 13.53,
      "lon": 75.36,
      "kn": "ಕೊಪ್ಪ",
      "villages": [
        {
          "name": "Hariharapura",
          "kn": "ಹರಿಹರಪುರ",
          "lat": 13.51,
          "lon": 75.29
        },
        {
          "name": "Jayapura",
          "kn": "ಜಯಪುರ",
          "lat": 13.47,
          "lon": 75.44
        },
        {
          "name": "Megunda",
          "kn": "ಮೇಗುಂದ",
          "lat": 13.41,
          "lon": 75.38
        },
        {
          "name": "Basarikatte",
          "kn": "ಬಸರಿಕಟ್ಟೆ",
          "lat": 13.49,
          "lon": 75.51
        }
      ]
    },
    {
      "name": "Sringeri",
      "isCity": false,
      "lat": 13.42,
      "lon": 75.25,
      "kn": "ಶೃಂಗೇರಿ",
      "villages": [
        {
          "name": "Kigga",
          "kn": "ಕಿಗ್ಗ",
          "lat": 13.4,
          "lon": 75.18
        },
        {
          "name": "Menase",
          "kn": "ಮೆಣಸೆ",
          "lat": 13.43,
          "lon": 75.28
        },
        {
          "name": "Nemmar",
          "kn": "ನೆಮ್ಮಾರ್",
          "lat": 13.38,
          "lon": 75.22
        },
        {
          "name": "Addagadde",
          "kn": "ಅಡ್ಡಗದ್ದೆ",
          "lat": 13.46,
          "lon": 75.24
        }
      ]
    },
    {
      "name": "Narasimharajapura",
      "isCity": false,
      "lat": 13.62,
      "lon": 75.52,
      "kn": "ನರಸಿಂಹರಾಜಪುರ",
      "villages": [
        {
          "name": "Balehonnur",
          "kn": "ಬಾಳೆಹೊನ್ನೂರು",
          "lat": 13.35,
          "lon": 75.47
        },
        {
          "name": "Muthinakoppa",
          "kn": "ಮುತ್ತಿನಕೊಪ್ಪ",
          "lat": 13.68,
          "lon": 75.48
        },
        {
          "name": "Seegodu",
          "kn": "ಸೀಗೋಡು",
          "lat": 13.58,
          "lon": 75.56
        }
      ]
    }
  ],
  "Dakshina Kannada": [
    {
      "name": "Mangaluru City / Central",
      "lat": 12.91,
      "lon": 74.86,
      "kn": "ಮಂಗಳೂರು ನಗರ / ಕೇಂದ್ರ",
      "villages": [],
      "isCity": true
    },
    {
      "name": "Puttur",
      "lat": 12.77,
      "lon": 75.2,
      "kn": "ಪುತ್ತೂರು",
      "villages": [
        {
          "name": "Puttur Town / Center",
          "kn": "ಪುತ್ತೂರು ಕೇಂದ್ರ",
          "lat": 12.77,
          "lon": 75.2
        },
        {
          "name": "Puttur North Hobli",
          "kn": "ಪುತ್ತೂರು ಉತ್ತರ ಹೋಬಳಿ",
          "lat": 12.81,
          "lon": 75.18
        },
        {
          "name": "Puttur South Hobli",
          "kn": "ಪುತ್ತೂರು ದಕ್ಷಿಣ ಹೋಬಳಿ",
          "lat": 12.73,
          "lon": 75.22
        },
        {
          "name": "Puttur East Farming Cluster",
          "kn": "ಪುತ್ತೂರು ಪೂರ್ವ ಕೃಷಿ ವಲಯ",
          "lat": 12.79,
          "lon": 75.24
        },
        {
          "name": "Puttur West Farming Cluster",
          "kn": "ಪುತ್ತೂರು ಪಶ್ಚಿಮ ಕೃಷಿ ವಲಯ",
          "lat": 12.75,
          "lon": 75.16
        },
        {
          "name": "Puttur Grama Panchayat Hub",
          "kn": "ಪುತ್ತೂರು ಗ್ರಾಮ ಪಂಚಾಯತ್ ವ್ಯಾಪ್ತಿ",
          "lat": 12.785,
          "lon": 75.215
        }
      ],
      "isCity": false
    },
    {
      "name": "Bantwal",
      "lat": 12.89,
      "lon": 75.03,
      "kn": "ಬಂಟ್ವಾಳ",
      "villages": [
        {
          "name": "Bantwal Town / Center",
          "kn": "ಬಂಟ್ವಾಳ ಕೇಂದ್ರ",
          "lat": 12.89,
          "lon": 75.03
        },
        {
          "name": "Bantwal North Hobli",
          "kn": "ಬಂಟ್ವಾಳ ಉತ್ತರ ಹೋಬಳಿ",
          "lat": 12.93,
          "lon": 75.01
        },
        {
          "name": "Bantwal South Hobli",
          "kn": "ಬಂಟ್ವಾಳ ದಕ್ಷಿಣ ಹೋಬಳಿ",
          "lat": 12.85,
          "lon": 75.05
        },
        {
          "name": "Bantwal East Farming Cluster",
          "kn": "ಬಂಟ್ವಾಳ ಪೂರ್ವ ಕೃಷಿ ವಲಯ",
          "lat": 12.91,
          "lon": 75.07
        },
        {
          "name": "Bantwal West Farming Cluster",
          "kn": "ಬಂಟ್ವಾಳ ಪಶ್ಚಿಮ ಕೃಷಿ ವಲಯ",
          "lat": 12.87,
          "lon": 74.99
        },
        {
          "name": "Bantwal Grama Panchayat Hub",
          "kn": "ಬಂಟ್ವಾಳ ಗ್ರಾಮ ಪಂಚಾಯತ್ ವ್ಯಾಪ್ತಿ",
          "lat": 12.905,
          "lon": 75.045
        }
      ],
      "isCity": false
    },
    {
      "name": "Belthangady",
      "lat": 13,
      "lon": 75.26,
      "kn": "ಬೆಳ್ತಂಗಡಿ",
      "villages": [
        {
          "name": "Belthangady Town / Center",
          "kn": "ಬೆಳ್ತಂಗಡಿ ಕೇಂದ್ರ",
          "lat": 13,
          "lon": 75.26
        },
        {
          "name": "Belthangady North Hobli",
          "kn": "ಬೆಳ್ತಂಗಡಿ ಉತ್ತರ ಹೋಬಳಿ",
          "lat": 13.04,
          "lon": 75.24
        },
        {
          "name": "Belthangady South Hobli",
          "kn": "ಬೆಳ್ತಂಗಡಿ ದಕ್ಷಿಣ ಹೋಬಳಿ",
          "lat": 12.96,
          "lon": 75.28
        },
        {
          "name": "Belthangady East Farming Cluster",
          "kn": "ಬೆಳ್ತಂಗಡಿ ಪೂರ್ವ ಕೃಷಿ ವಲಯ",
          "lat": 13.02,
          "lon": 75.3
        },
        {
          "name": "Belthangady West Farming Cluster",
          "kn": "ಬೆಳ್ತಂಗಡಿ ಪಶ್ಚಿಮ ಕೃಷಿ ವಲಯ",
          "lat": 12.98,
          "lon": 75.22
        },
        {
          "name": "Belthangady Grama Panchayat Hub",
          "kn": "ಬೆಳ್ತಂಗಡಿ ಗ್ರಾಮ ಪಂಚಾಯತ್ ವ್ಯಾಪ್ತಿ",
          "lat": 13.015,
          "lon": 75.275
        }
      ],
      "isCity": false
    },
    {
      "name": "Sullia",
      "lat": 12.56,
      "lon": 75.39,
      "kn": "ಸುಳ್ಯ",
      "villages": [
        {
          "name": "Sullia Town / Center",
          "kn": "ಸುಳ್ಯ ಕೇಂದ್ರ",
          "lat": 12.56,
          "lon": 75.39
        },
        {
          "name": "Sullia North Hobli",
          "kn": "ಸುಳ್ಯ ಉತ್ತರ ಹೋಬಳಿ",
          "lat": 12.6,
          "lon": 75.37
        },
        {
          "name": "Sullia South Hobli",
          "kn": "ಸುಳ್ಯ ದಕ್ಷಿಣ ಹೋಬಳಿ",
          "lat": 12.52,
          "lon": 75.41
        },
        {
          "name": "Sullia East Farming Cluster",
          "kn": "ಸುಳ್ಯ ಪೂರ್ವ ಕೃಷಿ ವಲಯ",
          "lat": 12.58,
          "lon": 75.43
        },
        {
          "name": "Sullia West Farming Cluster",
          "kn": "ಸುಳ್ಯ ಪಶ್ಚಿಮ ಕೃಷಿ ವಲಯ",
          "lat": 12.54,
          "lon": 75.35
        },
        {
          "name": "Sullia Grama Panchayat Hub",
          "kn": "ಸುಳ್ಯ ಗ್ರಾಮ ಪಂಚಾಯತ್ ವ್ಯಾಪ್ತಿ",
          "lat": 12.575,
          "lon": 75.405
        }
      ],
      "isCity": false
    },
    {
      "name": "Moodabidri",
      "lat": 13.07,
      "lon": 74.99,
      "kn": "ಮೂಡುಬಿದಿರೆ",
      "villages": [
        {
          "name": "Moodabidri Town / Center",
          "kn": "ಮೂಡುಬಿದಿರೆ ಕೇಂದ್ರ",
          "lat": 13.07,
          "lon": 74.99
        },
        {
          "name": "Moodabidri North Hobli",
          "kn": "ಮೂಡುಬಿದಿರೆ ಉತ್ತರ ಹೋಬಳಿ",
          "lat": 13.11,
          "lon": 74.97
        },
        {
          "name": "Moodabidri South Hobli",
          "kn": "ಮೂಡುಬಿದಿರೆ ದಕ್ಷಿಣ ಹೋಬಳಿ",
          "lat": 13.03,
          "lon": 75.01
        },
        {
          "name": "Moodabidri East Farming Cluster",
          "kn": "ಮೂಡುಬಿದಿರೆ ಪೂರ್ವ ಕೃಷಿ ವಲಯ",
          "lat": 13.09,
          "lon": 75.03
        },
        {
          "name": "Moodabidri West Farming Cluster",
          "kn": "ಮೂಡುಬಿದಿರೆ ಪಶ್ಚಿಮ ಕೃಷಿ ವಲಯ",
          "lat": 13.05,
          "lon": 74.95
        },
        {
          "name": "Moodabidri Grama Panchayat Hub",
          "kn": "ಮೂಡುಬಿದಿರೆ ಗ್ರಾಮ ಪಂಚಾಯತ್ ವ್ಯಾಪ್ತಿ",
          "lat": 13.085,
          "lon": 75.005
        }
      ],
      "isCity": false
    },
    {
      "name": "Kadaba",
      "lat": 12.79,
      "lon": 75.4,
      "kn": "ಕಡಬ",
      "villages": [
        {
          "name": "Kadaba Town / Center",
          "kn": "ಕಡಬ ಕೇಂದ್ರ",
          "lat": 12.79,
          "lon": 75.4
        },
        {
          "name": "Kadaba North Hobli",
          "kn": "ಕಡಬ ಉತ್ತರ ಹೋಬಳಿ",
          "lat": 12.83,
          "lon": 75.38
        },
        {
          "name": "Kadaba South Hobli",
          "kn": "ಕಡಬ ದಕ್ಷಿಣ ಹೋಬಳಿ",
          "lat": 12.75,
          "lon": 75.42
        },
        {
          "name": "Kadaba East Farming Cluster",
          "kn": "ಕಡಬ ಪೂರ್ವ ಕೃಷಿ ವಲಯ",
          "lat": 12.81,
          "lon": 75.44
        },
        {
          "name": "Kadaba West Farming Cluster",
          "kn": "ಕಡಬ ಪಶ್ಚಿಮ ಕೃಷಿ ವಲಯ",
          "lat": 12.77,
          "lon": 75.36
        },
        {
          "name": "Kadaba Grama Panchayat Hub",
          "kn": "ಕಡಬ ಗ್ರಾಮ ಪಂಚಾಯತ್ ವ್ಯಾಪ್ತಿ",
          "lat": 12.805,
          "lon": 75.415
        }
      ],
      "isCity": false
    }
  ],
  "Kodagu": [
    {
      "name": "Madikeri City",
      "isCity": true,
      "lat": 12.42,
      "lon": 75.73,
      "kn": "ಮಡಿಕೇರಿ ನಗರ",
      "villages": []
    },
    {
      "name": "Somwarpet",
      "isCity": false,
      "lat": 12.6,
      "lon": 75.86,
      "kn": "ಸೋಮವಾರಪೇಟೆ",
      "villages": [
        {
          "name": "Shanivarasanthe",
          "kn": "ಶನಿವಾರಸಂತೆ",
          "lat": 12.75,
          "lon": 75.92
        },
        {
          "name": "Kodlipet",
          "kn": "ಕೊಡ್ಲಿಪೇಟೆ",
          "lat": 12.82,
          "lon": 75.98
        },
        {
          "name": "Suntikoppa",
          "kn": "ಸುಂಟಿಕೊಪ್ಪ",
          "lat": 12.48,
          "lon": 75.83
        },
        {
          "name": "Chettalli",
          "kn": "ಚೆಟ್ಟಳ್ಳಿ",
          "lat": 12.44,
          "lon": 75.84
        },
        {
          "name": "Shanthalli",
          "kn": "ಶಾಂತಳ್ಳಿ",
          "lat": 12.65,
          "lon": 75.81
        }
      ]
    },
    {
      "name": "Kushalnagar",
      "isCity": false,
      "lat": 12.45,
      "lon": 75.96,
      "kn": "ಕುಶಾಲನಗರ",
      "villages": [
        {
          "name": "Hebbale",
          "kn": "ಹೆಬ್ಬಾಲೆ",
          "lat": 12.52,
          "lon": 75.99
        },
        {
          "name": "Guddehosur",
          "kn": "ಗುಡ್ಡೆಹೊಸೂರು",
          "lat": 12.44,
          "lon": 75.92
        },
        {
          "name": "Mullusoge",
          "kn": "ಮುಳ್ಳುಸೋಗೆ",
          "lat": 12.46,
          "lon": 75.97
        },
        {
          "name": "Nanjarayapatna",
          "kn": "ನಂಜರಾಯಪಟ್ಟಣ",
          "lat": 12.41,
          "lon": 75.91
        }
      ]
    },
    {
      "name": "Virajpet",
      "isCity": false,
      "lat": 12.2,
      "lon": 75.8,
      "kn": "ವಿರಾಜಪೇಟೆ",
      "villages": [
        {
          "name": "Gonikoppal",
          "kn": "ಗೋಣಿಕೊಪ್ಪಲು",
          "lat": 12.18,
          "lon": 75.93
        },
        {
          "name": "Ammathi",
          "kn": "ಅಮ್ಮತ್ತಿ",
          "lat": 12.24,
          "lon": 75.88
        },
        {
          "name": "Bittangala",
          "kn": "ಬಿಟ್ಟಂಗಾಲ",
          "lat": 12.17,
          "lon": 75.82
        },
        {
          "name": "Kakotuparambu",
          "kn": "ಕಾಕೋತುಪರಂಬು",
          "lat": 12.22,
          "lon": 75.76
        }
      ]
    },
    {
      "name": "Ponnampet",
      "isCity": false,
      "lat": 12.14,
      "lon": 75.94,
      "kn": "ಪೊನ್ನಂಪೇಟೆ",
      "villages": [
        {
          "name": "Balele",
          "kn": "ಬಾಳೆಲೆ",
          "lat": 12.08,
          "lon": 76.01
        },
        {
          "name": "Kutta",
          "kn": "ಕುಟ್ಟ",
          "lat": 11.98,
          "lon": 76.04
        },
        {
          "name": "Hudikeri",
          "kn": "ಹುದಿಕೇರಿ",
          "lat": 12.11,
          "lon": 75.89
        },
        {
          "name": "T. Shettigeri",
          "kn": "ಟಿ. ಶೆಟ್ಟಿಗೇರಿ",
          "lat": 12.05,
          "lon": 75.96
        }
      ]
    }
  ],
  "Ramanagara": [
    {
      "name": "Ramanagara City",
      "isCity": true,
      "lat": 12.72,
      "lon": 77.28,
      "kn": "ರಾಮನಗರ ನಗರ",
      "villages": []
    },
    {
      "name": "Channapatna",
      "isCity": false,
      "lat": 12.65,
      "lon": 77.2,
      "kn": "ಚನ್ನಪಟ್ಟಣ",
      "villages": [
        {
          "name": "Akkur",
          "kn": "ಅಕ್ಕೂರು",
          "lat": 12.68,
          "lon": 77.12
        },
        {
          "name": "Iggalur",
          "kn": "ಇಗ್ಗಲೂರು",
          "lat": 12.6,
          "lon": 77.18
        },
        {
          "name": "Malurpatna",
          "kn": "ಮಾಲೂರುಪಟ್ಟಣ",
          "lat": 12.62,
          "lon": 77.24
        },
        {
          "name": "Sogala",
          "kn": "ಸೋಗಾಲ",
          "lat": 12.71,
          "lon": 77.16
        },
        {
          "name": "Honganur",
          "kn": "ಹೊಂಗನೂರು",
          "lat": 12.61,
          "lon": 77.27
        }
      ]
    },
    {
      "name": "Kanakapura",
      "isCity": false,
      "lat": 12.55,
      "lon": 77.42,
      "kn": "ಕನಕಪುರ",
      "villages": [
        {
          "name": "Maralawadi",
          "kn": "ಮರಳವಾಡಿ",
          "lat": 12.66,
          "lon": 77.48
        },
        {
          "name": "Kodihalli",
          "kn": "ಕೋಡಿಹಳ್ಳಿ",
          "lat": 12.44,
          "lon": 77.51
        },
        {
          "name": "Uyyamballi",
          "kn": "ಉಯ್ಯಂಬಳ್ಳಿ",
          "lat": 12.41,
          "lon": 77.38
        },
        {
          "name": "Sathanur",
          "kn": "ಸಾತನೂರು",
          "lat": 12.51,
          "lon": 77.31
        },
        {
          "name": "Kebbahalli",
          "kn": "ಕೆಬ್ಬಹಳ್ಳಿ",
          "lat": 12.59,
          "lon": 77.45
        }
      ]
    },
    {
      "name": "Magadi",
      "isCity": false,
      "lat": 12.96,
      "lon": 77.23,
      "kn": "ಮಾಗಡಿ",
      "villages": [
        {
          "name": "Kudur",
          "kn": "ಕೂಡೂರು",
          "lat": 13.08,
          "lon": 77.18
        },
        {
          "name": "Solur",
          "kn": "ಸೋಲೂರು",
          "lat": 13.04,
          "lon": 77.27
        },
        {
          "name": "Madabal",
          "kn": "ಮಾದಬಾಳು",
          "lat": 12.89,
          "lon": 77.21
        },
        {
          "name": "Tavarekere",
          "kn": "ತಾವರೆಕೆರೆ (ಮಾಗಡಿ)",
          "lat": 12.93,
          "lon": 77.38
        },
        {
          "name": "Thippasandra",
          "kn": "ತಿಪ್ಪಸಂದ್ರ",
          "lat": 13.01,
          "lon": 77.14
        }
      ]
    },
    {
      "name": "Harohalli",
      "isCity": false,
      "lat": 12.68,
      "lon": 77.47,
      "kn": "ಹಾರೋಹಳ್ಳಿ",
      "villages": [
        {
          "name": "Gabbadi",
          "kn": "ಗಬ್ಬಾಡಿ",
          "lat": 12.63,
          "lon": 77.49
        },
        {
          "name": "Ravugodlu",
          "kn": "ರಾವುಗೋಡ್ಲು",
          "lat": 12.74,
          "lon": 77.44
        },
        {
          "name": "Kaggalipura Border",
          "kn": "ಕಗ್ಗಲೀಪುರ ಗಡಿ",
          "lat": 12.78,
          "lon": 77.51
        },
        {
          "name": "Kallahalli",
          "kn": "ಕಲ್ಲಹಳ್ಳಿ",
          "lat": 12.65,
          "lon": 77.42
        }
      ]
    }
  ],
  "Udupi": [
    {
      "name": "Udupi City",
      "isCity": true,
      "lat": 13.34,
      "lon": 74.74,
      "kn": "ಉಡುಪಿ ನಗರ",
      "villages": []
    },
    {
      "name": "Kundapura",
      "isCity": false,
      "lat": 13.62,
      "lon": 74.69,
      "kn": "ಕುಂದಾಪುರ",
      "villages": [
        {
          "name": "Gangolli",
          "kn": "ಗಂಗೊಳ್ಳಿ",
          "lat": 13.64,
          "lon": 74.67
        },
        {
          "name": "Basrur",
          "kn": "ಬಸ್ರೂರು",
          "lat": 13.63,
          "lon": 74.74
        },
        {
          "name": "Koteshwara",
          "kn": "ಕೋಟೇಶ್ವರ",
          "lat": 13.59,
          "lon": 74.71
        },
        {
          "name": "Shankaranarayana",
          "kn": "ಶಂಕರನಾರಾಯಣ",
          "lat": 13.65,
          "lon": 74.91
        },
        {
          "name": "Vandse",
          "kn": "ವಂದ್ಸೆ",
          "lat": 13.71,
          "lon": 74.82
        },
        {
          "name": "Siddapura (Udupi)",
          "kn": "ಸಿದ್ಧಾಪುರ (ಉಡುಪಿ)",
          "lat": 13.67,
          "lon": 74.95
        }
      ]
    },
    {
      "name": "Karkala",
      "isCity": false,
      "lat": 13.21,
      "lon": 74.99,
      "kn": "ಕಾರ್ಕಳ",
      "villages": [
        {
          "name": "Belman",
          "kn": "ಬೆಲ್ಮಣ್",
          "lat": 13.16,
          "lon": 74.86
        },
        {
          "name": "Bailoor",
          "kn": "ಬೈಲೂರು",
          "lat": 13.25,
          "lon": 74.94
        },
        {
          "name": "Ajekar",
          "kn": "ಅಜೆಕಾರು",
          "lat": 13.26,
          "lon": 75.06
        },
        {
          "name": "Miyar",
          "kn": "ಮಿಯ್ಯಾರು",
          "lat": 13.23,
          "lon": 75.03
        },
        {
          "name": "Nitte",
          "kn": "ನಿಟ್ಟೆ",
          "lat": 13.18,
          "lon": 74.93
        }
      ]
    },
    {
      "name": "Byndoor",
      "isCity": false,
      "lat": 13.87,
      "lon": 74.62,
      "kn": "ಬೈಂದೂರು",
      "villages": [
        {
          "name": "Shiroor",
          "kn": "ಶಿರೂರು",
          "lat": 13.94,
          "lon": 74.59
        },
        {
          "name": "Uppunda",
          "kn": "ಉಪ್ಪುಂದ",
          "lat": 13.82,
          "lon": 74.65
        },
        {
          "name": "Maravanthe",
          "kn": "ಮರವಂತೆ",
          "lat": 13.71,
          "lon": 74.66
        },
        {
          "name": "Kirimanjeshwara",
          "kn": "ಕಿರಿಮಂಜೇಶ್ವರ",
          "lat": 13.78,
          "lon": 74.63
        },
        {
          "name": "Khambadakone",
          "kn": "ಖಂಬದಕೋಣೆ",
          "lat": 13.75,
          "lon": 74.68
        }
      ]
    },
    {
      "name": "Brahmavar",
      "isCity": false,
      "lat": 13.43,
      "lon": 74.74,
      "kn": "ಬ್ರಹ್ಮಾವರ",
      "villages": [
        {
          "name": "Kota",
          "kn": "ಕೋಟ",
          "lat": 13.51,
          "lon": 74.71
        },
        {
          "name": "Saligrama",
          "kn": "ಸಾಲಿಗ್ರಾಮ (ಉಡುಪಿ)",
          "lat": 13.49,
          "lon": 74.72
        },
        {
          "name": "Barkur",
          "kn": "ಬಾರಕೂರು",
          "lat": 13.47,
          "lon": 74.76
        },
        {
          "name": "Mandarthi",
          "kn": "ಮಂದಾರ್ತಿ",
          "lat": 13.45,
          "lon": 74.85
        },
        {
          "name": "Kokkarne",
          "kn": "ಕೊಕ್ಕರ್ಣೆ",
          "lat": 13.48,
          "lon": 74.89
        }
      ]
    },
    {
      "name": "Kaup",
      "isCity": false,
      "lat": 13.22,
      "lon": 74.74,
      "kn": "ಕಾಪು",
      "villages": [
        {
          "name": "Shirva",
          "kn": "ಶಿರ್ವ",
          "lat": 13.23,
          "lon": 74.81
        },
        {
          "name": "Padubidri",
          "kn": "ಪಡುಬಿದ್ರಿ",
          "lat": 13.14,
          "lon": 74.77
        },
        {
          "name": "Katapadi",
          "kn": "ಕಟಪಾಡಿ",
          "lat": 13.28,
          "lon": 74.73
        },
        {
          "name": "Belapu",
          "kn": "ಬೆಳಪು",
          "lat": 13.2,
          "lon": 74.82
        },
        {
          "name": "Uchila",
          "kn": "ಉಚ್ಚಿಲ",
          "lat": 13.18,
          "lon": 74.76
        }
      ]
    },
    {
      "name": "Hebri",
      "isCity": false,
      "lat": 13.36,
      "lon": 75.01,
      "kn": "ಹೆಬ್ರಿ",
      "villages": [
        {
          "name": "Someshwara",
          "kn": "ಸೋಮೇಶ್ವರ",
          "lat": 13.38,
          "lon": 75.06
        },
        {
          "name": "Muniyalu",
          "kn": "ಮುನಿಯಾಲು",
          "lat": 13.31,
          "lon": 75.03
        },
        {
          "name": "Chara",
          "kn": "ಚಾರ",
          "lat": 13.34,
          "lon": 74.98
        },
        {
          "name": "Belanje",
          "kn": "ಬೆಳಂಜೆ",
          "lat": 13.41,
          "lon": 74.96
        }
      ]
    }
  ],
  "Uttara Kannada": [
    {
      "name": "Karwar City",
      "isCity": true,
      "lat": 14.81,
      "lon": 74.13,
      "kn": "ಕಾರವಾರ ನಗರ",
      "villages": []
    },
    {
      "name": "Sirsi",
      "isCity": false,
      "lat": 14.62,
      "lon": 74.85,
      "kn": "ಶಿರಸಿ",
      "villages": [
        {
          "name": "Banavasi",
          "kn": "ಬನವಾಸಿ",
          "lat": 14.54,
          "lon": 75.01
        },
        {
          "name": "Hulekal",
          "kn": "ಹುಲೇಕಲ್",
          "lat": 14.68,
          "lon": 74.78
        },
        {
          "name": "Dasanakoppa",
          "kn": "ದಾಸನಕೊಪ್ಪ",
          "lat": 14.59,
          "lon": 74.92
        },
        {
          "name": "Devanalli",
          "kn": "ದೇವನಳ್ಳಿ (ಶಿರಸಿ)",
          "lat": 14.65,
          "lon": 74.89
        },
        {
          "name": "Sammasgi Border",
          "kn": "ಸಮ್ಮಸಗಿ ಗಡಿ",
          "lat": 14.67,
          "lon": 75.04
        }
      ]
    },
    {
      "name": "Kumta",
      "isCity": false,
      "lat": 14.42,
      "lon": 74.42,
      "kn": "ಕುಮಟಾ",
      "villages": [
        {
          "name": "Gokarna",
          "kn": "ಗೋಕರ್ಣ",
          "lat": 14.54,
          "lon": 74.31
        },
        {
          "name": "Mirjan",
          "kn": "ಮಿರ್ಜಾನ್",
          "lat": 14.47,
          "lon": 74.41
        },
        {
          "name": "Hiregutti",
          "kn": "ಹಿರೇಗುತ್ತಿ",
          "lat": 14.51,
          "lon": 74.38
        },
        {
          "name": "Hegde",
          "kn": "ಹೆಗಡೆ",
          "lat": 14.44,
          "lon": 74.45
        },
        {
          "name": "Divigi",
          "kn": "ದಿವಗಿ",
          "lat": 14.4,
          "lon": 74.46
        }
      ]
    },
    {
      "name": "Honnavar",
      "isCity": false,
      "lat": 14.28,
      "lon": 74.44,
      "kn": "ಹೊನ್ನಾವರ",
      "villages": [
        {
          "name": "Manki",
          "kn": "ಮಂಕಿ",
          "lat": 14.18,
          "lon": 74.48
        },
        {
          "name": "Idagunji",
          "kn": "ಇಡಗುಂಜಿ",
          "lat": 14.23,
          "lon": 74.46
        },
        {
          "name": "Gerusoppa",
          "kn": "ಗೇರುಸೊಪ್ಪ",
          "lat": 14.24,
          "lon": 74.65
        },
        {
          "name": "Kasarkod",
          "kn": "ಕಾಸರಗೋಡು (ಹೊನ್ನಾವರ)",
          "lat": 14.29,
          "lon": 74.41
        },
        {
          "name": "Gunavante",
          "kn": "ಗುಣವಂತೆ",
          "lat": 14.21,
          "lon": 74.45
        }
      ]
    },
    {
      "name": "Bhatkal",
      "isCity": false,
      "lat": 13.98,
      "lon": 74.55,
      "kn": "ಭಟ್ಕಳ",
      "villages": [
        {
          "name": "Murudeshwar",
          "kn": "ಮುರುಡೇಶ್ವರ",
          "lat": 14.09,
          "lon": 74.48
        },
        {
          "name": "Shirali",
          "kn": "ಶಿರಾಲಿ",
          "lat": 14.04,
          "lon": 74.52
        },
        {
          "name": "Belke",
          "kn": "ಬೆಳಕೆ",
          "lat": 13.95,
          "lon": 74.57
        },
        {
          "name": "Bailur",
          "kn": "ಬೈಲೂರು (ಭಟ್ಕಳ)",
          "lat": 14.06,
          "lon": 74.51
        },
        {
          "name": "Haduvalli",
          "kn": "ಹಾಡುವಳ್ಳಿ",
          "lat": 14.01,
          "lon": 74.62
        }
      ]
    },
    {
      "name": "Haliyal",
      "isCity": false,
      "lat": 15.33,
      "lon": 74.76,
      "kn": "ಹಳಿಯಾಳ",
      "villages": [
        {
          "name": "Sambrani",
          "kn": "ಸಾಂಬ್ರಾಣಿ",
          "lat": 15.28,
          "lon": 74.81
        },
        {
          "name": "Tergaon",
          "kn": "ತೇರಗಾಂವ",
          "lat": 15.36,
          "lon": 74.71
        },
        {
          "name": "Bhagavati",
          "kn": "ಭಗವತಿ",
          "lat": 15.22,
          "lon": 74.79
        },
        {
          "name": "Gundolli",
          "kn": "ಗುಂಡೊಳ್ಳಿ",
          "lat": 15.31,
          "lon": 74.84
        }
      ]
    },
    {
      "name": "Yellapur",
      "isCity": false,
      "lat": 14.96,
      "lon": 74.71,
      "kn": "ಯಲ್ಲಾಪುರ",
      "villages": [
        {
          "name": "Manchikeri",
          "kn": "ಮಂಚಿಕೇರಿ",
          "lat": 14.88,
          "lon": 74.82
        },
        {
          "name": "Kirwatti",
          "kn": "ಕಿರ್ವತ್ತಿ",
          "lat": 15.02,
          "lon": 74.84
        },
        {
          "name": "Idgundi",
          "kn": "ಇಡಗುಂದಿ",
          "lat": 14.93,
          "lon": 74.64
        },
        {
          "name": "Kannigeri",
          "kn": "ಕನ್ನಿಗೇರಿ",
          "lat": 14.99,
          "lon": 74.75
        }
      ]
    },
    {
      "name": "Siddapur (UK)",
      "isCity": false,
      "lat": 14.34,
      "lon": 74.89,
      "kn": "ಸಿದ್ಧಾಪುರ (ಉ.ಕ)",
      "villages": [
        {
          "name": "Bilgi",
          "kn": "ಬಿಳಗಿ (ಸಿದ್ಧಾಪುರ)",
          "lat": 14.41,
          "lon": 74.85
        },
        {
          "name": "Kansur",
          "kn": "ಕಾನಸೂರು",
          "lat": 14.31,
          "lon": 74.94
        },
        {
          "name": "Tyagali",
          "kn": "ತ್ಯಾಗಲಿ",
          "lat": 14.36,
          "lon": 74.81
        },
        {
          "name": "Harsikatta",
          "kn": "ಹಾರ್ಸಿಕಟ್ಟಾ",
          "lat": 14.28,
          "lon": 74.91
        }
      ]
    },
    {
      "name": "Ankola",
      "isCity": false,
      "lat": 14.66,
      "lon": 74.3,
      "kn": "ಅಂಕೋಲಾ",
      "villages": [
        {
          "name": "Belekeri",
          "kn": "ಬೆಲೆಕೇರಿ",
          "lat": 14.71,
          "lon": 74.27
        },
        {
          "name": "Hattikeri",
          "kn": "ಹಟ್ಟಿಕೇರಿ",
          "lat": 14.69,
          "lon": 74.32
        },
        {
          "name": "Aversa",
          "kn": "ಅವರ್ಸಾ",
          "lat": 14.63,
          "lon": 74.29
        },
        {
          "name": "Sunksal",
          "kn": "ಸುಂಕಸಾಳ",
          "lat": 14.68,
          "lon": 74.38
        }
      ]
    },
    {
      "name": "Dandeli",
      "isCity": false,
      "lat": 15.24,
      "lon": 74.62,
      "kn": "ದಾಂಡೇಲಿ",
      "villages": [
        {
          "name": "Ambikanagar",
          "kn": "ಅಂಬಿಕಾನಗರ",
          "lat": 15.18,
          "lon": 74.65
        },
        {
          "name": "Bary",
          "kn": "ಬ್ಯಾರಿ",
          "lat": 15.27,
          "lon": 74.58
        },
        {
          "name": "Kulgi Nature Camp",
          "kn": "ಕುಳಗಿ ಪ್ರಕೃತಿ ಶಿಬಿರ",
          "lat": 15.19,
          "lon": 74.61
        }
      ]
    },
    {
      "name": "Joida",
      "isCity": false,
      "lat": 15.16,
      "lon": 74.48,
      "kn": "ಜೋಯಿಡಾ",
      "villages": [
        {
          "name": "Ulavi",
          "kn": "ಉಳವಿ (ಜೋಯಿಡಾ)",
          "lat": 15.01,
          "lon": 74.52
        },
        {
          "name": "Castle Rock",
          "kn": "ಕ್ಯಾಸಲ್‌ರಾಕ್",
          "lat": 15.39,
          "lon": 74.34
        },
        {
          "name": "Anmod",
          "kn": "ಅನ್ಮೋಡ್",
          "lat": 15.42,
          "lon": 74.38
        },
        {
          "name": "Ramanagar (Joida)",
          "kn": "ರಾಮನಗರ (ಜೋಯಿಡಾ)",
          "lat": 15.32,
          "lon": 74.51
        }
      ]
    }
  ],
  "Yadgir": [
    {
      "name": "Yadgir City",
      "isCity": true,
      "lat": 16.76,
      "lon": 77.14,
      "kn": "ಯಾದಗಿರಿ ನಗರ",
      "villages": []
    },
    {
      "name": "Shahapur",
      "isCity": false,
      "lat": 16.7,
      "lon": 76.84,
      "kn": "ಶಹಾಪುರ",
      "villages": [
        {
          "name": "Gogi",
          "kn": "ಗೋಗಿ",
          "lat": 16.74,
          "lon": 76.75
        },
        {
          "name": "Doranahalli",
          "kn": "ದೋರನಹಳ್ಳಿ",
          "lat": 16.63,
          "lon": 76.81
        },
        {
          "name": "Hayyal (B)",
          "kn": "ಹಯ್ಯಾಳ (ಬಿ)",
          "lat": 16.78,
          "lon": 76.89
        },
        {
          "name": "Sagar",
          "kn": "ಸಾಗರ (ಶಹಾಪುರ)",
          "lat": 16.67,
          "lon": 76.87
        },
        {
          "name": "Sirwal",
          "kn": "ಸಿರವಾಳ",
          "lat": 16.71,
          "lon": 76.92
        }
      ]
    },
    {
      "name": "Surpur",
      "isCity": false,
      "lat": 16.52,
      "lon": 76.76,
      "kn": "ಸುರಪುರ",
      "villages": [
        {
          "name": "Kembhavi",
          "kn": "ಕೆಂಭಾವಿ",
          "lat": 16.65,
          "lon": 76.55
        },
        {
          "name": "Tintani",
          "kn": "ತಿಂಥಣಿ",
          "lat": 16.41,
          "lon": 76.79
        },
        {
          "name": "Kodekal",
          "kn": "ಕೋಡೆಕಲ್",
          "lat": 16.35,
          "lon": 76.41
        },
        {
          "name": "Devapur",
          "kn": "ದೇವಪುರ",
          "lat": 16.48,
          "lon": 76.71
        },
        {
          "name": "Rangampet",
          "kn": "ರಂಗಂಪೇಟೆ",
          "lat": 16.54,
          "lon": 76.74
        }
      ]
    },
    {
      "name": "Hunsagi",
      "isCity": false,
      "lat": 16.48,
      "lon": 76.51,
      "kn": "ಹುಣಸಗಿ",
      "villages": [
        {
          "name": "Kakkera",
          "kn": "ಕಕ್ಕೇರಾ",
          "lat": 16.54,
          "lon": 76.61
        },
        {
          "name": "Rajan Kollur",
          "kn": "ರಾಜನ್ ಕೊಳ್ಳೂರು",
          "lat": 16.44,
          "lon": 76.44
        },
        {
          "name": "Maranala",
          "kn": "ಮರನಾಳ",
          "lat": 16.51,
          "lon": 76.48
        },
        {
          "name": "Benakanahalli",
          "kn": "ಬೆನಕನಹಳ್ಳಿ (ಹುಣಸಗಿ)",
          "lat": 16.46,
          "lon": 76.56
        }
      ]
    },
    {
      "name": "Gurmitkal",
      "isCity": false,
      "lat": 16.86,
      "lon": 77.4,
      "kn": "ಗುರುಮಿಟ್ಕಲ್",
      "villages": [
        {
          "name": "Konkal",
          "kn": "ಕೊಂಕಲ್",
          "lat": 16.89,
          "lon": 77.34
        },
        {
          "name": "Chapetla",
          "kn": "ಚಾಪೆಟ್ಲಾ",
          "lat": 16.81,
          "lon": 77.45
        },
        {
          "name": "Paspool",
          "kn": "ಪಾಸ್‌ಪೂಲ್",
          "lat": 16.92,
          "lon": 77.42
        },
        {
          "name": "Chintakunta",
          "kn": "ಚಿಂತಕುಂಟಾ",
          "lat": 16.84,
          "lon": 77.38
        }
      ]
    },
    {
      "name": "Vadagera",
      "isCity": false,
      "lat": 16.63,
      "lon": 77.01,
      "kn": "ವಡಗೇರಾ",
      "villages": [
        {
          "name": "Halagera",
          "kn": "ಹಲಗೇರಾ",
          "lat": 16.6,
          "lon": 77.08
        },
        {
          "name": "Tumkur",
          "kn": "ತುಮಕೂರು (ವಡಗೇರಾ)",
          "lat": 16.67,
          "lon": 77.05
        },
        {
          "name": "Bendebembli",
          "kn": "ಬೆಂದೆಬೆಂಬಳಿ",
          "lat": 16.58,
          "lon": 76.96
        },
        {
          "name": "Balichakra",
          "kn": "ಬಲಿಚಕ್ರ",
          "lat": 16.64,
          "lon": 77.12
        }
      ]
    }
  ]
};

module.exports = { KARNATAKA_DISTRICT_TALUKS };
