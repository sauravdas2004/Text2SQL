-- ==========================================
-- College Management System Database Schema
-- ==========================================

CREATE TABLE departments (
    department_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    hod_name VARCHAR(100) NOT NULL,
    office_location VARCHAR(100)
);

-- ==========================================
-- Students Table
-- ==========================================

CREATE TABLE students (
    student_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    roll_number VARCHAR(20) NOT NULL UNIQUE,

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    phone VARCHAR(15),

    gender VARCHAR(10)
        CHECK (gender IN ('Male', 'Female', 'Other')),

    date_of_birth DATE NOT NULL,

    department_id INT NOT NULL,

    semester INT NOT NULL
        CHECK (semester BETWEEN 1 AND 8),

    cgpa DECIMAL(3,2)
        CHECK (cgpa BETWEEN 0.00 AND 10.00),

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);

-- ==========================================
-- Faculty Table
-- ==========================================

CREATE TABLE faculty (
    faculty_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    employee_id VARCHAR(20) NOT NULL UNIQUE,

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,

    phone VARCHAR(15),

    designation VARCHAR(50) NOT NULL,

    department_id INT NOT NULL,

    experience_years INT DEFAULT 0
        CHECK (experience_years >= 0),

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
);

-- ==========================================
-- Courses Table
-- ==========================================

CREATE TABLE courses (
    course_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    course_code VARCHAR(20) NOT NULL UNIQUE,

    course_name VARCHAR(100) NOT NULL,

    credits INT NOT NULL
        CHECK (credits BETWEEN 1 AND 6),

    department_id INT NOT NULL,

    faculty_id INT NOT NULL,

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id),

    FOREIGN KEY (faculty_id)
        REFERENCES faculty(faculty_id)
);

-- ==========================================
-- Enrollments Table
-- ==========================================

CREATE TABLE enrollments (
    enrollment_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    student_id INT NOT NULL,

    course_id INT NOT NULL,

    academic_year VARCHAR(20) NOT NULL,

    semester INT NOT NULL
        CHECK (semester BETWEEN 1 AND 8),

    FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE CASCADE,

    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
        ON DELETE CASCADE
);

-- ==========================================
-- Attendance Table
-- ==========================================

CREATE TABLE attendance (
    attendance_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    student_id INT NOT NULL,

    course_id INT NOT NULL,

    attendance_percentage DECIMAL(5,2)
        CHECK (attendance_percentage BETWEEN 0 AND 100),

    FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE CASCADE,

    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
        ON DELETE CASCADE
);

-- ==========================================
-- Exams Table
-- ==========================================

CREATE TABLE exams (
    exam_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    course_id INT NOT NULL,

    exam_name VARCHAR(100) NOT NULL,

    max_marks INT NOT NULL
        CHECK (max_marks > 0),

    exam_date DATE,

    FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
        ON DELETE CASCADE
);

-- ==========================================
-- Results Table
-- ==========================================

CREATE TABLE results (
    result_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    student_id INT NOT NULL,

    exam_id INT NOT NULL,

    marks_obtained DECIMAL(5,2)
        CHECK (marks_obtained >= 0),

    grade VARCHAR(2),

    FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE CASCADE,

    FOREIGN KEY (exam_id)
        REFERENCES exams(exam_id)
        ON DELETE CASCADE
);