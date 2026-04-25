@echo off
set TOKEN=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
set REPO_NAME=goro_da_mansao

echo [1/5] Inicializando Git...
git init

echo [2/5] Adicionando arquivos...
git add .

echo [3/5] Fazendo commit explicativo...
git commit -m "Site da Mansao Maromba: Catalogo, Carrinho, Area VIP e Backend SQLite. Desenvolvido para a elite."

echo [4/5] Obtendo nome de usuario do GitHub...
for /f "tokens=*" %%i in ('curl -s -H "Authorization: token %TOKEN%" https://api.github.com/user ^| findstr /C:"\"login\""') do set USER_LINE=%%i
set USERNAME=%USER_LINE:"login": "=%
set USERNAME=%USERNAME:",=%
set USERNAME=%USERNAME: =%

if "%USERNAME%"=="" (
    echo [!] Erro ao obter usuario. Por favor, verifique seu Token ou internet.
    pause
    exit /b
)

echo [!] Usuario detectado: %USERNAME%

echo [5/5] Criando repositorio remoto (se nao existir)...
curl -s -H "Authorization: token %TOKEN%" -d "{\"name\":\"%REPO_NAME%\", \"private\":false}" https://api.github.com/user/repos > nul

git remote add origin https://%TOKEN%@github.com/%USERNAME%/%REPO_NAME%.git
git branch -M main

echo [!] Subindo arquivos para o GitHub...
git push -u origin main

echo.
echo ======================================================
echo [SUCESSO] Seu site esta agora na nuvem da Mansao!
echo Link: https://github.com/%USERNAME%/%REPO_NAME%
echo ======================================================
pause
