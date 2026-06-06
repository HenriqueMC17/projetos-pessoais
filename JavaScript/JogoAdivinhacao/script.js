class GuessingGame {
    constructor() {
        this.secretNumber = 0;
        this.attempts = 0;
        this.maxAttempts = 10;
        this.gameActive = false;
        this.currentDifficulty = 'easy';
        this.history = [];
        this.stats = this.loadStats();
        
        this.difficulties = {
            easy: { min: 1, max: 50, maxAttempts: 10 },
            medium: { min: 1, max: 100, maxAttempts: 15 },
            hard: { min: 1, max: 200, maxAttempts: 20 },
            expert: { min: 1, max: 500, maxAttempts: 25 }
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateDisplay();
        this.loadBestScore();
    }
    
    setupEventListeners() {
        // Botões de dificuldade
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setDifficulty(e.target.dataset.difficulty);
            });
        });
        
        // Botão de tentativa
        document.getElementById('guess-btn').addEventListener('click', () => {
            this.makeGuess();
        });
        
        // Botão de novo jogo
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.newGame();
        });
        
        // Botão de tema
        document.getElementById('theme-btn').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Input de tentativa
        document.getElementById('guess-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.makeGuess();
            }
        });
    }
    
    setDifficulty(difficulty) {
        this.currentDifficulty = difficulty;
        this.maxAttempts = this.difficulties[difficulty].maxAttempts;
        
        // Atualiza botões ativos
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('active');
        
        // Atualiza display
        document.getElementById('max-attempts').textContent = this.maxAttempts;
        
        // Inicia novo jogo automaticamente
        this.newGame();
    }
    
    newGame() {
        const difficulty = this.difficulties[this.currentDifficulty];
        this.secretNumber = Math.floor(Math.random() * (difficulty.max - difficulty.min + 1)) + difficulty.min;
        this.attempts = 0;
        this.gameActive = true;
        this.history = [];
        
        document.getElementById('guess-input').value = '';
        document.getElementById('guess-input').disabled = false;
        document.getElementById('guess-btn').disabled = false;
        
        this.updateDisplay();
        this.showFeedback('Novo jogo iniciado! Tente adivinhar o número.', 'info');
        this.clearHistory();
    }
    
    makeGuess() {
        if (!this.gameActive) return;
        
        const input = document.getElementById('guess-input');
        const guess = parseInt(input.value);
        
        if (isNaN(guess)) {
            this.showFeedback('Por favor, digite um número válido!', 'error');
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 500);
            return;
        }
        
        const difficulty = this.difficulties[this.currentDifficulty];
        if (guess < difficulty.min || guess > difficulty.max) {
            this.showFeedback(`Digite um número entre ${difficulty.min} e ${difficulty.max}!`, 'error');
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 500);
            return;
        }
        
        this.attempts++;
        this.addToHistory(guess);
        
        if (guess === this.secretNumber) {
            this.gameWon();
        } else if (this.attempts >= this.maxAttempts) {
            this.gameLost();
        } else {
            const hint = guess > this.secretNumber ? 'Tente um número menor!' : 'Tente um número maior!';
            this.showFeedback(hint, guess > this.secretNumber ? 'high' : 'low');
        }
        
        input.value = '';
        this.updateDisplay();
    }
    
    gameWon() {
        this.gameActive = false;
        this.showFeedback(`🎉 Parabéns! Você acertou em ${this.attempts} tentativas!`, 'correct');
        document.getElementById('guess-input').disabled = true;
        document.getElementById('guess-btn').disabled = true;
        
        // Atualiza estatísticas
        this.updateStats(true);
        this.updateBestScore();
        
        // Animação de vitória
        document.querySelector('.game-container').classList.add('bounce');
        setTimeout(() => {
            document.querySelector('.game-container').classList.remove('bounce');
        }, 1000);
    }
    
    gameLost() {
        this.gameActive = false;
        this.showFeedback(`😔 Game Over! O número era ${this.secretNumber}.`, 'error');
        document.getElementById('guess-input').disabled = true;
        document.getElementById('guess-btn').disabled = true;
        
        // Atualiza estatísticas
        this.updateStats(false);
    }
    
    addToHistory(guess) {
        const historyItem = {
            guess: guess,
            attempt: this.attempts,
            result: guess === this.secretNumber ? 'Acertou!' : (guess > this.secretNumber ? 'Alto' : 'Baixo')
        };
        
        this.history.push(historyItem);
        this.updateHistoryDisplay();
    }
    
    updateHistoryDisplay() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        
        this.history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <span>Tentativa ${item.attempt}: ${item.guess}</span>
                <span>${item.result}</span>
            `;
            historyList.appendChild(historyItem);
        });
    }
    
    clearHistory() {
        document.getElementById('history-list').innerHTML = '';
    }
    
    showFeedback(message, type) {
        const feedback = document.getElementById('feedback');
        feedback.innerHTML = `<p>${message}</p>`;
        
        // Remove classes anteriores
        feedback.className = 'feedback';
        
        // Adiciona classe baseada no tipo
        if (type !== 'info') {
            feedback.classList.add(type);
        }
    }
    
    updateDisplay() {
        document.getElementById('attempts').textContent = this.attempts;
        document.getElementById('max-attempts').textContent = this.maxAttempts;
    }
    
    updateStats(won) {
        this.stats.gamesPlayed++;
        if (won) {
            this.stats.gamesWon++;
            this.stats.totalAttempts += this.attempts;
        }
        
        this.saveStats();
        this.updateStatsDisplay();
    }
    
    updateStatsDisplay() {
        document.getElementById('games-played').textContent = this.stats.gamesPlayed;
        document.getElementById('games-won').textContent = this.stats.gamesWon;
        
        const winRate = this.stats.gamesPlayed > 0 ? 
            Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100) : 0;
        document.getElementById('win-rate').textContent = `${winRate}%`;
        
        const avgAttempts = this.stats.gamesWon > 0 ? 
            Math.round(this.stats.totalAttempts / this.stats.gamesWon) : 0;
        document.getElementById('avg-attempts').textContent = avgAttempts;
    }
    
    updateBestScore() {
        const currentBest = this.getBestScore();
        if (this.attempts < currentBest || currentBest === -1) {
            localStorage.setItem(`bestScore_${this.currentDifficulty}`, this.attempts);
            this.loadBestScore();
        }
    }
    
    getBestScore() {
        const score = localStorage.getItem(`bestScore_${this.currentDifficulty}`);
        return score ? parseInt(score) : -1;
    }
    
    loadBestScore() {
        const bestScore = this.getBestScore();
        document.getElementById('best-score').textContent = bestScore === -1 ? '-' : bestScore;
    }
    
    loadStats() {
        const stats = localStorage.getItem('guessingGameStats');
        return stats ? JSON.parse(stats) : {
            gamesPlayed: 0,
            gamesWon: 0,
            totalAttempts: 0
        };
    }
    
    saveStats() {
        localStorage.setItem('guessingGameStats', JSON.stringify(this.stats));
    }
    
    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const themeBtn = document.getElementById('theme-btn');
        const isDark = document.body.classList.contains('dark-theme');
        themeBtn.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
    }
}

// Inicializa o jogo quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new GuessingGame();
}); 