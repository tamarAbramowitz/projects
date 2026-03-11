// נתונים ראשוניים לאתר המתכונים

// משתמשים ראשוניים
const initialUsers = [
    {
        id: 1,
        username: 'admin',
        password: '123456',
        name: 'מנהל המערכת',
        settings: {
            readingSpeed: 1.0,
            pauseBetweenSteps: 3,
            voicePitch: 1.0,
            theme: 'light',
            fontSize: 'medium',
            highContrast: false,
            autoScroll: true,
            highlightCurrentStep: true,
            showTimer: false
        }
    },
    {
        id: 2,
        username: 'user1',
        password: 'password',
        name: 'משתמש ראשון',
        settings: {
            readingSpeed: 0.8,
            pauseBetweenSteps: 4,
            voicePitch: 1.2,
            theme: 'light',
            fontSize: 'large',
            highContrast: false,
            autoScroll: true,
            highlightCurrentStep: true,
            showTimer: true
        }
    },
    {
        id: 3,
        username: 'chef',
        password: 'cooking',
        name: 'השף הראשי',
        settings: {
            readingSpeed: 1.2,
            pauseBetweenSteps: 2,
            voicePitch: 0.9,
            theme: 'dark',
            fontSize: 'medium',
            highContrast: false,
            autoScroll: true,
            highlightCurrentStep: true,
            showTimer: false
        }
    }
];

// מתכונים ראשוניים
const initialRecipes = [
    {
        id: 1,
        name: 'פסטה ברוטב עגבניות',
        image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=300&fit=crop',
        time: 25,
        ingredients: [
            '500 גרם פסטה (ספגטי או פנה)',
            '400 גרם עגבניות קלופות',
            '3 שיני שום',
            '1 בצל בינוני',
            '2 כפות שמן זית',
            'מלח ופלפל שחור לטעם',
            'עלי בזיליקום טריים',
            'גבינת פרמזן מגוררת'
        ],
        instructions: [
            'הרתיחו מים במחבת גדולה עם מלח',
            'חתכו את הבצל והשום דק',
            'חממו שמן זית במחבת ובשלו את הבצל עד שהוא שקוף',
            'הוסיפו את השום ובשלו עוד דקה',
            'הוסיפו את העגבניות, מלח ופלפל',
            'בשלו את הרוטב על אש בינונית 15 דקות',
            'בשלו את הפסטה לפי ההוראות על האריזה',
            'סננו את הפסטה ומערבבים עם הרוטב',
            'מגישים עם בזיליקום וגבינת פרמזן'
        ],
        createdBy: 1
    },
    {
        id: 2,
        name: 'עוגת שוקולד פשוטה',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        time: 45,
        ingredients: [
            '200 גרם שוקולד מריר',
            '200 גרם חמאה',
            '4 ביצים',
            '150 גרם סוכר',
            '100 גרם קמח',
            '1 כפית אבקת אפייה',
            'קורט מלח',
            '2 כפות קקאו'
        ],
        instructions: [
            'מחממים תנור ל-180 מעלות',
            'משמנים תבנית עגולה ומקמחים',
            'ממיסים שוקולד וחמאה במיקרוגל או בבן מרי',
            'מקציפים ביצים וסוכר עד לקבלת תערובת בהירה',
            'מוסיפים את תערובת השוקולד לביצים',
            'מנפים יחד קמח, אבקת אפייה, מלח וקקאו',
            'מוסיפים את תערובת הקמח ומערבבים בעדינות',
            'יוצקים לתבנית ואופים 25-30 דקות',
            'מצננים לפני הוצאה מהתבנית'
        ],
        createdBy: 2
    },
    {
        id: 3,
        name: 'סלט ירקות צבעוני',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        time: 15,
        ingredients: [
            '2 עגבניות בינוניות',
            '1 מלפפון',
            '1 פלפל אדום',
            '1 פלפל צהוב',
            '1 בצל סגול קטן',
            '100 גרם גבינת פטה',
            'זיתים שחורים',
            '3 כפות שמן זית',
            '1 כף חומץ בלסמי',
            'מלח ופלפל לטעם',
            'עלי נענע טריים'
        ],
        instructions: [
            'חותכים את העגבניות לקוביות',
            'חותכים את המלפפון לעיגולים',
            'חותכים את הפלפלים לרצועות',
            'חותכים את הבצל לפרוסות דקות',
            'מערבבים את כל הירקות בקערה גדולה',
            'מוסיפים גבינת פטה פרורה וזיתים',
            'מכינים רוטב מהשמן זית וחומץ בלסמי',
            'מתבלים במלח ופלפל',
            'מוסיפים עלי נענע ומערבבים',
            'מגישים מיד או מקררים לשעה'
        ],
        createdBy: 3
    },
    {
        id: 4,
        name: 'חומוס ביתי',
        image: 'https://images.unsplash.com/photo-1571197119282-7c4e2b2d7c6b?w=400&h=300&fit=crop',
        time: 20,
        ingredients: [
            '2 קופסאות חומוס מבושל',
            '3 כפות טחינה גולמית',
            '2 שיני שום',
            'מיץ מ-2 לימונים',
            '1 כפית כמון',
            'מלח לטעם',
            'מים קרים לפי הצורך',
            'שמן זית לקישוט',
            'פפריקה לקישוט',
            'פטרוזיליה קצוצה'
        ],
        instructions: [
            'מסננים את החומוס ושומרים מעט מהמים',
            'שמים את החומוס במעבד מזון',
            'מוסיפים טחינה, שום, מיץ לימון וכמון',
            'טוחנים עד לקבלת תערובת חלקה',
            'מוסיפים מים בהדרגה עד לקבלת מרקם רצוי',
            'מתבלים במלח וטועמים',
            'מעבירים לצלחת הגשה',
            'יוצרים גומות בחומוס',
            'מוסיפים שמן זית בגומות',
            'מפזרים פפריקה ופטרוזיליה'
        ],
        createdBy: 1
    },
    {
        id: 5,
        name: 'פנקייק אמריקאי',
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
        time: 20,
        ingredients: [
            '2 כוסות קמח',
            '2 כפות סוכר',
            '2 כפיות אבקת אפייה',
            '1 כפית מלח',
            '2 ביצים',
            '1.5 כוסות חלב',
            '4 כפות חמאה מומסת',
            '1 כפית תמצית וניל',
            'חמאה לטיגון',
            'דבש או סירופ להגשה'
        ],
        instructions: [
            'מערבבים בקערה את הקמח, סוכר, אבקת אפייה ומלח',
            'בקערה נפרדת מקציפים ביצים',
            'מוסיפים לביצים חלב, חמאה מומסת ווניל',
            'יוצקים את התערובת הרטובה לתערובת היבשה',
            'מערבבים בעדינות עד לקבלת בלילה חלק',
            'מחממים מחבת עם מעט חמאה',
            'יוצקים בלילה לפנקייקים קטנים',
            'מטגנים עד שמופיעים בועות על השטח',
            'הופכים ומטגנים עד שמזהיבים',
            'מגישים חמים עם דבש או סירופ'
        ],
        createdBy: 2
    }
];

// פונקציות עזר לניהול Local Storage
function initializeData() {
    // אתחול משתמשים אם לא קיימים
    if (!localStorage.getItem('recipeApp_users')) {
        localStorage.setItem('recipeApp_users', JSON.stringify(initialUsers));
    }
    
    // אתחול מתכונים אם לא קיימים
    if (!localStorage.getItem('recipeApp_recipes')) {
        localStorage.setItem('recipeApp_recipes', JSON.stringify(initialRecipes));
    }
}

// פונקציות לניהול משתמשים
function getUsers() {
    return JSON.parse(localStorage.getItem('recipeApp_users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('recipeApp_users', JSON.stringify(users));
}

function getCurrentUser() {
    const userId = localStorage.getItem('recipeApp_currentUser');
    if (!userId) return null;
    
    const users = getUsers();
    return users.find(user => user.id === parseInt(userId));
}

function setCurrentUser(userId) {
    localStorage.setItem('recipeApp_currentUser', userId.toString());
}

function logout() {
    localStorage.removeItem('recipeApp_currentUser');
}

// פונקציות לניהול מתכונים
function getRecipes() {
    return JSON.parse(localStorage.getItem('recipeApp_recipes') || '[]');
}

function saveRecipes(recipes) {
    localStorage.setItem('recipeApp_recipes', JSON.stringify(recipes));
}

function getRecipeById(id) {
    const recipes = getRecipes();
    return recipes.find(recipe => recipe.id === parseInt(id));
}

function addRecipe(recipe) {
    const recipes = getRecipes();
    const newId = Math.max(...recipes.map(r => r.id), 0) + 1;
    const newRecipe = { ...recipe, id: newId };
    recipes.push(newRecipe);
    saveRecipes(recipes);
    return newRecipe;
}

function updateUserSettings(userId, settings) {
    const users = getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex].settings = { ...users[userIndex].settings, ...settings };
        saveUsers(users);
        return true;
    }
    return false;
}

// אתחול הנתונים בטעינת הדף
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
});