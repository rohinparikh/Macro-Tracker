import { useState, useEffect, useReducer, useMemo, useCallback, createContext, useContext, useRef } from 'react'
 
// ─── LANGUAGE DATA ────────────────────────────────────────────────────────────
const LANGUAGES = {
  en: {
    appName: 'VegMacro', tagline: 'Indian vegetarian nutrition tracker',
    welcome: 'Welcome to VegMacro', welcomeSub: 'The nutrition tracker built for vegetarian Indians',
    whatsYourName: "What's your name?", namePlaceholder: 'e.g. Rohin',
    continueBtn: 'Continue →', backBtn: '← Back', startBtn: 'Start tracking →',
    setGoals: 'Your Daily Targets', goalsSub: 'Based on your profile — feel free to adjust',
    calories: 'Calories', protein: 'Protein', carbs: 'Carbs', sugar: 'Sugar', fat: 'Fat', fiber: 'Fiber',
    namaste: 'Namaste', editProfile: 'Edit',
    todaysLog: "Today's Log", searchPlaceholder: 'Search Indian or any food...',
    noFoods: 'No foods found', logEmpty: 'Search for a food above to log it',
    quantity: 'Quantity (servings)', addToMeal: 'Add to which meal?',
    nutritionPreview: 'NUTRITION PREVIEW', cancel: 'Cancel', addTo: 'Add to',
    goal: 'Goal', exceeded: 'exceeded',
    lowProtein: '⚠️ Protein is low — try paneer, curd, soya chunks, or sprouts.',
    breakfast: 'Breakfast', lunch: 'Lunch', dinner: 'Dinner', snack: 'Snack', dessert: 'Dessert',
    chooseLanguage: 'Choose your language', saveDay: '💾 Save Day',
    journal: 'Journal', today: 'Today', dayRating: 'Day Rating',
    savedDays: 'Saved Days', noSavedDays: 'No saved days yet. Save your first day!',
    searching: 'Searching USDA...', usdaResults: 'USDA Results',
    perServing: 'per serving', water: 'Water', waterIntake: 'Water Intake',
    glasses: 'glasses', addWater: '+ Glass', streak: 'day streak', days: 'days saved',
    tips: 'Tip of the day', close: 'Close', dayNote: 'Add a note for today...',
    excellent: 'Excellent', great: 'Great', good: 'Good', fair: 'Fair', poor: 'Poor',
    aiSuggestions: 'AI Meal Suggestions', getAI: '✨ Suggest meals',
    ratingBreakdown: 'Score breakdown', weeklyAnalytics: 'Weekly Analytics',
    quickAdd: 'Quick Add', indianFoods: 'Indian Foods', usdaDb: 'USDA Database',
    usdaError: 'USDA search failed. Check your connection.',
    totalDays: 'Total days tracked', currentStreak: 'Current streak',
    daySaved: 'Day saved!', alreadySaved: 'Already saved today — updated!',
    analyticsEmpty: 'Save at least 2 days to see trends.',
    avgRating: 'Avg rating', bestDay: 'Best day', avgProtein: 'Avg protein',
    // Auth
    createAccount: 'Create Account', signIn: 'Sign In', email: 'Email', password: 'Password',
    confirmPassword: 'Confirm Password', alreadyHaveAccount: 'Already have an account? Sign in',
    noAccount: "Don't have an account? Sign up", authError: 'Invalid email or password',
    passwordMismatch: 'Passwords do not match', weakPassword: 'Password must be at least 6 characters',
    invalidEmail: 'Please enter a valid email',
    // Body profile
    bodyProfile: 'Your Body Profile', bodyProfileSub: 'We\'ll calculate your ideal macros',
    age: 'Age', weight: 'Weight', height: 'Height', activityLevel: 'Activity Level',
    years: 'years', kg: 'kg', cm: 'cm',
    sedentary: 'Sedentary (desk job, little exercise)',
    lightlyActive: 'Lightly Active (1–3 days/week)',
    moderatelyActive: 'Moderately Active (3–5 days/week)',
    veryActive: 'Very Active (6–7 days/week)',
    superActive: 'Super Active (athlete / physical job)',
    goal_lose: 'Lose weight', goal_maintain: 'Maintain weight', goal_gain: 'Gain muscle',
    fitnessGoal: 'Fitness Goal',
    bmi: 'BMI', bmiUnderweight: 'Underweight', bmiNormal: 'Normal', bmiOverweight: 'Overweight', bmiObese: 'Obese',
    tdee: 'Daily calorie need (TDEE)',
    suggestedMacros: 'Suggested Macros', editMacros: 'Edit if needed',
    // Recipe builder
    recipeBuilder: 'Recipe Builder', createRecipe: '+ Create Recipe',
    recipeName: 'Recipe name', addIngredient: 'Add Ingredient', saveRecipe: 'Save Recipe',
    myRecipes: 'My Recipes', noRecipes: 'No recipes yet — create one!',
    logRecipe: 'Log this recipe',
    // Barcode
    scanBarcode: '📷 Scan Barcode', scanning: 'Scanning...', barcodeError: 'Could not read barcode. Try again.',
    barcodeNotFound: 'Product not found in database.', stopScan: 'Stop Scanning',
  },
  gu: {
    appName: 'VegMacro', tagline: 'ભારતીય શાકાહારી પોષણ ટ્રેકર',
    welcome: 'VegMacro માં આપનું સ્વાગત', welcomeSub: 'શાકાહારી ભારતીયો માટે બનાવેલ ટ્રેકર',
    whatsYourName: 'તમારું નામ?', namePlaceholder: 'દા.ત. રોહિન',
    continueBtn: 'આગળ →', backBtn: '← પાછળ', startBtn: 'ટ્રેકિંગ શરૂ →',
    setGoals: 'તમારા દૈનિક લક્ષ્યો', goalsSub: 'પ્રોફાઇલ આધારિત — ફેરફાર કરી શકો',
    calories: 'કેલેરી', protein: 'પ્રોટીન', carbs: 'કાર્બ્સ', sugar: 'ખાંડ', fat: 'ચરબી', fiber: 'ફાઇબર',
    namaste: 'નમસ્તે', editProfile: 'સંપાદિત',
    todaysLog: 'આજનો લોગ', searchPlaceholder: 'ભારતીય ખોરાક શોધો...',
    noFoods: 'મળ્યું નથી', logEmpty: 'ઉપર ખોરાક શોધો',
    quantity: 'જથ્થો', addToMeal: 'ક્યા ભોજનમાં?',
    nutritionPreview: 'પોષણ પ્રિવ્યુ', cancel: 'રદ', addTo: 'ઉમેરો',
    goal: 'લક્ષ્ય', exceeded: 'વધ્યું',
    lowProtein: '⚠️ પ્રોટીન ઓછું — પનીર, દહીં, સ્પ્રાઉટ્સ ઉમેરો.',
    breakfast: 'નાસ્તો', lunch: 'બપોર', dinner: 'રાત્રિ', snack: 'સ્નેક', dessert: 'મીઠાઈ',
    chooseLanguage: 'ભાષા પસંદ', saveDay: '💾 દિવસ સાચવો',
    journal: 'જર્નલ', today: 'આજ', dayRating: 'રેટિંગ',
    savedDays: 'સાચવેલા', noSavedDays: 'હજી સાચવ્યું નથી!',
    searching: 'USDA શોધ...', usdaResults: 'USDA',
    perServing: 'સર્વિંગ', water: 'પાણી', waterIntake: 'પાણી',
    glasses: 'ગ્લાસ', addWater: '+ ગ્લાસ', streak: 'સ્ટ્રીક', days: 'દિવસ',
    tips: 'ટિપ', close: 'બંધ', dayNote: 'નોંધ...',
    excellent: 'ઉત્તમ', great: 'સારું', good: 'ઠીક', fair: 'સામાન્ય', poor: 'નબળું',
    aiSuggestions: 'AI સૂચનો', getAI: '✨ ભોજન સૂચનો',
    ratingBreakdown: 'સ્કોર', weeklyAnalytics: 'સાપ્તાહિક',
    quickAdd: 'ઝડપ ઉમેરો', indianFoods: 'ભારતીય', usdaDb: 'USDA',
    usdaError: 'USDA ભૂલ.', totalDays: 'કુલ દિવસ', currentStreak: 'સ્ટ્રીક',
    daySaved: 'સાચવ્યું!', alreadySaved: 'અપડેટ!', analyticsEmpty: '2+ દિવસ સાચવો.',
    avgRating: 'સરેરાશ', bestDay: 'શ્રેષ્ઠ', avgProtein: 'સ. પ્રોટીન',
    createAccount: 'એકાઉન્ટ બનાવો', signIn: 'સાઇન ઇન', email: 'ઇમેઇલ', password: 'પાસવર્ડ',
    confirmPassword: 'પાસવર્ડ કન્ફર્મ', alreadyHaveAccount: 'એકાઉન્ટ છે? સાઇન ઇન',
    noAccount: 'એકાઉન્ટ નથી? સાઇન અપ', authError: 'ઇમેઇલ અથવા પાસવર્ડ ખોટો',
    passwordMismatch: 'પાસવર્ડ મેળ ખાતો નથી', weakPassword: 'ઓછામાં ઓછા 6 અક્ષર',
    invalidEmail: 'માન્ય ઇમેઇલ દાખલ કરો',
    bodyProfile: 'તમારી પ્રોફાઇલ', bodyProfileSub: 'અમે તમારા માટે મેક્રો ગણીશું',
    age: 'ઉંમર', weight: 'વજન', height: 'ઊંચાઈ', activityLevel: 'પ્રવૃત્તિ સ્તર',
    years: 'વર્ષ', kg: 'કિ.ગ્રા.', cm: 'સે.મી.',
    sedentary: 'બેઠાડુ', lightlyActive: 'થોડો સક્રિય', moderatelyActive: 'સક્રિય',
    veryActive: 'ખૂબ સક્રિય', superActive: 'અત્યંત સક્રિય',
    goal_lose: 'વજન ઘટાડો', goal_maintain: 'જાળવો', goal_gain: 'સ્નાયુ બનાવો',
    fitnessGoal: 'ફિટનેસ લક્ષ્ય',
    bmi: 'BMI', bmiUnderweight: 'ઓછું વજન', bmiNormal: 'સામાન્ય', bmiOverweight: 'વધુ વજન', bmiObese: 'સ્થૂળ',
    tdee: 'TDEE', suggestedMacros: 'સૂચિત મેક્રો', editMacros: 'ફેરફાર કરો',
    recipeBuilder: 'રેસીપી બિલ્ડર', createRecipe: '+ રેસીપી બનાવો',
    recipeName: 'રેસીપી નામ', addIngredient: 'ઘટક ઉમેરો', saveRecipe: 'સાચવો',
    myRecipes: 'મારી રેસીપી', noRecipes: 'કોઈ રેસીપી નથી!', logRecipe: 'લોગ કરો',
    scanBarcode: '📷 બારકોડ સ્કેન', scanning: 'સ્કેન...', barcodeError: 'ફરી પ્રયાસ કરો.',
    barcodeNotFound: 'ઉત્પાદન મળ્યું નહીં.', stopScan: 'બંધ કરો',
  },
  hi: {
    appName: 'VegMacro', tagline: 'भारतीय शाकाहारी पोषण ट्रैकर',
    welcome: 'VegMacro में स्वागत', welcomeSub: 'शाकाहारी भारतीयों के लिए',
    whatsYourName: 'आपका नाम?', namePlaceholder: 'जैसे रोहिन',
    continueBtn: 'आगे →', backBtn: '← वापस', startBtn: 'शुरू करें →',
    setGoals: 'आपके दैनिक लक्ष्य', goalsSub: 'प्रोफ़ाइल आधारित — बदल सकते हैं',
    calories: 'कैलोरी', protein: 'प्रोटीन', carbs: 'कार्ब्स', sugar: 'चीनी', fat: 'वसा', fiber: 'फाइबर',
    namaste: 'नमस्ते', editProfile: 'संपादित',
    todaysLog: 'आज का लॉग', searchPlaceholder: 'खाना खोजें...',
    noFoods: 'नहीं मिला', logEmpty: 'ऊपर खाना खोजें',
    quantity: 'मात्रा', addToMeal: 'किस भोजन में?',
    nutritionPreview: 'पोषण', cancel: 'रद्द', addTo: 'जोड़ें',
    goal: 'लक्ष्य', exceeded: 'अधिक',
    lowProtein: '⚠️ प्रोटीन कम — पनीर, दही, सोया खाएं।',
    breakfast: 'नाश्ता', lunch: 'दोपहर', dinner: 'रात', snack: 'स्नैक', dessert: 'मिठाई',
    chooseLanguage: 'भाषा', saveDay: '💾 दिन सहेजें',
    journal: 'जर्नल', today: 'आज', dayRating: 'रेटिंग',
    savedDays: 'सहेजे', noSavedDays: 'अभी कुछ नहीं!',
    searching: 'USDA...', usdaResults: 'USDA',
    perServing: 'सर्विंग', water: 'पानी', waterIntake: 'पानी',
    glasses: 'गिलास', addWater: '+ गिलास', streak: 'स्ट्रीक', days: 'दिन',
    tips: 'टिप', close: 'बंद', dayNote: 'नोट...',
    excellent: 'उत्कृष्ट', great: 'बढ़िया', good: 'ठीक', fair: 'साधारण', poor: 'खराब',
    aiSuggestions: 'AI सुझाव', getAI: '✨ भोजन सुझाव',
    ratingBreakdown: 'स्कोर विवरण', weeklyAnalytics: 'साप्ताहिक',
    quickAdd: 'जल्दी जोड़ें', indianFoods: 'भारतीय', usdaDb: 'USDA',
    usdaError: 'USDA त्रुटि.', totalDays: 'कुल दिन', currentStreak: 'स्ट्रीक',
    daySaved: 'सहेजा!', alreadySaved: 'अपडेट!', analyticsEmpty: '2+ दिन सहेजें।',
    avgRating: 'औसत', bestDay: 'सर्वश्रेष्ठ', avgProtein: 'औ. प्रोटीन',
    createAccount: 'अकाउंट बनाएं', signIn: 'साइन इन', email: 'ईमेल', password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड दोहराएं', alreadyHaveAccount: 'अकाउंट है? साइन इन',
    noAccount: 'अकाउंट नहीं? साइन अप', authError: 'गलत ईमेल या पासवर्ड',
    passwordMismatch: 'पासवर्ड मेल नहीं खाता', weakPassword: 'कम से कम 6 अक्षर',
    invalidEmail: 'सही ईमेल डालें',
    bodyProfile: 'आपकी प्रोफ़ाइल', bodyProfileSub: 'हम आपके मैक्रो गणना करेंगे',
    age: 'उम्र', weight: 'वजन', height: 'ऊंचाई', activityLevel: 'गतिविधि स्तर',
    years: 'साल', kg: 'किग्रा', cm: 'सेमी',
    sedentary: 'बैठे रहना', lightlyActive: 'थोड़ा सक्रिय', moderatelyActive: 'सक्रिय',
    veryActive: 'बहुत सक्रिय', superActive: 'अत्यंत सक्रिय',
    goal_lose: 'वजन कम करें', goal_maintain: 'बनाए रखें', goal_gain: 'मांसपेशी बढ़ाएं',
    fitnessGoal: 'फिटनेस लक्ष्य',
    bmi: 'BMI', bmiUnderweight: 'कम वजन', bmiNormal: 'सामान्य', bmiOverweight: 'अधिक वजन', bmiObese: 'मोटापा',
    tdee: 'TDEE', suggestedMacros: 'सुझाए मैक्रो', editMacros: 'बदलें',
    recipeBuilder: 'रेसिपी बिल्डर', createRecipe: '+ रेसिपी बनाएं',
    recipeName: 'रेसिपी नाम', addIngredient: 'सामग्री जोड़ें', saveRecipe: 'सहेजें',
    myRecipes: 'मेरी रेसिपी', noRecipes: 'कोई रेसिपी नहीं!', logRecipe: 'लॉग करें',
    scanBarcode: '📷 बारकोड स्कैन', scanning: 'स्कैन...', barcodeError: 'फिर कोशिश करें.',
    barcodeNotFound: 'उत्पाद नहीं मिला.', stopScan: 'बंद करें',
  },
}
 
// Add remaining languages with English fallback for new keys
const LANG_CODES = ['en', 'gu', 'hi', 'mr', 'ta', 'te', 'kn', 'pa']
LANG_CODES.forEach(code => {
  if (!LANGUAGES[code]) LANGUAGES[code] = { ...LANGUAGES.en }
  else {
    // Fill missing keys from English
    Object.keys(LANGUAGES.en).forEach(k => {
      if (!LANGUAGES[code][k]) LANGUAGES[code][k] = LANGUAGES.en[k]
    })
  }
})
 
const LANG_OPTIONS = [
  { code: 'en', label: 'English' }, { code: 'gu', label: 'ગુજરાતી' },
  { code: 'hi', label: 'हिन्दी' }, { code: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' }, { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' }, { code: 'pa', label: 'ਪੰਜਾਬੀ' },
]
 
// ─── FOOD DATABASE ────────────────────────────────────────────────────────────
const LOCAL_FOODS = [
  { id:'paneer', name:'Paneer', category:'protein', cuisine:'indian', portion:'100g', calories:265, protein:18, carbs:1, fat:20, fiber:0, gi:'Low' },
  { id:'masoor_dal', name:'Masoor dal (cooked)', category:'protein', cuisine:'indian', portion:'1 katori (150g)', calories:138, protein:10, carbs:24, fat:1, fiber:8, gi:'Low' },
  { id:'chana_dal', name:'Chana dal (cooked)', category:'protein', cuisine:'indian', portion:'1 katori (150g)', calories:164, protein:12, carbs:27, fat:2, fiber:8, gi:'Low' },
  { id:'moong_dal', name:'Moong dal (cooked)', category:'protein', cuisine:'indian', portion:'1 katori (150g)', calories:104, protein:7, carbs:18, fat:1, fiber:5, gi:'Low' },
  { id:'roti_wheat', name:'Whole wheat roti', category:'carb', cuisine:'indian', portion:'1 roti (35g)', calories:100, protein:3, carbs:20, fat:1, fiber:2, gi:'Medium' },
  { id:'white_rice', name:'White rice (cooked)', category:'carb', cuisine:'indian', portion:'1 katori (150g)', calories:195, protein:4, carbs:43, fat:0, fiber:1, gi:'High' },
  { id:'curd', name:'Curd (yogurt)', category:'protein', cuisine:'indian', portion:'1 katori (150g)', calories:98, protein:6, carbs:7, fat:4, fiber:0, gi:'Low' },
  { id:'moong_sprouts', name:'Moong sprouts', category:'protein', cuisine:'indian', portion:'1 katori (100g)', calories:30, protein:4, carbs:4, fat:0, fiber:2, gi:'Low' },
  { id:'soya_chunks', name:'Soya chunks (cooked)', category:'protein', cuisine:'indian', portion:'30g dry', calories:101, protein:13, carbs:6, fat:1, fiber:1, gi:'Low' },
  { id:'poha', name:'Poha', category:'carb', cuisine:'indian', portion:'1 plate (150g)', calories:244, protein:4, carbs:52, fat:3, fiber:2, gi:'Medium' },
  { id:'idli', name:'Idli (2 pieces)', category:'carb', cuisine:'south_indian', portion:'2 idli (100g)', calories:132, protein:4, carbs:28, fat:1, fiber:1, gi:'Medium' },
  { id:'rajma', name:'Rajma (cooked)', category:'protein', cuisine:'indian', portion:'1 katori (150g)', calories:180, protein:11, carbs:32, fat:1, fiber:9, gi:'Low' },
  { id:'aloo_sabzi', name:'Aloo sabzi', category:'carb', cuisine:'indian', portion:'1 katori (150g)', calories:190, protein:3, carbs:30, fat:7, fiber:3, gi:'Medium' },
  { id:'palak_paneer', name:'Palak paneer', category:'protein', cuisine:'indian', portion:'1 katori (150g)', calories:210, protein:10, carbs:8, fat:16, fiber:3, gi:'Low' },
  { id:'upma', name:'Upma', category:'carb', cuisine:'south_indian', portion:'1 plate (200g)', calories:210, protein:5, carbs:38, fat:5, fiber:3, gi:'Medium' },
  { id:'dhokla', name:'Dhokla', category:'mixed', cuisine:'gujarati', portion:'4 pieces (120g)', calories:160, protein:7, carbs:28, fat:3, fiber:2, gi:'Medium' },
  { id:'thepla', name:'Thepla', category:'carb', cuisine:'gujarati', portion:'2 thepla (80g)', calories:220, protein:6, carbs:30, fat:8, fiber:4, gi:'Medium' },
  { id:'khakhra', name:'Khakhra', category:'carb', cuisine:'gujarati', portion:'3 pieces (45g)', calories:180, protein:5, carbs:28, fat:5, fiber:3, gi:'Medium' },
  { id:'rajma_rice', name:'Rajma rice', category:'mixed', cuisine:'indian', portion:'1 plate (300g)', calories:375, protein:15, carbs:70, fat:2, fiber:10, gi:'Low' },
  { id:'khichdi', name:'Khichdi', category:'mixed', cuisine:'indian', portion:'1 katori (200g)', calories:220, protein:8, carbs:38, fat:4, fiber:4, gi:'Medium' },
  { id:'chaas', name:'Chaas (buttermilk)', category:'protein', cuisine:'gujarati', portion:'1 glass (250ml)', calories:60, protein:3, carbs:5, fat:2, fiber:0, gi:'Low' },
  { id:'shrikhand', name:'Shrikhand', category:'sweet', cuisine:'gujarati', portion:'1 katori (100g)', calories:230, protein:7, carbs:38, fat:6, fiber:0, gi:'Medium' },
  { id:'sev', name:'Sev (plain)', category:'carb', cuisine:'gujarati', portion:'1 katori (30g)', calories:150, protein:4, carbs:18, fat:7, fiber:1, gi:'Medium' },
  { id:'methi_thepla', name:'Methi thepla', category:'carb', cuisine:'gujarati', portion:'2 thepla (80g)', calories:210, protein:6, carbs:28, fat:8, fiber:5, gi:'Low' },
  { id:'undhiyu', name:'Undhiyu', category:'mixed', cuisine:'gujarati', portion:'1 katori (200g)', calories:280, protein:8, carbs:32, fat:13, fiber:9, gi:'Low' },
  { id:'toor_dal', name:'Toor dal (Gujarati)', category:'protein', cuisine:'gujarati', portion:'1 katori (200g)', calories:170, protein:10, carbs:28, fat:3, fiber:6, gi:'Low' },
  { id:'bajra_rotla', name:'Bajra rotla', category:'carb', cuisine:'gujarati', portion:'1 rotla (60g)', calories:155, protein:4, carbs:28, fat:3, fiber:4, gi:'Low' },
  { id:'mag_dal', name:'Mag ni dal (whole moong)', category:'protein', cuisine:'gujarati', portion:'1 katori (150g)', calories:148, protein:10, carbs:24, fat:1, fiber:7, gi:'Low' },
]
 
const HEALTH_TIPS = [
  "Pair high-GI foods like rice with dal or curd — it significantly slows glucose absorption.",
  "South Asians have 4x higher diabetes risk than Europeans. Carb quality matters more than quantity.",
  "Moong sprouts: 4g protein per 100g, near-zero fat, low GI. One of the best snacks you can eat.",
  "Rajma + rice is a complete protein — the amino acids complement each other perfectly.",
  "Methi (fenugreek) in thepla helps lower blood sugar — a natural diabetes fighter.",
  "Aim for 8 glasses of water daily. Dehydration is often mistaken for hunger.",
  "Bajra (millet) roti has a much lower GI than wheat roti — great for diabetes management.",
  "Soya chunks are one of the cheapest complete plant protein sources — 13g protein per 30g dry.",
  "Chaas (buttermilk) after meals aids digestion and adds protein with very few calories.",
  "Eating a small katori of curd with meals slows carb absorption and adds gut-friendly probiotics.",
]
 
// ─── TDEE / MACRO CALCULATOR ─────────────────────────────────────────────────
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  lightlyActive: 1.375,
  moderatelyActive: 1.55,
  veryActive: 1.725,
  superActive: 1.9,
}
 
const calcTDEE = (age, weightKg, heightCm, activity) => {
  // Mifflin-St Jeor for women (conservative for Indian veg context, adjustable)
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  return Math.round(bmr * (ACTIVITY_MULTIPLIERS[activity] || 1.55))
}
 
const calcBMI = (weightKg, heightCm) => {
  const h = heightCm / 100
  return Math.round((weightKg / (h * h)) * 10) / 10
}
 
const bmiCategory = (bmi, t) => {
  if (bmi < 18.5) return { label: t.bmiUnderweight, color: '#378ADD' }
  if (bmi < 25) return { label: t.bmiNormal, color: '#1D9E75' }
  if (bmi < 30) return { label: t.bmiOverweight, color: '#EF9F27' }
  return { label: t.bmiObese, color: '#E24B4A' }
}
 
const suggestMacros = (tdee, fitnessGoal) => {
  let calories = tdee
  if (fitnessGoal === 'lose') calories = Math.round(tdee * 0.8)
  if (fitnessGoal === 'gain') calories = Math.round(tdee * 1.1)
 
  // Indian veg: moderate-high carb, high protein target, moderate fat
  const protein = Math.round(calories * 0.25 / 4)  // 25% from protein
  const fat = Math.round(calories * 0.25 / 9)       // 25% from fat
  const carbs = Math.round(calories * 0.50 / 4)     // 50% from carbs
  const fiber = 25
  const sugar = Math.round(carbs * 0.1)
 
  return { calories, protein, carbs, sugar, fat, fiber }
}
 
// ─── STATE ────────────────────────────────────────────────────────────────────
const initialState = {
  log: [], journal: {}, goals: null, waterGlasses: 0, dayNote: '', recipes: [],
}
 
function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_FOOD': return { ...state, log: [...state.log, action.food] }
    case 'REMOVE_FOOD': return { ...state, log: state.log.filter((_, i) => i !== action.index) }
    case 'SET_GOALS': return { ...state, goals: action.goals }
    case 'SET_WATER': return { ...state, waterGlasses: action.val }
    case 'SET_NOTE': return { ...state, dayNote: action.val }
    case 'SAVE_DAY': return { ...state, journal: { ...state.journal, [action.key]: action.entry } }
    case 'SAVE_RECIPE': return { ...state, recipes: [...state.recipes.filter(r => r.id !== action.recipe.id), action.recipe] }
    case 'DELETE_RECIPE': return { ...state, recipes: state.recipes.filter(r => r.id !== action.id) }
    default: return state
  }
}
 
const AppContext = createContext(null)
const useApp = () => useContext(AppContext)
 
// ─── HELPERS ─────────────────────────────────────────────────────────────────
const todayKey = () => new Date().toISOString().slice(0, 10)
 
const giColor = (gi) => {
  if (gi === 'Low') return '#1D9E75'
  if (gi === 'Medium') return '#EF9F27'
  return '#E24B4A'
}
 
const scaleFood = (food, qty) => ({
  ...food,
  calories: Math.round(food.calories * qty),
  protein: Math.round(food.protein * qty * 10) / 10,
  carbs: Math.round(food.carbs * qty * 10) / 10,
  fat: Math.round(food.fat * qty * 10) / 10,
  fiber: Math.round(food.fiber * qty * 10) / 10,
})
 
const calcStreak = (journal) => {
  let count = 0
  const d = new Date()
  while (true) {
    const key = d.toISOString().slice(0, 10)
    if (journal[key]) { count++; d.setDate(d.getDate() - 1) }
    else {
      if (count === 0) {
        d.setDate(d.getDate() - 1)
        const yKey = d.toISOString().slice(0, 10)
        if (journal[yKey]) { count++; d.setDate(d.getDate() - 1) } else break
      } else break
    }
  }
  return count
}
 
const WEIGHTS = { protein: 3, calories: 2, carbs: 1, fat: 1, fiber: 1 }
const MAX_SCORE = Object.values(WEIGHTS).reduce((s, w) => s + w * 2, 0)
 
const calcRatingWithBreakdown = (totals, goals) => {
  const checks = [
    { key: 'protein', label: 'Protein', val: totals.protein, goal: goals.protein },
    { key: 'calories', label: 'Calories', val: totals.calories, goal: goals.calories },
    { key: 'carbs', label: 'Carbs', val: totals.carbs, goal: goals.carbs },
    { key: 'fat', label: 'Fat', val: totals.fat, goal: goals.fat },
    { key: 'fiber', label: 'Fiber', val: totals.fiber, goal: goals.fiber },
  ]
  let score = 0
  const reasons = []
  checks.forEach(c => {
    const w = WEIGHTS[c.key]
    const pct = c.val / c.goal
    let pts = 0
    if (pct >= 0.85 && pct <= 1.05) { pts = w * 2; reasons.push({ text: `+${pts} — ${c.label} hit goal ✓`, color: '#1D9E75' }) }
    else if (pct >= 0.65 && pct <= 1.2) { pts = w; reasons.push({ text: `+${pts} — ${c.label} close to goal`, color: '#EF9F27' }) }
    else if (pct > 1.2) { pts = -(w * 0.5); reasons.push({ text: `${pts.toFixed(1)} — ${c.label} exceeded goal`, color: '#E24B4A' }) }
    else { reasons.push({ text: `+0 — ${c.label} too low (${Math.round(pct * 100)}% of goal)`, color: '#aaa' }) }
    score += pts
  })
  const rating = Math.max(1, Math.min(10, Math.round((score / MAX_SCORE) * 10)))
  return { rating, reasons }
}
 
const ratingLabel = (r, t) => {
  if (r >= 9) return { label: t.excellent, color: '#1D9E75' }
  if (r >= 7) return { label: t.great, color: '#5DCAA5' }
  if (r >= 5) return { label: t.good, color: '#EF9F27' }
  if (r >= 3) return { label: t.fair, color: '#D85A30' }
  return { label: t.poor, color: '#E24B4A' }
}
 
const getMeals = (t) => [
  { key: 'breakfast', label: t.breakfast, emoji: '🌅' },
  { key: 'lunch', label: t.lunch, emoji: '☀️' },
  { key: 'dinner', label: t.dinner, emoji: '🌙' },
  { key: 'snack', label: t.snack, emoji: '🍎' },
  { key: 'dessert', label: t.dessert, emoji: '🍮' },
]
 
const getAISuggestions = (totals, goals) => {
  const suggestions = []
  const proteinGap = goals.protein - totals.protein
  const carbsLeft = goals.carbs - totals.carbs
  const fiberGap = goals.fiber - totals.fiber
  if (proteinGap > 30) suggestions.push({ emoji: '🧀', food: 'Paneer (100g)', reason: `Adds 18g protein — you need ${Math.round(proteinGap)}g more` })
  if (proteinGap > 20) suggestions.push({ emoji: '🌱', food: 'Soya chunks (30g dry)', reason: `Adds 13g protein — cheap and quick` })
  if (proteinGap > 10) suggestions.push({ emoji: '🥛', food: 'Curd (1 katori)', reason: `Adds 6g protein — good for digestion` })
  if (fiberGap > 10) suggestions.push({ emoji: '🫘', food: 'Rajma (1 katori)', reason: `Adds 9g fiber + 11g protein` })
  if (carbsLeft > 80) suggestions.push({ emoji: '🍚', food: 'Khichdi (1 katori)', reason: `Balanced carbs + protein` })
  if (carbsLeft < 20 && totals.carbs > 0) suggestions.push({ emoji: '⚠️', food: 'Skip rice/roti next meal', reason: `Near carb limit` })
  if (totals.calories < goals.calories * 0.6) suggestions.push({ emoji: '🍛', food: 'Add a full meal', reason: `Under 60% of calorie goal` })
  return suggestions.slice(0, 4)
}
 
// ─── USDA API ─────────────────────────────────────────────────────────────────
const USDA_KEY = (typeof process !== 'undefined' && process.env?.VITE_USDA_KEY) || 'DEMO_KEY'
const searchUSDA = async (query, signal) => {
  const res = await fetch(
    `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=6&api_key=${USDA_KEY}`,
    { signal }
  )
  if (!res.ok) throw new Error(`USDA error: ${res.status}`)
  const data = await res.json()
  if (!data.foods) return []
  return data.foods.map(f => {
    const get = (name) => {
      const n = f.foodNutrients?.find(x => x.nutrientName?.toLowerCase().includes(name))
      return Math.round((n?.value || 0) * 10) / 10
    }
    return {
      name: f.description?.slice(0, 50) || 'Unknown', portion: '100g',
      calories: Math.round(get('energy') || get('calorie')),
      protein: get('protein'), carbs: get('carbohydrate'),
      fat: get('total lipid'), fiber: get('fiber'), gi: 'Unknown', source: 'USDA',
    }
  })
}
 
// ─── AUTH SCREEN ──────────────────────────────────────────────────────────────
function AuthScreen({ lang, onAuth }) {
  const t = LANGUAGES[lang] || LANGUAGES.en
  const [isSignUp, setIsSignUp] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
 
  const validate = () => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailOk) return t.invalidEmail
    if (password.length < 6) return t.weakPassword
    if (isSignUp && password !== confirm) return t.passwordMismatch
    return null
  }
 
  const handleSubmit = () => {
    const err = validate()
    if (err) { setError(err); return }
    // Local auth — store hashed (simple) credentials
    const stored = JSON.parse(localStorage.getItem('vm_accounts') || '{}')
    if (isSignUp) {
      if (stored[email]) { setError('Account already exists. Please sign in.'); return }
      stored[email] = password
      localStorage.setItem('vm_accounts', JSON.stringify(stored))
      onAuth(email)
    } else {
      if (stored[email] !== password) { setError(t.authError); return }
      onAuth(email)
    }
  }
 
  return (
    <div style={S.setupWrap}>
      <div style={{ ...S.setupCard, maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>🥗</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: -0.5 }}>VegMacro</h1>
          <p style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{t.tagline}</p>
        </div>
 
        <div style={{ display: 'flex', background: '#f5f5f5', borderRadius: 10, padding: 3, marginBottom: 24 }}>
          {[{ label: t.createAccount, val: true }, { label: t.signIn, val: false }].map(opt => (
            <button key={String(opt.val)} onClick={() => { setIsSignUp(opt.val); setError('') }}
              style={{ flex: 1, padding: '9px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 500, cursor: 'pointer', background: isSignUp === opt.val ? '#fff' : 'transparent', color: isSignUp === opt.val ? '#1D9E75' : '#888', boxShadow: isSignUp === opt.val ? '0 1px 4px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
              {opt.label}
            </button>
          ))}
        </div>
 
        <div style={S.field}>
          <label style={S.label}>{t.email}</label>
          <input style={S.input} type="email" placeholder="you@example.com" value={email}
            onChange={e => { setEmail(e.target.value); setError('') }} />
        </div>
 
        <div style={S.field}>
          <label style={S.label}>{t.password}</label>
          <div style={{ position: 'relative' }}>
            <input style={{ ...S.input, paddingRight: 44 }} type={showPass ? 'text' : 'password'}
              placeholder="••••••••" value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            <button onClick={() => setShowPass(v => !v)}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: '#aaa' }}>
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
 
        {isSignUp && (
          <div style={S.field}>
            <label style={S.label}>{t.confirmPassword}</label>
            <input style={S.input} type="password" placeholder="••••••••" value={confirm}
              onChange={e => { setConfirm(e.target.value); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </div>
        )}
 
        {error && <div style={{ background: '#FFF0F0', border: '0.5px solid #F7C1C1', borderRadius: 8, padding: '8px 12px', marginBottom: 12, fontSize: 13, color: '#A32D2D' }}>{error}</div>}
 
        <button onClick={handleSubmit} style={{ ...S.btnActive, width: '100%', padding: '13px', fontSize: 15, borderRadius: 12 }}>
          {isSignUp ? t.createAccount : t.signIn} →
        </button>
 
        <p style={{ textAlign: 'center', fontSize: 12, color: '#888', marginTop: 16 }}>
          {isSignUp ? t.alreadyHaveAccount : t.noAccount}
          <button onClick={() => { setIsSignUp(v => !v); setError('') }}
            style={{ background: 'none', border: 'none', color: '#1D9E75', cursor: 'pointer', fontSize: 12, fontWeight: 500, marginLeft: 4 }}>
            {isSignUp ? t.signIn : t.createAccount}
          </button>
        </p>
      </div>
    </div>
  )
}
 
// ─── LANGUAGE PICKER ──────────────────────────────────────────────────────────
function LanguagePicker({ onSelect }) {
  return (
    <div style={S.setupWrap}>
      <div style={S.setupCard}>
        <div style={S.emoji}>🌐</div>
        <h1 style={S.setupTitle}>Choose your language</h1>
        <p style={S.setupSub}>ભાષા · भाषा · தமிழ் · తెలుగు · ಕನ್ನಡ · ਪੰਜਾਬੀ</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
          {LANG_OPTIONS.map(l => (
            <button key={l.code} onClick={() => onSelect(l.code)}
              style={{ padding: '14px 10px', borderRadius: 12, border: '0.5px solid #ddd', background: '#fff', fontSize: 15, cursor: 'pointer', color: '#222' }}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
 
// ─── BODY PROFILE STEP ────────────────────────────────────────────────────────
function BodyProfileStep({ lang, onComplete, onBack }) {
  const t = LANGUAGES[lang] || LANGUAGES.en
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [activity, setActivity] = useState('moderatelyActive')
  const [fitnessGoal, setFitnessGoal] = useState('maintain')
 
  const bmi = weight && height ? calcBMI(Number(weight), Number(height)) : null
  const bmiInfo = bmi ? bmiCategory(bmi, t) : null
  const valid = age && weight && height && Number(age) > 0 && Number(weight) > 0 && Number(height) > 0
 
  const ACTIVITY_OPTIONS = [
    { key: 'sedentary', label: t.sedentary },
    { key: 'lightlyActive', label: t.lightlyActive },
    { key: 'moderatelyActive', label: t.moderatelyActive },
    { key: 'veryActive', label: t.veryActive },
    { key: 'superActive', label: t.superActive },
  ]
 
  const GOAL_OPTIONS = [
    { key: 'lose', label: t.goal_lose, emoji: '📉' },
    { key: 'maintain', label: t.goal_maintain, emoji: '⚖️' },
    { key: 'gain', label: t.goal_gain, emoji: '💪' },
  ]
 
  const handleNext = () => {
    const tdee = calcTDEE(Number(age), Number(weight), Number(height), activity)
    const macros = suggestMacros(tdee, fitnessGoal)
    onComplete({ age: Number(age), weight: Number(weight), height: Number(height), activity, fitnessGoal, tdee, bmi }, macros)
  }
 
  return (
    <div style={S.setupWrap}>
      <div style={{ ...S.setupCard, maxWidth: 440 }}>
        <div style={S.emoji}>📊</div>
        <h1 style={S.setupTitle}>{t.bodyProfile}</h1>
        <p style={S.setupSub}>{t.bodyProfileSub}</p>
 
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { label: `${t.age} (${t.years})`, val: age, set: setAge, ph: '25', max: 100 },
            { label: `${t.weight} (${t.kg})`, val: weight, set: setWeight, ph: '65', max: 300 },
            { label: `${t.height} (${t.cm})`, val: height, set: setHeight, ph: '162', max: 250 },
          ].map(f => (
            <div key={f.label}>
              <label style={{ ...S.label, fontSize: 11 }}>{f.label}</label>
              <input style={{ ...S.input, textAlign: 'center', padding: '10px 8px' }} type="number"
                placeholder={f.ph} value={f.val}
                onChange={e => f.set(Math.min(Number(e.target.value), f.max) || e.target.value === '' ? e.target.value : f.val)} />
            </div>
          ))}
        </div>
 
        {/* BMI Preview */}
        {bmi && (
          <div style={{ background: bmiInfo.color + '15', border: `0.5px solid ${bmiInfo.color}55`, borderRadius: 12, padding: '10px 14px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: '#888' }}>{t.bmi}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: bmiInfo.color }}>{bmiInfo.label}</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: bmiInfo.color }}>{bmi}</div>
          </div>
        )}
 
        <div style={S.field}>
          <label style={S.label}>{t.activityLevel}</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {ACTIVITY_OPTIONS.map(opt => (
              <button key={opt.key} onClick={() => setActivity(opt.key)}
                style={{ padding: '10px 14px', borderRadius: 10, border: '0.5px solid', textAlign: 'left', fontSize: 13, cursor: 'pointer', borderColor: activity === opt.key ? '#1D9E75' : '#ddd', background: activity === opt.key ? '#E1F5EE' : '#fff', color: activity === opt.key ? '#1D9E75' : '#555', fontWeight: activity === opt.key ? 500 : 400 }}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
 
        <div style={S.field}>
          <label style={S.label}>{t.fitnessGoal}</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {GOAL_OPTIONS.map(opt => (
              <button key={opt.key} onClick={() => setFitnessGoal(opt.key)}
                style={{ flex: 1, padding: '10px 8px', borderRadius: 10, border: '0.5px solid', fontSize: 13, cursor: 'pointer', borderColor: fitnessGoal === opt.key ? '#1D9E75' : '#ddd', background: fitnessGoal === opt.key ? '#E1F5EE' : '#fff', color: fitnessGoal === opt.key ? '#1D9E75' : '#555' }}>
                {opt.emoji}<br /><span style={{ fontSize: 11 }}>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
 
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button style={S.btnBack} onClick={onBack}>{t.backBtn}</button>
          <button style={valid ? S.btnActive : S.btnDisabled} onClick={handleNext} disabled={!valid}>
            {t.continueBtn}
          </button>
        </div>
      </div>
    </div>
  )
}
 
// ─── GOALS REVIEW STEP ────────────────────────────────────────────────────────
function GoalsReviewStep({ lang, suggestedGoals, bodyData, onComplete, onBack }) {
  const t = LANGUAGES[lang] || LANGUAGES.en
  const [goals, setGoals] = useState(suggestedGoals)
  const updateGoal = (k, v) => {
    const maxes = { calories: 5000, protein: 300, carbs: 600, sugar: 200, fat: 200, fiber: 100 }
    const clamped = Math.min(Number(v), maxes[k] || 500)
    setGoals(g => ({ ...g, [k]: isNaN(clamped) ? '' : clamped }))
  }
 
  const tdee = bodyData?.tdee || 0
 
  return (
    <div style={S.setupWrap}>
      <div style={{ ...S.setupCard, maxWidth: 440 }}>
        <div style={S.emoji}>🎯</div>
        <h1 style={S.setupTitle}>{t.setGoals}</h1>
        <p style={S.setupSub}>{t.goalsSub}</p>
 
        {/* TDEE info box */}
        {tdee > 0 && (
          <div style={{ background: '#E1F5EE', border: '0.5px solid #9FE1CB', borderRadius: 12, padding: '12px 14px', marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: '#085041', marginBottom: 4 }}>📊 {t.tdee}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#0F6E56' }}>{tdee} <span style={{ fontSize: 13, fontWeight: 400 }}>kcal/day</span></div>
            <div style={{ fontSize: 12, color: '#1D9E75', marginTop: 4 }}>
              {bodyData.fitnessGoal === 'lose' && '📉 Set to 80% of TDEE for weight loss'}
              {bodyData.fitnessGoal === 'maintain' && '⚖️ Set to match your TDEE'}
              {bodyData.fitnessGoal === 'gain' && '💪 Set to 110% of TDEE for muscle gain'}
            </div>
          </div>
        )}
 
        {[
          { key: 'calories', label: t.calories, unit: 'kcal' },
          { key: 'protein', label: t.protein, unit: 'g' },
          { key: 'carbs', label: t.carbs, unit: 'g' },
          { key: 'sugar', label: t.sugar, unit: 'g' },
          { key: 'fat', label: t.fat, unit: 'g' },
          { key: 'fiber', label: t.fiber, unit: 'g' },
        ].map(({ key, label, unit }) => (
          <div key={key} style={{ ...S.field, display: 'flex', alignItems: 'center', gap: 12 }}>
            <label style={{ ...S.label, flex: 1, margin: 0 }}>{label} <span style={{ color: '#aaa', fontWeight: 400 }}>({unit})</span></label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={() => updateGoal(key, (goals[key] || 0) - (key === 'calories' ? 50 : 5))}
                style={{ ...S.qtyBtn, width: 30, height: 30, fontSize: 16 }}>−</button>
              <input style={{ ...S.input, width: 72, textAlign: 'center', padding: '8px 6px' }} type="number"
                value={goals[key]} onChange={e => updateGoal(key, e.target.value)} />
              <button onClick={() => updateGoal(key, (goals[key] || 0) + (key === 'calories' ? 50 : 5))}
                style={{ ...S.qtyBtn, width: 30, height: 30, fontSize: 16 }}>+</button>
            </div>
          </div>
        ))}
 
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button style={S.btnBack} onClick={onBack}>{t.backBtn}</button>
          <button style={S.btnActive} onClick={() => onComplete(goals)}>{t.startBtn}</button>
        </div>
      </div>
    </div>
  )
}
 
// ─── SETUP (name only now) ────────────────────────────────────────────────────
function NameStep({ lang, onComplete, onBack }) {
  const t = LANGUAGES[lang] || LANGUAGES.en
  const [name, setName] = useState('')
  return (
    <div style={S.setupWrap}>
      <div style={S.setupCard}>
        <div style={S.emoji}>🥗</div>
        <h1 style={S.setupTitle}>{t.welcome}</h1>
        <p style={S.setupSub}>{t.welcomeSub}</p>
        <div style={S.field}>
          <label style={S.label}>{t.whatsYourName}</label>
          <input style={S.input} placeholder={t.namePlaceholder} value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && name.trim() && onComplete(name.trim())} autoFocus />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={S.btnBack} onClick={onBack}>{t.backBtn}</button>
          <button style={name.trim() ? S.btnActive : S.btnDisabled} onClick={() => name.trim() && onComplete(name.trim())}>{t.continueBtn}</button>
        </div>
      </div>
    </div>
  )
}
 
// ─── ADD FOOD MODAL ───────────────────────────────────────────────────────────
function AddFoodModal({ food, onConfirm, onCancel, lang }) {
  const t = LANGUAGES[lang] || LANGUAGES.en
  const [qty, setQty] = useState(1)
  const [meal, setMeal] = useState('')
  const preview = useMemo(() => scaleFood(food, qty), [food, qty])
  const MEALS = getMeals(t)
 
  return (
    <div style={S.modalOverlay}>
      <div style={S.modalCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, flex: 1, marginRight: 8 }}>{food.name}</h2>
          {food.source === 'USDA' && <span style={{ fontSize: 11, background: '#E6F1FB', color: '#185FA5', padding: '3px 8px', borderRadius: 8 }}>USDA</span>}
          {food.source === 'BARCODE' && <span style={{ fontSize: 11, background: '#E1F5EE', color: '#1D9E75', padding: '3px 8px', borderRadius: 8 }}>Scanned</span>}
        </div>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>{food.portion}</p>
 
        <label style={S.label}>{t.quantity}</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <button onClick={() => setQty(q => Math.max(0.5, parseFloat((q - 0.5).toFixed(1))))} style={S.qtyBtn}>−</button>
          <span style={{ fontSize: 20, fontWeight: 600, minWidth: 32, textAlign: 'center' }}>{qty}</span>
          <button onClick={() => setQty(q => parseFloat((q + 0.5).toFixed(1)))} style={S.qtyBtn}>+</button>
          <span style={{ fontSize: 13, color: '#aaa' }}>× {food.portion}</span>
        </div>
 
        <label style={S.label}>{t.addToMeal}</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {MEALS.map(m => (
            <button key={m.key} onClick={() => setMeal(m.key)}
              style={{ padding: '7px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer', border: '0.5px solid', borderColor: meal === m.key ? '#1D9E75' : '#ddd', background: meal === m.key ? '#E1F5EE' : '#fff', color: meal === m.key ? '#1D9E75' : '#555' }}>
              {m.emoji} {m.label}
            </button>
          ))}
        </div>
 
        <div style={{ background: '#f9f9f9', borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>{t.nutritionPreview}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { label: t.calories, val: preview.calories, unit: 'kcal', color: '#555' },
              { label: t.protein, val: preview.protein, unit: 'g', color: '#1D9E75' },
              { label: t.carbs, val: preview.carbs, unit: 'g', color: '#378ADD' },
              { label: t.fat, val: preview.fat, unit: 'g', color: '#EF9F27' },
              { label: t.fiber, val: preview.fiber, unit: 'g', color: '#639922' },
              { label: 'GI', val: food.gi, unit: '', color: giColor(food.gi) },
            ].map(n => (
              <div key={n.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: n.color }}>{n.val}{n.unit}</div>
                <div style={{ fontSize: 11, color: '#aaa' }}>{n.label}</div>
              </div>
            ))}
          </div>
        </div>
 
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={S.btnBack} onClick={onCancel}>{t.cancel}</button>
          <button style={meal ? S.btnActive : S.btnDisabled} onClick={() => meal && onConfirm({ ...preview, meal })}>
            {t.addTo} {meal ? MEALS.find(m => m.key === meal)?.label : '...'}
          </button>
        </div>
      </div>
    </div>
  )
}
 
// ─── BARCODE SCANNER ─────────────────────────────────────────────────────────
function BarcodeScanner({ lang, onFound, onClose }) {
  const t = LANGUAGES[lang] || LANGUAGES.en
  const videoRef = useRef(null)
  const [status, setStatus] = useState('starting') // starting | scanning | error | notfound
  const [stream, setStream] = useState(null)
  const intervalRef = useRef(null)
 
  // Load ZXing from CDN
  useEffect(() => {
    let mounted = true
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
        })
        if (!mounted) { mediaStream.getTracks().forEach(t => t.stop()); return }
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
          await videoRef.current.play()
        }
        setStatus('scanning')
 
        // Use BarcodeDetector API if available (Chrome/Android)
        if ('BarcodeDetector' in window) {
          const detector = new window.BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128'] })
          intervalRef.current = setInterval(async () => {
            if (!videoRef.current || videoRef.current.readyState < 2) return
            try {
              const codes = await detector.detect(videoRef.current)
              if (codes.length > 0) {
                clearInterval(intervalRef.current)
                await lookupBarcode(codes[0].rawValue, mounted)
              }
            } catch {}
          }, 500)
        } else {
          // Fallback: prompt manual entry
          setStatus('manual')
        }
      } catch (e) {
        if (mounted) setStatus('error')
      }
    }
    startCamera()
    return () => {
      mounted = false
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (stream) stream.getTracks().forEach(t => t.stop())
    }
  }, [])
 
  const stopStream = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (stream) stream.getTracks().forEach(t => t.stop())
    onClose()
  }
 
  const lookupBarcode = async (barcode, mounted = true) => {
    setStatus('loading')
    try {
      const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
      const data = await res.json()
      if (data.status === 1 && mounted) {
        const p = data.product
        const nutriments = p.nutriments || {}
        const food = {
          name: p.product_name || p.product_name_en || 'Unknown Product',
          portion: `100g`,
          calories: Math.round(nutriments['energy-kcal_100g'] || nutriments['energy-kcal'] || 0),
          protein: Math.round((nutriments.proteins_100g || 0) * 10) / 10,
          carbs: Math.round((nutriments.carbohydrates_100g || 0) * 10) / 10,
          fat: Math.round((nutriments.fat_100g || 0) * 10) / 10,
          fiber: Math.round((nutriments.fiber_100g || 0) * 10) / 10,
          gi: 'Unknown',
          source: 'BARCODE',
        }
        if (stream) stream.getTracks().forEach(t => t.stop())
        onFound(food)
      } else if (mounted) {
        setStatus('notfound')
      }
    } catch {
      if (mounted) setStatus('error')
    }
  }
 
  const [manualBarcode, setManualBarcode] = useState('')
 
  return (
    <div style={S.modalOverlay}>
      <div style={{ ...S.modalCard, padding: 0, overflow: 'hidden' }}>
        {/* Video viewfinder */}
        <div style={{ position: 'relative', background: '#000', aspectRatio: '4/3' }}>
          <video ref={videoRef} style={{ width: '100%', height: '100%', objectFit: 'cover' }} playsInline muted />
          {/* Scanning overlay */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div style={{ width: '70%', aspectRatio: '2/1', border: '2px solid #1D9E75', borderRadius: 8, boxShadow: '0 0 0 9999px rgba(0,0,0,0.4)' }} />
          </div>
          <button onClick={stopStream}
            style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: 20, padding: '6px 14px', fontSize: 13, cursor: 'pointer' }}>
            ✕ {t.stopScan}
          </button>
        </div>
 
        <div style={{ padding: '16px 20px' }}>
          {status === 'starting' && <p style={{ textAlign: 'center', color: '#888', fontSize: 14 }}>Starting camera...</p>}
          {status === 'scanning' && <p style={{ textAlign: 'center', color: '#1D9E75', fontSize: 14 }}>📷 {t.scanning} — point at a barcode</p>}
          {status === 'loading' && <p style={{ textAlign: 'center', color: '#378ADD', fontSize: 14 }}>Looking up product...</p>}
          {status === 'error' && <p style={{ textAlign: 'center', color: '#E24B4A', fontSize: 14 }}>{t.barcodeError}</p>}
          {status === 'notfound' && <p style={{ textAlign: 'center', color: '#EF9F27', fontSize: 14 }}>{t.barcodeNotFound}</p>}
 
          {/* Manual barcode entry fallback */}
          {(status === 'manual' || status === 'error' || status === 'notfound') && (
            <div style={{ marginTop: 12 }}>
              <p style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Or enter barcode manually:</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <input style={{ ...S.input, flex: 1 }} type="number" placeholder="e.g. 8901030870115"
                  value={manualBarcode} onChange={e => setManualBarcode(e.target.value)} />
                <button onClick={() => manualBarcode && lookupBarcode(manualBarcode)}
                  style={{ ...S.btnActive, padding: '10px 16px', whiteSpace: 'nowrap' }}>Look up</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
 
// ─── RECIPE BUILDER ───────────────────────────────────────────────────────────
function RecipeBuilder({ lang, onClose }) {
  const { state, dispatch } = useApp()
  const t = LANGUAGES[lang] || LANGUAGES.en
  const [view, setView] = useState('list') // 'list' | 'create'
  const [recipeName, setRecipeName] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [search, setSearch] = useState('')
  const [pending, setPending] = useState(null)
 
  const filtered = useMemo(() => {
    if (!search) return []
    const q = search.toLowerCase()
    return LOCAL_FOODS.filter(f => f.name.toLowerCase().includes(q)).slice(0, 6)
  }, [search])
 
  const totals = useMemo(() => ingredients.reduce((acc, ing) => ({
    calories: acc.calories + ing.calories,
    protein: acc.protein + ing.protein,
    carbs: acc.carbs + ing.carbs,
    fat: acc.fat + ing.fat,
    fiber: acc.fiber + ing.fiber,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }), [ingredients])
 
  const addIngredient = (food, qty) => {
    setIngredients(prev => [...prev, { ...scaleFood(food, qty), qty }])
    setSearch('')
    setPending(null)
  }
 
  const saveRecipe = () => {
    if (!recipeName.trim() || ingredients.length === 0) return
    const recipe = {
      id: Date.now().toString(),
      name: recipeName.trim(),
      ingredients,
      totals,
      portion: `1 serving (${ingredients.length} items)`,
    }
    dispatch({ type: 'SAVE_RECIPE', recipe })
    setView('list')
    setRecipeName('')
    setIngredients([])
  }
 
  const { dispatch: d2, state: s2 } = useApp()
  const logRecipe = (recipe, meal) => {
    d2({ type: 'ADD_FOOD', food: { ...recipe.totals, name: recipe.name, portion: recipe.portion, meal, gi: 'Mixed', source: 'RECIPE' } })
    onClose()
  }
 
  return (
    <div style={S.modalOverlay}>
      <div style={{ ...S.modalCard, maxWidth: 480 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setView('list')}
              style={{ fontSize: 13, padding: '6px 14px', borderRadius: 20, border: '0.5px solid', borderColor: view === 'list' ? '#1D9E75' : '#ddd', background: view === 'list' ? '#E1F5EE' : '#fff', color: view === 'list' ? '#1D9E75' : '#555', cursor: 'pointer' }}>
              🍽️ {t.myRecipes}
            </button>
            <button onClick={() => setView('create')}
              style={{ fontSize: 13, padding: '6px 14px', borderRadius: 20, border: '0.5px solid', borderColor: view === 'create' ? '#1D9E75' : '#ddd', background: view === 'create' ? '#E1F5EE' : '#fff', color: view === 'create' ? '#1D9E75' : '#555', cursor: 'pointer' }}>
              ➕ {t.createRecipe}
            </button>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#aaa' }}>×</button>
        </div>
 
        {/* My Recipes List */}
        {view === 'list' && (
          <>
            {state.recipes.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: '#bbb' }}>{t.noRecipes}</div>}
            {state.recipes.map(recipe => (
              <div key={recipe.id} style={{ border: '0.5px solid #e5e5e5', borderRadius: 12, padding: '14px', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{recipe.name}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{recipe.ingredients.length} ingredients · {Math.round(recipe.totals.calories)} kcal</div>
                  </div>
                  <button onClick={() => dispatch({ type: 'DELETE_RECIPE', id: recipe.id })}
                    style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: 18 }}>×</button>
                </div>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Protein', val: Math.round(recipe.totals.protein), color: '#1D9E75' },
                    { label: 'Carbs', val: Math.round(recipe.totals.carbs), color: '#378ADD' },
                    { label: 'Fat', val: Math.round(recipe.totals.fat), color: '#EF9F27' },
                    { label: 'Fiber', val: Math.round(recipe.totals.fiber), color: '#639922' },
                  ].map(m => (
                    <span key={m.label} style={{ fontSize: 12, background: m.color + '18', color: m.color, padding: '3px 10px', borderRadius: 20 }}>{m.val}g {m.label}</span>
                  ))}
                </div>
                {/* Quick log buttons */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {getMeals(t).map(m => (
                    <button key={m.key} onClick={() => logRecipe(recipe, m.key)}
                      style={{ fontSize: 11, padding: '5px 10px', borderRadius: 20, border: '0.5px solid #ddd', background: '#f9f9f9', cursor: 'pointer', color: '#555' }}>
                      {m.emoji} {m.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
 
        {/* Create Recipe */}
        {view === 'create' && (
          <>
            <div style={S.field}>
              <label style={S.label}>{t.recipeName}</label>
              <input style={S.input} placeholder="e.g. Dal Chawal" value={recipeName} onChange={e => setRecipeName(e.target.value)} />
            </div>
 
            {/* Ingredient search */}
            <label style={S.label}>{t.addIngredient}</label>
            <input style={{ ...S.input, marginBottom: 8 }} placeholder={t.searchPlaceholder} value={search}
              onChange={e => setSearch(e.target.value)} />
            {filtered.length > 0 && (
              <div style={{ border: '0.5px solid #e5e5e5', borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
                {filtered.map(food => (
                  <div key={food.id} onClick={() => setPending(food)}
                    style={{ padding: '10px 14px', borderBottom: '0.5px solid #f0f0f0', cursor: 'pointer', fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
                    <span>{food.name}</span>
                    <span style={{ color: '#888' }}>{food.calories} kcal</span>
                  </div>
                ))}
              </div>
            )}
 
            {/* Qty picker for ingredient */}
            {pending && (
              <div style={{ background: '#E1F5EE', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>{pending.name}</div>
                <InlineQtyPicker food={pending} onAdd={addIngredient} onCancel={() => setPending(null)} t={t} />
              </div>
            )}
 
            {/* Ingredients list */}
            {ingredients.length > 0 && (
              <>
                <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>INGREDIENTS</div>
                {ingredients.map((ing, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid #f0f0f0', fontSize: 13 }}>
                    <span>{ing.name} <span style={{ color: '#aaa' }}>×{ing.qty}</span></span>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ color: '#888' }}>{ing.calories} kcal</span>
                      <button onClick={() => setIngredients(prev => prev.filter((_, j) => j !== i))}
                        style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: 16 }}>×</button>
                    </div>
                  </div>
                ))}
                <div style={{ background: '#f9f9f9', borderRadius: 10, padding: '10px 14px', marginTop: 10, marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>RECIPE TOTAL</div>
                  <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                    {[
                      { label: 'Cal', val: Math.round(totals.calories), color: '#555' },
                      { label: 'Pro', val: `${Math.round(totals.protein)}g`, color: '#1D9E75' },
                      { label: 'Carb', val: `${Math.round(totals.carbs)}g`, color: '#378ADD' },
                      { label: 'Fat', val: `${Math.round(totals.fat)}g`, color: '#EF9F27' },
                    ].map(m => (
                      <div key={m.label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: m.color }}>{m.val}</div>
                        <div style={{ fontSize: 10, color: '#aaa' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
 
            <button onClick={saveRecipe}
              style={recipeName.trim() && ingredients.length > 0 ? { ...S.btnActive, width: '100%' } : { ...S.btnDisabled, width: '100%' }}>
              💾 {t.saveRecipe}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
 
function InlineQtyPicker({ food, onAdd, onCancel, t }) {
  const [qty, setQty] = useState(1)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button onClick={() => setQty(q => Math.max(0.5, parseFloat((q - 0.5).toFixed(1))))} style={S.qtyBtn}>−</button>
      <span style={{ fontSize: 18, fontWeight: 600, minWidth: 28, textAlign: 'center' }}>{qty}</span>
      <button onClick={() => setQty(q => parseFloat((q + 0.5).toFixed(1)))} style={S.qtyBtn}>+</button>
      <span style={{ fontSize: 12, color: '#aaa', flex: 1 }}>× {food.portion}</span>
      <button onClick={() => onAdd(food, qty)} style={{ ...S.btnActive, padding: '8px 14px', fontSize: 13 }}>Add</button>
      <button onClick={onCancel} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: 18 }}>×</button>
    </div>
  )
}
 
// ─── JOURNAL VIEW ─────────────────────────────────────────────────────────────
function JournalView({ onClose, lang }) {
  const { state } = useApp()
  const t = LANGUAGES[lang] || LANGUAGES.en
  const [selected, setSelected] = useState(null)
  const [view, setView] = useState('list')
 
  const entries = useMemo(() =>
    Object.entries(state.journal).sort((a, b) => b[0].localeCompare(a[0])), [state.journal])
 
  const analytics = useMemo(() => {
    if (entries.length < 2) return null
    const vals = entries.map(([, d]) => d)
    const avgRating = Math.round(vals.reduce((s, d) => s + (d.rating || 0), 0) / vals.length * 10) / 10
    const bestEntry = entries.reduce((best, cur) => (cur[1].rating || 0) > (best[1].rating || 0) ? cur : best)
    const avgProtein = Math.round(vals.reduce((s, d) => s + (d.totals?.protein || 0), 0) / vals.length)
    return { avgRating, bestDay: bestEntry[0], avgProtein }
  }, [entries])
 
  const fmtDate = (key) => new Date(key + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
  const ratingBg = (r) => r >= 8 ? '#1D9E75' : r >= 6 ? '#EF9F27' : '#E24B4A'
 
  return (
    <div style={S.modalOverlay}>
      <div style={{ ...S.modalCard, maxWidth: 500 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ key: 'list', label: `📓 ${t.journal}` }, { key: 'analytics', label: `📊 ${t.weeklyAnalytics}` }].map(tab => (
              <button key={tab.key} onClick={() => { setView(tab.key); setSelected(null) }}
                style={{ fontSize: 13, padding: '6px 14px', borderRadius: 20, border: '0.5px solid', borderColor: view === tab.key ? '#1D9E75' : '#ddd', background: view === tab.key ? '#E1F5EE' : '#fff', color: view === tab.key ? '#1D9E75' : '#555', cursor: 'pointer' }}>
                {tab.label}
              </button>
            ))}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#aaa' }}>×</button>
        </div>
 
        {view === 'analytics' && (
          <div>
            {!analytics ? <div style={{ textAlign: 'center', padding: '40px 0', color: '#bbb' }}>{t.analyticsEmpty}</div> : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
                  {[
                    { label: t.avgRating, val: analytics.avgRating, unit: '/10', color: '#1D9E75' },
                    { label: t.avgProtein, val: analytics.avgProtein, unit: 'g', color: '#378ADD' },
                    { label: t.totalDays, val: entries.length, unit: '', color: '#EF9F27' },
                  ].map(m => (
                    <div key={m.label} style={{ background: '#f9f9f9', borderRadius: 12, padding: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: m.color }}>{m.val}<span style={{ fontSize: 13, fontWeight: 400 }}>{m.unit}</span></div>
                      <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>RATING HISTORY</div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60 }}>
                  {entries.slice(0, 14).reverse().map(([key, day]) => (
                    <div key={key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <div style={{ width: '100%', height: `${((day.rating || 1) / 10) * 50}px`, background: ratingBg(day.rating), borderRadius: 3 }} />
                      <div style={{ fontSize: 9, color: '#aaa' }}>{key.slice(5)}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
 
        {view === 'list' && !selected && (
          <>
            {entries.length === 0 && <div style={{ textAlign: 'center', padding: '40px 0', color: '#bbb' }}>{t.noSavedDays}</div>}
            {entries.map(([key, day]) => (
              <div key={key} onClick={() => setSelected(key)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '0.5px solid #f0f0f0', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{fmtDate(key)}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{day.log?.length || 0} items · {day.totals?.calories || 0} kcal · 💧{day.water || 0}</div>
                  {day.note && <div style={{ fontSize: 12, color: '#aaa', marginTop: 2, fontStyle: 'italic' }}>"{day.note}"</div>}
                </div>
                <div style={{ width: 40, height: 40, borderRadius: 20, background: ratingBg(day.rating), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{day.rating}</span>
                </div>
              </div>
            ))}
          </>
        )}
 
        {view === 'list' && selected && (() => {
          const day = state.journal[selected]
          return (
            <div>
              <button onClick={() => setSelected(null)} style={{ ...S.btnBack, marginBottom: 16, fontSize: 13, padding: '8px 14px' }}>← Back</button>
              <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{fmtDate(selected)}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 32, fontWeight: 700, color: ratingBg(day.rating) }}>{day.rating}</span>
                <span style={{ fontSize: 13, color: '#888' }}>/10 · {day.totals?.calories || 0} kcal · 💧{day.water || 0}</span>
              </div>
              {day.note && <div style={{ background: '#f9f9f9', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: '#555', fontStyle: 'italic' }}>"{day.note}"</div>}
              {day.ratingReasons && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>SCORE BREAKDOWN</div>
                  {day.ratingReasons.map((r, i) => <div key={i} style={{ fontSize: 13, color: r.color, padding: '2px 0' }}>{r.text}</div>)}
                </div>
              )}
              {(day.log || []).map((item, i) => (
                <div key={i} style={{ fontSize: 13, padding: '6px 0', borderBottom: '0.5px solid #f5f5f5', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.name} <span style={{ color: '#aaa' }}>({item.meal})</span></span>
                  <span style={{ color: '#888' }}>{item.calories} kcal</span>
                </div>
              ))}
            </div>
          )
        })()}
      </div>
    </div>
  )
}
 
// ─── FOOD ROW ─────────────────────────────────────────────────────────────────
function FoodRow({ food, onClick }) {
  return (
    <div onClick={onClick}
      style={{ padding: '11px 14px', borderBottom: '0.5px solid #f0f0f0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ flex: 1, minWidth: 0, marginRight: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{food.name}</div>
        <div style={{ fontSize: 12, color: '#888' }}>{food.portion} · {food.calories} kcal</div>
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 12, color: '#1D9E75', fontWeight: 500 }}>{food.protein}g</span>
        {food.gi !== 'Unknown' && (
          <span style={{ fontSize: 11, background: giColor(food.gi) + '22', color: giColor(food.gi), padding: '2px 7px', borderRadius: 10 }}>{food.gi} GI</span>
        )}
      </div>
    </div>
  )
}
 
// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function AppInner() {
  const { state, dispatch, lang, user, goals } = useApp()
  const t = LANGUAGES[lang] || LANGUAGES.en
  const MEALS = useMemo(() => getMeals(t), [t])
 
  const [search, setSearch] = useState('')
  const [pending, setPending] = useState(null)
  const [usdaResults, setUsdaResults] = useState([])
  const [usdaLoading, setUsdaLoading] = useState(false)
  const [usdaError, setUsdaError] = useState(false)
  const [showJournal, setShowJournal] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [showRecipes, setShowRecipes] = useState(false)
  const [showBarcode, setShowBarcode] = useState(false)
  const [tip] = useState(() => HEALTH_TIPS[Math.floor(Math.random() * HEALTH_TIPS.length)])
  const [showTip, setShowTip] = useState(true)
  const [saveFeedback, setSaveFeedback] = useState('')
 
  const totals = useMemo(() => state.log.reduce((acc, item) => ({
    calories: acc.calories + item.calories,
    protein: acc.protein + item.protein,
    carbs: acc.carbs + item.carbs,
    fat: acc.fat + item.fat,
    fiber: acc.fiber + item.fiber,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }), [state.log])
 
  const { rating, reasons } = useMemo(() =>
    state.log.length > 0 ? calcRatingWithBreakdown(totals, goals) : { rating: null, reasons: [] },
    [totals, goals, state.log.length])
 
  const rl = useMemo(() => rating ? ratingLabel(rating, t) : null, [rating, t])
 
  const mealGroups = useMemo(() =>
    MEALS.map(m => ({ ...m, items: state.log.filter(i => i.meal === m.key) })).filter(m => m.items.length > 0),
    [state.log, MEALS])
 
  const warnings = useMemo(() => [
    totals.protein > goals.protein && `${t.protein} ${t.exceeded} (${Math.round(totals.protein)}g / ${goals.protein}g)`,
    totals.carbs > goals.carbs && `${t.carbs} ${t.exceeded} (${Math.round(totals.carbs)}g / ${goals.carbs}g)`,
    totals.fat > goals.fat && `${t.fat} ${t.exceeded} (${Math.round(totals.fat)}g / ${goals.fat}g)`,
    totals.calories > goals.calories && `${t.calories} ${t.exceeded} (${Math.round(totals.calories)} / ${goals.calories} kcal)`,
  ].filter(Boolean), [totals, goals, t])
 
  const aiSuggestions = useMemo(() => getAISuggestions(totals, goals), [totals, goals])
  const streak = useMemo(() => calcStreak(state.journal), [state.journal])
 
  const localFiltered = useMemo(() => {
    if (!search) return []
    const q = search.toLowerCase().trim()
    return LOCAL_FOODS.filter(f => q.split(' ').every(w => f.name.toLowerCase().includes(w)))
  }, [search])
 
  useEffect(() => {
    if (search.length < 3) { setUsdaResults([]); setUsdaError(false); return }
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setUsdaLoading(true); setUsdaError(false)
      try {
        const results = await searchUSDA(search, controller.signal)
        setUsdaResults(results)
      } catch (e) {
        if (e.name !== 'AbortError') { setUsdaError(true); setUsdaResults([]) }
      } finally { setUsdaLoading(false) }
    }, 600)
    return () => { clearTimeout(timer); controller.abort() }
  }, [search])
 
  const confirmAdd = useCallback((item) => {
    dispatch({ type: 'ADD_FOOD', food: item })
    setPending(null); setSearch('')
  }, [dispatch])
 
  const removeFood = useCallback((index) => dispatch({ type: 'REMOVE_FOOD', index }), [dispatch])
 
  const saveDay = useCallback(() => {
    const key = todayKey()
    const alreadySaved = !!state.journal[key]
    dispatch({ type: 'SAVE_DAY', key, entry: { totals, log: state.log, rating, ratingReasons: reasons, note: state.dayNote, savedAt: new Date().toISOString(), water: state.waterGlasses } })
    setSaveFeedback(alreadySaved ? t.alreadySaved : t.daySaved)
    setTimeout(() => setSaveFeedback(''), 2500)
  }, [state, totals, rating, reasons, t, dispatch])
 
  const macros = useMemo(() => [
    { label: t.protein, val: totals.protein, goal: goals.protein, color: '#1D9E75' },
    { label: t.carbs, val: totals.carbs, goal: goals.carbs, color: '#378ADD' },
    { label: t.fat, val: totals.fat, goal: goals.fat, color: '#EF9F27' },
    { label: t.fiber, val: totals.fiber, goal: goals.fiber, color: '#639922' },
  ], [totals, goals, t])
 
  return (
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 110px', fontFamily: 'system-ui, sans-serif' }}>
      {pending && <AddFoodModal food={pending} onConfirm={confirmAdd} onCancel={() => setPending(null)} lang={lang} />}
      {showJournal && <JournalView onClose={() => setShowJournal(false)} lang={lang} />}
      {showRecipes && <RecipeBuilder lang={lang} onClose={() => setShowRecipes(false)} />}
      {showBarcode && <BarcodeScanner lang={lang} onFound={food => { setPending(food); setShowBarcode(false) }} onClose={() => setShowBarcode(false)} />}
 
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>🥗 {t.appName}</h1>
          <p style={{ fontSize: 14, color: '#888' }}>
            {t.namaste}, {user}!
            {streak > 0 && <span style={{ marginLeft: 8, color: '#E24B4A' }}>🔥 {streak} {t.streak}</span>}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => setShowBarcode(true)} style={{ ...S.iconBtn, fontSize: 18, padding: '4px 8px' }} title={t.scanBarcode}>📷</button>
          <button onClick={() => window.location.reload()} style={S.iconBtn}>🌐</button>
          <button onClick={() => { localStorage.clear(); window.location.reload() }} style={S.iconBtn}>{t.editProfile}</button>
        </div>
      </div>
 
      {/* Tip */}
      {showTip && (
        <div style={{ background: '#E1F5EE', border: '0.5px solid #9FE1CB', borderRadius: 12, padding: '10px 14px', marginBottom: 14, display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
          <div style={{ flex: 1, fontSize: 13, color: '#085041', lineHeight: 1.5 }}>{tip}</div>
          <button onClick={() => setShowTip(false)} style={{ background: 'none', border: 'none', color: '#9FE1CB', cursor: 'pointer', fontSize: 16, padding: 0 }}>×</button>
        </div>
      )}
 
      {/* Day Rating */}
      {rating && (
        <div style={{ background: rl.color + '18', border: `0.5px solid ${rl.color}55`, borderRadius: 14, padding: '12px 16px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => setShowBreakdown(v => !v)}>
          <div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 2 }}>{t.dayRating} <span style={{ fontSize: 11, color: '#aaa' }}>(tap for breakdown)</span></div>
            <div style={{ fontSize: 15, fontWeight: 500, color: rl.color }}>{rl.label}</div>
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: rl.color }}>{rating}<span style={{ fontSize: 16, fontWeight: 400, color: '#aaa' }}>/10</span></div>
        </div>
      )}
      {showBreakdown && reasons.length > 0 && (
        <div style={{ background: '#f9f9f9', borderRadius: 12, padding: '12px 16px', marginBottom: 14 }}>
          {reasons.map((r, i) => <div key={i} style={{ fontSize: 13, color: r.color, padding: '2px 0' }}>{r.text}</div>)}
        </div>
      )}
 
      {/* Macro Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        {macros.map(m => {
          const pct = Math.min(100, Math.round((m.val / m.goal) * 100))
          const over = m.val > m.goal
          return (
            <div key={m.label} style={{ background: over ? '#FFF5F5' : '#f9f9f9', borderRadius: 12, padding: '12px 14px', border: `0.5px solid ${over ? '#F7C1C1' : '#e5e5e5'}` }}>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{m.label} {over && '⚠️'}</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: over ? '#E24B4A' : m.color }}>{Math.round(m.val)}<span style={{ fontSize: 13, fontWeight: 400 }}>g</span></div>
              <div style={{ height: 4, background: '#e5e5e5', borderRadius: 2, marginTop: 6 }}>
                <div style={{ height: 4, width: `${pct}%`, background: over ? '#E24B4A' : m.color, borderRadius: 2, transition: 'width 0.3s ease' }} />
              </div>
              <div style={{ fontSize: 11, color: '#aaa', marginTop: 4 }}>{t.goal}: {m.goal}g</div>
            </div>
          )
        })}
      </div>
 
      {/* Calories */}
      <div style={{ background: totals.calories > goals.calories ? '#FFF5F5' : '#f9f9f9', borderRadius: 12, padding: '12px 14px', border: `0.5px solid ${totals.calories > goals.calories ? '#F7C1C1' : '#e5e5e5'}`, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 14, color: '#555' }}>{t.calories} {totals.calories > goals.calories && '⚠️'}</span>
        <span style={{ fontSize: 18, fontWeight: 600, color: totals.calories > goals.calories ? '#E24B4A' : '#222' }}>
          {totals.calories} <span style={{ fontSize: 13, fontWeight: 400, color: '#888' }}>/ {goals.calories} kcal</span>
        </span>
      </div>
 
      {/* Water */}
      <div style={{ background: '#E6F1FB', border: '0.5px solid #B5D4F4', borderRadius: 12, padding: '12px 14px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 12, color: '#185FA5', marginBottom: 4 }}>💧 {t.waterIntake}</div>
          <div style={{ display: 'flex', gap: 3 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ width: 20, height: 20, borderRadius: 4, background: i < state.waterGlasses ? '#378ADD' : '#B5D4F4', transition: 'background 0.2s' }} />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: '#185FA5' }}>{state.waterGlasses}</span>
          {state.waterGlasses > 0 && <button onClick={() => dispatch({ type: 'SET_WATER', val: state.waterGlasses - 1 })} style={{ ...S.qtyBtn, fontSize: 14, width: 30, height: 30 }}>−</button>}
          <button onClick={() => dispatch({ type: 'SET_WATER', val: Math.min(8, state.waterGlasses + 1) })}
            style={{ padding: '7px 12px', borderRadius: 10, background: '#378ADD', color: '#fff', border: 'none', fontSize: 13, cursor: 'pointer' }}>{t.addWater}</button>
        </div>
      </div>
 
      {/* Warnings */}
      {warnings.map(w => <div key={w} style={{ background: '#FCEBEB', border: '0.5px solid #F7C1C1', borderRadius: 12, padding: '10px 14px', marginBottom: 10, fontSize: 13, color: '#A32D2D' }}>🚨 {w}</div>)}
      {totals.protein < goals.protein * 0.5 && state.log.length > 0 && (
        <div style={{ background: '#FAEEDA', border: '0.5px solid #FAC775', borderRadius: 12, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#854F0B' }}>{t.lowProtein}</div>
      )}
 
      {/* Action buttons row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <button onClick={() => setShowRecipes(true)}
          style={{ flex: 1, padding: '10px 8px', borderRadius: 12, background: '#f9f9f9', border: '0.5px solid #e5e5e5', fontSize: 13, cursor: 'pointer', color: '#555', fontWeight: 500 }}>
          🍽️ {t.recipeBuilder}
        </button>
        <button onClick={() => setShowBarcode(true)}
          style={{ flex: 1, padding: '10px 8px', borderRadius: 12, background: '#f9f9f9', border: '0.5px solid #e5e5e5', fontSize: 13, cursor: 'pointer', color: '#555', fontWeight: 500 }}>
          {t.scanBarcode}
        </button>
      </div>
 
      {/* AI Suggestions */}
      {state.log.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <button onClick={() => setShowAI(v => !v)}
            style={{ width: '100%', padding: '10px', borderRadius: 12, background: showAI ? '#E1F5EE' : '#f9f9f9', border: `0.5px solid ${showAI ? '#9FE1CB' : '#e5e5e5'}`, color: showAI ? '#0F6E56' : '#555', fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>
            {t.getAI}
          </button>
          {showAI && (
            <div style={{ marginTop: 8, border: '0.5px solid #e5e5e5', borderRadius: 12, overflow: 'hidden' }}>
              {aiSuggestions.length === 0
                ? <div style={{ padding: '12px 14px', fontSize: 13, color: '#888' }}>You are on track — great job!</div>
                : aiSuggestions.map((s, i) => (
                    <div key={i} style={{ padding: '10px 14px', borderBottom: '0.5px solid #f5f5f5', display: 'flex', gap: 10 }}>
                      <span style={{ fontSize: 20 }}>{s.emoji}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>{s.food}</div>
                        <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{s.reason}</div>
                      </div>
                    </div>
                  ))
              }
            </div>
          )}
        </div>
      )}
 
      {/* Search */}
      <input type="text" placeholder={t.searchPlaceholder} value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '0.5px solid #ddd', fontSize: 15, marginBottom: 10, boxSizing: 'border-box' }} />
 
      {search && localFiltered.length > 0 && (
        <div style={{ border: '0.5px solid #e5e5e5', borderRadius: 12, overflow: 'hidden', marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: '#888', padding: '8px 14px 4px', background: '#fafafa' }}>{t.indianFoods}</div>
          {localFiltered.slice(0, 5).map(food => (
            <FoodRow key={food.id} food={food} onClick={() => { setPending(food); setSearch('') }} />
          ))}
        </div>
      )}
 
      {search.length >= 3 && (
        <div style={{ border: '0.5px solid #e5e5e5', borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#888', padding: '8px 14px 4px', background: '#fafafa', display: 'flex', justifyContent: 'space-between' }}>
            <span>{t.usdaDb}</span>
            {usdaLoading && <span style={{ color: '#378ADD' }}>{t.searching}</span>}
            {usdaError && <span style={{ color: '#E24B4A' }}>{t.usdaError}</span>}
          </div>
          {!usdaLoading && !usdaError && usdaResults.length === 0 && <div style={{ padding: '12px 14px', fontSize: 13, color: '#bbb' }}>{t.noFoods}</div>}
          {usdaResults.map((food, i) => (
            <FoodRow key={i} food={food} onClick={() => { setPending(food); setSearch('') }} />
          ))}
        </div>
      )}
 
      {/* Log */}
      <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>{t.todaysLog} {state.log.length > 0 && `(${state.log.length})`}</div>
      {state.log.length === 0 && <div style={{ fontSize: 14, color: '#bbb', textAlign: 'center', padding: '32px 0' }}>{t.logEmpty}</div>}
 
      {mealGroups.map(group => (
        <div key={group.key} style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#555', marginBottom: 8 }}>{group.emoji} {group.label}</div>
          {group.items.map(item => {
            const realIndex = state.log.indexOf(item)
            return (
              <div key={realIndex} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '0.5px solid #f0f0f0' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{item.portion} · {item.calories} kcal</div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#1D9E75' }}>{item.protein}g protein</span>
                  <button onClick={() => removeFood(realIndex)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: 16 }}>×</button>
                </div>
              </div>
            )
          })}
        </div>
      ))}
 
      {state.log.length > 0 && (
        <textarea placeholder={t.dayNote} value={state.dayNote}
          onChange={e => dispatch({ type: 'SET_NOTE', val: e.target.value })}
          style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '0.5px solid #ddd', fontSize: 14, resize: 'none', height: 68, boxSizing: 'border-box', marginBottom: 12, fontFamily: 'system-ui' }} />
      )}
 
      {/* Bottom bar */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480, background: '#fff', borderTop: '0.5px solid #e5e5e5', padding: '12px 16px', display: 'flex', gap: 10, zIndex: 50 }}>
        <button onClick={() => setShowJournal(true)}
          style={{ flex: 1, padding: '12px', borderRadius: 12, background: '#f9f9f9', border: '0.5px solid #ddd', fontSize: 14, cursor: 'pointer', color: '#555' }}>
          📓 {t.journal}
        </button>
        <button onClick={saveDay} disabled={state.log.length === 0}
          style={{ flex: 2, padding: '12px', borderRadius: 12, background: saveFeedback ? '#0F6E56' : state.log.length > 0 ? '#1D9E75' : '#e5e5e5', color: state.log.length > 0 ? '#fff' : '#aaa', border: 'none', fontSize: 14, fontWeight: 500, cursor: state.log.length > 0 ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}>
          {saveFeedback || t.saveDay}
        </button>
      </div>
    </div>
  )
}
 
// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  // Setup flow: lang → auth → name → body → goals → app
  const [lang, setLang] = useState(() => localStorage.getItem('vm_lang') || null)
  const [authEmail, setAuthEmail] = useState(() => localStorage.getItem('vm_auth') || null)
  const [user, setUser] = useState(() => localStorage.getItem('vm_user') || null)
  const [bodyData, setBodyData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vm_body')) } catch { return null }
  })
  const [setupStep, setSetupStep] = useState('name') // 'name' | 'body' | 'goals'
  const [pendingSuggestedGoals, setPendingSuggestedGoals] = useState(null)
 
  const [state, dispatch] = useReducer(appReducer, initialState, () => {
    try {
      const goals = JSON.parse(localStorage.getItem('vm_goals'))
      const log = JSON.parse(localStorage.getItem('vm_log_' + todayKey())) || []
      const journal = JSON.parse(localStorage.getItem('vm_journal')) || {}
      const waterGlasses = parseInt(localStorage.getItem('vm_water_' + todayKey())) || 0
      const dayNote = localStorage.getItem('vm_note_' + todayKey()) || ''
      const recipes = JSON.parse(localStorage.getItem('vm_recipes')) || []
      return { goals, log, journal, waterGlasses, dayNote, recipes }
    } catch { return initialState }
  })
 
  useEffect(() => { if (lang) localStorage.setItem('vm_lang', lang) }, [lang])
  useEffect(() => { if (authEmail) localStorage.setItem('vm_auth', authEmail) }, [authEmail])
  useEffect(() => { if (user) localStorage.setItem('vm_user', user) }, [user])
  useEffect(() => { if (bodyData) localStorage.setItem('vm_body', JSON.stringify(bodyData)) }, [bodyData])
  useEffect(() => { if (state.goals) localStorage.setItem('vm_goals', JSON.stringify(state.goals)) }, [state.goals])
  useEffect(() => { localStorage.setItem('vm_log_' + todayKey(), JSON.stringify(state.log)) }, [state.log])
  useEffect(() => { localStorage.setItem('vm_journal', JSON.stringify(state.journal)) }, [state.journal])
  useEffect(() => { localStorage.setItem('vm_water_' + todayKey(), state.waterGlasses) }, [state.waterGlasses])
  useEffect(() => { localStorage.setItem('vm_note_' + todayKey(), state.dayNote) }, [state.dayNote])
  useEffect(() => { localStorage.setItem('vm_recipes', JSON.stringify(state.recipes)) }, [state.recipes])
 
  // Flow gates
  if (!lang) return <LanguagePicker onSelect={setLang} />
  if (!authEmail) return <AuthScreen lang={lang} onAuth={email => { setAuthEmail(email); localStorage.setItem('vm_auth', email) }} />
  if (!user || !state.goals) {
    if (setupStep === 'name') return <NameStep lang={lang} onComplete={name => { setUser(name); setSetupStep('body') }} onBack={() => setLang(null)} />
    if (setupStep === 'body') return <BodyProfileStep lang={lang}
      onComplete={(bd, suggested) => { setBodyData(bd); setPendingSuggestedGoals(suggested); setSetupStep('goals') }}
      onBack={() => setSetupStep('name')} />
    if (setupStep === 'goals') return <GoalsReviewStep lang={lang}
      suggestedGoals={pendingSuggestedGoals}
      bodyData={bodyData}
      onComplete={goals => {
        const numGoals = Object.fromEntries(Object.entries(goals).map(([k, v]) => [k, Number(v)]))
        dispatch({ type: 'SET_GOALS', goals: numGoals })
      }}
      onBack={() => setSetupStep('body')} />
  }
 
  return (
    <AppContext.Provider value={{ state, dispatch, lang, user, goals: state.goals }}>
      <AppInner />
    </AppContext.Provider>
  )
}
 
// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = {
  setupWrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', fontFamily: 'system-ui, sans-serif', background: '#fafafa' },
  setupCard: { width: '100%', maxWidth: 420, background: '#fff', borderRadius: 20, border: '0.5px solid #e5e5e5', padding: '32px 28px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' },
  emoji: { fontSize: 40, marginBottom: 12 },
  setupTitle: { fontSize: 22, fontWeight: 600, marginBottom: 6 },
  setupSub: { fontSize: 14, color: '#888', marginBottom: 24 },
  field: { marginBottom: 16 },
  label: { fontSize: 13, color: '#555', display: 'block', marginBottom: 6, fontWeight: 500 },
  input: { width: '100%', padding: '10px 14px', borderRadius: 10, border: '0.5px solid #ddd', fontSize: 15, boxSizing: 'border-box', outline: 'none', fontFamily: 'system-ui' },
  btnActive: { flex: 1, padding: '12px', borderRadius: 10, background: '#1D9E75', color: '#fff', border: 'none', fontSize: 15, fontWeight: 500, cursor: 'pointer' },
  btnDisabled: { flex: 1, padding: '12px', borderRadius: 10, background: '#e5e5e5', color: '#aaa', border: 'none', fontSize: 15, fontWeight: 500, cursor: 'not-allowed' },
  btnBack: { padding: '12px 20px', borderRadius: 10, background: 'none', color: '#888', border: '0.5px solid #ddd', fontSize: 15, cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 100 },
  modalCard: { width: '100%', maxWidth: 420, background: '#fff', borderRadius: 20, padding: '28px 24px', maxHeight: '90vh', overflowY: 'auto' },
  qtyBtn: { width: 36, height: 36, borderRadius: 10, border: '0.5px solid #ddd', background: '#f9f9f9', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  iconBtn: { fontSize: 12, color: '#aaa', background: 'none', border: '0.5px solid #ddd', borderRadius: 8, padding: '4px 10px', cursor: 'pointer' },
}
