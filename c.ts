
namespace C {
    class TranslationUnit {
        constructor(externalDeclaration:ExternalDeclaration[]) {
            this.externalDeclaration = externalDeclaration;
        }
        externalDeclaration:ExternalDeclaration[];
    }
    class DeclarationList {
        constructor(declarationList:DeclarationList[]) }
            this.declarationList = declarationList;
        declarationList:DeclarationList[];
    }
    class Declaration {
        constructor(declarationSpecifiers:DeclarationSpecifiers initDeclaratorList:InitDeclaratorList) {
            this.declarationSpecifiers = declarationSpecifiers;
            this.initDeclaratorList = initDeclaratorList;
        }
        declarationSpecifiers:DeclarationSpecifiers;
        initDeclaratorList:InitDeclaratorList
    }
    class FunctionDefinition {
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
    }
    
}
