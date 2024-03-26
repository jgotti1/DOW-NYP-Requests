***************** DB Structure ********************
<> DropDown List <>
Name -required -
Email Address - required-
<> Request Type (New Hire, Add Apps, Termination, Remove Access, add/change request) -required-
Request needed date 
Applications Involved 
Model After
<> Mac or PC, Personal -required - 
Requested by 
<> Status (New, Complete, In Progress) -required-
Completed Date
<> Completed by 
Ticket Number
Date Entered - required -
Notes


CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    request_type VARCHAR(100) NOT NULL,
    request_needed_date DATE,
    applications_involved VARCHAR(255),
    model_after VARCHAR(100),
    mac_or_pc VARCHAR(50) NOT NULL,
    requested_by VARCHAR(100),
    status VARCHAR(50) NOT NULL,
    completed_date DATE,
    completed_by VARCHAR(100),
    ticket_number VARCHAR(50),
    date_entered DATE NOT NULL,
    notes TEXT
);

