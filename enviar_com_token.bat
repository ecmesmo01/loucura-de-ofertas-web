@echo off
title Enviar para GitHub com Token
chcp 65001 > nul
cd /d "%~dp0"
python deploy_github.py
