
{// tagged
	const sql_createUpdateTrigger = tag`
CREATE\"
TRIGGER ${1}.${2}
BEFORE UPDATE ON\\"
FOR EACH ROW
SET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid));\n`;

	let cookiedString = sql_createUpdateTrigger[0];
	let rawString = sql_createUpdateTrigger[1];

	console.log(
		cookiedString === ["\nCREATE\"\nTRIGGER ", 1, ".", 2, "\nBEFORE UPDATE ON\\\"\nFOR EACH ROW\nSET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid));\n"].join("")
		, rawString === ["\nCREATE\\\"\nTRIGGER ", 1, ".", 2, "\nBEFORE UPDATE ON\\\\\"\nFOR EACH ROW\nSET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid));\\n"].join("")
	);
}

{// simple
	const sql_createUpdateTrigger1 = `
CREATE\"
TRIGGER ${1}.${2}
BEFORE UPDATE ON\\"
FOR EACH ROW
SET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid));\n`;

	console.log(sql_createUpdateTrigger1 === "\nCREATE\"\nTRIGGER 1.2\nBEFORE UPDATE ON\\\"\nFOR EACH ROW\nSET NEW.id_hash = concat(sha1(NEW.msgid), md5(NEW.msgid));\n")
}

{// special
	const s1 = tag`\t\s\b\v\t\g\n\r\n!@#$%&^**()+_)(*''\\\`\`\"\"\u{12345}`;
	let cookiedString = s1[0];
	let rawString = s1[1];

	console.log(
		cookiedString === ["\t\s\b\v\t\g\n\r\n!@#$%&^**()+_)(*''\\\`\`\"\"\uD808\uDF45"].join("")
		, rawString === ["\\t\\s\\b\\v\\t\\g\\n\\r\\n!@#$%&^**()+_)(*''\\\\\\`\\`\\\"\\\"\\u{12345}"].join("")
	);

	const s2 =    `\t\s\b\v\t\g\n\r\n!@#$%&^**()+_)(*''\\\`\`\"\"\u{12345}`;
	console.log(s2 === "\t\s\b\v\t\g\n\r\n!@#$%&^**()+_)(*''\\\`\`\"\"\uD808\uDF45");
}

{// escaping
	const s1 = tag`\\t\\s\\b\\v\\t\\g\\n\\r\\n\!\@\#\$\%\&\^\*\*\(\)\+\_\)\(\*\'\'\\\\\\\`\\\`\\\"\\"\u{12345}`;
	let cookiedString = s1[0];
	let rawString = s1[1];

	console.log(
		cookiedString === ["\\t\\s\\b\\v\\t\\g\\n\\r\\n\!\@\#\$\%\&\^\*\*\(\)\+\_\)\(\*\'\'\\\\\\\`\\\`\\\"\\\"\uD808\uDF45"].join("")
		, rawString === ["\\\\t\\\\s\\\\b\\\\v\\\\t\\\\g\\\\n\\\\r\\\\n\\!\\@\\#\\$\\%\\&\\^\\*\\*\\(\\)\\+\\_\\)\\(\\*\\'\\'\\\\\\\\\\\\\\`\\\\\\`\\\\\\\"\\\\\"\\u{12345}"].join("")
	);

	const s2 =    `\\t\\s\\b\\v\\t\\g\\n\\r\\n\!\@\#\$\%\&\^\*\*\(\)\+\_\)\(\*\'\'\\\\\\\`\\\`\\\"\\"\\u{12345}`;
	console.log(s2 === "\\t\\s\\b\\v\\t\\g\\n\\r\\n\!\@\#\$\%\&\^\*\*\(\)\+\_\)\(\*\'\'\\\\\\\`\\\`\\\"\\\"\\u{12345}");
}

function tag(quasis){
	let {raw, length} = quasis;
	let cookiedString = "";
	let rawString = "";

	length |= 0;

	if ( length ) {
		let i = 0;
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
