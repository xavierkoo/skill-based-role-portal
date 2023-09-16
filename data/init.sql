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
--
CREATE TABLE staff_reporting_officer (
  staff_id INT PRIMARY KEY,
  RO_id INT NOT NULL,
  FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id),
  FOREIGN KEY (RO_id) REFERENCES staff_details(staff_id)
);

-- Create staff_roles table
CREATE TABLE staff_roles (
  staff_id INT NOT NULL,
  role_id INT NOT NULL,
  role_type ENUM ('primary', 'secondary') NOT NULL,
  sr_status ENUM ('active', 'inactive') DEFAULT 'inactive' NOT NULL,
  FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id),
  FOREIGN KEY (role_id) REFERENCES role_details(role_id)
);

-- Create staff_skills table
CREATE TABLE staff_skills (
  staff_id INT NOT NULL,
  skill_id INT NOT NULL,
  ss_status ENUM ('active', 'unverified', 'in-progress') NOT NULL,
  FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id),
  FOREIGN KEY (skill_id) REFERENCES skill_details(skill_id)
);

-- role_skills table
CREATE TABLE role_skills (
  role_id INT NOT NULL,
  skill_id INT NOT NULL,
  FOREIGN KEY (role_id) REFERENCES role_details(role_id),
  FOREIGN KEY (skill_id) REFERENCES skill_details(skill_id)
);

-- Stage 3 Tables (Teritary)
CREATE TABLE role_listings (
  role_listing_id INT PRIMARY KEY, -- Needs to be defined by user
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

CREATE TABLE role_applications (
  role_app_id INT PRIMARY KEY AUTO_INCREMENT,
  role_listing_id INT NOT NULL,
  staff_id INT NOT NULL,
  role_app_status ENUM ('applied', 'withdrawn') NOT NULL,
  role_application_ts_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_listing_id) REFERENCES role_listings(role_listing_id),
  FOREIGN KEY (staff_id) REFERENCES staff_details(staff_id)
);


-- -- Create seed data for staff_details
INSERT INTO staff_details (staff_id, f_name, l_email, dept, email, phone, biz_address, sys_role) VALUES
(123456789, 'AH GAO', 'TAN', 'FINANCE', 'tan_ah_gao@all-in-one.com.sg', '65-1234-5678', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'staff');

INSERT INTO staff_details (staff_id, f_name, l_email, dept, email, phone, biz_address, sys_role) VALUES
(123456788, 'VINCENT REX', 'COLINS', 'HUMAN RESOURCE AND ADMIN', 'colins_vincent_rex@all-in-one.com.sg', '65-1234-5679', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'hr');

INSERT INTO staff_details (staff_id, f_name, l_email, dept, email, phone, biz_address, sys_role) VALUES
(123456787, 'FAUD', 'NIZAM', 'SALES', 'faud_nizam@all-in-one.com.sg', '60-03-21345678', 'Unit 3A-07, Tower A, The Vertical Business Suite, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia','manager');

INSERT INTO staff_details (staff_id, f_name, l_email, dept, email, phone, biz_address, sys_role) VALUES
(123456786, 'JOHN', 'DOE', 'IT', 'John_doe@ all-in-one.com.sg', '65-5824-7888', '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208', 'inactive');

INSERT INTO staff_details (staff_id, f_name, l_email, dept, email, phone, biz_address, sys_role) VALUES
(1, 'ROOT', 'ADMIN', 'IT', 'rootme@ all-in-one.com.sg', '65-5824-7888', '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208', 'staff');


INSERT INTO staff_details (staff_id, f_name, l_email, dept, email, phone, biz_address, sys_role) VALUES
(123456123, 'ROOT', 'ADMIN SECOND', 'IT', 'rootme2@ all-in-one.com.sg', '65-5824-7888', '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208', 'staff');


-- -- Create seed data for skill_details
INSERT INTO skill_details (skill_id, skill_name, skill_status) VALUES
(345678912, 'Pascal Programming', 'inactive');

INSERT INTO skill_details (skill_id, skill_name, skill_status) VALUES
(345678913, 'Python Programming', 'active');

INSERT INTO skill_details (skill_id, skill_name, skill_status) VALUES
(345678914, 'Certified Scrum Master', 'active');

INSERT INTO skill_details (skill_id, skill_name, skill_status) VALUES
(345678915, 'Certified Scrum Product Owner', 'active');

INSERT INTO skill_details (skill_id, skill_name, skill_status) VALUES
(345678866, 'Certified Scrum Developer', 'active');

INSERT INTO skill_details (skill_id, skill_name, skill_status) VALUES
(345678790, 'Certified Scrum Professional', 'active');

INSERT INTO skill_details (skill_id, skill_name, skill_status) VALUES
(345678935, 'Certified Scrum Trainer', 'active');

INSERT INTO skill_details (skill_id, skill_name, skill_status) VALUES
(345678927, 'Certified Scrum Coach', 'active');

INSERT INTO skill_details (skill_id, skill_name, skill_status) VALUES
(345678890, 'Certified Scrum@Scale Practitioner', 'active');

-- -- Create seed data for role_details
INSERT INTO role_details (role_id, role_name, role_description, role_status) VALUES
(234567891, 'Head, Talent Attraction', "The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation's growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation's talent attraction plans. The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.", 'inactive');

INSERT INTO role_details (role_id, role_name, role_description, role_status) VALUES
(234567892, 'Learning Facilitator / Trainer', "The Learning Facilitator delivers learning products and services in a variety of environments, using multiple learning delivery modes and methods. He/She assesses learning needs and adapts the facilitation approach to reflect desired learning outcomes and learner needs. He is responsible for knowledge and skills transfer by delivering learning content, facilitating group discussions and responding to queries. He drives learner development and commitment to continuous learning by actively providing feedback and learner support. He evaluates curriculum effectiveness and recommends improvement areas by collecting learner feedback as well as analysing learning delivery approaches and materials.He is a strong communicator who builds trusted relationships and creates a cooperative and engaging learning environment. He is adaptable and adept at managing multiple stakeholders. He works in multiple different environments, including different learning venues and client sites, and regularly interacts with digital systems.", 'active');

INSERT INTO role_details (role_id, role_name, role_description, role_status) VALUES
(234567893, 'Agile Coach (SM)', "The Agile Coach (SM) coaches teams in the conduct of Agile practices and the implementation of Agile methodologies and practices in the organisation and acts as an effective Scrum Master in Agile Scrum teams.", 'active');

INSERT INTO role_details (role_id, role_name, role_description, role_status) VALUES
(234511581, 'Fire Warden', "The Fire Warden is responsible for testing fire alarms and firefighting equipment and implementing risk assessment recommendations. In the event of a confirmed fire alarm or fire drill, the warden assists in the safe evacuation of staff and visitors from the premise immediately.", 'active');

-- -- Create seed data for staff_reporting_officer
INSERT INTO staff_reporting_officer (staff_id, RO_id) VALUES
(123456789, 123456123);

INSERT INTO staff_reporting_officer (staff_id, RO_id) VALUES
(123456123, 1);

-- -- Create seed data for staff_roles
INSERT INTO staff_roles (staff_id, role_id, role_type, sr_status) VALUES
(123456789, 234567891, 'primary', 'active');

INSERT INTO staff_roles (staff_id, role_id, role_type, sr_status) VALUES
(123456789, 234567893, 'secondary', 'active');

INSERT INTO staff_roles (staff_id, role_id, role_type, sr_status) VALUES
(123456789, 234511581, 'secondary', 'active');

-- -- Create seed data for staff_skills
INSERT INTO staff_skills (staff_id, skill_id, ss_status) VALUES
(123456789, 345678913, 'active');

INSERT INTO staff_skills (staff_id, skill_id, ss_status) VALUES
(123456789, 345678866, 'active');

INSERT INTO staff_skills (staff_id, skill_id, ss_status) VALUES
(123456789, 345678790, 'active');

INSERT INTO staff_skills (staff_id, skill_id, ss_status) VALUES
(123456789, 345678890, 'unverified');

INSERT INTO staff_skills (staff_id, skill_id, ss_status) VALUES
(123456789, 345678935, 'in-progress');

INSERT INTO staff_skills (staff_id, skill_id, ss_status) VALUES
(123456789, 345678927, 'in-progress');

-- -- Create seed data for role_skills
INSERT INTO role_skills (role_id, skill_id) VALUES
(234567893, 345678935);

INSERT INTO role_skills (role_id, skill_id) VALUES
(234567892, 345678913);

INSERT INTO role_skills (role_id, skill_id) VALUES
(234567892, 345678912);

-- -- Create seed data for role_listings
INSERT INTO role_listings (role_listing_id, role_listing_creator, role_listing_source, role_listing_updater, role_id, role_listing_desc, role_listing_open, role_listing_close) VALUES
(1, 123456789, 'HR', 123456789, 234567893, 'The Agile Coach (SM) coaches teams in the conduct of Agile practices and the implementation of Agile methodologies and practices in the organisation and acts as an effective Scrum Master in Agile Scrum teams.', '2020-01-01', '2020-01-31');

INSERT INTO role_listings (role_listing_id, role_listing_creator, role_listing_source, role_listing_updater, role_id, role_listing_desc, role_listing_open, role_listing_close) VALUES
(2, 123456789, 'HR', 123456789, 234567892, 'The Learning Facilitator delivers learning products and services in a variety of environments, using multiple learning delivery modes and methods. He/She assesses learning needs and adapts the facilitation approach to reflect desired learning outcomes and learner needs. He is responsible for knowledge and skills transfer by delivering learning content, facilitating group discussions and responding to queries. He drives learner development and commitment to continuous learning by actively providing feedback and learner support. He evaluates curriculum effectiveness and recommends improvement areas by collecting learner feedback as well as analysing learning delivery approaches and materials.He is a strong communicator who builds trusted relationships and creates a cooperative and engaging learning environment. He is adaptable and adept at managing multiple stakeholders. He works in multiple different environments, including different learning venues and client sites, and regularly interacts with digital systems.', '2020-01-01', '2020-01-31');

INSERT INTO role_listings (role_listing_id, role_listing_creator, role_listing_source, role_listing_updater, role_id, role_listing_desc, role_listing_open, role_listing_close) VALUES
(3, 123456789, 'HR', 123456789, 234567891, "The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation's growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation's talent attraction plans. The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.", '2020-01-01', '2020-01-31');


-- -- Create seed data for role_applications

INSERT INTO role_applications (role_listing_id, staff_id, role_app_status) VALUES
(1, 123456789, 'applied');

INSERT INTO role_applications (role_listing_id, staff_id, role_app_status) VALUES
(2, 123456789, 'applied');

INSERT INTO role_applications (role_listing_id, staff_id, role_app_status) VALUES
(3, 123456789, 'applied');

