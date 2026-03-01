class DigitalClock {
    constructor() {
        this.timeElement = document.getElementById('time');
        this.dateElement = document.getElementById('date');
        this.timezoneElement = document.getElementById('timezone');
        this.secondsCounterElement = document.getElementById('seconds-counter');
        this.formatToggle = document.getElementById('format-toggle');
        this.themeToggle = document.getElementById('theme-toggle');
        
        this.is24Hour = true;
        this.isDarkTheme = false;
        
        this.daysOfWeek = [
            'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
            'Quinta-feira', 'Sexta-feira', 'Sábado'
        ];
        
        this.months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateClock();
        this.startClock();
        this.updateTimezone();
    }
    
    setupEventListeners() {
        this.formatToggle.addEventListener('click', () => {
            this.is24Hour = !this.is24Hour;
            this.updateFormatButton();
        });
        
        this.themeToggle.addEventListener('click', () => {
            this.isDarkTheme = !this.isDarkTheme;
            this.updateTheme();
        });
    }
    
    updateClock() {
        const now = new Date();
        
        // Atualiza o horário
        this.timeElement.textContent = this.formatTime(now);
        
        // Atualiza a data
        this.dateElement.textContent = this.formatDate(now);
        
        // Atualiza o contador de segundos
        this.updateSecondsCounter(now);
    }
    
    formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        
        if (!this.is24Hour) {
            const period = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0 deve ser 12
            return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)} ${period}`;
        }
        
        return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
    }
    
    formatDate(date) {
        const dayOfWeek = this.daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = this.months[date.getMonth()];
        const year = date.getFullYear();
        
        return `${dayOfWeek}, ${day} de ${month} de ${year}`;
    }
    
    updateSecondsCounter(date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const secondsSinceMidnight = Math.floor((date - startOfDay) / 1000);
        this.secondsCounterElement.textContent = `Segundos desde meia-noite: ${secondsSinceMidnight}`;
    }
    
    updateTimezone() {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const offset = new Date().getTimezoneOffset();
        const hours = Math.abs(Math.floor(offset / 60));
        const minutes = Math.abs(offset % 60);
        const sign = offset <= 0 ? '+' : '-';
        
        this.timezoneElement.textContent = `Fuso Horário: GMT${sign}${this.padZero(hours)}:${this.padZero(minutes)} (${timezone})`;
    }
    
    updateFormatButton() {
        this.formatToggle.textContent = this.is24Hour ? 'Formato 12h' : 'Formato 24h';
    }
    
    updateTheme() {
        document.body.classList.toggle('dark-theme', this.isDarkTheme);
        this.themeToggle.textContent = this.isDarkTheme ? 'Tema Claro' : 'Tema Escuro';
    }
    
    padZero(num) {
        return num.toString().padStart(2, '0');
    }
    
    startClock() {
        setInterval(() => {
            this.updateClock();
        }, 1000);
    }
}

// Inicializa o relógio quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new DigitalClock();
});

// Adiciona efeitos visuais extras
document.addEventListener('DOMContentLoaded', () => {
    // Efeito de digitação para o horário
    const timeElement = document.getElementById('time');
    
    // Adiciona classe para animação de entrada
    setTimeout(() => {
        timeElement.style.opacity = '1';
        timeElement.style.transform = 'translateY(0)';
    }, 500);
    
    // Efeito de hover no container
    const clockContainer = document.querySelector('.clock-container');
    clockContainer.addEventListener('mouseenter', () => {
        clockContainer.style.transform = 'scale(1.02)';
    });
    
    clockContainer.addEventListener('mouseleave', () => {
        clockContainer.style.transform = 'scale(1)';
    });
}); 