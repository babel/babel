
const DATABASE_NAME = 'database'
	, MESSAGES_TABLE_NAME = 'msgid'
	, PLURALS_TABLE_NAME = 'plural'
;

function mysql_escapeId(msg) {
	return '`' + msg + '`';
}

function create_sql(quasis) {
	var length = quasis.length | 0;

	if ( length === 0 ) {
		return '';
	}

	var s = '', i = 0;
	while ( true ) {
		s += quasis[i];
		if ( i + 1 === length ) {
			return s;
		}
		var expression = arguments[++i];
		if ( expression ) {
			expression = mysql_escapeId(expression);
		}
		else {
			expression = "";
		}
		s += expression;
	}
}

function quotes(quasis) {
	var length = quasis.length | 0;

	if ( length === 0 ) {
		return '';
	}

	var s = '', i = 0;
	while ( true ) {
		s += quasis[i];
		if ( i + 1 === length ) {
			return s;
		}
		var expression = arguments[++i];
		if ( typeof expression !== 'number' ) {
			expression = expression ? "" : ("'" + expression || "" + "'");
		}
		s += expression;
	}
}

const sql_createDatabase = create_sql`
CREATE DATABASE IF NOT EXISTS ${DATABASE_NAME}`;

const sql_createTables = create_sql`
CREATE TABLE IF NOT EXISTS ${DATABASE_NAME}.${MESSAGES_TABLE_NAME} (
  ${"id_hash"} char(72) NOT NULL DEFAULT '-',
  ${"msgid"} text NOT NULL,
  ${"reference"} text NOT NULL DEFAULT '',
  ${"context"} varchar(64) NOT NULL DEFAULT '',
  ${"task"} varchar(15) NOT NULL,
  ${"is_plural"} TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (${"id_hash"}),
  UNIQUE KEY ${"id_UNIQUE"} (${"id_hash"}),
  KEY TASK (${"id_hash"})
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS ${DATABASE_NAME}.${PLURALS_TABLE_NAME} (
  ${"id_hash"} char(72) NOT NULL DEFAULT '-',
  ${"msgid_id_hash"} char(72) NOT NULL,
  ${"rule"} varchar(2) NOT NULL,
  ${"msgid"} text NOT NULL,
  ${"task"} varchar(15) NOT NULL,
  PRIMARY KEY (${"id_hash"}),
  UNIQUE KEY ${"id_UNIQUE"} (${"id_hash"}),
  KEY TASK (${"id_hash"})
) ENGINE=InnoDB DEFAULT CHARSET=utf8`;

const sql_dropInsertTrigger = create_sql`
DROP TRIGGER IF EXISTS ${DATABASE_NAME}.${MESSAGES_TABLE_NAME + "_insert_id"}`;
const sql_createInsertTrigger = create_sql`
CREATE
TRIGGER ${DATABASE_NAME}.${MESSAGES_TABLE_NAME + "_insert_id"}
BEFORE INSERT
ON ${DATABASE_NAME}.${MESSAGES_TABLE_NAME} FOR EACH ROW
SET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid))`;

const sql_dropUpdateTrigger = create_sql`
DROP TRIGGER IF EXISTS ${DATABASE_NAME}.${MESSAGES_TABLE_NAME + "_u_hash"}`;
const sql_createUpdateTrigger = create_sql`
CREATE
TRIGGER ${DATABASE_NAME}.${MESSAGES_TABLE_NAME + "_u_hash"}
BEFORE UPDATE
ON ${DATABASE_NAME}.${MESSAGES_TABLE_NAME} FOR EACH ROW
SET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid))`;

console.log(sql_createDatabase === '\nCREATE DATABASE IF NOT EXISTS `' + DATABASE_NAME + '`');
console.log(sql_createTables === '\n\
CREATE TABLE IF NOT EXISTS `' + DATABASE_NAME + '`.`' + MESSAGES_TABLE_NAME + '` (\n\
  `' + "id_hash" + '` char(72) NOT NULL DEFAULT \'-\',\n\
  `' + "msgid" + '` text NOT NULL,\n\
  `' + "reference" + '` text NOT NULL DEFAULT \'\',\n\
  `' + "context" + '` varchar(64) NOT NULL DEFAULT \'\',\n\
  `' + "task" + '` varchar(15) NOT NULL,\n\
  `' + "is_plural" + '` TINYINT(1) NOT NULL DEFAULT 0,\n\
  PRIMARY KEY (`' + "id_hash" + '`),\n\
  UNIQUE KEY `' + "id_UNIQUE" + '` (`' + "id_hash" + '`),\n\
  KEY TASK (`' + "id_hash" + '`)\n\
) ENGINE=InnoDB DEFAULT CHARSET=utf8;\n\
\n\
CREATE TABLE IF NOT EXISTS `' + DATABASE_NAME + '`.`' + PLURALS_TABLE_NAME + '` (\n\
  `' + "id_hash" + '` char(72) NOT NULL DEFAULT \'-\',\n\
  `' + "msgid_id_hash" + '` char(72) NOT NULL,\n\
  `' + "rule" + '` varchar(2) NOT NULL,\n\
  `' + "msgid" + '` text NOT NULL,\n\
  `' + "task" + '` varchar(15) NOT NULL,\n\
  PRIMARY KEY (`' + "id_hash" + '`),\n\
  UNIQUE KEY `' + "id_UNIQUE" + '` (`' + "id_hash" + '`),\n\
  KEY TASK (`' + "id_hash" + '`)\n\
) ENGINE=InnoDB DEFAULT CHARSET=utf8');
console.log(sql_dropInsertTrigger === '\nDROP TRIGGER IF EXISTS `' + DATABASE_NAME + '`.`' + MESSAGES_TABLE_NAME + "_insert_id" + '`');
console.log(sql_createInsertTrigger === '\nCREATE\n\
TRIGGER `' + DATABASE_NAME + '`.`' + MESSAGES_TABLE_NAME + "_insert_id" + '`\n\
BEFORE INSERT\n\
ON `' + DATABASE_NAME + '`.`' + MESSAGES_TABLE_NAME + '` FOR EACH ROW\n\
SET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid))');
console.log(sql_dropUpdateTrigger === '\nDROP TRIGGER IF EXISTS `' + DATABASE_NAME + '`.`' + MESSAGES_TABLE_NAME + "_u_hash" + '`');
console.log(sql_createUpdateTrigger === '\nCREATE\n\
TRIGGER `' + DATABASE_NAME + '`.`' + MESSAGES_TABLE_NAME + "_u_hash" + '`\n\
BEFORE UPDATE\n\
ON `' + DATABASE_NAME + '`.`' + MESSAGES_TABLE_NAME + '` FOR EACH ROW\n\
SET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid))');