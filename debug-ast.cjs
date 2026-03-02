const babel = require("@babel/core");

const code = `
let { a, ...rest } = obj;
let abc = { ...rest, c: 123 };
`;

const plugin = ({ types: t }) => {
    return {
        visitor: {
            ObjectExpression(path) {
                let isFirstSpread = true;
                for (const prop of path.node.properties) {
                    if (t.isSpreadElement(prop)) {
                        if (isFirstSpread && t.isIdentifier(prop.argument)) {
                            isFirstSpread = false;
                            const binding = path.scope.getBinding(prop.argument.name);
                            console.log("Found spread argument name:", prop.argument.name);
                            if (binding) {
                                console.log("  binding references:", binding.references);
                                if (binding.path.isVariableDeclarator()) {
                                    const init = binding.path.get("init");
                                    if (init.isCallExpression()) {
                                        const callee = init.get("callee");
                                        console.log("  callee.type:", callee.type);
                                        if (callee.isIdentifier()) {
                                            console.log("  callee name:", callee.node.name);
                                        }
                                    } else if (init.isSequenceExpression()) {
                                        console.log("  init is SequenceExpression with size:", init.get("expressions").length);
                                        const last = init.get("expressions")[init.get("expressions").length - 1];
                                        console.log("  last node type:", last.type);
                                        if (last.isCallExpression()) {
                                            const call = last.get("callee");
                                            console.log("  last node callee type:", call.type);
                                            if (call.isIdentifier()) {
                                                console.log("  last node callee name:", call.node.name);
                                            }
                                        }
                                    } else {
                                        console.log("  init type:", init.type);
                                    }
                                }
                            }
                        }
                    } else {
                        isFirstSpread = false;
                    }
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
