import { useState, useEffect, useReducer, useMemo, useCallback, createContext, useContext } from 'react'
 
// ─── LANGUAGE DATA ────────────────────────────────────────────────────────────
const LANGUAGES = {
  en: {
    appName: 'VegMacro', tagline: 'Indian vegetarian nutrition tracker',
    welcome: 'Welcome to VegMacro', welcomeSub: 'The nutrition tracker built for vegetarian Indians',
    whatsYourName: "What's your name?", namePlaceholder: 'e.g. Rohin',
    continueBtn: 'Continue →', backBtn: '← Back', startBtn: 'Start tracking →',
    setGoals: 'Set your daily goals', goalsSub: 'Enter your daily targets',
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
  },
  gu: {
    appName: 'VegMacro', tagline: 'ભારતીય શાકાહારી પોષણ ટ્રેકર',
    welcome: 'VegMacro માં આપનું સ્વાગત', welcomeSub: 'શાકાહારી ભારતીયો માટે બનાવેલ ટ્રેકર',
    whatsYourName: 'તમારું નામ?', namePlaceholder: 'દા.ત. રોહિન',
    continueBtn: 'આગળ →', backBtn: '← પાછળ', startBtn: 'ટ્રેકિંગ શરૂ →',
    setGoals: 'દૈનિક લક્ષ્યો સેટ કરો', goalsSub: 'લક્ષ્યો દાખલ કરો',
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
  },
  hi: {
    appName: 'VegMacro', tagline: 'भारतीय शाकाहारी पोषण ट्रैकर',
    welcome: 'VegMacro में स्वागत', welcomeSub: 'शाकाहारी भारतीयों के लिए',
    whatsYourName: 'आपका नाम?', namePlaceholder: 'जैसे रोहिन',
    continueBtn: 'आगे →', backBtn: '← वापस', startBtn: 'शुरू करें →',
    setGoals: 'दैनिक लक्ष्य', goalsSub: 'लक्ष्य दर्ज करें',
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
  },
  mr: { appName:'VegMacro',tagline:'भारतीय शाकाहारी पोषण',welcome:'VegMacro मध्ये स्वागत',welcomeSub:'शाकाहारी भारतीयांसाठी',whatsYourName:'तुमचे नाव?',namePlaceholder:'उदा. रोहिन',continueBtn:'पुढे →',backBtn:'← मागे',startBtn:'सुरू करा →',setGoals:'दैनंदिन उद्दिष्टे',goalsSub:'उद्दिष्टे प्रविष्ट करा',calories:'कॅलरी',protein:'प्रथिने',carbs:'कार्ब्स',sugar:'साखर',fat:'चरबी',fiber:'फायबर',namaste:'नमस्कार',editProfile:'संपादित',todaysLog:'आजचा लॉग',searchPlaceholder:'जेवण शोधा...',noFoods:'नाही',logEmpty:'वर शोधा',quantity:'प्रमाण',addToMeal:'कोणत्या जेवणात?',nutritionPreview:'पोषण',cancel:'रद्द',addTo:'जोडा',goal:'उद्दिष्ट',exceeded:'ओलांडले',lowProtein:'⚠️ प्रथिने कमी!',breakfast:'नाश्ता',lunch:'दुपार',dinner:'रात्री',snack:'स्नॅक',dessert:'गोड',chooseLanguage:'भाषा',saveDay:'💾 जतन',journal:'जर्नल',today:'आज',dayRating:'रेटिंग',savedDays:'जतन',noSavedDays:'अजून नाही!',searching:'शोधत...',usdaResults:'USDA',perServing:'सर्व्हिंग',water:'पाणी',waterIntake:'पाणी',glasses:'ग्लास',addWater:'+ ग्लास',streak:'स्ट्रीक',days:'दिवस',tips:'टीप',close:'बंद',dayNote:'नोंद...',excellent:'उत्कृष्ट',great:'छान',good:'ठीक',fair:'सामान्य',poor:'कमकुवत',aiSuggestions:'AI सूचना',getAI:'✨ सुचवा',ratingBreakdown:'स्कोर',weeklyAnalytics:'साप्ताहिक',quickAdd:'जलद',indianFoods:'भारतीय',usdaDb:'USDA',usdaError:'USDA त्रुटी.',totalDays:'एकूण',currentStreak:'स्ट्रीक',daySaved:'जतन!',alreadySaved:'अपडेट!',analyticsEmpty:'2+ दिवस जतन करा.',avgRating:'सरासरी',bestDay:'सर्वोत्तम',avgProtein:'स. प्रथिने' },
  ta: { appName:'VegMacro',tagline:'இந்திய சைவ கண்காணிப்பு',welcome:'VegMacro வரவேற்கிறோம்',welcomeSub:'சைவ இந்தியர்களுக்காக',whatsYourName:'உங்கள் பெயர்?',namePlaceholder:'ரோஹின்',continueBtn:'தொடர் →',backBtn:'← திரும்பு',startBtn:'தொடங்கு →',setGoals:'தினசரி இலக்கு',goalsSub:'இலக்கு உள்ளிடு',calories:'கலோரி',protein:'புரதம்',carbs:'கார்ப்ஸ்',sugar:'சர்க்கரை',fat:'கொழுப்பு',fiber:'நார்',namaste:'வணக்கம்',editProfile:'திருத்து',todaysLog:'இன்று',searchPlaceholder:'உணவு தேடு...',noFoods:'இல்லை',logEmpty:'தேடுங்கள்',quantity:'அளவு',addToMeal:'வேளை?',nutritionPreview:'ஊட்டசத்து',cancel:'ரத்து',addTo:'சேர்',goal:'இலக்கு',exceeded:'தாண்டியது',lowProtein:'⚠️ புரதம் குறைவு!',breakfast:'காலை',lunch:'மதியம்',dinner:'இரவு',snack:'சிற்றுண்டி',dessert:'இனிப்பு',chooseLanguage:'மொழி',saveDay:'💾 சேமி',journal:'ஜர்னல்',today:'இன்று',dayRating:'மதிப்பீடு',savedDays:'சேமித்தவை',noSavedDays:'இன்னும் இல்லை!',searching:'தேடுகிறோம்...',usdaResults:'USDA',perServing:'பரிமாறல்',water:'தண்ணீர்',waterIntake:'தண்ணீர்',glasses:'கிளாஸ்',addWater:'+ கிளாஸ்',streak:'தொடர்',days:'நாட்கள்',tips:'குறிப்பு',close:'மூடு',dayNote:'குறிப்பு...',excellent:'சிறப்பு',great:'நல்லது',good:'ஓகே',fair:'சாதாரண',poor:'மோசம்',aiSuggestions:'AI பரிந்துரை',getAI:'✨ பரிந்துரை',ratingBreakdown:'மதிப்பெண்',weeklyAnalytics:'வாராந்திர',quickAdd:'விரைவு',indianFoods:'இந்திய',usdaDb:'USDA',usdaError:'USDA தோல்வி.',totalDays:'மொத்தம்',currentStreak:'தொடர்',daySaved:'சேமிக்கப்பட்டது!',alreadySaved:'புதுப்பிக்கப்பட்டது!',analyticsEmpty:'2+ நாட்கள் சேமிக்கவும்.',avgRating:'சராசரி',bestDay:'சிறந்த நாள்',avgProtein:'சர. புரதம்' },
  te: { appName:'VegMacro',tagline:'భారతీయ శాకాహార ట్రాకర్',welcome:'VegMacro కి స్వాగతం',welcomeSub:'శాకాహారి భారతీయులకు',whatsYourName:'మీ పేరు?',namePlaceholder:'రోహిన్',continueBtn:'కొనసాగు →',backBtn:'← వెనక్కి',startBtn:'ప్రారంభించు →',setGoals:'రోజువారీ లక్ష్యాలు',goalsSub:'లక్ష్యాలు నమోదు',calories:'కేలరీలు',protein:'ప్రోటీన్',carbs:'కార్బ్స్',sugar:'చక్కెర',fat:'కొవ్వు',fiber:'ఫైబర్',namaste:'నమస్తే',editProfile:'సవరించు',todaysLog:'నేటి లాగ్',searchPlaceholder:'ఆహారం వెతకు...',noFoods:'లేదు',logEmpty:'వెతకండి',quantity:'పరిమాణం',addToMeal:'భోజనం?',nutritionPreview:'పోషణ',cancel:'రద్దు',addTo:'జోడించు',goal:'లక్ష్యం',exceeded:'మించింది',lowProtein:'⚠️ ప్రోటీన్ తక్కువ!',breakfast:'అల్పాహారం',lunch:'మధ్యాహ్నం',dinner:'రాత్రి',snack:'స్నాక్',dessert:'తీపి',chooseLanguage:'భాష',saveDay:'💾 సేవ్',journal:'జర్నల్',today:'నేడు',dayRating:'రేటింగ్',savedDays:'సేవ్ చేసిన',noSavedDays:'ఇంకా సేవ్ లేదు!',searching:'వెతుకుతున్నాం...',usdaResults:'USDA',perServing:'సర్వింగ్',water:'నీరు',waterIntake:'నీరు',glasses:'గ్లాసులు',addWater:'+ గ్లాస్',streak:'స్ట్రీక్',days:'రోజులు',tips:'చిట్కా',close:'మూసివేయి',dayNote:'నోట్...',excellent:'అద్భుతం',great:'గొప్ప',good:'సరే',fair:'సాధారణ',poor:'చెడు',aiSuggestions:'AI సూచనలు',getAI:'✨ సూచనలు',ratingBreakdown:'స్కోర్',weeklyAnalytics:'వారపు',quickAdd:'త్వరగా',indianFoods:'భారతీయ',usdaDb:'USDA',usdaError:'USDA వైఫల్యం.',totalDays:'మొత్తం',currentStreak:'స్ట్రీక్',daySaved:'సేవ్!',alreadySaved:'అప్డేట్!',analyticsEmpty:'2+ రోజులు సేవ్ చేయండి.',avgRating:'సగటు',bestDay:'ఉత్తమ',avgProtein:'స. ప్రోటీన్' },
  kn: { appName:'VegMacro',tagline:'ಭಾರತೀಯ ಸಸ್ಯಾಹಾರಿ ಟ್ರ್ಯಾಕರ್',welcome:'VegMacro ಗೆ ಸ್ವಾಗತ',welcomeSub:'ಸಸ್ಯಾಹಾರಿ ಭಾರತೀಯರಿಗಾಗಿ',whatsYourName:'ನಿಮ್ಮ ಹೆಸರು?',namePlaceholder:'ರೋಹಿನ್',continueBtn:'ಮುಂದುವರಿ →',backBtn:'← ಹಿಂದೆ',startBtn:'ಪ್ರಾರಂಭ →',setGoals:'ದೈನಂದಿನ ಗುರಿ',goalsSub:'ಗುರಿ ನಮೂದಿಸಿ',calories:'ಕ್ಯಾಲೊರಿ',protein:'ಪ್ರೋಟೀನ್',carbs:'ಕಾರ್ಬ್ಸ್',sugar:'ಸಕ್ಕರೆ',fat:'ಕೊಬ್ಬು',fiber:'ಫೈಬರ್',namaste:'ನಮಸ್ತೆ',editProfile:'ಸಂಪಾದಿಸಿ',todaysLog:'ಇಂದಿನ ಲಾಗ್',searchPlaceholder:'ಆಹಾರ ಹುಡುಕಿ...',noFoods:'ಇಲ್ಲ',logEmpty:'ಹುಡುಕಿ',quantity:'ಪ್ರಮಾಣ',addToMeal:'ಊಟ?',nutritionPreview:'ಪೋಷಣೆ',cancel:'ರದ್ದು',addTo:'ಸೇರಿಸಿ',goal:'ಗುರಿ',exceeded:'ಮೀರಿತು',lowProtein:'⚠️ ಪ್ರೋಟೀನ್ ಕಡಿಮೆ!',breakfast:'ತಿಂಡಿ',lunch:'ಮಧ್ಯಾಹ್ನ',dinner:'ರಾತ್ರಿ',snack:'ಸ್ನ್ಯಾಕ್',dessert:'ಸಿಹಿ',chooseLanguage:'ಭಾಷೆ',saveDay:'💾 ಉಳಿಸಿ',journal:'ಜರ್ನಲ್',today:'ಇಂದು',dayRating:'ರೇಟಿಂಗ್',savedDays:'ಉಳಿಸಿದ',noSavedDays:'ಇನ್ನೂ ಇಲ್ಲ!',searching:'ಹುಡುಕುತ್ತಿದ್ದೇವೆ...',usdaResults:'USDA',perServing:'ಸರ್ವಿಂಗ್',water:'ನೀರು',waterIntake:'ನೀರು',glasses:'ಗ್ಲಾಸ್',addWater:'+ ಗ್ಲಾಸ್',streak:'ಸ್ಟ್ರೀಕ್',days:'ದಿನ',tips:'ಟಿಪ್',close:'ಮುಚ್ಚಿ',dayNote:'ಟಿಪ್ಪಣಿ...',excellent:'ಅತ್ಯುತ್ತಮ',great:'ಚೆನ್ನಾಗಿದೆ',good:'ಸರಿ',fair:'ಸಾಧಾರಣ',poor:'ಕಳಪೆ',aiSuggestions:'AI ಸೂಚನೆ',getAI:'✨ ಸೂಚಿಸಿ',ratingBreakdown:'ಸ್ಕೋರ್',weeklyAnalytics:'ವಾರದ',quickAdd:'ತ್ವರಿತ',indianFoods:'ಭಾರತೀಯ',usdaDb:'USDA',usdaError:'USDA ವಿಫಲ.',totalDays:'ಒಟ್ಟು',currentStreak:'ಸ್ಟ್ರೀಕ್',daySaved:'ಉಳಿಸಲಾಗಿದೆ!',alreadySaved:'ನವೀಕರಿಸಲಾಗಿದೆ!',analyticsEmpty:'2+ ದಿನ ಉಳಿಸಿ.',avgRating:'ಸರಾಸರಿ',bestDay:'ಉತ್ತಮ',avgProtein:'ಸ. ಪ್ರೋಟೀನ್' },
  pa: { appName:'VegMacro',tagline:'ਭਾਰਤੀ ਸ਼ਾਕਾਹਾਰੀ ਟਰੈਕਰ',welcome:'VegMacro ਵਿੱਚ ਸੁਆਗਤ',welcomeSub:'ਸ਼ਾਕਾਹਾਰੀ ਭਾਰਤੀਆਂ ਲਈ',whatsYourName:'ਤੁਹਾਡਾ ਨਾਮ?',namePlaceholder:'ਰੋਹਿਨ',continueBtn:'ਅੱਗੇ →',backBtn:'← ਵਾਪਸ',startBtn:'ਸ਼ੁਰੂ →',setGoals:'ਰੋਜ਼ਾਨਾ ਟੀਚੇ',goalsSub:'ਟੀਚੇ ਦਰਜ',calories:'ਕੈਲੋਰੀ',protein:'ਪ੍ਰੋਟੀਨ',carbs:'ਕਾਰਬਸ',sugar:'ਖੰਡ',fat:'ਚਰਬੀ',fiber:'ਫਾਈਬਰ',namaste:'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',editProfile:'ਸੰਪਾਦਿਤ',todaysLog:'ਅੱਜ',searchPlaceholder:'ਖਾਣਾ ਲੱਭੋ...',noFoods:'ਨਹੀਂ ਮਿਲਿਆ',logEmpty:'ਉੱਪਰ ਲੱਭੋ',quantity:'ਮਾਤਰਾ',addToMeal:'ਭੋਜਨ?',nutritionPreview:'ਪੋਸ਼ਣ',cancel:'ਰੱਦ',addTo:'ਜੋੜੋ',goal:'ਟੀਚਾ',exceeded:'ਵੱਧ',lowProtein:'⚠️ ਪ੍ਰੋਟੀਨ ਘੱਟ!',breakfast:'ਨਾਸ਼ਤਾ',lunch:'ਦੁਪਹਿਰ',dinner:'ਰਾਤ',snack:'ਸਨੈਕ',dessert:'ਮਠਿਆਈ',chooseLanguage:'ਭਾਸ਼ਾ',saveDay:'💾 ਸੇਵ',journal:'ਜਰਨਲ',today:'ਅੱਜ',dayRating:'ਰੇਟਿੰਗ',savedDays:'ਸੇਵ',noSavedDays:'ਹਜੇ ਨਹੀਂ!',searching:'ਲੱਭ ਰਹੇ...',usdaResults:'USDA',perServing:'ਸਰਵਿੰਗ',water:'ਪਾਣੀ',waterIntake:'ਪਾਣੀ',glasses:'ਗਿਲਾਸ',addWater:'+ ਗਿਲਾਸ',streak:'ਸਟ੍ਰੀਕ',days:'ਦਿਨ',tips:'ਟਿਪ',close:'ਬੰਦ',dayNote:'ਨੋਟ...',excellent:'ਸ਼ਾਨਦਾਰ',great:'ਵਧੀਆ',good:'ਠੀਕ',fair:'ਸਧਾਰਨ',poor:'ਮਾੜਾ',aiSuggestions:'AI ਸੁਝਾਅ',getAI:'✨ ਸੁਝਾਅ',ratingBreakdown:'ਸਕੋਰ',weeklyAnalytics:'ਹਫਤਾਵਾਰੀ',quickAdd:'ਜਲਦੀ',indianFoods:'ਭਾਰਤੀ',usdaDb:'USDA',usdaError:'USDA ਗਲਤੀ.',totalDays:'ਕੁੱਲ',currentStreak:'ਸਟ੍ਰੀਕ',daySaved:'ਸੇਵ!',alreadySaved:'ਅਪਡੇਟ!',analyticsEmpty:'2+ ਦਿਨ ਸੇਵ ਕਰੋ.',avgRating:'ਔਸਤ',bestDay:'ਸਭ ਤੋਂ ਵਧੀਆ',avgProtein:'ਔ. ਪ੍ਰੋਟੀਨ' },
}
 
const LANG_OPTIONS = [
  { code: 'en', label: 'English' }, { code: 'gu', label: 'ગુજરાતી' },
  { code: 'hi', label: 'हिन्दी' }, { code: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' }, { code: 'te', label: 'తెలుగు' },
  { code: 'kn', label: 'ಕನ್ನಡ' }, { code: 'pa', label: 'ਪੰਜਾਬੀ' },
]
 
// ─── FOOD DATABASE ────────────────────────────────────────────────────────────
// Each food has: id (stable key), category (protein/carb/fat/mixed/sweet),
// cuisine tag — this structure enables filtering, ML, and recommendations later
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
  { id:'fafda', name:'Fafda', category:'carb', cuisine:'gujarati', portion:'6 pieces (60g)', calories:210, protein:5, carbs:22, fat:11, fiber:2, gi:'Medium' },
  { id:'jalebi', name:'Jalebi', category:'sweet', cuisine:'gujarati', portion:'2 pieces (60g)', calories:200, protein:2, carbs:44, fat:4, fiber:0, gi:'High' },
  { id:'undhiyu', name:'Undhiyu', category:'mixed', cuisine:'gujarati', portion:'1 katori (200g)', calories:280, protein:8, carbs:32, fat:13, fiber:9, gi:'Low' },
  { id:'guj_dal', name:'Gujarati dal', category:'protein', cuisine:'gujarati', portion:'1 katori (200g)', calories:160, protein:8, carbs:26, fat:4, fiber:6, gi:'Low' },
  { id:'kadhi', name:'Kadhi', category:'mixed', cuisine:'gujarati', portion:'1 katori (200g)', calories:120, protein:5, carbs:14, fat:5, fiber:1, gi:'Low' },
  { id:'khichdi', name:'Khichdi', category:'mixed', cuisine:'indian', portion:'1 katori (200g)', calories:220, protein:8, carbs:38, fat:4, fiber:4, gi:'Medium' },
  { id:'patra', name:'Patra', category:'mixed', cuisine:'gujarati', portion:'4 pieces (100g)', calories:170, protein:5, carbs:26, fat:6, fiber:4, gi:'Medium' },
  { id:'methi_thepla', name:'Methi thepla', category:'carb', cuisine:'gujarati', portion:'2 thepla (80g)', calories:210, protein:6, carbs:28, fat:8, fiber:5, gi:'Low' },
  { id:'sev_usal', name:'Sev usal', category:'mixed', cuisine:'gujarati', portion:'1 plate (200g)', calories:310, protein:10, carbs:42, fat:11, fiber:8, gi:'Medium' },
  { id:'dabeli', name:'Dabeli', category:'mixed', cuisine:'gujarati', portion:'1 piece (120g)', calories:260, protein:6, carbs:40, fat:9, fiber:3, gi:'Medium' },
  { id:'khandvi', name:'Khandvi', category:'protein', cuisine:'gujarati', portion:'6 rolls (100g)', calories:150, protein:6, carbs:20, fat:5, fiber:2, gi:'Low' },
  { id:'bajra_rotla', name:'Bajra rotla', category:'carb', cuisine:'gujarati', portion:'1 rotla (60g)', calories:155, protein:4, carbs:28, fat:3, fiber:4, gi:'Low' },
  { id:'locho', name:'Surti locho', category:'mixed', cuisine:'gujarati', portion:'1 plate (150g)', calories:230, protein:9, carbs:34, fat:7, fiber:3, gi:'Medium' },
  { id:'muthiya', name:'Muthiya (steamed)', category:'mixed', cuisine:'gujarati', portion:'4 pieces (120g)', calories:190, protein:7, carbs:30, fat:5, fiber:5, gi:'Medium' },
  { id:'ringan_olo', name:'Ringan no olo', category:'mixed', cuisine:'gujarati', portion:'1 katori (150g)', calories:130, protein:3, carbs:16, fat:6, fiber:5, gi:'Low' },
  { id:'toor_dal', name:'Toor dal (Gujarati)', category:'protein', cuisine:'gujarati', portion:'1 katori (200g)', calories:170, protein:10, carbs:28, fat:3, fiber:6, gi:'Low' },
  { id:'handvo', name:'Handvo', category:'mixed', cuisine:'gujarati', portion:'1 slice (120g)', calories:210, protein:8, carbs:30, fat:7, fiber:4, gi:'Medium' },
  { id:'vag_khichdi', name:'Vaghareli khichdi', category:'mixed', cuisine:'gujarati', portion:'1 katori (200g)', calories:250, protein:7, carbs:40, fat:7, fiber:3, gi:'Medium' },
  { id:'chora', name:'Chora (black eyed peas)', category:'protein', cuisine:'gujarati', portion:'1 katori (150g)', calories:165, protein:11, carbs:28, fat:1, fiber:8, gi:'Low' },
  { id:'valor_papdi', name:'Valor papdi nu shaak', category:'mixed', cuisine:'gujarati', portion:'1 katori (150g)', calories:145, protein:6, carbs:20, fat:5, fiber:7, gi:'Low' },
  { id:'dudhi_muthiya', name:'Dudhi muthiya', category:'mixed', cuisine:'gujarati', portion:'4 pieces (120g)', calories:175, protein:6, carbs:28, fat:5, fiber:4, gi:'Medium' },
  { id:'chaas', name:'Chaas (buttermilk)', category:'protein', cuisine:'gujarati', portion:'1 glass (250ml)', calories:60, protein:3, carbs:5, fat:2, fiber:0, gi:'Low' },
  { id:'shrikhand', name:'Shrikhand', category:'sweet', cuisine:'gujarati', portion:'1 katori (100g)', calories:230, protein:7, carbs:38, fat:6, fiber:0, gi:'Medium' },
  { id:'basundi', name:'Basundi', category:'sweet', cuisine:'gujarati', portion:'1 katori (150g)', calories:290, protein:9, carbs:42, fat:10, fiber:0, gi:'High' },
  { id:'puran_poli', name:'Puran poli', category:'sweet', cuisine:'gujarati', portion:'1 piece (80g)', calories:250, protein:6, carbs:44, fat:6, fiber:4, gi:'Medium' },
  { id:'vatana_shaak', name:'Vatana nu shaak', category:'mixed', cuisine:'gujarati', portion:'1 katori (150g)', calories:155, protein:7, carbs:22, fat:5, fiber:6, gi:'Low' },
  { id:'batata_vada', name:'Batata vada', category:'carb', cuisine:'gujarati', portion:'2 pieces (100g)', calories:260, protein:5, carbs:34, fat:12, fiber:3, gi:'Medium' },
  { id:'bhinda', name:'Bhinda nu shaak (okra)', category:'mixed', cuisine:'gujarati', portion:'1 katori (150g)', calories:120, protein:3, carbs:14, fat:6, fiber:5, gi:'Low' },
  { id:'mag_dal', name:'Mag ni dal (whole moong)', category:'protein', cuisine:'gujarati', portion:'1 katori (150g)', calories:148, protein:10, carbs:24, fat:1, fiber:7, gi:'Low' },
  { id:'rotlo_ghee', name:'Rotlo with ghee', category:'carb', cuisine:'gujarati', portion:'1 rotlo + ghee', calories:195, protein:4, carbs:28, fat:8, fiber:4, gi:'Low' },
  { id:'chikki', name:'Chikki (groundnut)', category:'sweet', cuisine:'gujarati', portion:'1 piece (30g)', calories:155, protein:4, carbs:18, fat:8, fiber:1, gi:'Medium' },
  { id:'sev', name:'Sev (plain)', category:'carb', cuisine:'gujarati', portion:'1 katori (30g)', calories:150, protein:4, carbs:18, fat:7, fiber:1, gi:'Medium' },
  { id:'adadiya', name:'Adadiya pak', category:'sweet', cuisine:'gujarati', portion:'1 piece (40g)', calories:200, protein:6, carbs:20, fat:11, fiber:2, gi:'Medium' },
  { id:'mohanthal', name:'Mohanthal', category:'sweet', cuisine:'gujarati', portion:'1 piece (60g)', calories:270, protein:5, carbs:36, fat:12, fiber:2, gi:'High' },
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
 
// ─── STATE MANAGEMENT (useReducer) ───────────────────────────────────────────
const initialState = {
  log: [],
  journal: {},
  goals: null,
  waterGlasses: 0,
  dayNote: '',
}
 
function appReducer(state, action) {
  switch (action.type) {
    case 'LOAD_STATE': return { ...state, ...action.payload }
    case 'ADD_FOOD': return { ...state, log: [...state.log, action.food] }
    case 'REMOVE_FOOD': return { ...state, log: state.log.filter((_, i) => i !== action.index) }
    case 'SET_GOALS': return { ...state, goals: action.goals }
    case 'SET_WATER': return { ...state, waterGlasses: action.val }
    case 'SET_NOTE': return { ...state, dayNote: action.val }
    case 'SAVE_DAY': return { ...state, journal: { ...state.journal, [action.key]: action.entry } }
    case 'CLEAR_LOG': return { ...state, log: [], waterGlasses: 0, dayNote: '' }
    default: return state
  }
}
 
// ─── APP CONTEXT ─────────────────────────────────────────────────────────────
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
 
// Real streak: walk backwards from today counting consecutive saved days
const calcStreak = (journal) => {
  let count = 0
  const d = new Date()
  // Allow today OR yesterday to count as "active" streak
  // so saving at end of day doesn't break it
  while (true) {
    const key = d.toISOString().slice(0, 10)
    if (journal[key]) {
      count++
      d.setDate(d.getDate() - 1)
    } else {
      // Allow one gap for today if not yet saved
      if (count === 0) {
        d.setDate(d.getDate() - 1)
        const yKey = d.toISOString().slice(0, 10)
        if (journal[yKey]) { count++; d.setDate(d.getDate() - 1) }
        else break
      } else break
    }
  }
  return count
}
 
// Weighted rating — protein gets 3x because that's the core mission
// Max possible score = (3+1+1+1+2) * 2 = 16 points → normalize to 10
const WEIGHTS = { protein: 3, calories: 2, carbs: 1, fat: 1, fiber: 1 }
const MAX_SCORE = Object.values(WEIGHTS).reduce((s, w) => s + w * 2, 0) // = 16
 
const calcRatingWithBreakdown = (totals, goals) => {
  const checks = [
    { key: 'protein',  label: 'Protein',  val: totals.protein,  goal: goals.protein },
    { key: 'calories', label: 'Calories', val: totals.calories, goal: goals.calories },
    { key: 'carbs',    label: 'Carbs',    val: totals.carbs,    goal: goals.carbs },
    { key: 'fat',      label: 'Fat',      val: totals.fat,      goal: goals.fat },
    { key: 'fiber',    label: 'Fiber',    val: totals.fiber,    goal: goals.fiber },
  ]
  let score = 0
  const reasons = []
 
  checks.forEach(c => {
    const w = WEIGHTS[c.key]
    const pct = c.val / c.goal
    let pts = 0
    let symbol = ''
 
    if (pct >= 0.85 && pct <= 1.05) {
      pts = w * 2
      symbol = `+${pts} — ${c.label} hit goal ✓`
      reasons.push({ text: symbol, color: '#1D9E75' })
    } else if (pct >= 0.65 && pct <= 1.2) {
      pts = w * 1
      symbol = `+${pts} — ${c.label} close to goal`
      reasons.push({ text: symbol, color: '#EF9F27' })
    } else if (pct > 1.2) {
      pts = -(w * 0.5)
      symbol = `${pts.toFixed(1)} — ${c.label} exceeded goal`
      reasons.push({ text: symbol, color: '#E24B4A' })
    } else {
      pts = 0
      symbol = `+0 — ${c.label} too low (${Math.round(pct * 100)}% of goal)`
      reasons.push({ text: symbol, color: '#aaa' })
    }
    score += pts
  })
 
  // Normalize: (score / MAX_SCORE) * 10, clamped 1–10
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
 
// ─── USDA API ────────────────────────────────────────────────────────────────
// Key comes from .env file (VITE_USDA_KEY). Falls back to DEMO_KEY which
// works but rate-limits heavily — get a free key at fdc.nal.usda.gov/api-key-signup
const USDA_KEY = import.meta.env.VITE_USDA_KEY || 'DEMO_KEY'
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
      name: f.description?.slice(0, 50) || 'Unknown',
      portion: '100g',
      calories: Math.round(get('energy') || get('calorie')),
      protein: get('protein'),
      carbs: get('carbohydrate'),
      fat: get('total lipid'),
      fiber: get('fiber'),
      gi: 'Unknown',
      source: 'USDA',
    }
  })
}
 
// ─── AI SUGGESTIONS ──────────────────────────────────────────────────────────
const getAISuggestions = (totals, goals) => {
  const suggestions = []
  const proteinGap = goals.protein - totals.protein
  const carbsLeft = goals.carbs - totals.carbs
  const fiberGap = goals.fiber - totals.fiber
 
  if (proteinGap > 30) suggestions.push({ emoji: '🧀', food: 'Paneer (100g)', reason: `Adds 18g protein — you need ${Math.round(proteinGap)}g more` })
  if (proteinGap > 20) suggestions.push({ emoji: '🌱', food: 'Soya chunks (30g dry)', reason: `Adds 13g protein — cheap and quick to make` })
  if (proteinGap > 10) suggestions.push({ emoji: '🥛', food: 'Curd (1 katori)', reason: `Adds 6g protein — also good for digestion` })
  if (proteinGap > 5) suggestions.push({ emoji: '🌿', food: 'Moong sprouts (1 katori)', reason: `Adds 4g protein — raw, no cooking needed` })
  if (fiberGap > 10) suggestions.push({ emoji: '🫘', food: 'Rajma (1 katori)', reason: `Adds 9g fiber + 11g protein — double win` })
  if (fiberGap > 5) suggestions.push({ emoji: '🥬', food: 'Undhiyu or Valor papdi', reason: `7–9g fiber per katori — great fiber boost` })
  if (carbsLeft > 80) suggestions.push({ emoji: '🍚', food: 'Khichdi (1 katori)', reason: `Balanced carbs + protein — low GI and filling` })
  if (carbsLeft < 20 && totals.carbs > 0) suggestions.push({ emoji: '⚠️', food: 'Skip rice/roti next meal', reason: `You are near your carb limit for the day` })
  if (totals.calories < goals.calories * 0.6) suggestions.push({ emoji: '🍛', food: 'Add a full meal', reason: `You have eaten less than 60% of your calorie goal` })
  if (totals.fat > goals.fat * 1.1) suggestions.push({ emoji: '🥗', food: 'Try steamed muthiya or dhokla', reason: `Lower fat options to balance your macros` })
 
  return suggestions.slice(0, 4)
}
 
// ─── COMPONENTS ───────────────────────────────────────────────────────────────
 
function LanguagePicker({ onSelect }) {
  return (
    <div style={S.setupWrap}>
      <div style={S.setupCard}>
        <div style={S.emoji}>🌐</div>
        <h1 style={S.setupTitle}>Choose your language</h1>
        <p style={S.setupSub}>ભાષા · भाषा · மொழி · భాష · ಭಾಷೆ · ਭਾਸ਼ਾ</p>
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
 
function Setup({ onComplete, lang }) {
  const t = LANGUAGES[lang]
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [goals, setGoals] = useState({ calories: '', protein: '', carbs: '', sugar: '', fat: '', fiber: '' })
  const updateGoal = (k, v) => {
    // Clamp to sensible maximums so nobody enters protein: 9999
    const maxes = { calories: 5000, protein: 300, carbs: 600, sugar: 200, fat: 200, fiber: 100 }
    const clamped = Math.min(Number(v), maxes[k] || 500)
    setGoals(g => ({ ...g, [k]: clamped === 0 && v === '' ? '' : clamped }))
  }
  const goalsValid = Object.values(goals).every(v => v !== '' && Number(v) > 0)
 
  if (step === 0) return (
    <div style={S.setupWrap}>
      <div style={S.setupCard}>
        <div style={S.emoji}>🥗</div>
        <h1 style={S.setupTitle}>{t.welcome}</h1>
        <p style={S.setupSub}>{t.welcomeSub}</p>
        <div style={S.field}>
          <label style={S.label}>{t.whatsYourName}</label>
          <input style={S.input} placeholder={t.namePlaceholder} value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && name.trim() && setStep(1)} autoFocus />
        </div>
        <button style={name.trim() ? S.btnActive : S.btnDisabled} onClick={() => name.trim() && setStep(1)}>{t.continueBtn}</button>
      </div>
    </div>
  )
 
  return (
    <div style={S.setupWrap}>
      <div style={S.setupCard}>
        <div style={S.emoji}>🎯</div>
        <h1 style={S.setupTitle}>{t.setGoals}</h1>
        <p style={S.setupSub}>{t.goalsSub}</p>
        {[
          { key: 'calories', label: t.calories, unit: 'kcal', ph: '1800' },
          { key: 'protein', label: t.protein, unit: 'g', ph: '80' },
          { key: 'carbs', label: t.carbs, unit: 'g', ph: '200' },
          { key: 'sugar', label: t.sugar, unit: 'g', ph: '30' },
          { key: 'fat', label: t.fat, unit: 'g', ph: '50' },
          { key: 'fiber', label: t.fiber, unit: 'g', ph: '25' },
        ].map(({ key, label, unit, ph }) => (
          <div key={key} style={S.field}>
            <label style={S.label}>{label} <span style={{ color: '#aaa' }}>({unit})</span></label>
            <input style={S.input} type="number" placeholder={ph} value={goals[key]} onChange={e => updateGoal(key, e.target.value)} />
          </div>
        ))}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button style={S.btnBack} onClick={() => setStep(0)}>{t.backBtn}</button>
          <button style={goalsValid ? S.btnActive : S.btnDisabled}
            onClick={() => goalsValid && onComplete(name.trim(), goals)}>{t.startBtn}</button>
        </div>
      </div>
    </div>
  )
}
 
function AddFoodModal({ food, onConfirm, onCancel, lang }) {
  const t = LANGUAGES[lang]
  const [qty, setQty] = useState(1)
  const [meal, setMeal] = useState('')
  const preview = useMemo(() => scaleFood(food, qty), [food, qty])
  const MEALS = getMeals(t)
 
  return (
    <div style={S.modalOverlay}>
      <div style={S.modalCard}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, flex: 1, marginRight: 8 }}>{food.name}</h2>
          {food.source === 'USDA' && <span style={{ fontSize: 11, background: '#E6F1FB', color: '#185FA5', padding: '3px 8px', borderRadius: 8, flexShrink: 0 }}>USDA</span>}
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
 
function JournalView({ onClose, lang }) {
  const { state } = useApp()
  const t = LANGUAGES[lang]
  const [selected, setSelected] = useState(null)
  const [view, setView] = useState('list') // 'list' | 'analytics'
 
  const entries = useMemo(() =>
    Object.entries(state.journal).sort((a, b) => b[0].localeCompare(a[0])),
    [state.journal]
  )
 
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
            <button onClick={() => { setView('list'); setSelected(null) }}
              style={{ fontSize: 13, padding: '6px 14px', borderRadius: 20, border: '0.5px solid', borderColor: view === 'list' ? '#1D9E75' : '#ddd', background: view === 'list' ? '#E1F5EE' : '#fff', color: view === 'list' ? '#1D9E75' : '#555', cursor: 'pointer' }}>
              📓 {t.journal}
            </button>
            <button onClick={() => { setView('analytics'); setSelected(null) }}
              style={{ fontSize: 13, padding: '6px 14px', borderRadius: 20, border: '0.5px solid', borderColor: view === 'analytics' ? '#1D9E75' : '#ddd', background: view === 'analytics' ? '#E1F5EE' : '#fff', color: view === 'analytics' ? '#1D9E75' : '#555', cursor: 'pointer' }}>
              📊 {t.weeklyAnalytics}
            </button>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#aaa' }}>×</button>
        </div>
 
        {/* Analytics view */}
        {view === 'analytics' && (
          <div>
            {!analytics ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#bbb' }}>{t.analyticsEmpty}</div>
            ) : (
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
                <div style={{ fontSize: 13, color: '#555', marginBottom: 10 }}>{t.bestDay}: <strong>{fmtDate(analytics.bestDay)}</strong> ({state.journal[analytics.bestDay]?.rating}/10)</div>
                {/* Mini bar chart */}
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
 
        {/* List view */}
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
                <div style={{ width: 40, height: 40, borderRadius: 20, background: ratingBg(day.rating), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{day.rating}</span>
                </div>
              </div>
            ))}
          </>
        )}
 
        {/* Day detail */}
        {view === 'list' && selected && (() => {
          const day = state.journal[selected]
          return (
            <div>
              <button onClick={() => setSelected(null)} style={{ ...S.btnBack, marginBottom: 16, fontSize: 13, padding: '8px 14px' }}>← Back</button>
              <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{fmtDate(selected)}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 32, fontWeight: 700, color: ratingBg(day.rating) }}>{day.rating}</span>
                <span style={{ fontSize: 13, color: '#888' }}>/10 · {day.totals?.calories || 0} kcal · 💧{day.water || 0} glasses</span>
              </div>
              {day.note && <div style={{ background: '#f9f9f9', borderRadius: 10, padding: '10px 14px', marginBottom: 14, fontSize: 13, color: '#555', fontStyle: 'italic' }}>"{day.note}"</div>}
              {/* Score breakdown */}
              {day.ratingReasons && (
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>SCORE BREAKDOWN</div>
                  {day.ratingReasons.map((r, i) => (
                    <div key={i} style={{ fontSize: 13, color: r.color, padding: '2px 0' }}>{r.text}</div>
                  ))}
                </div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 8, marginBottom: 14 }}>
                {[
                  { label: 'Protein', val: day.totals?.protein, color: '#1D9E75' },
                  { label: 'Carbs', val: day.totals?.carbs, color: '#378ADD' },
                  { label: 'Fat', val: day.totals?.fat, color: '#EF9F27' },
                  { label: 'Fiber', val: day.totals?.fiber, color: '#639922' },
                ].map(m => (
                  <div key={m.label} style={{ background: '#f9f9f9', borderRadius: 10, padding: '10px 12px' }}>
                    <div style={{ fontSize: 11, color: '#888' }}>{m.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: m.color }}>{Math.round(m.val || 0)}g</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11, color: '#888', marginBottom: 6 }}>FOODS EATEN</div>
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
 
function FoodRow({ food, onClick }) {
  return (
    <div onClick={onClick}
      style={{ padding: '11px 14px', borderBottom: '0.5px solid #f0f0f0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff' }}>
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
  const t = LANGUAGES[lang]
  const MEALS = useMemo(() => getMeals(t), [t])
 
  const [search, setSearch] = useState('')
  const [pending, setPending] = useState(null)
  const [usdaResults, setUsdaResults] = useState([])
  const [usdaLoading, setUsdaLoading] = useState(false)
  const [usdaError, setUsdaError] = useState(false)
  const [showJournal, setShowJournal] = useState(false)
  const [showBreakdown, setShowBreakdown] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [tip] = useState(() => HEALTH_TIPS[Math.floor(Math.random() * HEALTH_TIPS.length)])
  const [showTip, setShowTip] = useState(true)
  const [saveFeedback, setSaveFeedback] = useState('')
 
  // useMemo for all derived state — no recompute on keystrokes
  const totals = useMemo(() => state.log.reduce((acc, item) => ({
    calories: acc.calories + item.calories,
    protein: acc.protein + item.protein,
    carbs: acc.carbs + item.carbs,
    fat: acc.fat + item.fat,
    fiber: acc.fiber + item.fiber,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }), [state.log])
 
  const { rating, reasons } = useMemo(() =>
    state.log.length > 0 ? calcRatingWithBreakdown(totals, goals) : { rating: null, reasons: [] },
    [totals, goals, state.log.length]
  )
 
  const rl = useMemo(() => rating ? ratingLabel(rating, t) : null, [rating, t])
 
  const mealGroups = useMemo(() =>
    MEALS.map(m => ({ ...m, items: state.log.filter(i => i.meal === m.key) })).filter(m => m.items.length > 0),
    [state.log, MEALS]
  )
 
  const warnings = useMemo(() => [
    totals.protein > goals.protein && `${t.protein} ${t.exceeded} (${Math.round(totals.protein)}g / ${goals.protein}g)`,
    totals.carbs > goals.carbs && `${t.carbs} ${t.exceeded} (${Math.round(totals.carbs)}g / ${goals.carbs}g)`,
    totals.fat > goals.fat && `${t.fat} ${t.exceeded} (${Math.round(totals.fat)}g / ${goals.fat}g)`,
    totals.fiber > goals.fiber && `${t.fiber} ${t.exceeded} (${Math.round(totals.fiber)}g / ${goals.fiber}g)`,
    totals.calories > goals.calories && `${t.calories} ${t.exceeded} (${Math.round(totals.calories)} / ${goals.calories} kcal)`,
  ].filter(Boolean), [totals, goals, t])
 
  const aiSuggestions = useMemo(() => getAISuggestions(totals, goals), [totals, goals])
  const streak = useMemo(() => calcStreak(state.journal), [state.journal])
  const localFiltered = useMemo(() => {
    if (!search) return []
    const q = search.toLowerCase().trim()
    const words = q.split(' ').filter(Boolean)
    return LOCAL_FOODS.filter(f => {
      const name = f.name.toLowerCase()
      // Match if ALL words appear somewhere in the name
      return words.every(w => name.includes(w))
    })
  }, [search])
 
  // USDA with abort controller + proper error handling
  useEffect(() => {
    if (search.length < 3) { setUsdaResults([]); setUsdaError(false); return }
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setUsdaLoading(true)
      setUsdaError(false)
      try {
        const results = await searchUSDA(search, controller.signal)
        setUsdaResults(results)
      } catch (e) {
        if (e.name !== 'AbortError') {
          setUsdaError(true)
          setUsdaResults([])
        }
      } finally {
        setUsdaLoading(false)
      }
    }, 600)
    return () => { clearTimeout(timer); controller.abort() }
  }, [search])
 
  const confirmAdd = useCallback((item) => {
    dispatch({ type: 'ADD_FOOD', food: item })
    setPending(null)
    setSearch('')
  }, [dispatch])
 
  const removeFood = useCallback((index) => {
    dispatch({ type: 'REMOVE_FOOD', index })
  }, [dispatch])
 
  const saveDay = useCallback(() => {
    const key = todayKey()
    const alreadySaved = !!state.journal[key]
    dispatch({
      type: 'SAVE_DAY', key,
      entry: { totals, log: state.log, rating, ratingReasons: reasons, note: state.dayNote, savedAt: new Date().toISOString(), water: state.waterGlasses }
    })
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
    <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 100px', fontFamily: 'system-ui, sans-serif' }}>
      {pending && <AddFoodModal food={pending} onConfirm={confirmAdd} onCancel={() => setPending(null)} lang={lang} />}
      {showJournal && <JournalView onClose={() => setShowJournal(false)} lang={lang} />}
 
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 2 }}>🥗 {t.appName}</h1>
          <p style={{ fontSize: 14, color: '#888' }}>
            {t.namaste}, {user}!
            {streak > 0 && <span style={{ marginLeft: 8, color: '#E24B4A' }}>🔥 {streak} {t.streak}</span>}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => window.location.reload()} style={S.iconBtn}>🌐</button>
          <button onClick={() => { localStorage.clear(); window.location.reload() }} style={S.iconBtn}>{t.editProfile}</button>
        </div>
      </div>
 
      {/* Tip */}
      {showTip && (
        <div style={{ background: '#E1F5EE', border: '0.5px solid #9FE1CB', borderRadius: 12, padding: '10px 14px', marginBottom: 14, display: 'flex', gap: 10 }}>
          <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
          <div style={{ flex: 1, fontSize: 13, color: '#085041', lineHeight: 1.5 }}>{tip}</div>
          <button onClick={() => setShowTip(false)} style={{ background: 'none', border: 'none', color: '#9FE1CB', cursor: 'pointer', fontSize: 16, padding: 0, flexShrink: 0 }}>×</button>
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
          <div style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>SCORE BREAKDOWN</div>
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
      {warnings.map(w => (
        <div key={w} style={{ background: '#FCEBEB', border: '0.5px solid #F7C1C1', borderRadius: 12, padding: '10px 14px', marginBottom: 10, fontSize: 13, color: '#A32D2D' }}>🚨 {w}</div>
      ))}
      {totals.protein < goals.protein * 0.5 && state.log.length > 0 && (
        <div style={{ background: '#FAEEDA', border: '0.5px solid #FAC775', borderRadius: 12, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: '#854F0B' }}>{t.lowProtein}</div>
      )}
 
      {/* AI Suggestions */}
      {state.log.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <button onClick={() => setShowAI(v => !v)}
            style={{ width: '100%', padding: '10px', borderRadius: 12, background: showAI ? '#E1F5EE' : '#f9f9f9', border: `0.5px solid ${showAI ? '#9FE1CB' : '#e5e5e5'}`, color: showAI ? '#0F6E56' : '#555', fontSize: 14, cursor: 'pointer', fontWeight: 500 }}>
            {t.getAI}
          </button>
          {showAI && (
            <div style={{ marginTop: 8, border: '0.5px solid #e5e5e5', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ fontSize: 11, color: '#888', padding: '8px 14px 4px', background: '#fafafa' }}>{t.aiSuggestions}</div>
              {aiSuggestions.length === 0
                ? <div style={{ padding: '12px 14px', fontSize: 13, color: '#888' }}>You are on track — great job!</div>
                : aiSuggestions.map((s, i) => (
                    <div key={i} style={{ padding: '10px 14px', borderBottom: '0.5px solid #f5f5f5', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 20, flexShrink: 0 }}>{s.emoji}</span>
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
 
      {/* Local results */}
      {search && localFiltered.length > 0 && (
        <div style={{ border: '0.5px solid #e5e5e5', borderRadius: 12, overflow: 'hidden', marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: '#888', padding: '8px 14px 4px', background: '#fafafa' }}>{t.indianFoods}</div>
          {localFiltered.slice(0, 5).map(food => (
            <FoodRow key={food.name} food={food} onClick={() => { setPending(food); setSearch('') }} />
          ))}
        </div>
      )}
 
      {/* USDA results */}
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
 
      {/* Day note */}
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
 
// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('vm_lang') || null)
  const [user, setUser] = useState(() => localStorage.getItem('vm_user') || null)
 
  const [state, dispatch] = useReducer(appReducer, initialState, () => {
    try {
      const goals = JSON.parse(localStorage.getItem('vm_goals'))
      const log = JSON.parse(localStorage.getItem('vm_log_' + todayKey())) || []
      const journal = JSON.parse(localStorage.getItem('vm_journal')) || {}
      const waterGlasses = parseInt(localStorage.getItem('vm_water_' + todayKey())) || 0
      const dayNote = localStorage.getItem('vm_note_' + todayKey()) || ''
      return { goals, log, journal, waterGlasses, dayNote }
    } catch { return initialState }
  })
 
  // Persist all state
  useEffect(() => { if (lang) localStorage.setItem('vm_lang', lang) }, [lang])
  useEffect(() => { if (user) localStorage.setItem('vm_user', user) }, [user])
  useEffect(() => { if (state.goals) localStorage.setItem('vm_goals', JSON.stringify(state.goals)) }, [state.goals])
  useEffect(() => { localStorage.setItem('vm_log_' + todayKey(), JSON.stringify(state.log)) }, [state.log])
  useEffect(() => { localStorage.setItem('vm_journal', JSON.stringify(state.journal)) }, [state.journal])
  useEffect(() => { localStorage.setItem('vm_water_' + todayKey(), state.waterGlasses) }, [state.waterGlasses])
  useEffect(() => { localStorage.setItem('vm_note_' + todayKey(), state.dayNote) }, [state.dayNote])
 
  const handleComplete = (name, rawGoals) => {
    setUser(name)
    localStorage.setItem('vm_user', name)
    const goals = Object.fromEntries(Object.entries(rawGoals).map(([k, v]) => [k, Number(v)]))
    dispatch({ type: 'SET_GOALS', goals })
  }
 
  if (!lang) return <LanguagePicker onSelect={(l) => { setLang(l); localStorage.setItem('vm_lang', l) }} />
  if (!user || !state.goals) return <Setup onComplete={handleComplete} lang={lang} />
 
  return (
    <AppContext.Provider value={{ state, dispatch, lang, user, goals: state.goals }}>
      <AppInner />
    </AppContext.Provider>
  )
}
 
// ─── STYLES ──────────────────────────────────────────────────────────────────
const S = {
  setupWrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', fontFamily: 'system-ui, sans-serif' },
  setupCard: { width: '100%', maxWidth: 420, background: '#fff', borderRadius: 20, border: '0.5px solid #e5e5e5', padding: '32px 28px' },
  emoji: { fontSize: 40, marginBottom: 12 },
  setupTitle: { fontSize: 22, fontWeight: 600, marginBottom: 6 },
  setupSub: { fontSize: 14, color: '#888', marginBottom: 24 },
  field: { marginBottom: 16 },
  label: { fontSize: 13, color: '#555', display: 'block', marginBottom: 6 },
  input: { width: '100%', padding: '10px 14px', borderRadius: 10, border: '0.5px solid #ddd', fontSize: 15, boxSizing: 'border-box', outline: 'none' },
  btnActive: { flex: 1, padding: '12px', borderRadius: 10, background: '#1D9E75', color: '#fff', border: 'none', fontSize: 15, fontWeight: 500, cursor: 'pointer' },
  btnDisabled: { flex: 1, padding: '12px', borderRadius: 10, background: '#e5e5e5', color: '#aaa', border: 'none', fontSize: 15, fontWeight: 500, cursor: 'not-allowed' },
  btnBack: { padding: '12px 20px', borderRadius: 10, background: 'none', color: '#888', border: '0.5px solid #ddd', fontSize: 15, cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, zIndex: 100 },
  modalCard: { width: '100%', maxWidth: 420, background: '#fff', borderRadius: 20, padding: '28px 24px', maxHeight: '90vh', overflowY: 'auto' },
  qtyBtn: { width: 36, height: 36, borderRadius: 10, border: '0.5px solid #ddd', background: '#f9f9f9', fontSize: 20, cursor: 'pointer' },
  iconBtn: { fontSize: 12, color: '#aaa', background: 'none', border: '0.5px solid #ddd', borderRadius: 8, padding: '4px 10px', cursor: 'pointer' },
}
 