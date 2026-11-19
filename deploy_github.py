import sys
import os
import json
import urllib.request
import urllib.error
import subprocess

def main():
    print("=" * 60)
    print("  SINCRONIZADOR AUTOMÁTICO GITHUB -> VERCEL")
    print("=" * 60)
    print()

    # Se passado via argumento ou input
    if len(sys.argv) > 1:
        token = sys.argv[1].strip()
    else:
        token = input("Cole o seu token do GitHub (começa com ghp_...): ").strip()

    if not token:
        print("❌ Nenhum token informado.")
        input("Pressione Enter para sair...")
        return

    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "DealsDeployer"
    }

    # 1. Identificar usuário
    print("🔍 Verificando token com a API do GitHub...")
    try:
        req_user = urllib.request.Request("https://api.github.com/user", headers=headers)
        with urllib.request.urlopen(req_user) as resp:
            user_data = json.loads(resp.read().decode())
            username = user_data.get("login")
            print(f"✅ Autenticado com sucesso como: @{username}")
    except Exception as e:
        print(f"❌ Falha ao validar token: {e}")
        print("Verifique se o token foi copiado corretamente e tem a permissão 'repo'.")
        input("Pressione Enter para sair...")
        return

    repo_name = "loucura-de-ofertas-web"

    # 2. Criar repositório caso não exista
    print(f"📦 Garantindo que o repositório '{repo_name}' existe no GitHub...")
    payload = json.dumps({"name": repo_name, "private": False, "auto_init": False}).encode("utf-8")
    req_create = urllib.request.Request("https://api.github.com/user/repos", data=payload, headers=headers)
    try:
        with urllib.request.urlopen(req_create) as resp:
            print(f"✅ Repositório '{repo_name}' criado com sucesso no seu GitHub!")
    except urllib.error.HTTPError as e:
        if e.code == 422:
            print(f"ℹ️ O repositório '{repo_name}' já existe. Atualizando...")
        else:
            print(f"Aviso ao verificar criação do repositório: {e}")
    except Exception as e:
        print(f"Aviso: {e}")

    # 3. Enviar arquivos via Git
    print("🚀 Enviando todos os arquivos do site para a branch 'main'...")
    project_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(project_dir)

    remote_url = f"https://{username}:{token}@github.com/{username}/{repo_name}.git"

    subprocess.run(["git", "remote", "remove", "origin"], capture_output=True)
    subprocess.run(["git", "remote", "add", "origin", remote_url], check=True)
    
    # Garante que está na main e com commit feito
    subprocess.run(["git", "branch", "-M", "main"], capture_output=True)
    
    result = subprocess.run(["git", "push", "-u", "origin", "main", "--force"], capture_output=True, text=True)
    
    if result.returncode == 0:
        print()
        print("=" * 60)
        print("🎉 [SUCESSO TOTAL!] O projeto foi enviado para o GitHub!")
        print(f"👉 Link do seu repositório: https://github.com/{username}/{repo_name}")
        print("=" * 60)
        print()
        print("Agora volte na tela da Vercel e clique em 'Deploy'!")
        print("Como os arquivos já estão no GitHub, a Vercel vai publicar na hora!")
    else:
        print(f"❌ Erro durante o git push: {result.stderr}")

    print()
    input("Pressione Enter para finalizar...")

if __name__ == "__main__":
    main()
