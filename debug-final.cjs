const babel = require("@babel/core");

const code = `
let { a, ...rest } = obj;
let abc = { ...rest, c: 123 };
`;

const plugin = ({ types: t }) => {
    return {
        visitor: {
            Program: {
                exit(path) {
                    console.log("FINAL AST:");
                    path.traverse({
                        ObjectExpression(op) {
                            console.log("ObjectExpression found! Props:", op.node.properties.length);
                            for (const prop of op.node.properties) {
                                if (t.isSpreadElement(prop)) {
                                    console.log("  SpreadElement! arg:", prop.argument.type);
                                    if (t.isIdentifier(prop.argument)) {
                                        console.log("    name:", prop.argument.name);
                                        const b = op.scope.getBinding(prop.argument.name);
                                        if (b) {
                                            console.log("    binding references:", b.references);
                                            console.log("    binding init type:", b.path.get("init").type);
                                            if (b.path.get("init").isCallExpression()) {
                                                console.log("    binding init callee:", b.path.get("init.callee").type);
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        CallExpression(cp) {
                            if (cp.get("callee").isIdentifier() && cp.node.callee.name.includes("objectSpread")) {
                                console.log("objectSpread call found!");
                                console.log("  args:", cp.node.arguments.map(a => a.type).join(", "));
                            }
                        }
                    });
                }
            }
        }
    };
};

// Use standalone transform without full preset env
babel.transformSync(code, {
    filename: "test.js",
    configFile: false,
    babelrc: false,
    plugins: ["./packages/babel-plugin-transform-object-rest-spread", plugin]
});
