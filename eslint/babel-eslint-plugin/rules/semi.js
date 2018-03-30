"use strict";

const ruleComposer = require('eslint-rule-composer');
const eslint = require('eslint');
const semiRule = new eslint.Linter().getRules().get('semi');

const OPT_OUT_PATTERN = /^[-[(/+`]/; // One of [(/+-`

const isSemicolon = token => token.type === "Punctuator" && token.value === ";";

const isUnnecessarySemicolon = (context, lastToken) => {
    if (!isSemicolon(lastToken)) {
        return false;
    }

    const nextToken = context.getSourceCode().getTokenAfter(lastToken);

    if (!nextToken) {
        return true;
    }

    const lastTokenLine = lastToken.loc.end.line;
    const nextTokenLine = nextToken.loc.start.line;
    const isOptOutToken = OPT_OUT_PATTERN.test(nextToken.value) && nextToken.value !== "++" && nextToken.value !== "--";
    const isDivider = (nextToken.value === "}" || nextToken.value === ";");

    return (lastTokenLine !== nextTokenLine && !isOptOutToken) || isDivider;
}

const isOneLinerBlock = (context, node) => {
    const nextToken = context.getSourceCode().getTokenAfter(node);

    if (!nextToken || nextToken.value !== "}") {
        return false;
    }

    const parent = node.parent;

    return parent && parent.type === "BlockStatement" &&
        parent.loc.start.line === parent.loc.end.line;
};

const report = (context, node, missing) => {
    const lastToken = context.getSourceCode().getLastToken(node);

    let message, fix, loc = lastToken.loc;

    if (!missing) {
        message = "Missing semicolon.";
        loc = loc.end;
        fix = function(fixer) {
            return fixer.insertTextAfter(lastToken, ";");
        };
    } else {
        message = "Extra semicolon.";
        loc = loc.start;
        fix = function(fixer) {
            return fixer.remove(lastToken);
        };
    }

    context.report({
        node,
        loc,
        message,
        fix
    });
};

const semiRuleWithClassProperty = ruleComposer.joinReports([
    semiRule,
    context => ({
        ClassProperty(node) {
            const options = context.options[1];
            const exceptOneLine = options && options.omitLastInOneLineBlock === true;

            const sourceCode = context.getSourceCode();
            const lastToken = sourceCode.getLastToken(node);

            if (context.options[0] === "never") {
                if (isUnnecessarySemicolon(context, lastToken)) {
                    report(context, node, true);
                }
            } else {
                if (!isSemicolon(lastToken)) {
                    if (!exceptOneLine || !isOneLinerBlock(node)) {
                        report(context, node);
                    }
                } else {
                    if (exceptOneLine && isOneLinerBlock(node)) {
                        report(context, node, true);
                    }
                }
            }
        },
    }),
]);

module.exports = ruleComposer.filterReports(
    semiRuleWithClassProperty,
    (problem, metadata) => {
        const node = problem.node;

        // Handle async iterator:
        // for await (let something of {})
        if (
            node.type === "VariableDeclaration" &&
            node.parent.type === "ForAwaitStatement"
        ) {
            return false;
        }

        return true;
    }
);
