import { FuzzyRule } from '../../../utils/yuka/fuzzy/FuzzyRule.js';
import { FuzzyAND } from '../../../utils/yuka/fuzzy/operators/FuzzyAND.js';
import { FuzzyOR } from '../../../utils/yuka/fuzzy/operators/FuzzyOR.js';
import Parse from '../utils/parser/Parse';

var BuildFuzzyRule = function (ruleInput, fuzzySets) {
    var ruleJson = Parse(ruleInput);
    var antecedent = BuildFuzzyCompositeTerm(ruleJson[1], fuzzySets);
    var consequence = fuzzySets[ruleJson[2]];
    var rule = new FuzzyRule(antecedent, consequence);
    return rule;
}

var BuildFuzzyCompositeTerm = function (compositeTerm, fuzzySets) {
    // compositeTerm: undefined, string, or array
    if (!compositeTerm) {
        return null;
    } else if (typeof (compositeTerm) === 'string') {
        return fuzzySets[compositeTerm];
    }

    // Array
    var op0 = BuildFuzzyCompositeTerm(compositeTerm[1], fuzzySets);
    var op1 = BuildFuzzyCompositeTerm(compositeTerm[2], fuzzySets);
    var result;
    switch (compositeTerm[0]) {
        case 'and': result = new FuzzyAND(op0, op1); break;
        case 'or': result = new FuzzyOR(op0, op1); break;
    }
    return result;
}

export default BuildFuzzyRule;