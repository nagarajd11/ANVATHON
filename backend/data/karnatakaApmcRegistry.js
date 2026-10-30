/**
 * Comprehensive Karnataka APMC Market Registry
 * Covers all 31 districts and 188 major APMC yards and taluk sub-markets in Karnataka.
 */

const ALL_KARNATAKA_APMCS = [
  // --- 1. Bagalkot District ---
  { market_name: 'Bagalkot APMC', district: 'Bagalkot', market_town: 'Bagalkot', latitude: 16.18, longitude: 75.70, is_terminal_market: false },
  { market_name: 'Jamkhandi APMC', district: 'Bagalkot', market_town: 'Jamkhandi', latitude: 16.51, longitude: 75.29, is_terminal_market: false },
  { market_name: 'Badami APMC', district: 'Bagalkot', market_town: 'Badami', latitude: 15.92, longitude: 75.68, is_terminal_market: false },
  { market_name: 'Mudhol APMC', district: 'Bagalkot', market_town: 'Mudhol', latitude: 16.34, longitude: 75.28, is_terminal_market: false },
  { market_name: 'Bilgi APMC', district: 'Bagalkot', market_town: 'Bilgi', latitude: 16.35, longitude: 75.62, is_terminal_market: false },
  { market_name: 'Ilkal APMC', district: 'Bagalkot', market_town: 'Ilkal', latitude: 15.96, longitude: 76.13, is_terminal_market: false },
  { market_name: 'Hungund APMC', district: 'Bagalkot', market_town: 'Hungund', latitude: 16.06, longitude: 76.06, is_terminal_market: false },
  { market_name: 'Guledgudda APMC', district: 'Bagalkot', market_town: 'Guledgudda', latitude: 16.05, longitude: 75.80, is_terminal_market: false },

  // --- 2. Ballari District ---
  { market_name: 'Ballari APMC', district: 'Ballari', market_town: 'Ballari', latitude: 15.14, longitude: 76.92, is_terminal_market: true },
  { market_name: 'Siruguppa APMC', district: 'Ballari', market_town: 'Siruguppa', latitude: 15.63, longitude: 76.90, is_terminal_market: false },
  { market_name: 'Kampli APMC', district: 'Ballari', market_town: 'Kampli', latitude: 15.40, longitude: 76.60, is_terminal_market: false },
  { market_name: 'Kurugodu APMC', district: 'Ballari', market_town: 'Kurugodu', latitude: 15.35, longitude: 76.83, is_terminal_market: false },
  { market_name: 'Sandur APMC', district: 'Ballari', market_town: 'Sandur', latitude: 15.09, longitude: 76.55, is_terminal_market: false },

  // --- 3. Belagavi District ---
  { market_name: 'Belagavi APMC', district: 'Belagavi', market_town: 'Belagavi', latitude: 15.85, longitude: 74.50, is_terminal_market: true },
  { market_name: 'Gokak APMC', district: 'Belagavi', market_town: 'Gokak', latitude: 16.17, longitude: 74.83, is_terminal_market: false },
  { market_name: 'Bailhongal APMC', district: 'Belagavi', market_town: 'Bailhongal', latitude: 15.81, longitude: 74.86, is_terminal_market: false },
  { market_name: 'Athani APMC', district: 'Belagavi', market_town: 'Athani', latitude: 16.73, longitude: 75.06, is_terminal_market: false },
  { market_name: 'Chikkodi APMC', district: 'Belagavi', market_town: 'Chikkodi', latitude: 16.43, longitude: 74.59, is_terminal_market: false },
  { market_name: 'Nippani APMC', district: 'Belagavi', market_town: 'Nippani', latitude: 16.40, longitude: 74.38, is_terminal_market: false },
  { market_name: 'Ramdurg APMC', district: 'Belagavi', market_town: 'Ramdurg', latitude: 15.95, longitude: 75.30, is_terminal_market: false },
  { market_name: 'Raybag APMC', district: 'Belagavi', market_town: 'Raybag', latitude: 16.49, longitude: 74.78, is_terminal_market: false },
  { market_name: 'Saundatti APMC', district: 'Belagavi', market_town: 'Saundatti', latitude: 15.77, longitude: 75.12, is_terminal_market: false },
  { market_name: 'Sankeshwar APMC', district: 'Belagavi', market_town: 'Sankeshwar', latitude: 16.26, longitude: 74.48, is_terminal_market: false },
  { market_name: 'Khanapur APMC', district: 'Belagavi', market_town: 'Khanapur', latitude: 15.64, longitude: 74.51, is_terminal_market: false },
  { market_name: 'Hukkeri APMC', district: 'Belagavi', market_town: 'Hukkeri', latitude: 16.23, longitude: 74.60, is_terminal_market: false },

  // --- 4. Bengaluru Urban District ---
  { market_name: 'Yeshwanthpur Market Yard', district: 'Bengaluru Urban', market_town: 'Yeshwanthpur', latitude: 13.02, longitude: 77.55, is_terminal_market: true },
  { market_name: 'Bengaluru Market Yard', district: 'Bengaluru Urban', market_town: 'Kalasipalya', latitude: 12.96, longitude: 77.58, is_terminal_market: true },
  { market_name: 'Singena Agrahara Fruit Market Yard', district: 'Bengaluru Urban', market_town: 'Singena Agrahara', latitude: 12.87, longitude: 77.68, is_terminal_market: true },
  { market_name: 'KR Market APMC Sub-Yard', district: 'Bengaluru Urban', market_town: 'KR Market', latitude: 12.965, longitude: 77.575, is_terminal_market: false },
  { market_name: 'Kengeri APMC Yard', district: 'Bengaluru Urban', market_town: 'Kengeri', latitude: 12.91, longitude: 77.48, is_terminal_market: false },

  // --- 5. Bengaluru Rural District ---
  { market_name: 'Doddaballapur APMC', district: 'Bengaluru Rural', market_town: 'Doddaballapur', latitude: 13.29, longitude: 77.54, is_terminal_market: false },
  { market_name: 'Hoskote APMC', district: 'Bengaluru Rural', market_town: 'Hoskote', latitude: 13.07, longitude: 77.79, is_terminal_market: false },
  { market_name: 'Devanahalli APMC', district: 'Bengaluru Rural', market_town: 'Devanahalli', latitude: 13.25, longitude: 77.71, is_terminal_market: false },
  { market_name: 'Nelamangala APMC', district: 'Bengaluru Rural', market_town: 'Nelamangala', latitude: 13.10, longitude: 77.39, is_terminal_market: false },

  // --- 6. Bidar District ---
  { market_name: 'Bidar APMC', district: 'Bidar', market_town: 'Bidar', latitude: 17.91, longitude: 77.52, is_terminal_market: true },
  { market_name: 'Bhalki APMC', district: 'Bidar', market_town: 'Bhalki', latitude: 18.04, longitude: 77.22, is_terminal_market: false },
  { market_name: 'Humnabad APMC', district: 'Bidar', market_town: 'Humnabad', latitude: 17.77, longitude: 77.13, is_terminal_market: false },
  { market_name: 'Basavakalyan APMC', district: 'Bidar', market_town: 'Basavakalyan', latitude: 17.87, longitude: 76.95, is_terminal_market: false },
  { market_name: 'Aurad APMC', district: 'Bidar', market_town: 'Aurad', latitude: 18.25, longitude: 77.43, is_terminal_market: false },

  // --- 7. Chamarajanagar District ---
  { market_name: 'Chamarajanagar APMC', district: 'Chamarajanagar', market_town: 'Chamarajanagar', latitude: 11.92, longitude: 76.94, is_terminal_market: false },
  { market_name: 'Gundlupet APMC', district: 'Chamarajanagar', market_town: 'Gundlupet', latitude: 11.81, longitude: 76.69, is_terminal_market: false },
  { market_name: 'Kollegal APMC', district: 'Chamarajanagar', market_town: 'Kollegal', latitude: 12.16, longitude: 77.12, is_terminal_market: false },
  { market_name: 'Yelandur APMC', district: 'Chamarajanagar', market_town: 'Yelandur', latitude: 12.06, longitude: 77.03, is_terminal_market: false },
  { market_name: 'Hanur APMC', district: 'Chamarajanagar', market_town: 'Hanur', latitude: 12.10, longitude: 77.30, is_terminal_market: false },

  // --- 8. Chikkaballapur District ---
  { market_name: 'Chikkaballapur APMC', district: 'Chikkaballapur', market_town: 'Chikkaballapur', latitude: 13.43, longitude: 77.73, is_terminal_market: false },
  { market_name: 'Chintamani APMC', district: 'Chikkaballapur', market_town: 'Chintamani', latitude: 13.40, longitude: 78.06, is_terminal_market: true },
  { market_name: 'Sidlaghatta APMC', district: 'Chikkaballapur', market_town: 'Sidlaghatta', latitude: 13.39, longitude: 77.86, is_terminal_market: false },
  { market_name: 'Gauribidanur APMC', district: 'Chikkaballapur', market_town: 'Gauribidanur', latitude: 13.61, longitude: 77.52, is_terminal_market: false },
  { market_name: 'Bagepalli APMC', district: 'Chikkaballapur', market_town: 'Bagepalli', latitude: 13.78, longitude: 77.79, is_terminal_market: false },
  { market_name: 'Gudibanda APMC', district: 'Chikkaballapur', market_town: 'Gudibanda', latitude: 13.67, longitude: 77.70, is_terminal_market: false },

  // --- 9. Chikkamagaluru District ---
  { market_name: 'Chikkamagaluru APMC', district: 'Chikkamagaluru', market_town: 'Chikkamagaluru', latitude: 13.32, longitude: 75.77, is_terminal_market: true },
  { market_name: 'Tarikere APMC', district: 'Chikkamagaluru', market_town: 'Tarikere', latitude: 13.71, longitude: 75.81, is_terminal_market: false },
  { market_name: 'Kadur APMC', district: 'Chikkamagaluru', market_town: 'Kadur', latitude: 13.55, longitude: 76.01, is_terminal_market: false },
  { market_name: 'Mudigere APMC', district: 'Chikkamagaluru', market_town: 'Mudigere', latitude: 13.14, longitude: 75.64, is_terminal_market: false },
  { market_name: 'Koppa APMC', district: 'Chikkamagaluru', market_town: 'Koppa', latitude: 13.53, longitude: 75.36, is_terminal_market: false },
  { market_name: 'Sringeri APMC', district: 'Chikkamagaluru', market_town: 'Sringeri', latitude: 13.42, longitude: 75.26, is_terminal_market: false },
  { market_name: 'Narasimharajapura APMC', district: 'Chikkamagaluru', market_town: 'Narasimharajapura', latitude: 13.62, longitude: 75.52, is_terminal_market: false },

  // --- 10. Chitradurga District ---
  { market_name: 'Chitradurga APMC', district: 'Chitradurga', market_town: 'Chitradurga', latitude: 14.23, longitude: 76.40, is_terminal_market: true },
  { market_name: 'Hiriyur APMC', district: 'Chitradurga', market_town: 'Hiriyur', latitude: 13.95, longitude: 76.62, is_terminal_market: false },
  { market_name: 'Challakere APMC', district: 'Chitradurga', market_town: 'Challakere', latitude: 14.31, longitude: 76.65, is_terminal_market: true },
  { market_name: 'Hosadurga APMC', district: 'Chitradurga', market_town: 'Hosadurga', latitude: 13.80, longitude: 76.29, is_terminal_market: false },
  { market_name: 'Holalkere APMC', district: 'Chitradurga', market_town: 'Holalkere', latitude: 14.03, longitude: 76.19, is_terminal_market: false },
  { market_name: 'Molakalmuru APMC', district: 'Chitradurga', market_town: 'Molakalmuru', latitude: 14.73, longitude: 76.75, is_terminal_market: false },

  // --- 11. Dakshina Kannada District ---
  { market_name: 'Mangaluru APMC', district: 'Dakshina Kannada', market_town: 'Mangaluru', latitude: 12.91, longitude: 74.86, is_terminal_market: true },
  { market_name: 'Puttur APMC', district: 'Dakshina Kannada', market_town: 'Puttur', latitude: 12.77, longitude: 75.20, is_terminal_market: false },
  { market_name: 'Bantwal APMC', district: 'Dakshina Kannada', market_town: 'Bantwal', latitude: 12.89, longitude: 75.03, is_terminal_market: false },
  { market_name: 'Belthangady APMC', district: 'Dakshina Kannada', market_town: 'Belthangady', latitude: 13.00, longitude: 75.26, is_terminal_market: false },
  { market_name: 'Sullia APMC', district: 'Dakshina Kannada', market_town: 'Sullia', latitude: 12.56, longitude: 75.39, is_terminal_market: false },
  { market_name: 'Moodabidri APMC', district: 'Dakshina Kannada', market_town: 'Moodabidri', latitude: 13.07, longitude: 74.99, is_terminal_market: false },

  // --- 12. Davanagere District ---
  { market_name: 'Davanagere APMC', district: 'Davanagere', market_town: 'Davanagere', latitude: 14.47, longitude: 75.92, is_terminal_market: true },
  { market_name: 'Harihar APMC', district: 'Davanagere', market_town: 'Harihar', latitude: 14.51, longitude: 75.80, is_terminal_market: false },
  { market_name: 'Channagiri APMC', district: 'Davanagere', market_town: 'Channagiri', latitude: 14.12, longitude: 75.93, is_terminal_market: false },
  { market_name: 'Honnali APMC', district: 'Davanagere', market_town: 'Honnali', latitude: 14.25, longitude: 75.64, is_terminal_market: false },
  { market_name: 'Jagalur APMC', district: 'Davanagere', market_town: 'Jagalur', latitude: 14.52, longitude: 76.34, is_terminal_market: false },
  { market_name: 'Nyamathi APMC', district: 'Davanagere', market_town: 'Nyamathi', latitude: 14.15, longitude: 75.58, is_terminal_market: false },

  // --- 13. Dharwad District ---
  { market_name: 'Hubballi APMC', district: 'Dharwad', market_town: 'Hubballi', latitude: 15.36, longitude: 75.12, is_terminal_market: true },
  { market_name: 'Dharwad APMC', district: 'Dharwad', market_town: 'Dharwad', latitude: 15.46, longitude: 75.01, is_terminal_market: false },
  { market_name: 'Kundgol APMC', district: 'Dharwad', market_town: 'Kundgol', latitude: 15.25, longitude: 75.25, is_terminal_market: false },
  { market_name: 'Kalghatgi APMC', district: 'Dharwad', market_town: 'Kalghatgi', latitude: 15.18, longitude: 74.97, is_terminal_market: false },
  { market_name: 'Navalgund APMC', district: 'Dharwad', market_town: 'Navalgund', latitude: 15.56, longitude: 75.36, is_terminal_market: false },
  { market_name: 'Alnavar APMC', district: 'Dharwad', market_town: 'Alnavar', latitude: 15.43, longitude: 74.74, is_terminal_market: false },

  // --- 14. Gadag District ---
  { market_name: 'Gadag APMC', district: 'Gadag', market_town: 'Gadag', latitude: 15.43, longitude: 75.63, is_terminal_market: true },
  { market_name: 'Nargund APMC', district: 'Gadag', market_town: 'Nargund', latitude: 15.72, longitude: 75.39, is_terminal_market: false },
  { market_name: 'Ron APMC', district: 'Gadag', market_town: 'Ron', latitude: 15.70, longitude: 75.73, is_terminal_market: false },
  { market_name: 'Shirahatti APMC', district: 'Gadag', market_town: 'Shirahatti', latitude: 15.23, longitude: 75.58, is_terminal_market: false },
  { market_name: 'Mundargi APMC', district: 'Gadag', market_town: 'Mundargi', latitude: 15.21, longitude: 75.88, is_terminal_market: false },
  { market_name: 'Gajendragad APMC', district: 'Gadag', market_town: 'Gajendragad', latitude: 15.73, longitude: 75.98, is_terminal_market: false },
  { market_name: 'Lakshmeshwar APMC', district: 'Gadag', market_town: 'Lakshmeshwar', latitude: 15.13, longitude: 75.47, is_terminal_market: false },

  // --- 15. Hassan District ---
  { market_name: 'Hassan APMC', district: 'Hassan', market_town: 'Hassan', latitude: 13.00, longitude: 76.10, is_terminal_market: true },
  { market_name: 'Arsikere APMC', district: 'Hassan', market_town: 'Arsikere', latitude: 13.31, longitude: 76.26, is_terminal_market: true },
  { market_name: 'Channarayapatna APMC', district: 'Hassan', market_town: 'Channarayapatna', latitude: 12.90, longitude: 76.39, is_terminal_market: false },
  { market_name: 'Belur APMC', district: 'Hassan', market_town: 'Belur', latitude: 13.16, longitude: 75.86, is_terminal_market: false },
  { market_name: 'Holenarasipura APMC', district: 'Hassan', market_town: 'Holenarasipura', latitude: 12.79, longitude: 76.24, is_terminal_market: false },
  { market_name: 'Sakleshpur APMC', district: 'Hassan', market_town: 'Sakleshpur', latitude: 12.97, longitude: 75.78, is_terminal_market: true },
  { market_name: 'Arkalgud APMC', district: 'Hassan', market_town: 'Arkalgud', latitude: 12.77, longitude: 76.06, is_terminal_market: false },
  { market_name: 'Alur APMC', district: 'Hassan', market_town: 'Alur', latitude: 12.98, longitude: 75.98, is_terminal_market: false },

  // --- 16. Haveri District ---
  { market_name: 'Haveri APMC', district: 'Haveri', market_town: 'Haveri', latitude: 14.79, longitude: 75.40, is_terminal_market: false },
  { market_name: 'Ranebennur APMC', district: 'Haveri', market_town: 'Ranebennur', latitude: 14.62, longitude: 75.62, is_terminal_market: true },
  { market_name: 'Byadgi APMC', district: 'Haveri', market_town: 'Byadgi', latitude: 14.68, longitude: 75.49, is_terminal_market: true },
  { market_name: 'Hirekerur APMC', district: 'Haveri', market_town: 'Hirekerur', latitude: 14.46, longitude: 75.39, is_terminal_market: false },
  { market_name: 'Shiggaon APMC', district: 'Haveri', market_town: 'Shiggaon', latitude: 14.99, longitude: 75.23, is_terminal_market: false },
  { market_name: 'Savanur APMC', district: 'Haveri', market_town: 'Savanur', latitude: 14.97, longitude: 75.34, is_terminal_market: false },
  { market_name: 'Hangal APMC', district: 'Haveri', market_town: 'Hangal', latitude: 14.76, longitude: 75.13, is_terminal_market: false },

  // --- 17. Kalaburagi District ---
  { market_name: 'Kalaburagi APMC', district: 'Kalaburagi', market_town: 'Kalaburagi', latitude: 17.33, longitude: 76.83, is_terminal_market: true },
  { market_name: 'Chincholi APMC', district: 'Kalaburagi', market_town: 'Chincholi', latitude: 17.47, longitude: 77.43, is_terminal_market: false },
  { market_name: 'Aland APMC', district: 'Kalaburagi', market_town: 'Aland', latitude: 17.57, longitude: 76.57, is_terminal_market: false },
  { market_name: 'Afzalpur APMC', district: 'Kalaburagi', market_town: 'Afzalpur', latitude: 17.20, longitude: 76.36, is_terminal_market: false },
  { market_name: 'Chittapur APMC', district: 'Kalaburagi', market_town: 'Chittapur', latitude: 17.12, longitude: 77.09, is_terminal_market: false },
  { market_name: 'Sedam APMC', district: 'Kalaburagi', market_town: 'Sedam', latitude: 17.18, longitude: 77.28, is_terminal_market: false },
  { market_name: 'Jewargi APMC', district: 'Kalaburagi', market_town: 'Jewargi', latitude: 17.02, longitude: 76.77, is_terminal_market: false },

  // --- 18. Kodagu District ---
  { market_name: 'Madikeri APMC', district: 'Kodagu', market_town: 'Madikeri', latitude: 12.42, longitude: 75.74, is_terminal_market: true },
  { market_name: 'Virajpet APMC', district: 'Kodagu', market_town: 'Virajpet', latitude: 12.20, longitude: 75.80, is_terminal_market: false },
  { market_name: 'Somwarpet APMC', district: 'Kodagu', market_town: 'Somwarpet', latitude: 12.60, longitude: 75.87, is_terminal_market: false },
  { market_name: 'Kushalnagar APMC', district: 'Kodagu', market_town: 'Kushalnagar', latitude: 12.46, longitude: 75.96, is_terminal_market: false },
  { market_name: 'Gonikoppal APMC', district: 'Kodagu', market_town: 'Gonikoppal', latitude: 12.18, longitude: 75.93, is_terminal_market: false },

  // --- 19. Kolar District ---
  { market_name: 'Kolar APMC', district: 'Kolar', market_town: 'Kolar', latitude: 13.14, longitude: 78.13, is_terminal_market: true },
  { market_name: 'Malur APMC', district: 'Kolar', market_town: 'Malur', latitude: 13.01, longitude: 77.94, is_terminal_market: false },
  { market_name: 'Bangarapet APMC', district: 'Kolar', market_town: 'Bangarapet', latitude: 12.98, longitude: 78.18, is_terminal_market: false },
  { market_name: 'Srinivaspur APMC', district: 'Kolar', market_town: 'Srinivaspur', latitude: 13.34, longitude: 78.21, is_terminal_market: true },
  { market_name: 'Mulbagal APMC', district: 'Kolar', market_town: 'Mulbagal', latitude: 13.16, longitude: 78.40, is_terminal_market: false },

  // --- 20. Koppal District ---
  { market_name: 'Koppal APMC', district: 'Koppal', market_town: 'Koppal', latitude: 15.35, longitude: 76.15, is_terminal_market: false },
  { market_name: 'Gangavathi APMC', district: 'Koppal', market_town: 'Gangavathi', latitude: 15.43, longitude: 76.53, is_terminal_market: true },
  { market_name: 'Kushtagi APMC', district: 'Koppal', market_town: 'Kushtagi', latitude: 15.76, longitude: 76.20, is_terminal_market: false },
  { market_name: 'Yelburga APMC', district: 'Koppal', market_town: 'Yelburga', latitude: 15.62, longitude: 75.98, is_terminal_market: false },
  { market_name: 'Karatagi APMC', district: 'Koppal', market_town: 'Karatagi', latitude: 15.57, longitude: 76.67, is_terminal_market: false },

  // --- 21. Mandya District ---
  { market_name: 'Mandya APMC', district: 'Mandya', market_town: 'Mandya', latitude: 12.52, longitude: 76.90, is_terminal_market: true },
  { market_name: 'Maddur APMC', district: 'Mandya', market_town: 'Maddur', latitude: 12.58, longitude: 77.05, is_terminal_market: true },
  { market_name: 'Malavalli APMC', district: 'Mandya', market_town: 'Malavalli', latitude: 12.38, longitude: 77.06, is_terminal_market: false },
  { market_name: 'Pandavapura APMC', district: 'Mandya', market_town: 'Pandavapura', latitude: 12.50, longitude: 76.67, is_terminal_market: false },
  { market_name: 'Nagamangala APMC', district: 'Mandya', market_town: 'Nagamangala', latitude: 12.82, longitude: 76.76, is_terminal_market: false },
  { market_name: 'Krishnarajpet APMC', district: 'Mandya', market_town: 'Krishnarajpet', latitude: 12.66, longitude: 76.49, is_terminal_market: false },
  { market_name: 'Srirangapatna APMC', district: 'Mandya', market_town: 'Srirangapatna', latitude: 12.42, longitude: 76.69, is_terminal_market: false },

  // --- 22. Mysuru District ---
  { market_name: 'Mysuru APMC', district: 'Mysuru', market_town: 'Bandipalya', latitude: 12.30, longitude: 76.65, is_terminal_market: true },
  { market_name: 'Nanjangud APMC', district: 'Mysuru', market_town: 'Nanjangud', latitude: 12.12, longitude: 76.68, is_terminal_market: true },
  { market_name: 'Hunsur APMC', district: 'Mysuru', market_town: 'Hunsur', latitude: 12.31, longitude: 76.29, is_terminal_market: false },
  { market_name: 'T. Narasipura APMC', district: 'Mysuru', market_town: 'T. Narasipura', latitude: 12.21, longitude: 76.90, is_terminal_market: false },
  { market_name: 'Piriyapatna APMC', district: 'Mysuru', market_town: 'Piriyapatna', latitude: 12.34, longitude: 76.10, is_terminal_market: false },
  { market_name: 'H.D. Kote APMC', district: 'Mysuru', market_town: 'H.D. Kote', latitude: 11.98, longitude: 76.33, is_terminal_market: false },
  { market_name: 'Saragur APMC', district: 'Mysuru', market_town: 'Saragur', latitude: 11.98, longitude: 76.44, is_terminal_market: false },

  // --- 23. Raichur District ---
  { market_name: 'Raichur APMC', district: 'Raichur', market_town: 'Raichur', latitude: 16.21, longitude: 77.36, is_terminal_market: true },
  { market_name: 'Sindhanur APMC', district: 'Raichur', market_town: 'Sindhanur', latitude: 15.77, longitude: 76.76, is_terminal_market: true },
  { market_name: 'Manvi APMC', district: 'Raichur', market_town: 'Manvi', latitude: 15.99, longitude: 77.05, is_terminal_market: false },
  { market_name: 'Devadurga APMC', district: 'Raichur', market_town: 'Devadurga', latitude: 16.42, longitude: 76.94, is_terminal_market: false },
  { market_name: 'Lingasugur APMC', district: 'Raichur', market_town: 'Lingasugur', latitude: 16.16, longitude: 76.52, is_terminal_market: false },
  { market_name: 'Maski APMC', district: 'Raichur', market_town: 'Maski', latitude: 15.96, longitude: 76.66, is_terminal_market: false },

  // --- 24. Ramanagara District ---
  { market_name: 'Ramanagara APMC', district: 'Ramanagara', market_town: 'Ramanagara', latitude: 12.72, longitude: 77.28, is_terminal_market: true },
  { market_name: 'Channapatna APMC', district: 'Ramanagara', market_town: 'Channapatna', latitude: 12.65, longitude: 77.20, is_terminal_market: false },
  { market_name: 'Kanakapura APMC', district: 'Ramanagara', market_town: 'Kanakapura', latitude: 12.55, longitude: 77.42, is_terminal_market: false },
  { market_name: 'Magadi APMC', district: 'Ramanagara', market_town: 'Magadi', latitude: 12.96, longitude: 77.23, is_terminal_market: false },

  // --- 25. Shivamogga District ---
  { market_name: 'Shivamogga APMC', district: 'Shivamogga', market_town: 'Shivamogga', latitude: 13.93, longitude: 75.57, is_terminal_market: true },
  { market_name: 'Sagar APMC', district: 'Shivamogga', market_town: 'Sagar', latitude: 14.16, longitude: 75.03, is_terminal_market: true },
  { market_name: 'Shikaripura APMC', district: 'Shivamogga', market_town: 'Shikaripura', latitude: 14.27, longitude: 75.35, is_terminal_market: false },
  { market_name: 'Bhadravathi APMC', district: 'Shivamogga', market_town: 'Bhadravathi', latitude: 13.84, longitude: 75.70, is_terminal_market: false },
  { market_name: 'Soraba APMC', district: 'Shivamogga', market_town: 'Soraba', latitude: 14.38, longitude: 75.10, is_terminal_market: false },
  { market_name: 'Thirthahalli APMC', district: 'Shivamogga', market_town: 'Thirthahalli', latitude: 13.70, longitude: 75.24, is_terminal_market: false },
  { market_name: 'Hosanagara APMC', district: 'Shivamogga', market_town: 'Hosanagara', latitude: 13.92, longitude: 75.07, is_terminal_market: false },

  // --- 26. Tumakuru District ---
  { market_name: 'Tumakuru APMC', district: 'Tumakuru', market_town: 'Tumakuru', latitude: 13.34, longitude: 77.10, is_terminal_market: true },
  { market_name: 'Tiptur APMC', district: 'Tumakuru', market_town: 'Tiptur', latitude: 13.26, longitude: 76.48, is_terminal_market: true },
  { market_name: 'Madhugiri APMC', district: 'Tumakuru', market_town: 'Madhugiri', latitude: 13.66, longitude: 77.21, is_terminal_market: false },
  { market_name: 'Sira APMC', district: 'Tumakuru', market_town: 'Sira', latitude: 13.74, longitude: 76.90, is_terminal_market: false },
  { market_name: 'Kunigal APMC', district: 'Tumakuru', market_town: 'Kunigal', latitude: 13.02, longitude: 77.03, is_terminal_market: false },
  { market_name: 'Gubbi APMC', district: 'Tumakuru', market_town: 'Gubbi', latitude: 13.31, longitude: 76.94, is_terminal_market: false },
  { market_name: 'Pavagada APMC', district: 'Tumakuru', market_town: 'Pavagada', latitude: 14.10, longitude: 77.28, is_terminal_market: false },
  { market_name: 'Koratagere APMC', district: 'Tumakuru', market_town: 'Koratagere', latitude: 13.52, longitude: 77.24, is_terminal_market: false },
  { market_name: 'Turuvekere APMC', district: 'Tumakuru', market_town: 'Turuvekere', latitude: 13.16, longitude: 76.67, is_terminal_market: false },
  { market_name: 'Chikkanayakanahalli APMC', district: 'Tumakuru', market_town: 'Chikkanayakanahalli', latitude: 13.42, longitude: 76.62, is_terminal_market: false },

  // --- 27. Udupi District ---
  { market_name: 'Udupi APMC', district: 'Udupi', market_town: 'Udupi', latitude: 13.34, longitude: 74.75, is_terminal_market: true },
  { market_name: 'Kundapura APMC', district: 'Udupi', market_town: 'Kundapura', latitude: 13.63, longitude: 74.69, is_terminal_market: false },
  { market_name: 'Karkala APMC', district: 'Udupi', market_town: 'Karkala', latitude: 13.21, longitude: 74.99, is_terminal_market: false },
  { market_name: 'Brahmavar APMC', district: 'Udupi', market_town: 'Brahmavar', latitude: 13.43, longitude: 74.75, is_terminal_market: false },
  { market_name: 'Byndoor APMC', district: 'Udupi', market_town: 'Byndoor', latitude: 13.87, longitude: 74.63, is_terminal_market: false },

  // --- 28. Uttara Kannada District ---
  { market_name: 'Sirsi APMC', district: 'Uttara Kannada', market_town: 'Sirsi', latitude: 14.62, longitude: 74.84, is_terminal_market: true },
  { market_name: 'Kumta APMC', district: 'Uttara Kannada', market_town: 'Kumta', latitude: 14.42, longitude: 74.41, is_terminal_market: false },
  { market_name: 'Karwar APMC', district: 'Uttara Kannada', market_town: 'Karwar', latitude: 14.81, longitude: 74.13, is_terminal_market: true },
  { market_name: 'Honnavar APMC', district: 'Uttara Kannada', market_town: 'Honnavar', latitude: 14.28, longitude: 74.45, is_terminal_market: false },
  { market_name: 'Bhatkal APMC', district: 'Uttara Kannada', market_town: 'Bhatkal', latitude: 13.98, longitude: 74.55, is_terminal_market: false },
  { market_name: 'Haliyal APMC', district: 'Uttara Kannada', market_town: 'Haliyal', latitude: 15.33, longitude: 74.76, is_terminal_market: false },
  { market_name: 'Yellapur APMC', district: 'Uttara Kannada', market_town: 'Yellapur', latitude: 14.97, longitude: 74.71, is_terminal_market: false },
  { market_name: 'Dandeli APMC', district: 'Uttara Kannada', market_town: 'Dandeli', latitude: 15.24, longitude: 74.62, is_terminal_market: false },
  { market_name: 'Siddapur APMC', district: 'Uttara Kannada', market_town: 'Siddapur', latitude: 14.34, longitude: 74.90, is_terminal_market: false },
  { market_name: 'Ankola APMC', district: 'Uttara Kannada', market_town: 'Ankola', latitude: 14.66, longitude: 74.30, is_terminal_market: false },

  // --- 29. Vijayapura District ---
  { market_name: 'Vijayapura APMC', district: 'Vijayapura', market_town: 'Vijayapura', latitude: 16.83, longitude: 75.71, is_terminal_market: true },
  { market_name: 'Indi APMC', district: 'Vijayapura', market_town: 'Indi', latitude: 17.18, longitude: 75.96, is_terminal_market: false },
  { market_name: 'Sindagi APMC', district: 'Vijayapura', market_town: 'Sindagi', latitude: 16.92, longitude: 76.23, is_terminal_market: false },
  { market_name: 'Basavana Bagewadi APMC', district: 'Vijayapura', market_town: 'Basavana Bagewadi', latitude: 16.58, longitude: 75.97, is_terminal_market: false },
  { market_name: 'Muddebihal APMC', district: 'Vijayapura', market_town: 'Muddebihal', latitude: 16.34, longitude: 76.13, is_terminal_market: false },
  { market_name: 'Talikoti APMC', district: 'Vijayapura', market_town: 'Talikoti', latitude: 16.48, longitude: 76.31, is_terminal_market: false },
  { market_name: 'Chadchan APMC', district: 'Vijayapura', market_town: 'Chadchan', latitude: 17.20, longitude: 75.80, is_terminal_market: false },

  // --- 30. Yadgir District ---
  { market_name: 'Yadgir APMC', district: 'Yadgir', market_town: 'Yadgir', latitude: 16.77, longitude: 77.14, is_terminal_market: true },
  { market_name: 'Shahapur APMC', district: 'Yadgir', market_town: 'Shahapur', latitude: 16.70, longitude: 76.84, is_terminal_market: false },
  { market_name: 'Surpur APMC', district: 'Yadgir', market_town: 'Surpur', latitude: 16.37, longitude: 76.76, is_terminal_market: false },
  { market_name: 'Hunsagi APMC', district: 'Yadgir', market_town: 'Hunsagi', latitude: 16.45, longitude: 76.52, is_terminal_market: false },
  { market_name: 'Gurmitkal APMC', district: 'Yadgir', market_town: 'Gurmitkal', latitude: 16.87, longitude: 77.40, is_terminal_market: false },
  { market_name: 'Vadagera APMC', district: 'Yadgir', market_town: 'Vadagera', latitude: 16.63, longitude: 76.99, is_terminal_market: false },

  // --- 31. Vijayanagara District ---
  { market_name: 'Hosapete APMC', district: 'Vijayanagara', market_town: 'Hosapete', latitude: 15.27, longitude: 76.39, is_terminal_market: true },
  { market_name: 'Harapanahalli APMC', district: 'Vijayanagara', market_town: 'Harapanahalli', latitude: 14.80, longitude: 75.99, is_terminal_market: false },
  { market_name: 'Hagaribommanahalli APMC', district: 'Vijayanagara', market_town: 'Hagaribommanahalli', latitude: 15.10, longitude: 76.19, is_terminal_market: false },
  { market_name: 'Hoovina Hadagali APMC', district: 'Vijayanagara', market_town: 'Hoovina Hadagali', latitude: 15.02, longitude: 75.95, is_terminal_market: false },
  { market_name: 'Kotturu APMC', district: 'Vijayanagara', market_town: 'Kotturu', latitude: 14.93, longitude: 76.22, is_terminal_market: false },
  { market_name: 'Kudligi APMC', district: 'Vijayanagara', market_town: 'Kudligi', latitude: 14.90, longitude: 76.38, is_terminal_market: false }
];

module.exports = { ALL_KARNATAKA_APMCS };

