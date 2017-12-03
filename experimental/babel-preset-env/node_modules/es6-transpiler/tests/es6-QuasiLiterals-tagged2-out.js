var $freeze$0 = Object.freeze;var $defProps$0 = Object.defineProperties;var $TS$0 = ["\nCREATE DATABASE IF NOT EXISTS ", ""];$TS$0 = $freeze$0($defProps$0($TS$0, {"raw": {"value": $TS$0}}));var $TS$1 = ["\nCREATE TABLE IF NOT EXISTS ", ".", " (\n  ", " char(72) NOT NULL DEFAULT '-',\n  ", " text NOT NULL,\n  ", " text NOT NULL DEFAULT '',\n  ", " varchar(64) NOT NULL DEFAULT '',\n  ", " varchar(15) NOT NULL,\n  ", " TINYINT(1) NOT NULL DEFAULT 0,\n  PRIMARY KEY (", "),\n  UNIQUE KEY ", " (", "),\n  KEY TASK (", ")\n) ENGINE=InnoDB DEFAULT CHARSET=utf8;\n\nCREATE TABLE IF NOT EXISTS ", ".", " (\n  ", " char(72) NOT NULL DEFAULT '-',\n  ", " char(72) NOT NULL,\n  ", " varchar(2) NOT NULL,\n  ", " text NOT NULL,\n  ", " varchar(15) NOT NULL,\n  PRIMARY KEY (", "),\n  UNIQUE KEY ", " (", "),\n  KEY TASK (", ")\n) ENGINE=InnoDB DEFAULT CHARSET=utf8"];$TS$1 = $freeze$0($defProps$0($TS$1, {"raw": {"value": $TS$1}}));var $TS$2 = ["\nDROP TRIGGER IF EXISTS ", ".", ""];$TS$2 = $freeze$0($defProps$0($TS$2, {"raw": {"value": $TS$2}}));var $TS$3 = ["\nCREATE\nTRIGGER ", ".", "\nBEFORE INSERT\nON ", ".", " FOR EACH ROW\nSET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid))"];$TS$3 = $freeze$0($defProps$0($TS$3, {"raw": {"value": $TS$3}}));var $TS$4 = ["\nCREATE\nTRIGGER ", ".", "\nBEFORE UPDATE\nON ", ".", " FOR EACH ROW\nSET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid))"];$TS$4 = $freeze$0($defProps$0($TS$4, {"raw": {"value": $TS$4}}));
var DATABASE_NAME = 'database'
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

var sql_createDatabase = create_sql($TS$0
, DATABASE_NAME);

var sql_createTables = create_sql($TS$1
, DATABASE_NAME, MESSAGES_TABLE_NAME
, "id_hash"
, "msgid"
, "reference"
, "context"
, "task"
, "is_plural"
, "id_hash"
, "id_UNIQUE", "id_hash"
, "id_hash"


, DATABASE_NAME, PLURALS_TABLE_NAME
, "id_hash"
, "msgid_id_hash"
, "rule"
, "msgid"
, "task"
, "id_hash"
, "id_UNIQUE", "id_hash"
, "id_hash"
);

var sql_dropInsertTrigger = create_sql($TS$2
, DATABASE_NAME, MESSAGES_TABLE_NAME + "_insert_id");
var sql_createInsertTrigger = create_sql($TS$3

, DATABASE_NAME, MESSAGES_TABLE_NAME + "_insert_id"

, DATABASE_NAME, MESSAGES_TABLE_NAME
);

var sql_dropUpdateTrigger = create_sql($TS$2
, DATABASE_NAME, MESSAGES_TABLE_NAME + "_u_hash");
var sql_createUpdateTrigger = create_sql($TS$4

, DATABASE_NAME, MESSAGES_TABLE_NAME + "_u_hash"

, DATABASE_NAME, MESSAGES_TABLE_NAME
);

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