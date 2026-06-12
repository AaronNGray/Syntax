//
//  syntax.ts - Syntatical Description Language and Tool
//
//  Copyright and Intellectual Property of Aaron Nathaniel Gray <aaronngray@gmail.com>
//

import typescript from "typescript"

type Identifier = string | null;

type Symbol =
    NonTerminalSymbol
    | TerminalSymbol
;

type NullSymbol = string;
const nullSymbol:NullSymbol = "null" as NullSymbol;

//

class Container<Base = AST.Type> /* ??? name ??? Base ??? */ /* Record<string, any> */ {
    [key: string]: Base;
    constructor(initialValues: Record<string, Base> = {}) {
        Object.assign(this, initialValues);
    }
}

class Return /* Record<string, any> */ {
    [key: string]: any;
    constructor(initialValues: Record<string, any> = {}) {
        Object.assign(this, initialValues);
    }
}

type Result = Return | false;

type ParseResult = Return | Array<Return> | true | false;

//


export namespace SOOL {
    export namespace AST {

    export class Node {};
    export class NamedNode extends AST.Node {
        constructor(public name?:AST.Name) { super(); }
    }
    export class Identifier extends AST.NamedNode {
        constructor(name:AST.Name) { super(name); }
    }
    export class Name extends AST.Identifier {
        constructor(name:AST.Name) { super(name); }
    }
    export class Type extends AST.Identifier {
        constructor(name:AST.Name) { super(name); }
    }
    export class Function extends AST.NamedNode {
        constructor(name:AST.Name, public parameters?:Parameters) { super(name); }
    }
    export class Constructor extends AST.Function {
        constructor(name?:AST.Name, parameters?:Parameters) { super(name || DefaultConstructor, parameters); }
    }
    export const DefaultConstructor:AST.NamedNode = new AST.NamedNode();
    export class Class extends AST.NamedNode {
        constructor(name:AST.Name) {
        super(name);
        }
        _constructor?:AST.Constructor;
    }
    export class Method extends AST.Function {
        constructor(name:AST.Name, public _class:AST.Class, parameters?:AST.Parameters) { super(name, parameters); }
    }
    export class StaticMethod extends AST.Function {
        constructor(name:AST.Name, public _class:AST.Class, parameters?:AST.Parameters) { super(name, parameters); }
    }
    export class Parameters extends Container {
        constructor(parameters:Container) { super(parameters); };
    }
    export class Parameter extends NamedNode {
        constructor(name:AST.Name, type:AST.Type) { super(name); }
    }
  } // End Namespace AST

  class SOOLWriter {
    constructor() {}

    imports:Import[]
    preface:SOOL.Fragment[]; // ??? Fragment ???
    body:Construct[];
    postface:SOOL.Fragment[];

    make<T extends SOOL.AST.Node>(Contructor: new () => T):T {
        return new Contructor();
    }
  }
} // End namespace SOOL

export namespace Syntax {
  export namespace AST {

    type SymemeType = string;

    type PrinterReturn = { inline:string; outOfLine:string[] };
    type GeneratorReturn = { inline:string; outOfLine:string[] };

    abstract class Syneme {
        type: SymemeType = EpsilonType;

        abstract parse(input: string): ParseResult;
        abstract print(input: any): PrinterReturn;

        abstract printParser(): string;
        abstract printInlineParser(): string;

        abstract printPrinter(): string;
        abstract printInlinePrinter(): string;

        abstract generateParser(): GeneratorReturn;
        abstract generateInlineParser(): string;

        abstract generateGenerator(): string;
        abstract generateInlineGenerator(): string;

        abstract SOOLParserGeneratorVisitor(visitor:Visitor):SOOLWriter;
        abstract SOOLGeneratorGeneratorVisitor(visitor:Visitor):SOOLWriter;
    }
    class NullSyneme extends Syneme {
        type: SymemeType = "NullSyneme" as SymemeType;

        parse(input: string): Result { return false; }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn { return { inline: "", outOfLine: [] }; }
        generateInlineParser(): string { return ""; }

        generateGenerator(): string { return ""; }
        generateInlineGenerator(): string { return ""; }
    }
    const nullSymeme: NullSyneme = new NullSyneme();

    export class Epsilon extends Syneme {
        type: SymemeType = EpsilonType;

        parse(input: string): Result { return new Return(); }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn { return { inline: "", outOfLine: [] }; }
        generateInlineParser(): string { return ""; }

        generateGenerator(): string { return ""; }
        generateInlineGenerator(): string { return ""; }
    }
    const EpsilonType:SymemeType = "Epsilon" as SymemeType;

    export class Sequence extends Syneme {
        elements: Array<{identifier?:Identifier, syneme: Syneme}> = [];

        parse(input: string): Result {
            let index = 0
            let ret:Return = new Return;
            for (; index < this.elements.length; index++) {
                const element = this.elements[index];
                const result = element.syneme.parse(input);
                if (result !== false)
                    ret[element.identifier as string] = result;
                else
                    return false;
            }
            return ret;
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generate(input: any): string { return ""; }
        generateParser(): GeneratorReturn {
            let ret = "function parse" + this.type + "(input: string): Return {\n";
            ret += "\tlet ret: Return = new Return();\n";

            ret += this.elements.map(element => {
                return "\tif (!ret." + element.identifier + " = parse" + element.syneme.type + "(input)) {" +
                    "\t\treturn false;" +
                    "\t}\n"
    u        }).join("\n");

            ret += "return ret;\n";
            ret += "}\n";
            return { inline: ret, outOfLine: [] };
        }
        generateInlineParser(): string { return ""; }

        generateGenerator(): string { return ""; }
        generateInlineGenerator(): string { return ""; }
    }
    const SequenceType:SymemeType = "Sequence" as SymemeType;

    export class Selection extends Syneme {
        elements: Array<Syneme> = [];

        parse(input: string): Return | true | false {
            let index = 0
            let ret:Return = new Return();
            for (; index < this.elements.length; index++) {
                const element = this.elements[index];
                const result = element.parse(input);
                if (result !== false)
                    return result;
            }
            return false;
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn {
            let ret = "function parse" + this.type + "(input: string): Return {\n";
            ret += "\tlet ret: Return;\n";

            ret += this.elements.map(element => {
                return "\tif (!(ret = parse" + element.type + "(input))) {" +
                    "\t\treturn ret;" +
                    "\t}\n"
            }).join("\n");

            ret += "return false;\n";
            ret += "}\n";
            return { inline: ret, outOfLine: [] };
        }
        generateInlineParser(): string { return ""; }

        generateGenerator(): string { return ""; }
        generateInlineGenerator(): string { return ""; }
    }
    const SelectionType:SymemeType = "Selection" as SymemeType;

    export class Optional extends Syneme {
        element: Syneme = nullSymeme;

        parse(input: string): Return | false | true {
            return this.element.parse(input) || true;
        };
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn {
            return { inline: "", outOfLine: [] };
        }
        generateInlineParser(): string {
            return "parse" + this.element.generateInlineParser() + "(input) || true;"; // ???
        }

        generateGenerator(): string { return ""; }
        generateInlineGenerator(): string { return ""; }
    }
    const OptionType:SymemeType = "Option" as SymemeType;

    class Repetition extends Syneme {
        element: Syneme = nullSymeme;

        parse(input: string): Result {
            let ret = [];
            let result = this.element.parse(input);
            if (result === false)
                return false;

            ret.push(result);

            result = this.element.parse(input);
            if (result === false)
                return result;

            while (result = this.element.parse(input))
                ret.push(result);

            return ret;
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn {
            return { inline: "", outOfLine: [] };
        }
        generateInlineParser(): string {
            return "parse" + this.element.generateInlineParser() + "(input) || true;"; // ???
        }

        generateGenerator(): string { return ""; }
        generateInlineGenerator(): string { return ""; }
    }
    const RepetitionType:SymemeType = "Repetition" as SymemeType;

    export class OptionalRepetition extends Syneme {
        element: Syneme = nullSymeme;

        parse(input: string): ParseResult {
            let ret = [];
            let result: ParseResult;
            while ((result = this.element.parse(input)) !== false)
                ret.push(result);

            return (ret.length == 1) ? ret[0] : ret;
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn {
            return { inline: "", outOfLine: [] };
        }
        generateInlineParser(): string {
            return "parse" + this.element.generateInlineParser() + "(input) || true;"; // ???
        }

        generateGenerator(): string { return ""; }
        generateInlineGenerator(): string { return ""; }
    }
    const OptionalRepetitionType:SymemeType = "OptionalRepetition" as SymemeType;

    class NonTerminalSymbol extends Syneme {
        type: SymemeType = NonTerminalSymbolType;
        name: Identifier = null;
        production: Production = nullProduction;

        constructor(identifier: Identifier = null, production: Production = nullProduction) {
            super();
        }

        parse(input: string): ParseResult {
            let ret = this.production.syneme.parse(input);

            if (ret instanceof Return)
                ret.type = this.name;

            return (this.production !== nullProduction) ? ret : false;
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn {
            return { inline: "", outOfLine: [] };
        }
        generateInlineParser(): string {
            return "";
        }

        generateGenerator(): string { return ""; }
        generateInlineGenerator(): string { return ""; }
    }
    const NonTerminalSymbolType:SymemeType = "NonTerminalSymbol" as SymemeType;
    const nullNonTerminalSymbol:NonTerminalSymbol = new NonTerminalSymbol();

    //

    export class TerminalSymbol extends Syneme {
        type: SymemeType = TerminalSymbolType;
        name: Identifier = null;

        constructor(name: string, type: string) {
            super();
            this.name = name;
            this.type = type as SymemeType;
        }

        parse(input: string): Result {
            return new Return({ identifier: this.name });
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn { return { inline: "", outOfLine: [] }; }
        generateInlineParser(): string { return ""; }

        generateGenerator(): string { return ""; }
        generateInlineGenerator(): string { return ""; }
    }
    const TerminalSymbolType: SymemeType = "TerminalSymbol" as SymemeType;

    export class IdentifierSymbol extends TerminalSymbol {
        type: SymemeType = IdentifierSymbolType;
        identifier: Identifier = null;

        constructor(identifier: Identifier = null) {
            super(identifier || "", TerminalSymbolType);
        }

        parse(input: string): Result {
            return new Return({ identifier: this.identifier });
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn { return { inline: "", outOfLine: [] }; }
        generateInlineParser(): string { return ""; }

        generateGenerator(): string { return ""; }
        generateInlineGenerator(): string { return ""; }
    }
    const IdentifierSymbolType: SymemeType = "IdentifierSymbol" as SymemeType;

    export class StringSymbol extends TerminalSymbol {
        type: SymemeType = StringSymbolType;
        value: string = "";

        constructor(value: string = "") {
            super();
            this.value = value;
        }

        parse(input: string): Result {
            return new Return({ value: this.value });
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn { return { inline: "", outOfLine: [] }; }
        generateInlineParser(): string { return ""; }

        generatePrinter(): string { return ""; }
        generateInlinePrinter(): string { return ""; }

        generateGenerator(): string { return ""; }
        generateInlineGenerator(): string { return ""; }
    }
    const StringSymbolType: SymemeType = "StringSymbol" as SymemeType;

    class NumberSymbol extends TerminalSymbol {
        type: SymemeType = NumberSymbolType;
        value: number = 0;

        constructor(value: number = 0) {
            super();
            this.value = value;
        }

        parse(input: string): Result {
            return new Return({ value: this.value });
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn { return { inline: "", outOfLine: [] }; }
        generateInlineParser(): string { return ""; }

        generatePrinter(): string { return ""; }
        generateInlinePrinter(): string { return ""; }
    }
    const NumberSymbolType: SymemeType = "NumberSymbol" as SymemeType;

    export class BooleanSymbol extends TerminalSymbol {
        type: SymemeType = BooleanSymbolType;
        value: boolean = false;

        constructor(value: boolean = false) {
            super();
            this.value = value;
        }

        parse(input: string): Result {
            return new Return({ value: this.value });
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn { return { inline: "", outOfLine: [] }; }
        generateInlineParser(): string { return ""; }

        generatePrinter(): string { return ""; }
        generateInlinePrinter(): string { return ""; }
    }
    const BooleanSymbolType = "BooleanSymbol" as SymemeType;

    export class NewLineSymbol extends TerminalSymbol {
        type: SymemeType = NewLineSymbolType;

        constructor() {
            super();
        }

        parse(input: string): Result {
            return new Return({ value: "\n" });
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn { return { inline: "", outOfLine: [] }; }
        generateInlineParser(): string { return ""; }

        generatePrinter(): string { return ""; }
        generateInlinePrinter(): string { return ""; }
    }
    const NewLineSymbolType = "NewLineSymbol" as SymemeType;

    export class WhitespaceSymbol extends TerminalSymbol {
        type: SymemeType = WhitespaceSymbolType;

        constructor() {
            super();
        }

        parse(input: string): Result {
            return new Return({ value: " " });
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn { return { inline: "", outOfLine: [] }; }
        generateInlineParser(): string { return ""; }

        generatePrinter(): string { return ""; }
        generateInlinePrinter(): string { return ""; }
    }
    const WhitespaceSymbolType = "WhitespaceSymbol" as SymemeType;

    export class NoWhitespaceSymbol extends TerminalSymbol {
        type: SymemeType = NoWhitespaceSymbolType;

        constructor() {
            super();
        }

        parse(input: string): Result {
            return new Return({ value: "" });
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn { return { inline: "", outOfLine: [] }; }
        generateInlineParser(): string { return ""; }

        generatePrinter(): string { return ""; }
        generateInlinePrinter(): string { return ""; }

        generateGenerator(): string { return ""; }
        generateInlineGenerator(): string { return ""; }
    }
    const NoWhitespaceSymbolType = "NoWhitespaceSymbol" as SymemeType;

    export class CommentSymbol extends TerminalSymbol {
        type: SymemeType = CommentSymbolType;

        constructor() {
            super();
        }

        comment: string;

        parse(input: string): Result {
            return new Return({ value: "// comment" });
        }
        print(input: any): PrinterReturn { return { inline: this.comment, outOfLine: [] }; }

        printParser(): string { return this.comment; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn { return { inline: "", outOfLine: [] }; }
        generateInlineParser(): string { return ""; }

        generatePrinter(): string { return ""; }
        generateInlinePrinter(): string { return ""; }
    }
    const CommentSymbolType = "CommentSymbol" as SymemeType;

    export class MultiLineCommentSymbol extends TerminalSymbol {
        type: SymemeType = CommentSymbolType;

        constructor() {
            super();
        }

        comment: string[];

        parse(input: string): Result {
            return new Return({ value: "/* comment */" });
        }
        print(input: any): PrinterReturn { return { inline: "", outOfLine: [] }; }

        printParser(): string { return ""; }
        printInlineParser(): string { return ""; }

        printPrinter(): string { return ""; }
        printInlinePrinter(): string { return ""; }

        generateParser(): GeneratorReturn { return { inline: "", outOfLine: [] }; }
        generateInlineParser(): string { return ""; }

        generatePrinter(): string { return ""; }
        generateInlinePrinter(): string { return ""; }
    }
    const CommentSymbolType = "CommentSymbol" as SymemeType;

    //

    type Type = Identifier;

    export class Parameter {
        identifier: Identifier;
        type: Type;

        constructor(identifier: Identifier, type: Type) {
            this.identifier = identifier;
            this.type = type;
        }
    }

    export class Parameters {
        parameters: Array<Parameter> = [];
        parameterMap: Map<Identifier, Parameter> = new Map<Identifier, Parameter>();

        addParameter(identifier: Identifier, type: Type) {
            this.parameters.push(new Parameter(identifier, type));
            this.parameterMap.set(identifier, new Parameter(identifier, type));
        }

        getParameter(identifier: Identifier): Parameter | null {
            return this.parameterMap.get(identifier) || null;
        }
    }

    //

    class Production {
        name: Identifier;

        parameters: Parameters = new Parameters();

        syneme: Syneme;

        constructor(name: Identifier, syneme: Syneme) {
            this.name = name;
            this.syneme = syneme;
        }
        addParameter(identifier: Identifier, type: Type) {
            this.parameters.addParameter(identifier, type);
        }
        getParameters(): Parameter[] {
            return this.parameters.parameters;
        }

        generateParser():SOOL.Fragment {
          return {
            // ...
          } as SOOL.Fragment;
        }
        generatePrinter(): string { return ""; }

        generateASTstring(base:Identifier): string {
            return "class " + this.name + (base ? (" extends " + base + " ") : "") + "{\n"
                + this.parameters.parameters.map(param => "param.identifier: "+ param.type + ";").join("\n") + "\n\n" +
                + "constructor(" + this.parameters.parameters.map(param => param.identifier + ": " + param.type).join(", ") + ") {\n"
                + this.parameters.parameters.map(param => "this." + param.identifier + " = " + param.identifier).join(";\n") +
                + "\n}";
            + "\n}"
        }
        generateAST(base:Identifier): string {
            return new SOOL.AST.lass(this.name, this.baseClass,
                new SOOL.AST.Constructor(this.parameters)
            );
        }

        generateGenerator():SOOL.Fragment {
          return {
            // ...
          } as SOOL.Fragment;
        }
        generateInlineGenerator(): string { return ""; }
    }
    const nullProduction: Production = new Production("null", new Epsilon());

    class Grammar {
      name: string | null;
      productions: Array<Production> = [];
      productionMap: Map<Identifier, Production> = new Map<Identifier, Production>();

      startSymbol: NonTerminalSymbol | null = null;

      terminalSymbols: Set<TerminalSymbol> = new Set<TerminalSymbol>();
      nonTerminalSymbols: Set<NonTerminalSymbol> = new Set<NonTerminalSymbol>();

      terminalSymbolMap = new Map<Identifier, TerminalSymbol>();
      nonTerminalSymbolMap = new Map<Identifier, NonTerminalSymbol>();

      constructor(name: string | null, startSymbol: NonTerminalSymbol | null = null) {
        this.name = name;
        this.startSymbol = startSymbol;
      }
      setStartSymbol(startSymbol: NonTerminalSymbol | null = null) {
        this.startSymbol = startSymbol;
      }
      getStartSymbol(): NonTerminalSymbol | null {
        return this.startSymbol;
      }
      addProduction(production: Production) {
        this.productions.push(production);
      }
      addTerminalSymbol(identifier: Identifier, symbol: TerminalSymbol) {
        this.terminalSymbols.add(symbol);
        this.terminalSymbolMap.set(identifier, symbol);
      }
      addNonTerminalSymbol(identifier: Identifier, symbol: NonTerminalSymbol) {
        this.nonTerminalSymbols.add(symbol);
        this.nonTerminalSymbolMap.set(identifier, symbol);
      }
      getProduction(name: Identifier): Production | null {
        return this.productionMap.get(name) || null;
      }
      getTerminalSymbol(identifier: Identifier): TerminalSymbol | null {
        return this.terminalSymbolMap.get(identifier) || null;
      }
      getNonTerminalSymbol(identifier: Identifier): NonTerminalSymbol | null {
        return this.nonTerminalSymbolMap.get(identifier) || null;
      }

      parse(input: string): Result {
        return this.startSymbol ? this.startSymbol.parse(input) : false;
      }
      print(input: any): PrinterReturn {
        return this.startSymbol ? this.startSymbol.print(input) : { inline: "", outOfLine: [] };
        const productions = this.productions.map(production => production.generateParser());
          return {
            inline: productions.map(production => production.inline).join("\n"),
            outOfLine: productions.map(production => production.outOfLine)
        };
      }

      generateParser(): Parser {
        const productions = this.productions.map(production => production.generateParser());
        return {
          inline: productions.map(production => production.inline).join("\n"),
          outOfLine: productions.map(production => production.outOfLine).flat()
        };
      }
      generateGenerator(): Generator {
        let generator = new Generator();
        
        return Generator;
      }
      generateAST(): string {
        return this.productions.map(production => production.generateAST(this.name!)).join("\n");
      }

      generatePrinter(): string {
        return this.productions.map(production => production.generatePrinter()).join("\n");
      }

      load(input: Partial<Grammar>): void {
        this.name = input.name || null;
        this.startSymbol = input.startSymbol ? new NonTerminalSymbol(input.startSymbol, nullProduction) : null;

        this.terminalSymbols.clear();
        this.nonTerminalSymbols.clear();
        this.terminalSymbolMap.clear();
        this.nonTerminalSymbolMap.clear();

        input.terminalSymbols.forEach((terminalSymbol:{name:Identifier, type:Identifier}) => {
          this.addTerminalSymbol(terminalSymbol.name, new TerminalSymbol(terminalSymbol.name, terminalSymbol.type));
        });

        input.nonTerminalSymbols.forEach((identifier: Identifier) => {
          const symbol: NonTerminalSymbol = new NonTerminalSymbol(identifier, nullProduction);
          this.addNonTerminalSymbol(identifier, symbol);
        });

        this.productions = input.productions.map((prod: any) => {
          const production = new Production(prod.name, new Epsilon() /* recurse syneme's here */);
          prod.parameters.forEach((param: any) => {
            production.addParameter(param.identifier, param.type);
          });
          return production;
        });

        this.productionMap.clear();
        this.productions.forEach(production => {
          this.productionMap.set(production.name, production);
        });
      }
      save(): any {
        return {
          name: this.name,
          productions: this.productions.map(production => ({
            name: production.name,
            parameters: production.getParameters().map(param => ({
              identifier: param.identifier,
              type: param.type
            })),
            syneme: production.syneme /* recurse syneme's here */
          })),
          startSymbol: this.startSymbol ? this.startSymbol.name : null,
          terminalSymbols: Array.from(this.terminalSymbols),
          nonTerminalSymbols: Array.from(this.nonTerminalSymbols)
        } as Partial<Grammar>;
      }
    } // End class Gammar        
  } // End namespace AST
} // End namespace Syntax
