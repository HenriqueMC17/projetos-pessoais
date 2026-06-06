class TodoList {
    constructor() {
        this.todos = this.loadTodos();
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.editingId = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderTodos();
        this.updateStats();
        this.toggleEmptyState();
    }
    
    setupEventListeners() {
        // Adicionar tarefa
        document.getElementById('add-btn').addEventListener('click', () => {
            this.addTodo();
        });
        
        document.getElementById('todo-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
        
        // Filtros
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        // Busca
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.renderTodos();
        });
        
        // Limpar concluídas
        document.getElementById('clear-completed-btn').addEventListener('click', () => {
            this.clearCompleted();
        });
        
        // Ações
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportTodos();
        });
        
        document.getElementById('import-btn').addEventListener('click', () => {
            document.getElementById('file-input').click();
        });
        
        document.getElementById('file-input').addEventListener('change', (e) => {
            this.importTodos(e.target.files[0]);
        });
        
        document.getElementById('theme-btn').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Modal
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('save-edit-btn').addEventListener('click', () => {
            this.saveEdit();
        });
        
        document.getElementById('cancel-edit-btn').addEventListener('click', () => {
            this.closeModal();
        });
        
        // Fechar modal ao clicar fora
        document.getElementById('edit-modal').addEventListener('click', (e) => {
            if (e.target.id === 'edit-modal') {
                this.closeModal();
            }
        });
    }
    
    addTodo() {
        const input = document.getElementById('todo-input');
        const text = input.value.trim();
        
        if (!text) {
            this.showNotification('Por favor, digite uma tarefa!', 'error');
            return;
        }
        
        const priority = document.getElementById('priority-select').value;
        const dueDate = document.getElementById('due-date').value;
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: priority,
            dueDate: dueDate,
            createdAt: new Date().toISOString()
        };
        
        this.todos.push(todo);
        this.saveTodos();
        this.renderTodos();
        this.updateStats();
        this.toggleEmptyState();
        
        input.value = '';
        document.getElementById('due-date').value = '';
        
        this.showNotification('Tarefa adicionada com sucesso!', 'success');
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
            
            const todoElement = document.querySelector(`[data-id="${id}"]`);
            todoElement.classList.add('completing');
            setTimeout(() => {
                todoElement.classList.remove('completing');
            }, 500);
        }
    }
    
    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            this.editingId = id;
            document.getElementById('edit-input').value = todo.text;
            document.getElementById('edit-priority').value = todo.priority;
            document.getElementById('edit-due-date').value = todo.dueDate || '';
            document.getElementById('edit-modal').style.display = 'block';
        }
    }
    
    saveEdit() {
        if (this.editingId === null) return;
        
        const text = document.getElementById('edit-input').value.trim();
        if (!text) {
            this.showNotification('Por favor, digite uma tarefa!', 'error');
            return;
        }
        
        const todo = this.todos.find(t => t.id === this.editingId);
        if (todo) {
            todo.text = text;
            todo.priority = document.getElementById('edit-priority').value;
            todo.dueDate = document.getElementById('edit-due-date').value;
            
            this.saveTodos();
            this.renderTodos();
            this.closeModal();
            this.showNotification('Tarefa atualizada com sucesso!', 'success');
        }
    }
    
    deleteTodo(id) {
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        todoElement.classList.add('removing');
        
        setTimeout(() => {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
            this.toggleEmptyState();
            this.showNotification('Tarefa removida!', 'info');
        }, 300);
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Atualiza botões ativos
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.renderTodos();
    }
    
    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            this.showNotification('Não há tarefas concluídas para remover!', 'info');
            return;
        }
        
        this.todos = this.todos.filter(t => !t.completed);
        this.saveTodos();
        this.renderTodos();
        this.updateStats();
        this.toggleEmptyState();
        this.showNotification(`${completedCount} tarefa(s) removida(s)!`, 'success');
    }
    
    renderTodos() {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        
        let filteredTodos = this.todos;
        
        // Aplica filtro
        if (this.currentFilter === 'active') {
            filteredTodos = filteredTodos.filter(t => !t.completed);
        } else if (this.currentFilter === 'completed') {
            filteredTodos = filteredTodos.filter(t => t.completed);
        }
        
        // Aplica busca
        if (this.searchTerm) {
            filteredTodos = filteredTodos.filter(t => 
                t.text.toLowerCase().includes(this.searchTerm)
            );
        }
        
        // Ordena por prioridade e data de criação
        filteredTodos.sort((a, b) => {
            const priorityOrder = { high: 3, normal: 2, low: 1 };
            const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
            if (priorityDiff !== 0) return priorityDiff;
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        filteredTodos.forEach(todo => {
            const todoElement = this.createTodoElement(todo);
            todoList.appendChild(todoElement);
        });
    }
    
    createTodoElement(todo) {
        const todoElement = document.createElement('div');
        todoElement.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoElement.dataset.id = todo.id;
        
        const priorityText = {
            high: 'Alta',
            normal: 'Normal',
            low: 'Baixa'
        };
        
        const dueDateText = todo.dueDate ? 
            new Date(todo.dueDate).toLocaleDateString('pt-BR') : 'Sem prazo';
        
        todoElement.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <div class="todo-content">
                <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                <div class="todo-meta">
                    <span class="priority-badge priority-${todo.priority}">${priorityText[todo.priority]}</span>
                    <span>Prazo: ${dueDateText}</span>
                    <span>Criada: ${new Date(todo.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
            </div>
            <div class="todo-actions">
                <button class="action-icon edit-btn" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-icon delete-btn" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        // Event listeners
        const checkbox = todoElement.querySelector('.todo-checkbox');
        checkbox.addEventListener('change', () => {
            this.toggleTodo(todo.id);
        });
        
        const editBtn = todoElement.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => {
            this.editTodo(todo.id);
        });
        
        const deleteBtn = todoElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            this.deleteTodo(todo.id);
        });
        
        return todoElement;
    }
    
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;
        
        document.getElementById('total-count').textContent = total;
        document.getElementById('active-count').textContent = active;
        document.getElementById('completed-count').textContent = completed;
    }
    
    toggleEmptyState() {
        const emptyState = document.getElementById('empty-state');
        const todoList = document.getElementById('todo-list');
        
        if (this.todos.length === 0) {
            emptyState.style.display = 'block';
            todoList.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            todoList.style.display = 'block';
        }
    }
    
    closeModal() {
        document.getElementById('edit-modal').style.display = 'none';
        this.editingId = null;
    }
    
    exportTodos() {
        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Tarefas exportadas com sucesso!', 'success');
    }
    
    importTodos(file) {
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTodos = JSON.parse(e.target.result);
                if (Array.isArray(importedTodos)) {
                    this.todos = importedTodos;
                    this.saveTodos();
                    this.renderTodos();
                    this.updateStats();
                    this.toggleEmptyState();
                    this.showNotification('Tarefas importadas com sucesso!', 'success');
                } else {
                    throw new Error('Formato inválido');
                }
            } catch (error) {
                this.showNotification('Erro ao importar arquivo!', 'error');
            }
        };
        reader.readAsText(file);
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
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    loadTodos() {
        const todos = localStorage.getItem('todos');
        return todos ? JSON.parse(todos) : [];
    }
    
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

// Adiciona estilos CSS para notificações
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

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', () => {
    new TodoList();
}); 