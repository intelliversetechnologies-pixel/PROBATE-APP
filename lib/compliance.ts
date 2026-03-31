// Compliance rules engine for probate processing

export interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  category: 'kyc' | 'aml' | 'document' | 'estate' | 'beneficiary';
  severity: 'critical' | 'high' | 'medium' | 'low';
  enabled: boolean;
  check: (caseData: any) => Promise<ComplianceCheckResult>;
}

export interface ComplianceCheckResult {
  passed: boolean;
  ruleId: string;
  message: string;
  findings?: string[];
  recommendations?: string[];
  checkedAt: Date;
}

export interface ComplianceReport {
  caseId: string;
  results: ComplianceCheckResult[];
  overallStatus: 'compliant' | 'non-compliant' | 'requires-review';
  criticalIssues: ComplianceCheckResult[];
  completedAt: Date;
  generatedBy: string;
}

// Define compliance rules
export const complianceRules: ComplianceRule[] = [
  {
    id: 'kyc_identity_verification',
    name: 'KYC Identity Verification',
    description: 'Verify identity of next of kin and beneficiaries',
    category: 'kyc',
    severity: 'critical',
    enabled: true,
    check: async (caseData) => {
      // In real implementation, would verify against external KYC database
      const passed = caseData.nextOfKin && caseData.nextOfKin.ninVerified === true;
      return {
        passed,
        ruleId: 'kyc_identity_verification',
        message: passed
          ? 'All identities verified successfully'
          : 'Identity verification pending or failed',
        findings: passed ? [] : ['Next of kin identity not verified'],
        checkedAt: new Date(),
      };
    },
  },

  {
    id: 'aml_sanctions_check',
    description: 'Check against AML/sanctions lists',
    name: 'AML & Sanctions Screening',
    category: 'aml',
    severity: 'critical',
    enabled: true,
    check: async (caseData) => {
      // In real implementation, would check against global AML databases
      const passed = !caseData.flaggedForAML;
      return {
        passed,
        ruleId: 'aml_sanctions_check',
        message: passed
          ? 'No AML/sanctions matches found'
          : 'Potential AML/sanctions match detected',
        findings: passed ? [] : ['Match found in sanctions database'],
        recommendations: passed
          ? []
          : ['Manual review recommended', 'Contact compliance officer'],
        checkedAt: new Date(),
      };
    },
  },

  {
    id: 'document_completeness',
    name: 'Document Completeness',
    description: 'Verify all required documents are provided',
    category: 'document',
    severity: 'high',
    enabled: true,
    check: async (caseData) => {
      const requiredDocs = [
        'death_certificate',
        'will',
        'id_document',
        'nok_id',
      ];
      const uploadedDocs = caseData.uploadedDocuments || [];
      const missingDocs = requiredDocs.filter(
        (doc) => !uploadedDocs.includes(doc)
      );
      const passed = missingDocs.length === 0;

      return {
        passed,
        ruleId: 'document_completeness',
        message: passed
          ? 'All required documents provided'
          : 'Missing required documents',
        findings: missingDocs,
        recommendations: missingDocs.length > 0
          ? [`Upload missing documents: ${missingDocs.join(', ')}`]
          : [],
        checkedAt: new Date(),
      };
    },
  },

  {
    id: 'estate_value_threshold',
    name: 'Estate Value Threshold Check',
    description: 'Verify estate value is within acceptable limits',
    category: 'estate',
    severity: 'medium',
    enabled: true,
    check: async (caseData) => {
      const estateValue = caseData.estate?.estimatedValue || 0;
      const minThreshold = 100000; // Minimum estate value
      const maxThreshold = 999999999; // Maximum estate value

      const passed = estateValue >= minThreshold && estateValue <= maxThreshold;

      return {
        passed,
        ruleId: 'estate_value_threshold',
        message: passed
          ? 'Estate value within acceptable range'
          : 'Estate value outside acceptable threshold',
        findings: passed ? [] : [`Estate value: ₦${estateValue}`],
        recommendations: !passed
          ? ['Review estate valuation', 'Contact probate officer']
          : [],
        checkedAt: new Date(),
      };
    },
  },

  {
    id: 'beneficiary_count',
    name: 'Beneficiary Count Validation',
    description: 'Verify beneficiary count and inheritance percentages',
    category: 'beneficiary',
    severity: 'high',
    enabled: true,
    check: async (caseData) => {
      const beneficiaries = caseData.beneficiaries || [];
      const totalPercentage = beneficiaries.reduce(
        (sum: number, b: any) => sum + (b.percentage || 0),
        0
      );

      const hasMinBeneficiaries = beneficiaries.length >= 1;
      const percentageCorrect = Math.abs(totalPercentage - 100) < 1; // Allow for rounding

      const passed = hasMinBeneficiaries && percentageCorrect;

      return {
        passed,
        ruleId: 'beneficiary_count',
        message: passed
          ? 'Beneficiary distribution is valid'
          : 'Beneficiary distribution invalid',
        findings: !hasMinBeneficiaries
          ? ['No beneficiaries defined']
          : !percentageCorrect
            ? [`Total inheritance percentage: ${totalPercentage}% (should be 100%)`]
            : [],
        recommendations: !percentageCorrect
          ? ['Adjust inheritance percentages to equal 100%']
          : [],
        checkedAt: new Date(),
      };
    },
  },

  {
    id: 'age_verification',
    name: 'Beneficiary Age Verification',
    description: 'Verify all beneficiaries are of legal age',
    category: 'beneficiary',
    severity: 'critical',
    enabled: true,
    check: async (caseData) => {
      const beneficiaries = caseData.beneficiaries || [];
      const underagebeneficiaries = beneficiaries.filter(
        (b: any) => b.age && b.age < 18
      );

      const passed = underagebeneficiaries.length === 0;

      return {
        passed,
        ruleId: 'age_verification',
        message: passed
          ? 'All beneficiaries are of legal age'
          : 'Underage beneficiaries detected',
        findings: underagebeneficiaries.map(
          (b: any) => `${b.name} - Age ${b.age}`
        ),
        recommendations: underagebeneficiaries.length > 0
          ? [
              'Guardian appointment required',
              'Review trust provisions',
              'Contact legal department',
            ]
          : [],
        checkedAt: new Date(),
      };
    },
  },

  {
    id: 'dual_citizenship_check',
    name: 'Dual Citizenship & Residency',
    description: 'Check for citizenship and residency implications',
    category: 'kyc',
    severity: 'high',
    enabled: true,
    check: async (caseData) => {
      const beneficiaries = caseData.beneficiaries || [];
      const nonResidents = beneficiaries.filter(
        (b: any) => b.citizenship && b.citizenship !== 'NG'
      );

      return {
        passed: true, // Always pass but flag for review
        ruleId: 'dual_citizenship_check',
        message:
          nonResidents.length > 0
            ? 'Non-resident beneficiaries detected - requires review'
            : 'All beneficiaries are residents',
        findings: nonResidents.map(
          (b: any) => `${b.name} - Citizenship: ${b.citizenship}`
        ),
        recommendations:
          nonResidents.length > 0
            ? [
                'Verify tax implications',
                'Check exchange control regulations',
                'Review remittance requirements',
              ]
            : [],
        checkedAt: new Date(),
      };
    },
  },
];

export class ComplianceEngine {
  /**
   * Run all compliance checks for a case
   */
  static async runAllChecks(caseData: any): Promise<ComplianceReport> {
    const results: ComplianceCheckResult[] = [];
    const enabledRules = complianceRules.filter((rule) => rule.enabled);

    for (const rule of enabledRules) {
      const result = await rule.check(caseData);
      results.push(result);
    }

    const criticalIssues = results.filter(
      (r) => !r.passed && findRuleBySeverity(r.ruleId) === 'critical'
    );

    const overallStatus: 'compliant' | 'non-compliant' | 'requires-review' =
      criticalIssues.length > 0
        ? 'non-compliant'
        : results.some((r) => !r.passed)
          ? 'requires-review'
          : 'compliant';

    return {
      caseId: caseData.id,
      results,
      overallStatus,
      criticalIssues,
      completedAt: new Date(),
      generatedBy: 'system',
    };
  }

  /**
   * Run specific compliance rules
   */
  static async runRules(
    caseData: any,
    ruleIds: string[]
  ): Promise<ComplianceCheckResult[]> {
    const results: ComplianceCheckResult[] = [];
    const rulesToRun = complianceRules.filter((rule) =>
      ruleIds.includes(rule.id)
    );

    for (const rule of rulesToRun) {
      const result = await rule.check(caseData);
      results.push(result);
    }

    return results;
  }

  /**
   * Get compliance status summary
   */
  static getComplianceSummary(report: ComplianceReport) {
    const total = report.results.length;
    const passed = report.results.filter((r) => r.passed).length;
    const failed = total - passed;

    return {
      total,
      passed,
      failed,
      percentage: (passed / total) * 100,
      status: report.overallStatus,
    };
  }

  /**
   * Get rules by category
   */
  static getRulesByCategory(category: string): ComplianceRule[] {
    return complianceRules.filter((rule) => rule.category === category);
  }
}

function findRuleBySeverity(ruleId: string): string {
  const rule = complianceRules.find((r) => r.id === ruleId);
  return rule?.severity || 'low';
}
