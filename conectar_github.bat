@echo off
title Conectar com GitHub
chcp 65001 > nul
echo ============================================================
echo   CONECTAR PROJETO AO GITHUB
echo ============================================================
echo.
echo 1. Crie um repositório chamado 'loucura-de-ofertas-web' em:
echo    https://github.com/new
echo.
echo 2. Pressione qualquer tecla para enviar os arquivos...
pause > nul
echo.
git remote remove origin 2>nul
git remote add origin https://github.com/vanderpn/loucura-de-ofertas-web.git
git push -u origin main
echo.
echo ============================================================
echo   Concluído! Agora importe na Vercel: https://vercel.com/new
echo ============================================================
pause
