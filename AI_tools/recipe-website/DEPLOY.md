# 🚀 הוראות פריסה מהירה

## פריסה ל-GitHub Pages (הכי פשוט!)

### שלב 1: יצירת Repository
1. עבור ל-[GitHub.com](https://github.com)
2. לחץ על "New repository"
3. תן שם לפרויקט: `recipe-website`
4. סמן "Public"
5. לחץ "Create repository"

### שלב 2: העלאת הקבצים
```bash
# אם יש לך Git מותקן:
git init
git add .
git commit -m "Initial commit - Recipe Website"
git branch -M main
git remote add origin https://github.com/USERNAME/recipe-website.git
git push -u origin main
```

**או** פשוט גרור את כל הקבצים לדפדפן ב-GitHub

### שלב 3: הפעלת GitHub Pages
1. עבור ל-Settings בפרויקט
2. גלול ל-"Pages"
3. תחת "Source" בחר "Deploy from a branch"
4. בחר "main" branch
5. לחץ "Save"

**האתר שלך יהיה זמין תוך 5 דקות ב:**
`https://USERNAME.github.io/recipe-website`

---

## פריסה ל-Netlify (מהיר מאוד!)

### אופציה 1: Drag & Drop
1. עבור ל-[netlify.com](https://netlify.com)
2. גרור את התיקיה `recipe-website` לאזור "Deploy"
3. האתר יהיה זמין תוך דקות!

### אופציה 2: מ-GitHub
1. התחבר ל-Netlify עם GitHub
2. בחר את ה-repository
3. לחץ "Deploy site"

---

## פריסה ל-Vercel

1. עבור ל-[vercel.com](https://vercel.com)
2. התחבר עם GitHub
3. לחץ "New Project"
4. בחר את ה-repository
5. לחץ "Deploy"

---

## בדיקה מקומית

### עם Python (אם מותקן):
```bash
cd recipe-website
python -m http.server 8000
```
עבור ל-`http://localhost:8000`

### עם Node.js:
```bash
npx http-server -p 8000 -o
```

### עם Live Server (VS Code):
1. התקן תוסף "Live Server"
2. לחץ ימני על `index.html`
3. בחר "Open with Live Server"

---

## טיפים חשובים

### 🔧 לפני הפריסה:
- [ ] בדוק שכל הקבצים בתיקיה
- [ ] וודא ש-`index.html` הוא קובץ הבית
- [ ] בדוק שהאתר עובד מקומית

### 🌐 אחרי הפריסה:
- [ ] בדוק שהאתר נטען
- [ ] נסה להתחבר עם המשתמשים לדוגמה
- [ ] בדוק שההקראה הקולית עובדת
- [ ] נסה על מכשירים שונים

### 🐛 פתרון בעיות:
- אם האתר לא נטען - בדוק שהקבצים הועלו נכון
- אם יש שגיאות - פתח Developer Tools (F12)
- אם ההקראה לא עובדת - נסה דפדפן אחר

---

## שיתוף האתר

אחרי שהאתר עולה, תוכל לשתף את הקישור:
- עם המורה לבדיקה
- עם חברים למשוב
- עם המשפחה לשימוש

**בהצלחה! 🎉**