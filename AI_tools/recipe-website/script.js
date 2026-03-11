// משתנים גלובליים
let currentUser = null;
let currentRecipe = null;
let speechSynthesis = window.speechSynthesis;
let currentUtterance = null;
let currentStepIndex = 0;
let isReading = false;
let isPaused = false;

// אתחול האפליקציה
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    const currentPage = getCurrentPage();
    
    // בדיקת אימות למעט דף הכניסה
    if (currentPage !== 'login') {
        currentUser = getCurrentUser();
        if (!currentUser) {
            window.location.href = 'index.html';
            return;
        }
        applyUserSettings();
    }
    
    // אתחול הדף הנוכחי
    switch (currentPage) {
        case 'login':
            initLoginPage();
            break;
        case 'recipes':
            initRecipesPage();
            break;
        case 'recipe-view':
            initRecipeViewPage();
            break;
        case 'settings':
            initSettingsPage();
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('recipes.html')) return 'recipes';
    if (path.includes('recipe-view.html')) return 'recipe-view';
    if (path.includes('settings.html')) return 'settings';
    return 'login';
}

// === דף הכניסה ===
function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (!username || !password) {
        showError('אנא מלא את כל השדות');
        return;
    }
    
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        setCurrentUser(user.id);
        window.location.href = 'recipes.html';
    } else {
        showError('שם משתמש או סיסמה שגויים');
    }
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

// === דף המתכונים ===
function initRecipesPage() {
    displayWelcomeMessage();
    displayRecipes();
    initSearchFunctionality();
    initAddRecipeModal();
    initNavigationButtons();
}

function displayWelcomeMessage() {
    const welcomeElement = document.getElementById('welcomeUser');
    if (welcomeElement && currentUser) {
        welcomeElement.textContent = `שלום, ${currentUser.name}`;
    }
}

function displayRecipes(recipesToShow = null) {
    const recipesGrid = document.getElementById('recipesGrid');
    if (!recipesGrid) return;
    
    const recipes = recipesToShow || getRecipes();
    
    if (recipes.length === 0) {
        recipesGrid.innerHTML = '<p class="no-recipes">אין מתכונים להצגה</p>';
        return;
    }
    
    recipesGrid.innerHTML = recipes.map(recipe => `
        <div class="recipe-card fade-in" onclick="viewRecipe(${recipe.id})">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-card-image" 
                 onerror="this.src='https://via.placeholder.com/400x300/f0f0f0/666?text=אין+תמונה'">
            <div class="recipe-card-content">
                <h3>${recipe.name}</h3>
                <div class="recipe-card-meta">
                    <span>⏱️ ${recipe.time} דקות</span>
                    <span>🍽️ ${recipe.ingredients.length} רכיבים</span>
                </div>
            </div>
        </div>
    `).join('');
}

function initSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // חיפוש בזמן אמת
        searchInput.addEventListener('input', function() {
            if (this.value.length === 0) {
                displayRecipes();
            } else if (this.value.length >= 2) {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!searchTerm) {
        displayRecipes();
        return;
    }
    
    const recipes = getRecipes();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
    );
    
    displayRecipes(filteredRecipes);
}

function initAddRecipeModal() {
    const addRecipeBtn = document.getElementById('addRecipeBtn');
    const modal = document.getElementById('addRecipeModal');
    const closeBtn = modal?.querySelector('.close');
    const form = document.getElementById('addRecipeForm');
    
    if (addRecipeBtn && modal) {
        addRecipeBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeAddRecipeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAddRecipeModal();
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', handleAddRecipe);
    }
}

function closeAddRecipeModal() {
    const modal = document.getElementById('addRecipeModal');
    const form = document.getElementById('addRecipeForm');
    
    if (modal) {
        modal.style.display = 'none';
    }
    
    if (form) {
        form.reset();
    }
}

function handleAddRecipe(e) {
    e.preventDefault();
    
    const name = document.getElementById('recipeName').value.trim();
    const image = document.getElementById('recipeImage').value.trim() || 
                  'https://via.placeholder.com/400x300/f0f0f0/666?text=אין+תמונה';
    const ingredientsText = document.getElementById('recipeIngredients').value.trim();
    const instructionsText = document.getElementById('recipeInstructions').value.trim();
    const time = parseInt(document.getElementById('recipeTime').value);
    
    if (!name || !ingredientsText || !instructionsText || !time) {
        alert('אנא מלא את כל השדות הנדרשים');
        return;
    }
    
    const ingredients = ingredientsText.split('\n').filter(line => line.trim());
    const instructions = instructionsText.split('\n').filter(line => line.trim());
    
    const newRecipe = {
        name,
        image,
        time,
        ingredients,
        instructions,
        createdBy: currentUser.id
    };
    
    addRecipe(newRecipe);
    closeAddRecipeModal();
    displayRecipes();
    
    // הודעת הצלחה
    showSuccessMessage('המתכון נוסף בהצלחה!');
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 1001;
        animation: fadeIn 0.5s ease-in;
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function viewRecipe(recipeId) {
    window.location.href = `recipe-view.html?id=${recipeId}`;
}

// === דף תצוגת המתכון ===
function initRecipeViewPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    
    if (!recipeId) {
        window.location.href = 'recipes.html';
        return;
    }
    
    currentRecipe = getRecipeById(parseInt(recipeId));
    if (!currentRecipe) {
        window.location.href = 'recipes.html';
        return;
    }
    
    displayRecipeDetails();
    initVoiceControls();
    initNavigationButtons();
}

function displayRecipeDetails() {
    if (!currentRecipe) return;
    
    // עדכון כותרת הדף
    document.title = `ספר המתכונים - ${currentRecipe.name}`;
    
    // עדכון פרטי המתכון
    const elements = {
        recipeTitle: currentRecipe.name,
        recipeNameDisplay: currentRecipe.name,
        recipeTimeDisplay: currentRecipe.time
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    });
    
    // עדכון תמונה
    const imageElement = document.getElementById('recipeImage');
    if (imageElement) {
        imageElement.src = currentRecipe.image;
        imageElement.onerror = function() {
            this.src = 'https://via.placeholder.com/400x300/f0f0f0/666?text=אין+תמונה';
        };
    }
    
    // הצגת רכיבים
    const ingredientsList = document.getElementById('ingredientsList');
    if (ingredientsList) {
        ingredientsList.innerHTML = currentRecipe.ingredients
            .map(ingredient => `<li>${ingredient}</li>`)
            .join('');
    }
    
    // הצגת הוראות
    const instructionsList = document.getElementById('instructionsList');
    if (instructionsList) {
        instructionsList.innerHTML = currentRecipe.instructions
            .map((instruction, index) => `<li data-step="${index}">${instruction}</li>`)
            .join('');
    }
    
    updateStepCounter();
}

function initVoiceControls() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (playBtn) playBtn.addEventListener('click', startReading);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseReading);
    if (stopBtn) stopBtn.addEventListener('click', stopReading);
    if (prevBtn) prevBtn.addEventListener('click', previousStep);
    if (nextBtn) nextBtn.addEventListener('click', nextStep);
    
    // בדיקת תמיכה בהקראה קולית
    if (!speechSynthesis) {
        const voiceControls = document.querySelector('.voice-controls');
        if (voiceControls) {
            voiceControls.innerHTML = '<p>הדפדפן שלך לא תומך בהקראה קולית</p>';
        }
    }
}

function startReading() {
    if (!currentRecipe || !speechSynthesis) return;
    
    isReading = true;
    isPaused = false;
    
    updateVoiceControlsVisibility();
    readCurrentStep();
}

function pauseReading() {
    if (currentUtterance && speechSynthesis.speaking) {
        speechSynthesis.pause();
        isPaused = true;
        updateVoiceControlsVisibility();
    }
}

function stopReading() {
    speechSynthesis.cancel();
    isReading = false;
    isPaused = false;
    currentStepIndex = 0;
    updateVoiceControlsVisibility();
    updateStepHighlight();
    updateStepCounter();
}

function previousStep() {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        if (isReading) {
            speechSynthesis.cancel();
            readCurrentStep();
        }
        updateStepHighlight();
        updateStepCounter();
    }
}

function nextStep() {
    if (currentStepIndex < currentRecipe.instructions.length - 1) {
        currentStepIndex++;
        if (isReading) {
            speechSynthesis.cancel();
            readCurrentStep();
        }
        updateStepHighlight();
        updateStepCounter();
    }
}

function readCurrentStep() {
    if (!currentRecipe || currentStepIndex >= currentRecipe.instructions.length) {
        stopReading();
        return;
    }
    
    const instruction = currentRecipe.instructions[currentStepIndex];
    const settings = currentUser?.settings || {};
    
    currentUtterance = new SpeechSynthesisUtterance(instruction);
    currentUtterance.lang = 'he-IL';
    currentUtterance.rate = settings.readingSpeed || 1.0;
    currentUtterance.pitch = settings.voicePitch || 1.0;
    
    currentUtterance.onend = function() {
        if (isReading && currentStepIndex < currentRecipe.instructions.length - 1) {
            // המתנה בין שלבים
            const pauseTime = (settings.pauseBetweenSteps || 3) * 1000;
            setTimeout(() => {
                if (isReading) {
                    currentStepIndex++;
                    updateStepHighlight();
                    updateStepCounter();
                    readCurrentStep();
                }
            }, pauseTime);
        } else {
            stopReading();
        }
    };
    
    currentUtterance.onerror = function() {
        console.error('שגיאה בהקראה קולית');
        stopReading();
    };
    
    updateStepHighlight();
    updateStepCounter();
    speechSynthesis.speak(currentUtterance);
}

function updateVoiceControlsVisibility() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const stopBtn = document.getElementById('stopBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (isReading && !isPaused) {
        // במצב הקראה
        if (playBtn) playBtn.style.display = 'none';
        if (pauseBtn) pauseBtn.style.display = 'inline-flex';
        if (stopBtn) stopBtn.style.display = 'inline-flex';
        if (prevBtn) prevBtn.style.display = 'inline-flex';
        if (nextBtn) nextBtn.style.display = 'inline-flex';
    } else if (isPaused) {
        // במצב השהיה
        if (playBtn) playBtn.style.display = 'inline-flex';
        if (pauseBtn) pauseBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'inline-flex';
        if (prevBtn) prevBtn.style.display = 'inline-flex';
        if (nextBtn) nextBtn.style.display = 'inline-flex';
    } else {
        // במצב עצירה
        if (playBtn) playBtn.style.display = 'inline-flex';
        if (pauseBtn) pauseBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'none';
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }
}

function updateStepHighlight() {
    const steps = document.querySelectorAll('#instructionsList li');
    const settings = currentUser?.settings || {};
    
    steps.forEach((step, index) => {
        step.classList.remove('current-step');
        if (index === currentStepIndex && settings.highlightCurrentStep !== false) {
            step.classList.add('current-step');
            
            // גלילה אוטומטית
            if (settings.autoScroll !== false) {
                step.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

function updateStepCounter() {
    const stepCounter = document.getElementById('stepCounter');
    if (stepCounter && currentRecipe) {
        stepCounter.textContent = `שלב ${currentStepIndex + 1} מתוך ${currentRecipe.instructions.length}`;
    }
}

// === דף ההגדרות ===
function initSettingsPage() {
    loadCurrentSettings();
    initSettingsForm();
    initNavigationButtons();
}

function loadCurrentSettings() {
    if (!currentUser) return;
    
    const settings = currentUser.settings || {};
    
    // הגדרות הקראה קולית
    setRangeValue('readingSpeed', settings.readingSpeed || 1.0, 'speedValue', 'x');
    setRangeValue('pauseBetweenSteps', settings.pauseBetweenSteps || 3, 'pauseValue', ' שניות');
    setRangeValue('voicePitch', settings.voicePitch || 1.0, 'pitchValue', '');
    
    // הגדרות תצוגה
    setSelectValue('themeSelect', settings.theme || 'light');
    setSelectValue('fontSize', settings.fontSize || 'medium');
    setCheckboxValue('highContrast', settings.highContrast || false);
    
    // הגדרות מתכונים
    setCheckboxValue('autoScroll', settings.autoScroll !== false);
    setCheckboxValue('highlightCurrentStep', settings.highlightCurrentStep !== false);
    setCheckboxValue('showTimer', settings.showTimer || false);
}

function setRangeValue(inputId, value, displayId, suffix) {
    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);
    
    if (input) {
        input.value = value;
        input.addEventListener('input', function() {
            if (display) {
                display.textContent = this.value + suffix;
            }
        });
    }
    
    if (display) {
        display.textContent = value + suffix;
    }
}

function setSelectValue(selectId, value) {
    const select = document.getElementById(selectId);
    if (select) {
        select.value = value;
    }
}

function setCheckboxValue(checkboxId, value) {
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
        checkbox.checked = value;
    }
}

function initSettingsForm() {
    const form = document.getElementById('settingsForm');
    const resetBtn = document.getElementById('resetBtn');
    const testVoiceBtn = document.getElementById('testVoiceBtn');
    
    if (form) {
        form.addEventListener('submit', handleSaveSettings);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetToDefaults);
    }
    
    if (testVoiceBtn) {
        testVoiceBtn.addEventListener('click', testVoice);
    }
    
    // עדכון תצוגה בזמן אמת
    const themeSelect = document.getElementById('themeSelect');
    const fontSizeSelect = document.getElementById('fontSize');
    const highContrastCheckbox = document.getElementById('highContrast');
    
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            applyTheme(this.value);
        });
    }
    
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', function() {
            applyFontSize(this.value);
        });
    }
    
    if (highContrastCheckbox) {
        highContrastCheckbox.addEventListener('change', function() {
            applyHighContrast(this.checked);
        });
    }
}

function handleSaveSettings(e) {
    e.preventDefault();
    
    const newSettings = {
        readingSpeed: parseFloat(document.getElementById('readingSpeed').value),
        pauseBetweenSteps: parseInt(document.getElementById('pauseBetweenSteps').value),
        voicePitch: parseFloat(document.getElementById('voicePitch').value),
        theme: document.getElementById('themeSelect').value,
        fontSize: document.getElementById('fontSize').value,
        highContrast: document.getElementById('highContrast').checked,
        autoScroll: document.getElementById('autoScroll').checked,
        highlightCurrentStep: document.getElementById('highlightCurrentStep').checked,
        showTimer: document.getElementById('showTimer').checked
    };
    
    if (updateUserSettings(currentUser.id, newSettings)) {
        currentUser.settings = { ...currentUser.settings, ...newSettings };
        applyUserSettings();
        showSuccessMessage('ההגדרות נשמרו בהצלחה!');
    } else {
        alert('שגיאה בשמירת ההגדרות');
    }
}

function resetToDefaults() {
    if (confirm('האם אתה בטוח שברצונך לאפס את ההגדרות לברירת המחדל?')) {
        const defaultSettings = {
            readingSpeed: 1.0,
            pauseBetweenSteps: 3,
            voicePitch: 1.0,
            theme: 'light',
            fontSize: 'medium',
            highContrast: false,
            autoScroll: true,
            highlightCurrentStep: true,
            showTimer: false
        };
        
        updateUserSettings(currentUser.id, defaultSettings);
        currentUser.settings = defaultSettings;
        loadCurrentSettings();
        applyUserSettings();
        showSuccessMessage('ההגדרות אופסו לברירת המחדל');
    }
}

function testVoice() {
    const settings = {
        readingSpeed: parseFloat(document.getElementById('readingSpeed').value),
        voicePitch: parseFloat(document.getElementById('voicePitch').value)
    };
    
    const testText = 'זהו טקסט לבדיקת ההגדרות הקוליות שלך';
    const utterance = new SpeechSynthesisUtterance(testText);
    utterance.lang = 'he-IL';
    utterance.rate = settings.readingSpeed;
    utterance.pitch = settings.voicePitch;
    
    speechSynthesis.speak(utterance);
}

// === פונקציות עזר ===
function applyUserSettings() {
    if (!currentUser || !currentUser.settings) return;
    
    const settings = currentUser.settings;
    
    applyTheme(settings.theme);
    applyFontSize(settings.fontSize);
    applyHighContrast(settings.highContrast);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function applyFontSize(fontSize) {
    document.body.className = document.body.className.replace(/font-\w+/g, '');
    document.body.classList.add(`font-${fontSize}`);
}

function applyHighContrast(enabled) {
    if (enabled) {
        document.documentElement.setAttribute('data-contrast', 'high');
    } else {
        document.documentElement.removeAttribute('data-contrast');
    }
}

function initNavigationButtons() {
    const backBtn = document.getElementById('backBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            const currentPage = getCurrentPage();
            if (currentPage === 'recipe-view' || currentPage === 'settings') {
                window.location.href = 'recipes.html';
            }
        });
    }
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            window.location.href = 'settings.html';
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('האם אתה בטוח שברצונך להתנתק?')) {
                logout();
                window.location.href = 'index.html';
            }
        });
    }
}

// טיפול בשגיאות גלובליות
window.addEventListener('error', function(e) {
    console.error('שגיאה באפליקציה:', e.error);
});

// טיפול בסגירת הדפדפן
window.addEventListener('beforeunload', function() {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
});