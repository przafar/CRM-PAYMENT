Project uses Vue 3 + Vuetify and a JSON-server backend.



1.	Install dependencies:
npm install

JSON-server Backend:
	1.	Install json-server 
npm install -g json-server
	2.	Start json-server:
json-server –watch db.json –port 3000
	•	Runs at http://localhost:3000
	•	Endpoints:
GET    /employees
GET    /documents
POST   /employees
POST   /documents
PUT    /employees/:id
PUT    /documents/:id
DELETE /employees/:id
DELETE /documents/:id
	•	Supports filtering/pagination via query params, e.g. ?_page=1&_limit=10

Frontend (Vue):
	1.	Start the dev server:
npm run serve
	2.	Open http://localhost:8080 in your browser

Available Scripts:
• npm run serve — starts Vue dev server with hot-reload
• npm run build — builds for production into dist/
• npm run lint  — runs ESLint (disabled by default)