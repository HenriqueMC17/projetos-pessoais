class TemperatureConverter {
    constructor() {
        this.history = this.loadHistory();
        this.formulas = {
            'celsius-fahrenheit': '°F = (°C × 9/5) + 32',
            'celsius-kelvin': 'K = °C + 273.15',
            'fahrenheit-celsius': '°C = (°F - 32) × 5/9',
            'fahrenheit-kelvin': 'K = (°F - 32) × 5/9 + 273.15',
            'kelvin-celsius': '°C = K - 273.15',
            'kelvin-fahrenheit': '°F = (K - 273.15) × 9/5 + 32'
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderHistory();
    }
    
    setupEventListeners() {
        // Input de temperatura
        document.getElementById('temperature-input').addEventListener('input', () => {
            this.convert();
        });
        
        // Seletores de escala
        document.getElementById('from-scale').addEventListener('change', () => {
            this.convert();
        });
        
        document.getElementById('to-scale').addEventListener('change', () => {
            this.convert();
        });
        
        // Botão de trocar escalas
        document.getElementById('swap-btn').addEventListener('click', () => {
            this.swapScales();
        });
        
        // Conversões rápidas
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const from = e.target.dataset.from;
                const to = e.target.dataset.to;
                const value = parseFloat(e.target.dataset.value);
                
                this.setQuickConversion(from, to, value);
            });
        });
        
        // Limpar histórico
        document.getElementById('clear-history-btn').addEventListener('click', () => {
            this.clearHistory();
        });
        
        // Exportar histórico
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportHistory();
        });
        
        // Tema
        document.getElementById('theme-btn').addEventListener('click', () => {
            this.toggleTheme();
        });
    }
    
    convert() {
        const input = document.getElementById('temperature-input');
        const fromScale = document.getElementById('from-scale').value;
        const toScale = document.getElementById('to-scale').value;
        
        const value = parseFloat(input.value);
        
        if (isNaN(value)) {
            this.clearResult();
            return;
        }
        
        if (fromScale === toScale) {
            this.displayResult(value, toScale);
            return;
        }
        
        const result = this.convertTemperature(value, fromScale, toScale);
        this.displayResult(result, toScale);
        this.showFormula(fromScale, toScale);
        this.addToHistory(value, fromScale, result, toScale);
    }
    
    convertTemperature(value, fromScale, toScale) {
        // Primeiro converte para Celsius
        let celsius;
        switch (fromScale) {
            case 'celsius':
                celsius = value;
                break;
            case 'fahrenheit':
                celsius = (value - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
        }
        
        // Depois converte de Celsius para a escala de destino
        switch (toScale) {
            case 'celsius':
                return celsius;
            case 'fahrenheit':
                return (celsius * 9/5) + 32;
            case 'kelvin':
                return celsius + 273.15;
        }
    }
    
    displayResult(value, scale) {
        const resultValue = document.getElementById('result-value');
        const resultUnit = document.getElementById('result-unit');
        
        const units = {
            'celsius': '°C',
            'fahrenheit': '°F',
            'kelvin': 'K'
        };
        
        resultValue.textContent = value.toFixed(2);
        resultUnit.textContent = units[scale];
        
        // Animação de resultado
        resultValue.style.animation = 'none';
        setTimeout(() => {
            resultValue.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
    
    showFormula(fromScale, toScale) {
        const formulaKey = `${fromScale}-${toScale}`;
        const formulaDisplay = document.getElementById('formula-display');
        
        if (this.formulas[formulaKey]) {
            formulaDisplay.textContent = `Fórmula: ${this.formulas[formulaKey]}`;
        } else {
            formulaDisplay.textContent = '';
        }
    }
    
    clearResult() {
        document.getElementById('result-value').textContent = '--';
        document.getElementById('result-unit').textContent = '--';
        document.getElementById('formula-display').textContent = '';
    }
    
    swapScales() {
        const fromScale = document.getElementById('from-scale');
        const toScale = document.getElementById('to-scale');
        
        const tempValue = fromScale.value;
        fromScale.value = toScale.value;
        toScale.value = tempValue;
        
        this.convert();
    }
    
    setQuickConversion(from, to, value) {
        document.getElementById('from-scale').value = from;
        document.getElementById('to-scale').value = to;
        document.getElementById('temperature-input').value = value;
        
        this.convert();
        
        // Animação no botão clicado
        const clickedBtn = document.querySelector(`[data-from="${from}"][data-to="${to}"][data-value="${value}"]`);
        clickedBtn.style.animation = 'none';
        setTimeout(() => {
            clickedBtn.style.animation = 'bounce 0.5s ease';
        }, 10);
    }
    
    addToHistory(fromValue, fromScale, toValue, toScale) {
        const conversion = {
            id: Date.now(),
            fromValue: fromValue,
            fromScale: fromScale,
            toValue: toValue,
            toScale: toScale,
            timestamp: new Date().toISOString()
        };
        
        this.history.unshift(conversion);
        
        // Limita o histórico a 50 conversões
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        this.saveHistory();
        this.renderHistory();
    }
    
    renderHistory() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        
        this.history.forEach(conversion => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            
            const units = {
                'celsius': '°C',
                'fahrenheit': '°F',
                'kelvin': 'K'
            };
            
            const conversionText = `${conversion.fromValue}${units[conversion.fromScale]} = ${conversion.toValue.toFixed(2)}${units[conversion.toScale]}`;
            const timeText = new Date(conversion.timestamp).toLocaleString('pt-BR');
            
            historyItem.innerHTML = `
                <div class="history-conversion">${conversionText}</div>
                <div class="history-time">${timeText}</div>
            `;
            
            historyList.appendChild(historyItem);
        });
    }
    
    clearHistory() {
        if (this.history.length === 0) {
            this.showNotification('Histórico já está vazio!', 'info');
            return;
        }
        
        this.history = [];
        this.saveHistory();
        this.renderHistory();
        this.showNotification('Histórico limpo com sucesso!', 'success');
    }
    
    exportHistory() {
        if (this.history.length === 0) {
            this.showNotification('Não há histórico para exportar!', 'info');
            return;
        }
        
        const dataStr = JSON.stringify(this.history, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `conversoes_temperatura_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Histórico exportado com sucesso!', 'success');
    }
    
    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const themeBtn = document.getElementById('theme-btn');
        const isDark = document.body.classList.contains('dark-theme');
        themeBtn.innerHTML = isDark ? 
            '<i class="fas fa-sun"></i> Tema Claro' : 
            '<i class="fas fa-moon"></i> Tema Escuro';
    }
    
    showNotification(message, type) {
        // Cria notificação temporária
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 10px;
            color: white;
            font-weight: bold;
            z-index: 1001;
            animation: slideInRight 0.3s ease;
            background: ${type === 'success' ? '#4CAF50' : 
                        type === 'error' ? '#f44336' : '#2196F3'};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    loadHistory() {
        const history = localStorage.getItem('temperatureHistory');
        return history ? JSON.parse(history) : [];
    }
    
    saveHistory() {
        localStorage.setItem('temperatureHistory', JSON.stringify(this.history));
    }
}

// Adiciona estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializa o conversor
document.addEventListener('DOMContentLoaded', () => {
    new TemperatureConverter();
}); 