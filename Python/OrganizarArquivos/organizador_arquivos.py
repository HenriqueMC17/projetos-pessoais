import os
import shutil

# Diretório onde o script está sendo executado
base_dir = os.getcwd()

# Lista de arquivos no diretório
for filename in os.listdir(base_dir):
    # Ignorar pastas e o próprio script
    if os.path.isdir(filename) or filename == os.path.basename(__file__):
        continue
    # Pega a extensão do arquivo
    _, ext = os.path.splitext(filename)
    ext = ext[1:].lower() or 'sem_extensao'
    pasta_destino = os.path.join(base_dir, ext)
    # Cria a pasta se não existir
    if not os.path.exists(pasta_destino):
        os.makedirs(pasta_destino)
    # Move o arquivo
    shutil.move(os.path.join(base_dir, filename), os.path.join(pasta_destino, filename))

print('Arquivos organizados por extensão!') 