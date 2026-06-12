
namespace C {
  interface Visitable {
    accept(visitor:Visitor, context:Context):void;
  }
  class Context {}

  class TranslationUnit implements Visitable {
    constructor(externalDeclaration:ExternalDeclaration[]) {
      this.externalDeclaration = externalDeclaration;
    }
    externalDeclaration:ExternalDeclaration[];

    accept(visitor:Visitor, context:Context):void {
      visitor.visitTranslationUnit(this, context);
    }
  }
  class DeclarationList implements Visitable {
    constructor(declarationList:DeclarationList[]) }
      this.declarationList = declarationList;
    declarationList:DeclarationList[];

    accept(visitor:Visitor, context:Context):void {
      visitor.visitDeclarationList(this, context);
    }
  }
  class Declaration implements Visitable {
    constructor(declarationSpecifiers:DeclarationSpecifiers initDeclaratorList:InitDeclaratorList) {
      this.declarationSpecifiers = declarationSpecifiers;
      this.initDeclaratorList = initDeclaratorList;
    }
    declarationSpecifiers:DeclarationSpecifiers;
    initDeclaratorList:InitDeclaratorList

    accept(visitor:Visitor, context:Context):void {
      visitor.visitDeclaration(this, context);
    }
  }
  class FunctionDefinition implements Visitable {
    constructor(declarationSpecifiers:DeclarationSpecifiers, declarator:Declarator, compoundStatement:CompoundStatement, declarationList?:DeclarationList) {
      this.declarationSpecifiers = declarationSpecifiers;
      this.declarator = declarator;
      this.declarationList = declarationList;
      this.compoundStatement = compoundStatement;
    }
    declarationSpecifiers:DeclarationSpecifiers;
    declarator:Declarator;
    compoundStatement:CompoundStatement;
    declarationList?:DeclarationList;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitFunctionDefinition(this, context);
    }
  }

  //

  class InitDeclaratorList {
    constructor(initDeclaratorList:Declarator[]) {
      this.initDeclaratorList = initDeclaratorList;
    }
    initDeclaratorList:Declarator[];

    accept(visitor:Visitor, context:Context):void {
      visitor.visitInitDeclaratorList(this, context);
    }
  }

  class InitDeclarator {
    constructor(declarator:Declarator, initializer?:Initializer) {
      this.declarator = declarator;
      this.initializer = initializer;
    }
    declarator:Declarator;
    initializer?:Initializer;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitInitDeclarator(this, context);
    }
  }

  enum StorageClassSpecifier {
    _typedef,
    _extern,
    _static,
    _auto,
    _register,
  }

  class StructOrUnionSpecifier {
    constructor(identifier?:Identifier, structDeclarationList?:StructDeclarationList) {
      this.identifier = identifier;
      this.structDeclarationList = structDeclarationList;
    }
    identifier?:Identifier;
    structDeclarationList?:StructDeclarationList;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitStructOrUnionSpecifier(this, context);
    }
  }

  enum structOrUnion {
    _struct,
    _union
  }

  class StructDeclarationList {
    constructor(structDeclaration:StructDeclaration[]) {
      this.structDeclaration = structDeclaration;
    }
    structDeclaration:StructDeclaration[];

    accept(visitor:Visitor, context:Context):void {
      visitor.visitStructDeclaration(this, context);
    }
  }

(6.7.2.1) struct-declaration:
specifier-qualifier-list struct-declarator-list

  class IfStatement extends Statement {
    constructor(_if:BooleanExpression, _then:Statement, _else:Statement) {
      this._if = _if;
      this._then = _then;
      this._else = _else;

    _if:BooleanExpression;
    _then:Statement;
    _else:Statement;

    accept(visitor:Visitor, context:Context):void {
      visitor->visitIfStatement(this, context);
    }
  }
  class SwitchStatement extends Statement {
    constructor(expression:Expression, cases:SwitchCases, _default:CompoundStatement) {
      
    }
  }

  //

  class MultiplyExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitMultiplyExpression(this, context)
    }
  }

  class DivideExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitDivideExpression(this, context)
    }
  }
  class ModuloExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitModuloExpression(this, context)
    }
  }
  class PlusExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitPlusExpression(this, context)
    }
  }
  class MinusExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitMinusExpression(this, context)
    }
  }
  class ShiftLeftExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitShiftLeftExpression(this, context)
    }
  }
  class ShiftRightExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitShiftRightExpression(this, context)
    }
  }
  class RotateLeftExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitRotateLeftExpression(this, context)
    }
  }
  class RotateRightExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitRotateRightExpression(this, context)
    }
  }
  class LessThanExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitLessThanExpression(this, context)
    }
  }
  class GreaterThanExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitGreaterThanExpression(this, context)
    }
  }
  class LessThanOrEqualsExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitLessThanOrEqualsExpression(this, context)
    }
  }
  class GreaterThanOrEqualsExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitGreaterThanOrEqualsExpression(this, context)
    }
  }
  class EqualsExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitEqualsExpression(this, context)
    }
  }
  class NotEqualsExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitNotEqualsExpression(this, context)
    }
  }
  class AndExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitAndExpression(this, context)
    }
  }
  class ExclusiveOrExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitExclusiveOrExpression(this, context)
    }
  }
  class InclusiveOrExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitInclusiveOrExpression(this, context)
    }
  }
  class LogicalAndExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitLogicalAndExpression(this, context)
    }
  }
  class LogicalExclusiveOrExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitLogicalExclusiveOrExpression(this, context)
    }
  }
  class LogicalInclusiveOrExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitLogicalInclusiveOrExpression(this, context)
    }
  }

  class PlusAssignExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitPlusAssignExpression(this, context)
    }
  }
  class MinusAssignExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitMinusAssignExpression(this, context)
    }
  }
  class MultiplyAssignExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitMultiplyAssignExpression(this, context)
    }
  }
  class DivideAssignExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitDivideAssignExpression(this, context)
    }
  }
  class ModuloAssignExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitModuloAssignExpression(this, context)
    }
  }
  class ShiftLeftAssignExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitShiftLeftAssignExpression(this, context)
    }
  }
  class ShiftRightAssignExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitShiftRightAssignExpression(this, context)
    }
  }
  class RotateLeftAssignExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitRotateLeftAssignExpression(this, context)
    }
  }
  class RotateRightAssignExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitRotateRightAssignExpression(this, context)
    }
  }
  class AndAssignExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitAndAssignExpression(this, context)
    }
  }
  class ExclusiveOrAssignExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitExclusiveOrAssignExpression(this, context)
    }
  }
  class InclusiveOrAssignExpression extends Expression {
    constructor(lhs:Expression, rhs:Expression) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
    lhs:Expression;
    rhs:Expression;

    accept(visitor:Visitor, context:Context):void {
      visitor.visitInclusiveOrAssignExpression(this, context)
    }
  }


  //

  class GeneratorContext {
    output:string[];

    emit(output:string):void {
        this.output.push(output);
        this.output.push(" ");
    }
    newline():void {
        if (this.output[this.output.length - 1] == " ")
            this.output.pop();
        this.output.push("\n");
    }
    generate():string {
        return this.output.join("");
    }
  }
  enum TokenType {};
  class Token {
      type:TokenType;
      value:any;
  }
  const TokenTypes = {
      "newline": function(token:Token) { return "\n"; },
      // ...
  }
  const tokenSeparator:Matrix<Token, Token, Token> = { "newline": { "newline": false }};

  class GeneratorContext {
    output:Token[];

    end():Token {
      return this.output[this.output.length - 1];
    }
    emit(token:Token):void {
      const separator = this.tokenSeparator[token.type][this.end().type];
      if (separator)
        this.output.push(separator);

      this.output.push(output);
    }
    outputToken(token:Token):string {
      return TokenTypes[token.type](token);
    }
    generate():string {
      return this.output.map(this.outputToken);
    }
  }

  class Generator extends Visitor {
    visitTranslationUnit(translationUnit:TranslationUnit, context:Context):void {

    }
    visitDeclarationList(declarationList:DeclarationList):void {

    }
    visitDeclaration(declaration:Declaration):void {

    }
    visitFunctionDefinition(functionDefinition:FunctionDefinition:void) {

    }
  }

  //

  enum Precedence {
    PRECEDENCE_NOT,
    PRECEDENCE_LOGICAL_INCLUSIVE_OR,
    PRECEDENCE_LOGICAL_EXCLUSIVE_OR,
    PRECEDENCE_LOGICAL_AND,
    PRECEDENCE_INCLUSIVE_OR,
    PRECEDENCE_EXCLUSIVE_OR,
    PRECEDENCE_AND,
    PRECEDENCE_EQUALITY_EXPRESSION,
    PRECEDENCE_RELATIONAL_EXPRESSION,
    PRECEDENCE_SHIFT_EXPRESSION,
    PRECEDENCE_ADDITIVE_EXPRESSION,
    PRECEDENCE_MULTIPLICATIVE_EXPRESSION
  };


  abstract class Visitor<context:Context = {}> {
    abstract visitTranslationUnit(visitor:TranslationUnit, context:Context):void;
    abstract visitDeclarationList(visitor:DeclarationList):void;
    abstract visitDeclaration(visitor:Declaration):void;
    abstract visitFunctionDefinition(visitor:FunctionDefinition):void;

    abstract visitMultiplyExpression(visitor:MultiplyExpression, ctx:number):void;
    abstract visitDivideExpression(visitor:DivideExpression, ctx:number):void;
    abstract visitModuloExpression(visitor:ModuloExpression, ctx:number):void;
    abstract visitPlusExpression(visitor:PlusExpression, ctx:number):void;
    abstract visitMinusExpression(visitor:MinusExpression, ctx:number):void;
    abstract visitShiftLeftExpression(visitor:ShiftLeftExpression, ctx:number):void;
    abstract visitShiftRightExpression(visitor:ShiftRightExpression, ctx:number):void;
    abstract visitRotateLeftExpression(visitor:RotateLeftExpression, ctx:number):void;
    abstract visitRotateRightExpression(visitor:RotateRightExpression, ctx:number):void;
    abstract visitLessThanExpression(visitor:LessThanExpression, ctx:number):void;
    abstract visitGreaterThanExpression(visitor:GreaterThanExpression, ctx:number):void;
    abstract visitLessThanOrEqualsExpression(visitor:LessThanOrEqualsExpression, ctx:number):void;
    abstract visitGreaterThanOrEqualsExpression(visitor:GreaterThanOrEqualsExpression, ctx:number):void;
    abstract visitEqualsExpression(visitor:EqualsExpression, ctx:number):void;
    abstract visitNotEqualsExpression(visitor:NotEqualsExpression, ctx:number):void;
    abstract visitAndExpression(visitor:AndExpression, ctx:number):void;
    abstract visitExclusiveOrExpression(visitor:ExclusiveOrExpression, ctx:number):void;
    abstract visitInclusiveOrExpression(visitor:InclusiveOrExpression, ctx:number):void;
    abstract visitLogicalAndExpression(visitor:LogicalAndExpression, ctx:number):void;
    abstract visitLogicalExclusiveOrExpression(visitor:LogicalExclusiveOrExpression, ctx:number):void;
    abstract visitLogicalInclusiveOrExpression(visitor:LogicalInclusiveOrExpression, ctx:number):void;

    abstract visitPlusAssignExpression(visitor:PlusAssignExpression, ctx:number):void;
    abstract visitMinusAssignExpression(visitor:MinusAssignExpression, ctx:number):void;
    abstract visitMultiplyAssignExpression(visitor:MultiplyAssignExpression, ctx:number):void;
    abstract visitDivideAssignExpression(visitor:DivideAssignExpression, ctx:number):void;
    abstract visitModuloAssignExpression(visitor:ModuloAssignExpression, ctx:number):void;
    abstract visitShiftLeftAssignExpression(visitor:ShiftLeftAssignExpression, ctx:number):void;
    abstract visitShiftRightAssignExpression(visitor:ShiftRightAssignExpression, ctx:number):void;
    abstract visitRotateLeftAssignExpression(visitor:RotateLeftAssignExpression, ctx:number):void;
    abstract visitRotateRightAssignExpression(visitor:RotateRightAssignExpression, ctx:number):void;
    abstract visitAndAssignExpression(visitor:AndAssignExpression, ctx:number):void;
    abstract visitExclusiveOrAssignExpression(visitor:ExclusiveOrAssignExpression, ctx:number):void;
    abstract visitInclusiveOrAssignExpression(visitor:InclusiveOrAssignExpression, ctx:number):void;
  }

  class CCodeGenVisitor extends Visitor {
    public:
    CCodeGenVisitor(context:Context){
        this.context = context;
        this.O = O;
    }
    protected:
    context:Context;
    O:string;

    makeBinaryOperator(node:BinaryExpression, op: string, prec: number, ctx: number):void {
      const bracket:boolean = ctx >= prec;
      if (bracket) O += '(';
      node.left.accept(this, prec);
      O += " " + op + " ";
      node.right.accept(this, prec);
      if (bracket) O += ')';
    }

    makeAssignmentOperator(node:AssignmentExpression, op:string):void {
      node->lhs->accept(this, Context());
      O += " " + op + " ";
      node->rhs->accept(this, Context());
    }

    public:
    // Expressions

    visitPlusExpression(visitor:PlusExpression, ctx:number):void {
      makeBinaryOperator(visitor, "+", PRECEDENCE_ADDITIVE_EXPRESSION, ctx);
    }
    visitMinusExpression(visitor:MinusExpression, ctx:number) {
      makeBinaryOperator(visitor, "-", PRECEDENCE_ADDITIVE_EXPRESSION, ctx);
    }
    visitMultiplyExpression(visitor:MultiplyExpression, ctx:number) {
      makeBinaryOperator(visitor, "*", PRECEDENCE_MULTIPLICATIVE_EXPRESSION, ctx);
    }
    visitDivideExpression(visitor:DivideExpression, ctx:number) {
      makeBinaryOperator(visitor, "/", PRECEDENCE_MULTIPLICATIVE_EXPRESSION, ctx);
    }
    visitModuloExpression(visitor:ModuloExpression, ctx:number) {
      makeBinaryOperator(visitor, "%", PRECEDENCE_MULTIPLICATIVE_EXPRESSION, ctx);
    }
    visitShiftLeftExpression(visitor:ShiftLeftExpression, ctx:number) {
      makeBinaryOperator(visitor, "<<", PRECEDENCE_SHIFT_EXPRESSION, ctx);
    }
    visitShiftRightExpression(visitor:ShiftRightExpression, ctx:number) {
      makeBinaryOperator(visitor, ">>", PRECEDENCE_SHIFT_EXPRESSION, ctx);
    }
    visitRotateLeftExpression(visitor:RotateLeftExpression, ctx:number) {
      context.error("'><<' not supported in C");
      makeBinaryOperator(visitor, "><<", PRECEDENCE_SHIFT_EXPRESSION, ctx);
    }
    visitRotateRightExpression(visitor:RotateRightExpression, ctx:number) {
      context.error("'>><' not supported in C");
      makeBinaryOperator(visitor, ">><", PRECEDENCE_SHIFT_EXPRESSION, ctx);
    }
    visitLessThanExpression(visitor:LessThanExpression, ctx:number) {
      makeBinaryOperator(visitor, "<", PRECEDENCE_RELATIONAL_EXPRESSION, ctx);
    }
    visitGreaterThanExpression(visitor:GreaterThanExpression, ctx:number) {
      makeBinaryOperator(visitor, ">", PRECEDENCE_RELATIONAL_EXPRESSION, ctx);
    }
    visitLessThanOrEqualsExpression(visitor:LessThanOrEqualsExpression, ctx:number) {
      makeBinaryOperator(visitor, "<=", PRECEDENCE_RELATIONAL_EXPRESSION, ctx);
    }
    visitGreaterThanOrEqualsExpression(visitor:GreaterThanOrEqualsExpression, ctx:number) {
      makeBinaryOperator(visitor, ">=", PRECEDENCE_RELATIONAL_EXPRESSION, ctx);
    }
    visitEqualsExpression(visitor:EqualsExpression, ctx:number) {
      makeBinaryOperator(visitor, "==", PRECEDENCE_EQUALITY_EXPRESSION, ctx);
    }
    visitNotEqualsExpression(visitor:NotEqualsExpression, ctx:number) {
      makeBinaryOperator(visitor, "!=", PRECEDENCE_EQUALITY_EXPRESSION, ctx);
    }
    visitAndExpression(visitor:AndExpression, ctx:number) {
      makeBinaryOperator(visitor, "&", PRECEDENCE_AND, ctx);
    }
    visitExclusiveOrExpression(visitor:ExclusiveOrExpression, ctx:number) {
      makeBinaryOperator(visitor, "^", PRECEDENCE_EXCLUSIVE_OR, ctx);
    }
    visitInclusiveOrExpression(visitor:InclusiveOrExpression, ctx:number) {
      makeBinaryOperator(visitor, "|", PRECEDENCE_INCLUSIVE_OR, ctx);
    }
    visitLogicalAndExpression(visitor:LogicalAndExpression, ctx:number) {
      makeBinaryOperator(visitor, "&&", PRECEDENCE_LOGICAL_AND, ctx);
    }
    visitLogicalExclusiveOrExpression(visitor:LogicalExclusiveOrExpression, ctx:number) {
      makeBinaryOperator(visitor, "^^", PRECEDENCE_LOGICAL_EXCLUSIVE_OR, ctx);
    }
    visitLogicalInclusiveOrExpression(visitor:LogicalInclusiveOrExpression, ctx:number) {
      makeBinaryOperator(visitor, "||", PRECEDENCE_LOGICAL_INCLUSIVE_OR, ctx);
    }

    visitPlusAssignExpression(visitor:PlusAssignExpression, ctx:number) {
      makeAssignmentOperator(visitor, "+=");
    }
    visitMinusAssignExpression(visitor:MinusAssignExpression, ctx:number) {
      makeAssignmentOperator(visitor, "-=");
    }
    visitMultiplyAssignExpression(visitor:MultiplyAssignExpression, ctx:number) {
      makeAssignmentOperator(visitor, "*=");
    }
    visitDivideAssignExpression(visitor:DivideAssignExpression, ctx:number) {
      makeAssignmentOperator(visitor, "/=");
    }
    visitModuloAssignExpression(visitor:ModuloAssignExpression, ctx:number) {
      makeAssignmentOperator(visitor, "%=");
    }
    visitShiftLeftAssignExpression(visitor:ShiftLeftAssignExpression, ctx:number) {
      makeAssignmentOperator(visitor, "<<=");
    }
    visitShiftRightAssignExpression(visitor:ShiftRightAssignExpression, ctx:number) {
      makeAssignmentOperator(visitor, ">>=");
    }
    visitRotateLeftAssignExpression(visitor:RotateLeftAssignExpression, ctx:number) {
      context.error("'><<=' not supported in C");
    }
    visitRotateRightAssignExpression(visitor:RotateRightAssignExpression, ctx:number) {
      context.error("'>><=' not supported in C");
    }
    visitAndAssignExpression(visitor:AndAssignExpression, ctx:number) {
      makeAssignmentOperator(visitor, "&=");
    }
    visitExclusiveOrAssignExpression(visitor:ExclusiveOrAssignExpression, ctx:number) {
      makeAssignmentOperator(visitor, "^=");
    }
    visitInclusiveOrAssignExpression(visitor:InclusiveOrAssignExpression, ctx:number) {
      makeAssignmentOperator(visitor, "|=");
    }
  }
}
