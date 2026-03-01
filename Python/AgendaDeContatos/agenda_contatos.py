import json
import re
import uuid
from datetime import datetime

class AgendaContatos:
    def __init__(self, arquivo_contatos="contatos.json"):
        self.arquivo_contatos = arquivo_contatos
        self.contatos = self.carregar_contatos()

    def carregar_contatos(self):
        """Carrega contatos do arquivo JSON"""
        try:
            with open(self.arquivo_contatos, 'r', encoding='utf-8') as arquivo:
                return json.load(arquivo)
        except FileNotFoundError:
            return []
        except json.JSONDecodeError:
            print("Erro ao ler arquivo de contatos. Criando novo arquivo.")
            return []

    def salvar_contatos(self):
        """Salva contatos no arquivo JSON"""
        try:
            with open(self.arquivo_contatos, 'w', encoding='utf-8') as arquivo:
                json.dump(self.contatos, arquivo, indent=2, ensure_ascii=False)
            return True
        except Exception as e:
            print(f"Erro ao salvar contatos: {e}")
            return False

    def validar_email(self, email):
        """Valida formato de email"""
        padrao = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(padrao, email) is not None

    def validar_telefone(self, telefone):
        """Valida formato de telefone brasileiro"""
        # Remove caracteres não numéricos
        telefone_limpo = re.sub(r'[^0-9]', '', telefone)
        
        # Verifica se tem 10 ou 11 dígitos (com DDD)
        if len(telefone_limpo) not in [10, 11]:
            return False
        
        return True

    def formatar_telefone(self, telefone):
        """Formata telefone para exibição"""
        telefone_limpo = re.sub(r'[^0-9]', '', telefone)
        
        if len(telefone_limpo) == 11:
            return f"({telefone_limpo[:2]}) {telefone_limpo[2:7]}-{telefone_limpo[7:]}"
        elif len(telefone_limpo) == 10:
            return f"({telefone_limpo[:2]}) {telefone_limpo[2:6]}-{telefone_limpo[6:]}"
        else:
            return telefone

    def adicionar_contato(self):
        """Adiciona um novo contato"""
        print("\n=== ADICIONAR CONTATO ===")
        
        # Nome
        while True:
            nome = input("Nome completo: ").strip()
            if nome:
                break
            print("Nome é obrigatório!")
        
        # Telefone
        while True:
            telefone = input("Telefone: ").strip()
            if self.validar_telefone(telefone):
                break
            print("Telefone inválido! Use formato: (11) 99999-9999")
        
        # Email
        while True:
            email = input("Email: ").strip()
            if not email or self.validar_email(email):
                break
            print("Email inválido!")
        
        # Endereço
        endereco = input("Endereço: ").strip()
        
        # Verifica se já existe contato com mesmo telefone
        for contato in self.contatos:
            if contato['telefone'] == telefone:
                print("Já existe um contato com este telefone!")
                return
        
        # Cria novo contato
        novo_contato = {
            'id': str(uuid.uuid4()),
            'nome': nome,
            'telefone': telefone,
            'email': email,
            'endereco': endereco,
            'data_cadastro': datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        }
        
        self.contatos.append(novo_contato)
        
        if self.salvar_contatos():
            print("✓ Contato adicionado com sucesso!")
        else:
            print("✗ Erro ao salvar contato!")

    def listar_contatos(self):
        """Lista todos os contatos"""
        if not self.contatos:
            print("\nNenhum contato cadastrado.")
            return
        
        print(f"\n=== LISTA DE CONTATOS ({len(self.contatos)} contatos) ===")
        for i, contato in enumerate(self.contatos, 1):
            print(f"\n{i}. {contato['nome']}")
            print(f"   Telefone: {self.formatar_telefone(contato['telefone'])}")
            if contato['email']:
                print(f"   Email: {contato['email']}")
            if contato['endereco']:
                print(f"   Endereço: {contato['endereco']}")
            print(f"   Cadastrado em: {contato['data_cadastro']}")

    def buscar_contato(self):
        """Busca contatos por nome ou telefone"""
        if not self.contatos:
            print("\nNenhum contato cadastrado.")
            return
        
        termo = input("\nDigite o nome ou telefone para buscar: ").strip().lower()
        
        if not termo:
            print("Termo de busca não pode estar vazio!")
            return
        
        resultados = []
        for contato in self.contatos:
            if (termo in contato['nome'].lower() or 
                termo in contato['telefone'] or
                termo in contato['email'].lower()):
                resultados.append(contato)
        
        if not resultados:
            print("Nenhum contato encontrado.")
            return
        
        print(f"\n=== RESULTADOS DA BUSCA ({len(resultados)} encontrados) ===")
        for i, contato in enumerate(resultados, 1):
            print(f"\n{i}. {contato['nome']}")
            print(f"   Telefone: {self.formatar_telefone(contato['telefone'])}")
            if contato['email']:
                print(f"   Email: {contato['email']}")
            if contato['endereco']:
                print(f"   Endereço: {contato['endereco']}")

    def editar_contato(self):
        """Edita um contato existente"""
        if not self.contatos:
            print("\nNenhum contato cadastrado.")
            return
        
        # Lista contatos para seleção
        print("\n=== EDITAR CONTATO ===")
        for i, contato in enumerate(self.contatos, 1):
            print(f"{i}. {contato['nome']} - {self.formatar_telefone(contato['telefone'])}")
        
        try:
            escolha = int(input("\nEscolha o contato para editar: ")) - 1
            if 0 <= escolha < len(self.contatos):
                contato = self.contatos[escolha]
                self.editar_contato_especifico(contato)
            else:
                print("Opção inválida!")
        except ValueError:
            print("Digite um número válido!")

    def editar_contato_especifico(self, contato):
        """Edita um contato específico"""
        print(f"\nEditando contato: {contato['nome']}")
        print("(Pressione Enter para manter o valor atual)")
        
        # Nome
        novo_nome = input(f"Nome atual: {contato['nome']}\nNovo nome: ").strip()
        if novo_nome:
            contato['nome'] = novo_nome
        
        # Telefone
        while True:
            novo_telefone = input(f"Telefone atual: {self.formatar_telefone(contato['telefone'])}\nNovo telefone: ").strip()
            if not novo_telefone:
                break
            if self.validar_telefone(novo_telefone):
                # Verifica se já existe outro contato com este telefone
                telefone_existe = any(c['telefone'] == novo_telefone and c['id'] != contato['id'] 
                                    for c in self.contatos)
                if telefone_existe:
                    print("Já existe outro contato com este telefone!")
                    continue
                contato['telefone'] = novo_telefone
                break
            print("Telefone inválido!")
        
        # Email
        while True:
            novo_email = input(f"Email atual: {contato['email']}\nNovo email: ").strip()
            if not novo_email or self.validar_email(novo_email):
                contato['email'] = novo_email
                break
            print("Email inválido!")
        
        # Endereço
        novo_endereco = input(f"Endereço atual: {contato['endereco']}\nNovo endereço: ").strip()
        if novo_endereco:
            contato['endereco'] = novo_endereco
        
        if self.salvar_contatos():
            print("✓ Contato atualizado com sucesso!")
        else:
            print("✗ Erro ao salvar alterações!")

    def excluir_contato(self):
        """Exclui um contato"""
        if not self.contatos:
            print("\nNenhum contato cadastrado.")
            return
        
        # Lista contatos para seleção
        print("\n=== EXCLUIR CONTATO ===")
        for i, contato in enumerate(self.contatos, 1):
            print(f"{i}. {contato['nome']} - {self.formatar_telefone(contato['telefone'])}")
        
        try:
            escolha = int(input("\nEscolha o contato para excluir: ")) - 1
            if 0 <= escolha < len(self.contatos):
                contato = self.contatos[escolha]
                confirmacao = input(f"\nTem certeza que deseja excluir {contato['nome']}? (s/n): ").lower().startswith('s')
                if confirmacao:
                    del self.contatos[escolha]
                    if self.salvar_contatos():
                        print("✓ Contato excluído com sucesso!")
                    else:
                        print("✗ Erro ao salvar alterações!")
            else:
                print("Opção inválida!")
        except ValueError:
            print("Digite um número válido!")

    def executar(self):
        """Executa o programa principal"""
        print("=== AGENDA DE CONTATOS ===")
        
        while True:
            print(f"\nTotal de contatos: {len(self.contatos)}")
            print("\nEscolha uma opção:")
            print("1. Adicionar contato")
            print("2. Listar contatos")
            print("3. Buscar contato")
            print("4. Editar contato")
            print("5. Excluir contato")
            print("6. Sair")
            
            opcao = input("\nOpção: ").strip()
            
            if opcao == '1':
                self.adicionar_contato()
            elif opcao == '2':
                self.listar_contatos()
            elif opcao == '3':
                self.buscar_contato()
            elif opcao == '4':
                self.editar_contato()
            elif opcao == '5':
                self.excluir_contato()
            elif opcao == '6':
                print("\nObrigado por usar a Agenda de Contatos!")
                break
            else:
                print("Opção inválida!")
            
            input("\nPressione Enter para continuar...")

if __name__ == "__main__":
    agenda = AgendaContatos()
    agenda.executar() 