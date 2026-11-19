@echo off
title Loucura de Ofertas - Portal Web
chcp 65001 > nul
echo ============================================================
echo   INICIANDO PORTAL WEB - LOUCURA DE OFERTAS
echo ============================================================
echo.
echo Abrindo servidor de desenvolvimento local...
echo Acesse em seu navegador: http://localhost:3000
echo.
npm run dev -- --host
pause
