USE master

CREATE DATABASE DORM
GO

USE DORM
GO

CREATE TABLE ITEMSTYPE(
	TypeId INT PRIMARY KEY IDENTITY,
	[Type] VARCHAR(50)
)
GO

INSERT INTO ITEMSTYPE ([Type])
VALUES 
	('Operations'),
	('Commercial')
GO


CREATE TABLE ITEMS (
	ItemId int primary key identity,
	Item varchar(50),
	ItemType int references ITEMSTYPE(TypeId)
)
GO

INSERT INTO ITEMS  (Item, ItemType)
VALUES
	('Phones System', 1),
	('Staffing', 1),
	('eCW', 1),
	('Power Outage', 1),
	('Clearical Issues', 1),
	('Facility Issues', 1),
	('Computer Issues', 1),
	('Navina System Issues', 1),
	('Clinicial Supplies', 1),
	('Hedis Report', 1),
	('Referrals', 1),
	('Transportation', 1),
	('Coding Update', 2),
	('Navina System Issues Coding', 2),
	('Billing Deadline', 2)
GO


CREATE TABLE ROLES (
    RoleId INT PRIMARY KEY IDENTITY,
    [Role] VARCHAR(50)
)
GO

INSERT INTO ROLES ([Role])
VALUES
    ('System Administrator'),
    ('Manager'),
    ('IT')
GO


CREATE TABLE USERS (
	UserId INT PRIMARY KEY IDENTITY,
	Username VARCHAR(50),
    Passcode VARCHAR(150),
	PasswordReset BIT DEFAULT 1,
	RoleId INT REFERENCES ROLES (RoleId),
	Email VARCHAR(280)
)
GO

INSERT INTO USERS (Username, Passcode, RoleId)
VALUES
	('Manuel Caballero', 'Welcome123', 1)
GO

CREATE TABLE CENTERS (
    CenterId INT PRIMARY KEY IDENTITY,
    Center VARCHAR(60),
    [Address] VARCHAR(200),
    Manager INT REFERENCES USERS(UserId),
    Contact BIGINT
);
GO

INSERT INTO CENTERS (Center, [Address], Manager, Contact)
VALUES
    ('Administration', '3850 Coconut Creek Pkwy, Suite 3', 1, 9549739222)
GO

ALTER TABLE USERS
ADD CenterId INT REFERENCES CENTERS (CenterId)
GO

UPDATE USERS
	SET CenterId = 1
	WHERE UserId = 1
GO


CREATE TABLE [STATUS] (
	StatusId INT PRIMARY KEY IDENTITY,
	[Status] VARCHAR(50)
)

INSERT INTO [STATUS] ([Status])
VALUES
	('Not Started'),
	('In Progress'),
	('On Hold'),
	('Closed')
GO

CREATE TABLE ACUTENESS (
	AcutenessId INT PRIMARY KEY IDENTITY,
	Acuteness VARCHAR(100)
)

INSERT INTO ACUTENESS (Acuteness) 
VALUES
	('Urgent'),
	('Normal'),
	('Non-Critical')

CREATE TABLE ACTIONS(
	ActionId INT PRIMARY KEY IDENTITY,
	ReportedOn DATETIME DEFAULT GETDATE(),
	ReportedBy INT REFERENCES USERS(UserId),
	AssignedTo INT REFERENCES USERS(UserId),
	StatusId INT REFERENCES [STATUS](StatusId),
	CenterId INT REFERENCES CENTERS(CenterId),
	ActionDescription VARCHAR(280),
	Resolution VARCHAR(280),
	Acuteness VARCHAR(40),
	ItemId INT REFERENCES ITEMS(ItemId)
)
GO

CREATE TABLE GENERAL (
	GeneralId int primary key identity,
	GeneralDate DATETIME DEFAULT GETDATE(),
	Comment VARCHAR(280),
	Announcement VARCHAR(280)
)

CREATE TABLE RECORDS (
	RecordId INT PRIMARY KEY IDENTITY,
	GeneralId INT REFERENCES GENERAL(GeneralId),
	RecordDate DATETIME,
	RecordCenter INT REFERENCES CENTERS(CenterId),
	RecordItem INT REFERENCES ITEMS(ItemId),
	[Value]  VARCHAR(280),
	ReportedBy INT REFERENCES USERS(UserId),
	ActionId INT REFERENCES ACTIONS(ActionId)
)

CREATE TABLE COMMENTS (
	CommentId INT PRIMARY KEY IDENTITY,
	CommentAction INT REFERENCES ACTIONS(ActionId),
	CommentedBy INT REFERENCES USERS(UserId),
	CommentDate DATETIME DEFAULT GETDATE(),
	CommentContent VARCHAR(280)
)
