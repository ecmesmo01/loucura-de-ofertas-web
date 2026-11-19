@echo off
title Conectar com GitHub
chcp 65001 > nul
echo ============================================================
echo   ENVIAR PROJETO PARA O GITHUB
echo ============================================================
echo.
echo Passo 1: Certifique-se de que criou o repositório no seu GitHub:
echo          https://github.com/new
echo          Nome: loucura-de-ofertas-web
echo.
echo Passo 2: Pressione qualquer tecla para enviar os arquivos...
pause > nul
echo.
echo Enviando para https://github.com/vanderpn/loucura-de-ofertas-web.git...
git remote remove origin 2>nul
git remote add origin https://github.com/vanderpn/loucura-de-ofertas-web.git
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
    echo ============================================================
    echo   [SUCESSO] Arquivos enviados para o GitHub!
    echo   Agora acesse https://vercel.com/new para finalizar com 1 clique!
    echo ============================================================
) else (
    echo ============================================================
    echo   Aconteceu algum erro no envio. Verifique a mensagem acima.
    echo ============================================================
)
echo.
pause
