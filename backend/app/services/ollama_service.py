import re
import ollama

from app.config import settings

client = ollama.Client(host=settings.OLLAMA_BASE_URL)


def clean_sql(sql: str) -> str:
    # Remove markdown
    sql = re.sub(r"```sql", "", sql, flags=re.IGNORECASE)
    sql = re.sub(r"```", "", sql)

    sql = sql.strip()

    # Find the first SELECT statement
    match = re.search(r"select\b.*", sql, flags=re.IGNORECASE | re.DOTALL)

    if match:
        sql = match.group(0)

    # Keep only the first SQL statement (up to the first semicolon)
    if ";" in sql:
        sql = sql.split(";", 1)[0] + ";"

    return sql.strip()


def generate_sql(schema: str, question: str):

    prompt = f"""
    You are an expert PostgreSQL SQL generator.

    Database Schema:

    {schema}

    Table Relationships:

    students.department_id -> departments.department_id
    courses.department_id -> departments.department_id
    courses.faculty_id -> faculty.faculty_id
    enrollments.student_id -> students.student_id
    enrollments.course_id -> courses.course_id
    attendance.student_id -> students.student_id
    attendance.course_id -> courses.course_id
    results.student_id -> students.student_id
    results.exam_id -> exams.exam_id
    exams.course_id -> courses.course_id

    IMPORTANT:

    Never invent columns.

    The enrollments table DOES NOT contain faculty_id.

    Faculty is connected ONLY through courses.faculty_id.

    Examples:

    Question:
    Who teaches Operating Systems?

    SQL:
    SELECT f.first_name, f.last_name
    FROM faculty f
    JOIN courses c
    ON f.faculty_id = c.faculty_id
    WHERE c.course_name = 'Operating Systems';

    Question:
    Show all students.

    SQL:
    SELECT *
    FROM students;

    Question:
    Students with CGPA above 9

    SQL:
    SELECT *
    FROM students
    WHERE cgpa > 9;

    Question:
    Show students with attendance below 75

    SQL:
    SELECT s.first_name,
        s.last_name,
        a.attendance_percentage
    FROM students s
    JOIN attendance a
    ON s.student_id = a.student_id
    WHERE a.attendance_percentage < 75;

    Question:
    Show all Computer Science students

    SQL:
    SELECT s.*
    FROM students s
    JOIN departments d
    ON s.department_id = d.department_id
    WHERE d.department_name = 'Computer Science';

    Rules:

    1. Return ONLY SQL.
    2. Never explain.
    3. Never use markdown.
    4. Never invent columns.
    5. Use only columns present in the schema.
    6. End with a semicolon.
    
    The departments table contains:

    department_id
    department_name
    hod_name
    office_location

    Never use course_name in departments.

    Question:

    {question}
    """

    print("Question:", question)

    response = client.chat(
        model=settings.OLLAMA_MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    sql = response["message"]["content"]

    print("Generated SQL:")
    print(sql)

    return clean_sql(sql)