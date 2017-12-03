var $freeze$0 = Object.freeze;var $defProps$0 = Object.defineProperties;var $TS$0 = $freeze$0($defProps$0(["\nCREATE\"\nTRIGGER ", ".", "\nBEFORE UPDATE ON\\\"\nFOR EACH ROW\nSET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid));\n"], {"raw": {"value": $freeze$0(["\nCREATE\\\"\nTRIGGER ", ".", "\nBEFORE UPDATE ON\\\\\"\nFOR EACH ROW\nSET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid));\\n"])}}));var $TS$1 = $freeze$0($defProps$0(["\t\s\b\v\t\g\n\r\n!@#$%&^**()+_)(*''\\\``\"\"\uD808\uDF45"], {"raw": {"value": $freeze$0(["\\t\\s\\b\\v\\t\\g\\n\\r\\n!@#$%&^**()+_)(*''\\\\\\`\\`\\\"\\\"\\u{12345}"])}}));var $TS$2 = $freeze$0($defProps$0(["\\t\\s\\b\\v\\t\\g\\n\\r\\n\!\@\#$\%\&\^\*\*\(\)\+\_\)\(\*\'\'\\\\\\\`\\\`\\\"\\\"\uD808\uDF45"], {"raw": {"value": $freeze$0(["\\\\t\\\\s\\\\b\\\\v\\\\t\\\\g\\\\n\\\\r\\\\n\\!\\@\\#\\$\\%\\&\\^\\*\\*\\(\\)\\+\\_\\)\\(\\*\\'\\'\\\\\\\\\\\\\\`\\\\\\`\\\\\\\"\\\\\"\\u{12345}"])}}));
{// tagged
	var sql_createUpdateTrigger = tag($TS$0

, 1, 2


);

	var cookiedString = sql_createUpdateTrigger[0];
	var rawString = sql_createUpdateTrigger[1];

	console.log(
		cookiedString === ["\nCREATE\"\nTRIGGER ", 1, ".", 2, "\nBEFORE UPDATE ON\\\"\nFOR EACH ROW\nSET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid));\n"].join("")
		, rawString === ["\nCREATE\\\"\nTRIGGER ", 1, ".", 2, "\nBEFORE UPDATE ON\\\\\"\nFOR EACH ROW\nSET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid));\\n"].join("")
	);
}

{// simple
	var sql_createUpdateTrigger1 = (("\
\nCREATE\"\
\nTRIGGER " + (1)) + ("." + (2)) + "\
\nBEFORE UPDATE ON\\\"\
\nFOR EACH ROW\
\nSET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid));\n");

	console.log(sql_createUpdateTrigger1 === "\nCREATE\"\nTRIGGER 1.2\nBEFORE UPDATE ON\\\"\nFOR EACH ROW\nSET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid));\n")
}

{// special
	var s1 = tag($TS$1);
	var cookiedString$0 = s1[0];
	var rawString$0 = s1[1];

	console.log(
		cookiedString$0 === ["\t\s\b\v\t\g\n\r\n!@#$%&^**()+_)(*''\\\`\`\"\"\uD808\uDF45"].join("")
		, rawString$0 === ["\\t\\s\\b\\v\\t\\g\\n\\r\\n!@#$%&^**()+_)(*''\\\\\\`\\`\\\"\\\"\\u{12345}"].join("")
	);

	var s2 =    ("\t\s\b\v\t\g\n\r\n!@#$%&^**()+_)(*''\\\``\"\"\uD808\uDF45");
	console.log(s2 === "\t\s\b\v\t\g\n\r\n!@#$%&^**()+_)(*''\\\`\`\"\"\uD808\uDF45");
}

{// escaping
	var s1$0 = tag($TS$2);
	var cookiedString$1 = s1$0[0];
	var rawString$1 = s1$0[1];

	console.log(
		cookiedString$1 === ["\\t\\s\\b\\v\\t\\g\\n\\r\\n\!\@\#\$\%\&\^\*\*\(\)\+\_\)\(\*\'\'\\\\\\\`\\\`\\\"\\\"\uD808\uDF45"].join("")
		, rawString$1 === ["\\\\t\\\\s\\\\b\\\\v\\\\t\\\\g\\\\n\\\\r\\\\n\\!\\@\\#\\$\\%\\&\\^\\*\\*\\(\\)\\+\\_\\)\\(\\*\\'\\'\\\\\\\\\\\\\\`\\\\\\`\\\\\\\"\\\\\"\\u{12345}"].join("")
	);

	var s2$0 =    ("\\t\\s\\b\\v\\t\\g\\n\\r\\n\!\@\#$\%\&\^\*\*\(\)\+\_\)\(\*\'\'\\\\\\\`\\\`\\\"\\\"\\u{12345}");
	console.log(s2$0 === "\\t\\s\\b\\v\\t\\g\\n\\r\\n\!\@\#\$\%\&\^\*\*\(\)\+\_\)\(\*\'\'\\\\\\\`\\\`\\\"\\\"\\u{12345}");
}

function tag(quasis){
	var raw = quasis.raw, length = quasis.length;
	var cookiedString = "";
	var rawString = "";

	length |= 0;

	if ( length ) {
		var i = 0;
		while ( true ) {
			rawString += raw[i];
			cookiedString += quasis[i];
			if ( i + 1 === length ) {
				break;
			}
			i++;
			rawString += arguments[i];
			cookiedString += arguments[i];
		}
	}

	return [cookiedString, rawString];
}
