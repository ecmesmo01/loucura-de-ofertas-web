@echo off
title Publicar Loucura de Ofertas na Vercel
chcp 65001 > nul
echo ============================================================
echo   PUBLICAR PORTAL NA VERCEL (100%% GRÁTIS)
echo ============================================================
echo.
echo 1. Se for sua primeira vez, uma aba do navegador abrirá para login gratuito.
echo 2. Responda 'Y' (Sim) para as perguntas padrão.
echo.
echo Iniciando deploy...
echo.
npx vercel@34 --prod
echo.
pause
