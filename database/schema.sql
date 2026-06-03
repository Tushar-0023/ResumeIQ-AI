CREATE DATABASE resumeiq;

USE resumeiq;

-- RESUMES TABLE
CREATE TABLE resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    resume_name VARCHAR(255),
    file_path VARCHAR(500),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- RESUME ANALYSIS TABLE
CREATE TABLE resume_analysis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    resume_id INT,

    score INT,
    role VARCHAR(255),

    skills JSON,
    missing_skills JSON,
    suggestions JSON,

    summary TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    FOREIGN KEY (resume_id)
    REFERENCES resumes(id)
    ON DELETE CASCADE
);

SELECT * FROM resumes;
SELECT * FROM resume_analysis;
