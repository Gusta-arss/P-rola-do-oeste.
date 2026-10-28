# Pérola do Oeste — site integrado demonstrativo

## Como abrir
Abra `index.html` no navegador. A página inicial dá acesso às áreas de linhas, tarifas, benefícios estudantis, mapa de paradas e portal demonstrativo.

## Estrutura
- `index.html`, `styles.css`, `app.js`: site institucional demonstrativo.
- `mapa/index.html`: mapa interativo de pontos de ônibus, com Leaflet/OpenStreetMap e consulta de horários oficiais por linha.
- `portal/index.html`: conceito visual do portal do aluno.

## Importante sobre os dados
Este projeto é um protótipo independente, não um site oficial da Pérola do Oeste. Valores, taxas, documentos, telefones e dados bancários presentes no material de referência precisam ser confirmados diretamente com a empresa antes de uso real. O mapa consulta pontos disponíveis no OpenStreetMap e pode não conter todas as paradas. A aplicação não tem uma base oficial de horários por parada nem previsão em tempo real; por isso, não inventa horários. A consulta por linha abre a página de horários/itinerários indicada no site oficial.

O mapa precisa de conexão com a internet para carregar os mapas, bibliotecas e dados do OpenStreetMap. O portal é apenas uma demonstração visual e não autentica usuários nem envia documentos.
