CREATE TABLE locations (
	location_id INT PRIMARY KEY,
	location_name VARCHAR(50) NOT NULL
);

CREATE TABLE USER_INFO (
	USER_INFO_ID INT PRIMARY KEY,
	USER_INFO_NAME VARCHAR(50) UNIQUE NOT NULL,
	USER_INFO_PASSWORD VARCHAR(50) NOT NULL,
	USER_AGE INT,
	USER_INFO_LOCATION_ID INT
);

CREATE TABLE parks (
	park_id INT PRIMARY KEY,
	park_name VARCHAR(50) NOT NULL,
	park_lat DECIMAL,
	park_long DECIMAL
);

CREATE TABLE favorites (
	user_name VARCHAR(50) NOT NULL,
	fav_item_name VARCHAR(100) NOT NULL,
	fav_cat VARCHAR(50) NOT NULL,
	fav_lat DECIMAL,
	fav_lng DECIMAL
);

CREATE TABLE endpoints (
	endpoint_id INT PRIMARY KEY,
	endpoint_uri VARCHAR(50) NOT NULL,
	endpoint_requested INT 
);

CREATE TABLE messages(
	message_id INT PRIMARY KEY,
	message_user_name VARCHAR(50) NOT NULL,
	message_content VARCHAR(250) NOT NULL
);

CREATE EXTENSION pgcrypto;

-- Encrypt the user's password.
CREATE OR REPLACE FUNCTION encryption() RETURNS TRIGGER
AS
$$
DECLARE
	user_password TEXT;
BEGIN
	user_password := (
					 SELECT USER_INFO_PASSWORD 
					 FROM USER_INFO
					 WHERE USER_INFO_ID = new.USER_INFO_ID
					 );
	UPDATE USER_INFO
	SET USER_INFO_PASSWORD = encode(encrypt(convert_to(user_password, 'utf8'), 'ENC_KEY', 'aes'), 'hex')
	WHERE USER_INFO_ID = new.USER_INFO_ID;
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- When a user created an account, encrypt the user's password and store it to the database.
DROP TRIGGER IF EXISTS password_encryption ON USER_INFO;

CREATE TRIGGER password_encryption
AFTER INSERT
ON USER_INFO
FOR EACH ROW
EXECUTE PROCEDURE encryption();

SELECT * FROM locations;
SELECT * FROM user_info;
SELECT * FROM parks;
SELECT * FROM events;
SELECT * FROM messages;
SELECT * FROM endpoints ORDER BY endpoint_id;
SELECT * FROM favorites where user_name='admin';

