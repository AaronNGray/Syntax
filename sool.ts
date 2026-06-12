//
//  sool.ts - SOOL AST and make<T> functions
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
    make<T extends SOOL.AST.Node>(Contructor: new () => T):T {
        return new Contructor();
    }
  } // End Namespace AST

  class SOOLWriter {
    constructor() {}

    imports:Import[]
    preface:SOOL.Fragment[]; // ??? Fragment ???
    body:Construct[];
    postface:SOOL.Fragment[];

  }
} // End namespace SOOL
