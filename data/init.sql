-- Stage 1 Tables (Primary)
-- This table stores the different staff in the company
CREATE TABLE staff_details (
  staff_id INT PRIMARY KEY,
  f_name VARCHAR(50) NOT NULL,
  l_email VARCHAR(50) UNIQUE NOT NULL,
  dept VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  biz_address VARCHAR(255) NOT NULL,
  sys_role ENUM ('staff', 'hr', 'manager', 'inactive') DEFAULT 'inactive' NOT NULL
);

-- This table stores the different types of skills in the company
CREATE TABLE skill_details (
  skill_id INT PRIMARY KEY,
  skill_name VARCHAR(50) NOT NULL,
  skill_status ENUM ('active', 'inactive') DEFAULT 'inactive' NOT NULL
);

-- This table stores the different types of roles in the company
CREATE TABLE role_details (
  role_id INT PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL,
  role_description TEXT NOT NULL,
  role_status ENUM ('active', 'inactive') DEFAULT 'inactive' NOT NULL
);

-- Stage 2 Tables (Connector)
-- Extract from LMS
CREATE TABLE staff_reporting_officer (
  staff_id INT PRIMARY KEY,
  RO_id INT NOT NULL,
  FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id),
  FOREIGN KEY (RO_id) REFERENCES staff_details(staff_id)
);

-- Extract from LJPS
CREATE TABLE staff_roles (
  staff_id INT NOT NULL,
  role_id INT NOT NULL,
  role_type ENUM ('primary', 'secondary') NOT NULL,
  sr_status ENUM ('active', 'inactive') DEFAULT 'inactive' NOT NULL,
  FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id),
  FOREIGN KEY (role_id) REFERENCES role_details(role_id)
);

-- Create staff_skills table with staff_id, skill_id, ss_status
CREATE TABLE staff_skills (
  staff_id INT NOT NULL,
  skill_id INT NOT NULL,
  ss_status ENUM ('active', 'unverified', 'in-progress') NOT NULL,
  FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id),
  FOREIGN KEY (skill_id) REFERENCES skill_details(skill_id)
);

-- role_skills table with role_id, skill_id
CREATE TABLE role_skills (
  role_id INT NOT NULL,
  skill_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role_details(role_id),
  FOREIGN KEY (skill_id) REFERENCES skill_details(skill_id)
);

-- Stage 3 Tables (Teritary)
-- Create table for role_listings, with role_listing_id, role_listing_creator, role_listing_source, role_listing_updater, role_id, role_listing_desc, role_listing_open, role_listing_close, role_listing_ts_create default to current, role_listing_ts_update default current
CREATE TABLE role_listings (
  role_listing_id INT PRIMARY KEY,
  role_listing_creator INT NOT NULL,
  role_listing_source VARCHAR(50) NOT NULL,
  role_listing_updater INT NOT NULL,
  role_id INT NOT NULL,
  role_listing_desc TEXT NOT NULL,
  role_listing_open DATE NOT NULL,
  role_listing_close DATE NOT NULL,
  role_listing_ts_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  role_listing_ts_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_listing_creator) REFERENCES staff_details(staff_id),
  FOREIGN KEY (role_listing_updater) REFERENCES staff_details(staff_id),
  FOREIGN KEY (role_id) REFERENCES role_details(role_id)
);

-- Create table for role_applications, with role_application_id, role_listing_id, staff_id, role_application_status, role_application_ts_create default to current, role_application_ts_update default current
CREATE TABLE role_applications (
  role_app_id INT PRIMARY KEY AUTO_INCREMENT,
  role_listing_id INT NOT NULL,
  staff_id INT NOT NULL,
  role_app_status ENUM ('applied', 'withdrawn') NOT NULL,
  role_application_ts_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_listing_id) REFERENCES role_listings(role_listing_id),
  FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id)
);