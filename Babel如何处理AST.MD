### AST抽象语法树（abstract syntax code，AST）是啥？
抽象语法树是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。
==> 就是将具体代码转换后生成的一种树结构。

### 普通代码如何转化成AST
普通代码主要通过词法分析(Lexical Analysic)和语法分析(Syntax Analysic)转换成AST

词法分析 Lexical Analysis,也叫scanner(扫描器)，它读取我们的source code中你的每一个字符，转换成token（词法令牌）, 最后，我的源代码可能会被转换成 list of tokens

    input => const a = 5;
    output => [{type: 'keyword', value: 'const', ...}, {type: 'identifier', value: 'a', ...}, {type: 'value', value: '5', ...}, ...]

语法分析 Syntax Analysis, 也叫parser（解析器），将词法分析器解析出的list of token，转换成tree representation。

    input => [{type: 'keyword', value: 'const', ...}, {type: 'identifier', value: 'a', ...}, {type: 'value', value: '5', ...}, ...]
    output => [{type: 'VariableDeclarator', declarations: {kind: 'const', type: 'Identifier', name: 'a'}, init: {type: 'Literal', value: '5'}, ...}]

最终，经过词法分析和语法分析，我们的代码被转换成了一个树形节点。

流程：  
1.传入普通代码  ==> 提供转换代码
2.扫描器对代码进行词法分析，将普通代码转化成token(词法令牌),形成list of token(token树)  ==> 扫描器(词法分析)代码转换成token树
3.解释器对list of token(token树)进行语法分析,将转换成树节点(tree representation)    ==> 解释器(语法分析)token树转化成树节点
4.所有的树形节点组合起来，就形成了concrete syntax tree（混合语法树），该树虽然和代码并不是100%匹配，但却包含了足够的信息使解析器能够正确的处理代码。    ==> 树节点形成ast

### Babel
babel是一个js编译器，他解析高版本es语法代码，生成向后兼容的低版本js代码。

### Babel如何解析？
在高层次上有三步：
    parse(代码转换成ast) ==> transform(ast集合babel配置生成新的ast) ==> generate(ast转换为代码)

伪代码演示：

    //  步骤一:parser转换输入的代码，输出ast
    import * as BabelParser from '***@babel/parser*';
    const code = ` const a = 5 `;
    const ast = BabelParser.parse(code);

    // 步骤二:transform结合babel preset,plugin，转换兼容ast,生成新的ast
    import traverse from '***@babel/traverse***';
    const new_ast = traverse(ast, {
        enter(path) {
            if (path.node.type === 'Identifier') {
            // do something transformal
            }
            ...
        }
    });

    //  步骤三:将新的ast转换成新的代码
    import generate from '***@babel/generator***';
    const newCode = generate(new_ast);

    总结:
    parser: source_code => ast
    traverse: ast => new_ast
    generate: new_ast => target_code

    babel的转换就是构建和修改抽象语法树的过程

### 参考资料
AST(抽象语法树)超详细:https://blog.csdn.net/weixin_39408343/article/details/95984062
五分钟了解抽象语法树（AST）babel是如何转换的？:https://www.cnblogs.com/nelson-hu/p/12368253.html