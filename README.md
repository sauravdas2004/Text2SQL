
# 🤖 AI Powered Text2SQL

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql&logoColor=white)
![Ollama](https://img.shields.io/badge/Ollama-Local%20LLM-000000)
![License](https://img.shields.io/badge/License-MIT-yellow)

An **AI-powered Text-to-SQL application** that converts **natural language into executable PostgreSQL queries** using a **Local Large Language Model (Ollama - Qwen2.5)**.

The application automatically generates SQL from user questions, validates it, executes it on PostgreSQL, and displays both the generated SQL and query results through a modern React dashboard.

---

# ✨ Features

- 🤖 Natural Language → SQL Generation
- 🧠 Local LLM using Ollama (Qwen2.5)
- ⚡ FastAPI Backend
- 🐘 PostgreSQL Database
- 🔒 SQL Validation (Only SELECT Queries Allowed)
- 📄 SQL Viewer with Syntax Highlighting
- 📊 Dynamic Query Results Table
- 📥 Export Results to CSV
- 🕒 Query History
- 📈 Dashboard Statistics
- 🎨 Modern Responsive UI
- 🌙 Dark Theme
- 🧩 Dynamic Database Schema Extraction

---

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React
- React Hot Toast
- React Syntax Highlighter

---

## Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Ollama
- Qwen2.5 Local LLM

---

## Database

- PostgreSQL

---

# 🏗 System Architecture

```text
                         User
                          │
                          ▼
               React + TypeScript Frontend
                          │
                     Axios HTTP Request
                          │
                          ▼
                    FastAPI Backend
                          │
         ┌────────────────┼────────────────┐
         │                │                │
         ▼                ▼                ▼
 Database Schema    Ollama (Qwen2.5)   SQL Validator
 Extraction          Local LLM
         │                │
         └────────► Generate SQL ◄────────┘
                          │
                          ▼
                 PostgreSQL Execution
                          │
                          ▼
                    JSON Response
                          │
                          ▼
       SQL Viewer + Result Table + CSV Export
```

---

# ⚙️ Workflow

## Step 1

User enters a natural language question.

Example

```text
Show students with CGPA above 9
```

---

## Step 2

The frontend sends a POST request to the backend.

```http
POST /api/text2sql
```

Request

```json
{
    "question":"Show students with CGPA above 9"
}
```

---

## Step 3

The backend dynamically reads the PostgreSQL database schema.

Example

- Students
- Departments
- Courses
- Faculty
- Attendance
- Exams
- Results

---

## Step 4

The backend constructs an AI prompt containing

- Database schema
- Table relationships
- User question
- SQL generation rules

---

## Step 5

Ollama (Qwen2.5) generates SQL.

Example

```sql
SELECT *
FROM students
WHERE cgpa > 9;
```

---

## Step 6

Before execution the backend

- Removes Markdown formatting
- Cleans SQL
- Validates SQL
- Allows only SELECT statements

Blocked SQL

- DELETE
- DROP
- UPDATE
- INSERT
- ALTER
- TRUNCATE

---

## Step 7

Validated SQL is executed on PostgreSQL.

---

## Step 8

Backend returns

```json
{
    "sql":"SELECT * FROM students WHERE cgpa > 9;",
    "result":{
        "columns":[...],
        "rows":[...]
    }
}
```

---

## Step 9

Frontend displays

- Generated SQL
- Query Results
- Export CSV
- Query History

---

# 📂 Project Structure

```text
text2sql-ai
│
├── backend
│   ├── app
│   │   ├── api
│   │   ├── services
│   │   ├── schemas
│   │   ├── utils
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── scripts
│   │   └── seed.py
│   │
│   ├── requirements.txt
│   └── .env.example
│
├── database
│   ├── schema.sql
│   ├── tables.sql
│   └── sample_data.sql
│
├── frontend
│   ├── public
│   │
│   ├── src
│   │   ├── components
│   │   │   ├── Navbar.tsx
│   │   │   ├── QueryBox.tsx
│   │   │   ├── SQLViewer.tsx
│   │   │   ├── ResultTable.tsx
│   │   │   ├── ExportButton.tsx
│   │   │   ├── QueryHistory.tsx
│   │   │   ├── StatsCards.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── pages
│   │   │   └── Home.tsx
│   │   │
│   │   ├── services
│   │   │   └── api.ts
│   │   │
│   │   ├── types
│   │   │   └── index.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── styles.css
│   │
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

# 🗄 Database Tables

The project uses **PostgreSQL** with the following tables.

- Departments
- Students
- Faculty
- Courses
- Enrollments
- Attendance
- Exams
- Results

---

# 🔌 API

## Generate SQL

```http
POST /api/text2sql
```

Request

```json
{
    "question":"Show all students"
}
```

Response

```json
{
    "sql":"SELECT * FROM students;",
    "result":{
        "columns":["student_id","first_name"],
        "rows":[...]
    }
}
```

---

# 🔐 Security

- Only SELECT statements are executed.
- SQL is cleaned before execution.
- Markdown is removed from AI output.
- Destructive SQL commands are blocked.
- Local AI model (no external API calls).

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/text2sql-ai.git
cd text2sql-ai
```

---

# Backend Setup

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create `.env`

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/text2sql_db

OLLAMA_BASE_URL=http://localhost:11434

OLLAMA_MODEL=qwen2.5:1.5b
```

Run backend

```bash
uvicorn app.main:app --reload
```

---

# Frontend Setup

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run frontend

```bash
npm run dev
```

---

# Ollama Setup

Install Ollama

https://ollama.com

Download model

```bash
ollama pull qwen2.5:1.5b
```

Start Ollama

```bash
ollama serve
```



```text
Show all students

Students with CGPA above 9

Count students in each department

Average CGPA department wise

Show attendance below 75%

Who teaches Operating Systems?

List courses offered by Computer Science department

Show top 10 students by marks
```

---

# 📈 Future Improvements

- Multi-turn AI conversations
- Query suggestions
- Charts & Graphs
- Excel Export
- PDF Reports
- Authentication
- Role-Based Access
- Cloud Deployment
- Larger LLM models
- Query Analytics Dashboard

---

# 👨‍💻 Author

**Saurav Das**

B.Tech CSE  
IIIT Agartala

GitHub: https://github.com/sauravdas2004

LinkedIn: *(Add your LinkedIn profile)*

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates future improvements.

---

# 📄 License

This project is licensed under the MIT License.