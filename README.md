# tunneling

```
📦tunneling
 ┣ 📂mern_client
 ┃ ┣ 📂public
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┣ 📜logo192.png
 ┃ ┃ ┣ 📜logo512.png
 ┃ ┃ ┣ 📜manifest.json
 ┃ ┃ ┣ 📜robots.txt
 ┃ ┃ ┗ 📜warning_marker.png
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂apis
 ┃ ┃ ┃ ┣ 📜info.ts
 ┃ ┃ ┃ ┗ 📜search.ts
 ┃ ┃ ┣ 📂atoms
 ┃ ┃ ┃ ┣ 📜info.ts
 ┃ ┃ ┃ ┣ 📜map.ts
 ┃ ┃ ┃ ┗ 📜search.ts
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┣ 📂InfoWindow
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜InfoWindow.css
 ┃ ┃ ┃ ┃ ┣ 📂Map
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┃ ┣ 📂Marker
 ┃ ┃ ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜Marker.css
 ┃ ┃ ┃ ┃ ┣ 📂WarningMarker
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Block.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Divider.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Input.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ShadowBox.tsx
 ┃ ┃ ┃ ┃ ┗ 📜Span.tsx
 ┃ ┃ ┃ ┣ 📂WarningMarker
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜MapContainer.tsx
 ┃ ┃ ┃ ┣ 📜MarkersContainer.tsx
 ┃ ┃ ┃ ┣ 📜Navigation.tsx
 ┃ ┃ ┃ ┣ 📜ResultBox.tsx
 ┃ ┃ ┃ ┗ 📜SearchBoard.tsx
 ┃ ┃ ┣ 📂data
 ┃ ┃ ┃ ┗ 📜infos.ts
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┗ 📜useinput.ts
 ┃ ┃ ┣ 📂pages
 ┃ ┃ ┃ ┣ 📂Home
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┗ 📂Upload
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂styles
 ┃ ┃ ┃ ┗ 📜GlobalStyle.ts
 ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┣ 📜httpCode.ts
 ┃ ┃ ┃ ┗ 📜info.ts
 ┃ ┃ ┣ 📜App.tsx
 ┃ ┃ ┣ 📜AppRouter.tsx
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜react-app-env.d.ts
 ┃ ┃ ┣ 📜reportWebVitals.ts
 ┃ ┃ ┗ 📜setupTests.ts
 ┃ ┣ 📜.gitignore
 ┃ ┣ 📜package.json
 ┃ ┣ 📜README.md
 ┃ ┗ 📜tsconfig.json
 ┣ 📂mern_mongo
 ┃ ┗ 📜docker-compose.yml
 ┣ 📂mern_server
 ┃ ┣ 📂src
 ┃ ┃ ┣ 📂bin
 ┃ ┃ ┃ ┗ 📜www.ts
 ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┣ 📜infosController.ts
 ┃ ┃ ┃ ┗ 📜searchController.ts
 ┃ ┃ ┣ 📂middlewares
 ┃ ┃ ┃ ┗ 📜errorHandler.ts
 ┃ ┃ ┣ 📂model
 ┃ ┃ ┃ ┗ 📜info.ts
 ┃ ┃ ┣ 📂routes
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂services
 ┃ ┃ ┃ ┣ 📜infosService.ts
 ┃ ┃ ┃ ┗ 📜searchServics.ts
 ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┣ 📜httpCode.ts
 ┃ ┃ ┃ ┣ 📜info.ts
 ┃ ┃ ┃ ┗ 📜search.ts
 ┃ ┃ ┗ 📜app.ts
 ┃ ┣ 📜.env
 ┃ ┣ 📜.eslintrc.js
 ┃ ┣ 📜.prettierrc.json
 ┃ ┣ 📜package.json
 ┃ ┗ 📜tsconfig.json
 ┣ 📜package.json
 ┗ 📜README.md

```
