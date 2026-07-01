from random import randint, uniform, choice
from datetime import date

from faker import Faker
from sqlalchemy import text

from app.database import engine

fake = Faker("en_IN")

# ----------------------------
# Departments
# ----------------------------

departments = [
    ("Computer Science", "Dr. Rajesh Sharma", "Block A"),
    ("Electronics", "Dr. Priya Singh", "Block B"),
    ("Mechanical", "Dr. Amit Verma", "Block C"),
    ("Civil", "Dr. Neha Gupta", "Block D"),
    ("Electrical", "Dr. Vikram Rao", "Block E"),
    ("Mathematics", "Dr. Anjali Das", "Block F"),
]

# ----------------------------
# Faculty
# ----------------------------

designations = [
    "Assistant Professor",
    "Associate Professor",
    "Professor",
]

course_map = {
    1: [
        ("CS101", "Programming in C", 4),
        ("CS201", "Data Structures", 4),
        ("CS301", "DBMS", 4),
        ("CS302", "Operating Systems", 4),
        ("CS303", "Computer Networks", 4),
    ],
    2: [
        ("EC101", "Digital Electronics", 4),
        ("EC201", "Signals and Systems", 4),
        ("EC301", "Microprocessors", 4),
    ],
    3: [
        ("ME101", "Engineering Mechanics", 4),
        ("ME201", "Thermodynamics", 4),
    ],
    4: [
        ("CE101", "Surveying", 4),
        ("CE201", "Structural Analysis", 4),
    ],
    5: [
        ("EE101", "Basic Electrical", 4),
        ("EE201", "Power Systems", 4),
    ],
    6: [
        ("MA101", "Calculus", 4),
        ("MA201", "Linear Algebra", 4),
    ],
}


with engine.begin() as conn:

    print("Clearing old data...")

    conn.execute(text("""
        TRUNCATE TABLE
        results,
        exams,
        attendance,
        enrollments,
        courses,
        faculty,
        students,
        departments
        RESTART IDENTITY CASCADE;
        """))

    print("Departments...")

    for dep in departments:
        conn.execute(
            text("""
            INSERT INTO departments
            (department_name, hod_name, office_location)
            VALUES (:name,:hod,:office)
            """),
            {
                "name": dep[0],
                "hod": dep[1],
                "office": dep[2],
            },
        )

    print("Faculty...")

    faculty_id = 1

    for dep_id in range(1, 7):

        for _ in range(3):

            conn.execute(
                text("""
                INSERT INTO faculty
                (
                    employee_id,
                    first_name,
                    last_name,
                    email,
                    phone,
                    designation,
                    department_id,
                    experience_years
                )
                VALUES
                (
                    :eid,
                    :fn,
                    :ln,
                    :email,
                    :phone,
                    :desg,
                    :dep,
                    :exp
                )
                """),
                {
                    "eid": f"EMP{faculty_id:03}",
                    "fn": fake.first_name(),
                    "ln": fake.last_name(),
                    "email": fake.unique.email(),
                    "phone": fake.phone_number()[:15],
                    "desg": choice(designations),
                    "dep": dep_id,
                    "exp": randint(2, 25),
                },
            )

            faculty_id += 1

    print("Courses...")

    faculty_pointer = 1

    for dep in course_map:

        for code, name, credit in course_map[dep]:

            conn.execute(
                text("""
                INSERT INTO courses
                (
                    course_code,
                    course_name,
                    credits,
                    department_id,
                    faculty_id
                )
                VALUES
                (
                    :code,
                    :name,
                    :credit,
                    :dep,
                    :faculty
                )
                """),
                {
                    "code": code,
                    "name": name,
                    "credit": credit,
                    "dep": dep,
                    "faculty": faculty_pointer,
                },
            )

            faculty_pointer += 1

            if faculty_pointer > 18:
                faculty_pointer = 1

    print("Students...")

    for i in range(1, 101):

        dep = randint(1, 6)

        conn.execute(
            text("""
            INSERT INTO students
            (
                roll_number,
                first_name,
                last_name,
                email,
                phone,
                gender,
                date_of_birth,
                department_id,
                semester,
                cgpa
            )
            VALUES
            (
                :roll,
                :fn,
                :ln,
                :email,
                :phone,
                :gender,
                :dob,
                :dep,
                :sem,
                :cgpa
            )
            """),
            {
                "roll": f"2023{1000+i}",
                "fn": fake.first_name(),
                "ln": fake.last_name(),
                "email": fake.unique.email(),
                "phone": fake.phone_number()[:15],
                "gender": choice(["Male", "Female"]),
                "dob": date(
                    randint(2001, 2005),
                    randint(1, 12),
                    randint(1, 28),
                ),
                "dep": dep,
                "sem": randint(1, 8),
                "cgpa": round(uniform(5.5, 9.9), 2),
            },
        )
    
    print("Enrollments...")

    for student_id in range(1, 101):

        # Get department and semester of the student
        student = conn.execute(
            text("""
            SELECT department_id, semester
            FROM students
            WHERE student_id = :id
            """),
            {"id": student_id},
        ).fetchone()

        dep = student.department_id
        semester = student.semester

        courses = conn.execute(
            text("""
            SELECT course_id
            FROM courses
            WHERE department_id = :dep
            LIMIT 5
            """),
            {"dep": dep},
        ).fetchall()

        for course in courses:

            conn.execute(
                text("""
                INSERT INTO enrollments
                (
                    student_id,
                    course_id,
                    academic_year,
                    semester
                )
                VALUES
                (
                    :sid,
                    :cid,
                    '2025-26',
                    :semester
                )
                """),
                {
                    "sid": student_id,
                    "cid": course.course_id,
                    "semester": semester,
                },
            )

    print("Attendance...")

    for student_id in range(1, 101):

        dep = conn.execute(
            text("""
            SELECT department_id
            FROM students
            WHERE student_id=:id
            """),
            {"id": student_id},
        ).scalar()

        courses = conn.execute(
            text("""
            SELECT course_id
            FROM courses
            WHERE department_id=:dep
            LIMIT 5
            """),
            {"dep": dep},
        ).fetchall()

        for course in courses:

            conn.execute(
                text("""
                INSERT INTO attendance
                (
                    student_id,
                    course_id,
                    attendance_percentage
                )
                VALUES
                (
                    :sid,
                    :cid,
                    :percent
                )
                """),
                {
                    "sid": student_id,
                    "cid": course.course_id,
                    "percent": round(uniform(65,100),2),
                },
            )

    print("Exams...")

    courses = conn.execute(
        text("""
        SELECT course_id
        FROM courses
        """)
    ).fetchall()

    for course in courses:

        conn.execute(
            text("""
            INSERT INTO exams
            (
                course_id,
                exam_name,
                exam_date,
                max_marks
            )
            VALUES
            (
                :cid,
                'Mid Semester',
                CURRENT_DATE,
                100
            )
            """),
            {
                "cid": course[0],
            },
        )

    print("Results...")

    exams = conn.execute(
        text("""
        SELECT exam_id, course_id
        FROM exams
        """)
    ).fetchall()

    for exam in exams:

        students = conn.execute(
            text("""
            SELECT student_id
            FROM enrollments
            WHERE course_id=:cid
            """),
            {
                "cid": exam.course_id,
            },
        ).fetchall()

        for student in students:

            marks = randint(40,100)

            conn.execute(
                text("""
                INSERT INTO results
                (
                    student_id,
                    exam_id,
                    marks_obtained,
                    grade
                )
                VALUES
                (
                    :sid,
                    :exam,
                    :marks,
                    :grade
                )
                """),
                {
                    "sid": student.student_id,
                    "exam": exam.exam_id,
                    "marks": marks,
                    "grade":
                        "A" if marks>=90 else
                        "B" if marks>=75 else
                        "C" if marks>=60 else
                        "D",
                },
            )
            
print("Done ✅")