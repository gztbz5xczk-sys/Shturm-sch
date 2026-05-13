// ВРЕМЕННАЯ ВЕРСИЯ С ТЕСТОВЫМИ ДАННЫМИ
// Вы сможете легко вернуть Google Sheets позже

function loadCourses() {
    const catalogDiv = document.getElementById('catalog');
    const selectEl = document.getElementById('courseSelect');
    
    // Это пример данных, которые будут видны на сайте
    const courses = [
        { name: "Введение в навигацию", description: "Базовый курс для начинающих штурманов.", price: "Бесплатно" },
        { name: "Продвинутая навигация", description: "Для тех, кто уже уверенно держит курс.", price: "4 990 ₽" },
        { name: "Штурман-профессионал", description: "Полный курс с сертификатом.", price: "12 900 ₽" }
    ];
    
    catalogDiv.innerHTML = '';
    selectEl.innerHTML = '<option value="">Выберите курс</option>';
    
    courses.forEach(course => {
        // Карточка курса
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <div class="price">${course.price}</div>
            <button class="btn" data-course="${course.name}">Записаться</button>
        `;
        catalogDiv.appendChild(card);
        
        // Добавляем в выпадающий список формы
        const option = document.createElement('option');
        option.value = course.name;
        option.textContent = `${course.name} — ${course.price}`;
        selectEl.appendChild(option);
    });
    
    // Вешаем обработчики на кнопки "Записаться"
    document.querySelectorAll('[data-course]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const courseName = e.target.getAttribute('data-course');
            const select = document.getElementById('courseSelect');
            if (select) {
                for(let i=0; i<select.options.length; i++) {
                    if(select.options[i].value === courseName) {
                        select.selectedIndex = i;
                        break;
                    }
                }
            }
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Обработка формы (отправка в Telegram)
// Если не настроили токен, эта часть просто покажет сообщение
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const course = document.getElementById('courseSelect').value;
    const status = document.getElementById('formStatus');
    
    if(!name || !email) {
        status.innerText = 'Заполните имя и email';
        return;
    }
    
    status.innerText = '✅ Заявка принята! Мы свяжемся с вами.';
    document.getElementById('contactForm').reset();
    
    // Когда захотите настроить Telegram, просто раскомментируйте код ниже
    /* 
    status.innerText = 'Отправка...';
    const botToken = 'ВАШ_ТОКЕН_БОТА';
    const chatId = 'ВАШ_CHAT_ID';
    const text = `Новая заявка:\nИмя: ${name}\nEmail: ${email}\nТелефон: ${phone || '-'}\nКурс: ${course || '-'}`;
    try {
        const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({chat_id: chatId, text: text})
        });
        if(res.ok) status.innerText = '✅ Заявка отправлена!';
        else status.innerText = '❌ Ошибка отправки.';
    } catch(err) {
        status.innerText = '❌ Ошибка сети.';
    }
    */
});

// Загружаем курсы
loadCourses();
