class QRCodeGenerator {
    constructor() {
        this.history = this.loadHistory();
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderHistory();
    }
    
    setupEventListeners() {
        document.getElementById('generate-btn').addEventListener('click', () => {
            this.generateQRCode();
        });
        
        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadQRCode();
        });
        
        // Gerar QR Code ao pressionar Enter
        document.getElementById('content-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateQRCode();
            }
        });
    }
    
    generateQRCode() {
        const content = document.getElementById('content-input').value.trim();
        const type = document.getElementById('type-select').value;
        const size = parseInt(document.getElementById('size-select').value);
        
        if (!content) {
            this.showNotification('Por favor, digite algum conteúdo!', 'error');
            return;
        }
        
        const qrContainer = document.getElementById('qr-code');
        qrContainer.innerHTML = '';
        
        // Formata o conteúdo baseado no tipo
        let formattedContent = content;
        switch (type) {
            case 'url':
                if (!content.startsWith('http://') && !content.startsWith('https://')) {
                    formattedContent = 'https://' + content;
                }
                break;
            case 'phone':
                formattedContent = 'tel:' + content;
                break;
            case 'email':
                formattedContent = 'mailto:' + content;
                break;
        }
        
        // Gera o QR Code
        QRCode.toCanvas(qrContainer, formattedContent, {
            width: size,
            margin: 2,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        }, (error) => {
            if (error) {
                this.showNotification('Erro ao gerar QR Code!', 'error');
                return;
            }
            
            document.getElementById('download-btn').disabled = false;
            this.addToHistory(content, type, size);
            this.showNotification('QR Code gerado com sucesso!', 'success');
        });
    }
    
    downloadQRCode() {
        const canvas = document.querySelector('#qr-code canvas');
        if (!canvas) return;
        
        const link = document.createElement('a');
        link.download = `qrcode_${Date.now()}.png`;
        link.href = canvas.toDataURL();
        link.click();
        
        this.showNotification('QR Code baixado com sucesso!', 'success');
    }
    
    addToHistory(content, type, size) {
        const item = {
            id: Date.now(),
            content: content,
            type: type,
            size: size,
            timestamp: new Date().toISOString()
        };
        
        this.history.unshift(item);
        if (this.history.length > 20) {
            this.history = this.history.slice(0, 20);
        }
        
        this.saveHistory();
        this.renderHistory();
    }
    
    renderHistory() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        
        this.history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.style.cssText = `
                background: rgba(255, 255, 255, 0.1);
                padding: 1rem;
                margin-bottom: 0.5rem;
                border-radius: 10px;
                color: #fff;
                display: flex;
                justify-content: space-between;
                align-items: center;
            `;
            
            const content = item.content.length > 30 ? 
                item.content.substring(0, 30) + '...' : item.content;
            
            historyItem.innerHTML = `
                <div>
                    <strong>${content}</strong>
                    <div style="font-size: 0.8rem; opacity: 0.8;">
                        ${item.type} - ${item.size}x${item.size}
                    </div>
                </div>
                <div style="font-size: 0.8rem; opacity: 0.7;">
                    ${new Date(item.timestamp).toLocaleString('pt-BR')}
                </div>
            `;
            
            historyList.appendChild(historyItem);
        });
    }
    
    showNotification(message, type) {
        const notification = document.createElement('div');
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
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    loadHistory() {
        const history = localStorage.getItem('qrcodeHistory');
        return history ? JSON.parse(history) : [];
    }
    
    saveHistory() {
        localStorage.setItem('qrcodeHistory', JSON.stringify(this.history));
    }
}

// Adiciona estilos CSS para animações
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style);

// Inicializa o gerador
document.addEventListener('DOMContentLoaded', () => {
    new QRCodeGenerator();
}); 