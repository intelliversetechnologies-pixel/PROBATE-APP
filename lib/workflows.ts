// Workflow state machine for probate case management

export type CaseStatus = 
  | 'draft' 
  | 'submitted' 
  | 'document_review' 
  | 'kyc_verification' 
  | 'compliance_check' 
  | 'approval_pending' 
  | 'approved' 
  | 'completed' 
  | 'rejected' 
  | 'on_hold';

export interface WorkflowTransition {
  from: CaseStatus;
  to: CaseStatus;
  condition?: (caseData: any) => boolean;
  action?: (caseData: any) => Promise<void>;
}

export interface WorkflowStage {
  id: string;
  name: string;
  status: CaseStatus;
  order: number;
  requiredDocuments: string[];
  approvals: string[];
  estimatedDaysToComplete: number;
}

// Define workflow stages
export const workflowStages: WorkflowStage[] = [
  {
    id: 'initial_submission',
    name: 'Initial Submission',
    status: 'submitted',
    order: 1,
    requiredDocuments: ['death_certificate', 'nok_id'],
    approvals: ['system_validation'],
    estimatedDaysToComplete: 1,
  },
  {
    id: 'document_review',
    name: 'Document Review',
    status: 'document_review',
    order: 2,
    requiredDocuments: ['death_certificate', 'will', 'bank_statements'],
    approvals: ['officer_review'],
    estimatedDaysToComplete: 5,
  },
  {
    id: 'kyc_stage',
    name: 'KYC Verification',
    status: 'kyc_verification',
    order: 3,
    requiredDocuments: ['nok_id', 'nok_nin', 'beneficiary_ids'],
    approvals: ['kyc_officer'],
    estimatedDaysToComplete: 3,
  },
  {
    id: 'compliance_stage',
    name: 'Compliance Check',
    status: 'compliance_check',
    order: 4,
    requiredDocuments: [],
    approvals: ['compliance_officer'],
    estimatedDaysToComplete: 2,
  },
  {
    id: 'final_approval',
    name: 'Final Approval',
    status: 'approval_pending',
    order: 5,
    requiredDocuments: [],
    approvals: ['director_approval'],
    estimatedDaysToComplete: 2,
  },
  {
    id: 'completion',
    name: 'Completion',
    status: 'completed',
    order: 6,
    requiredDocuments: [],
    approvals: [],
    estimatedDaysToComplete: 1,
  },
];

// Allowed state transitions
export const allowedTransitions: WorkflowTransition[] = [
  // From draft
  { from: 'draft', to: 'submitted' },

  // From submitted
  { from: 'submitted', to: 'document_review' },
  { from: 'submitted', to: 'rejected' },

  // From document_review
  { from: 'document_review', to: 'kyc_verification' },
  { from: 'document_review', to: 'rejected' },
  { from: 'document_review', to: 'on_hold' },

  // From kyc_verification
  { from: 'kyc_verification', to: 'compliance_check' },
  { from: 'kyc_verification', to: 'rejected' },
  { from: 'kyc_verification', to: 'on_hold' },

  // From compliance_check
  { from: 'compliance_check', to: 'approval_pending' },
  { from: 'compliance_check', to: 'rejected' },
  { from: 'compliance_check', to: 'on_hold' },

  // From approval_pending
  { from: 'approval_pending', to: 'approved' },
  { from: 'approval_pending', to: 'rejected' },
  { from: 'approval_pending', to: 'on_hold' },

  // From approved
  { from: 'approved', to: 'completed' },
  { from: 'approved', to: 'on_hold' },

  // From on_hold (can transition back or forward)
  { from: 'on_hold', to: 'document_review' },
  { from: 'on_hold', to: 'kyc_verification' },
  { from: 'on_hold', to: 'compliance_check' },
  { from: 'on_hold', to: 'approval_pending' },
  { from: 'on_hold', to: 'rejected' },
];

export class WorkflowEngine {
  /**
   * Check if a transition is allowed
   */
  static canTransition(from: CaseStatus, to: CaseStatus): boolean {
    return allowedTransitions.some(
      (t) => t.from === from && t.to === to
    );
  }

  /**
   * Get next possible states from current state
   */
  static getNextStates(currentStatus: CaseStatus): CaseStatus[] {
    return allowedTransitions
      .filter((t) => t.from === currentStatus)
      .map((t) => t.to);
  }

  /**
   * Get workflow stage by status
   */
  static getStageByStatus(status: CaseStatus): WorkflowStage | undefined {
    return workflowStages.find((s) => s.status === status);
  }

  /**
   * Get all workflow stages
   */
  static getAllStages(): WorkflowStage[] {
    return workflowStages;
  }

  /**
   * Get current stage progress (0-100)
   */
  static getProgressPercentage(status: CaseStatus): number {
    const stage = workflowStages.find((s) => s.status === status);
    if (!stage) return 0;
    return (stage.order / workflowStages.length) * 100;
  }

  /**
   * Get next stage
   */
  static getNextStage(currentStatus: CaseStatus): WorkflowStage | undefined {
    const currentStage = workflowStages.find((s) => s.status === currentStatus);
    if (!currentStage) return undefined;
    return workflowStages.find((s) => s.order === currentStage.order + 1);
  }

  /**
   * Validate if all required documents are uploaded
   */
  static validateRequiredDocuments(
    status: CaseStatus,
    uploadedDocuments: string[]
  ): { valid: boolean; missingDocuments: string[] } {
    const stage = workflowStages.find((s) => s.status === status);
    if (!stage) return { valid: true, missingDocuments: [] };

    const missingDocuments = stage.requiredDocuments.filter(
      (doc) => !uploadedDocuments.includes(doc)
    );

    return {
      valid: missingDocuments.length === 0,
      missingDocuments,
    };
  }

  /**
   * Check if all approvals for a stage are complete
   */
  static validateApprovalsComplete(
    status: CaseStatus,
    completedApprovals: string[]
  ): { valid: boolean; pendingApprovals: string[] } {
    const stage = workflowStages.find((s) => s.status === status);
    if (!stage) return { valid: true, pendingApprovals: [] };

    const pendingApprovals = stage.approvals.filter(
      (approval) => !completedApprovals.includes(approval)
    );

    return {
      valid: pendingApprovals.length === 0,
      pendingApprovals,
    };
  }
}

// Approval workflow management
export interface ApprovalStep {
  id: string;
  caseId: string;
  step: number;
  approverRole: string;
  approverEmail?: string;
  status: 'pending' | 'approved' | 'rejected';
  otpRequired: boolean;
  otp?: string;
  comments?: string;
  createdAt: Date;
  completedAt?: Date;
}

export class ApprovalWorkflow {
  /**
   * Create approval steps for a case
   */
  static createApprovalSteps(caseId: string, approvalRoles: string[]): ApprovalStep[] {
    return approvalRoles.map((role, index) => ({
      id: `${caseId}-approval-${index}`,
      caseId,
      step: index + 1,
      approverRole: role,
      status: 'pending',
      otpRequired: true,
      createdAt: new Date(),
    }));
  }

  /**
   * Move to next approval step
   */
  static moveToNextStep(steps: ApprovalStep[]): ApprovalStep | null {
    const currentStep = steps.find((s) => s.status === 'pending');
    return currentStep || null;
  }

  /**
   * Complete approval with OTP verification
   */
  static async completeApproval(
    step: ApprovalStep,
    otp: string,
    comments?: string
  ): Promise<ApprovalStep> {
    // In real implementation, verify OTP against database
    return {
      ...step,
      status: 'approved',
      otp,
      comments,
      completedAt: new Date(),
    };
  }

  /**
   * Get approval progress
   */
  static getApprovalProgress(steps: ApprovalStep[]): number {
    const completed = steps.filter(
      (s) => s.status === 'approved' || s.status === 'rejected'
    ).length;
    return (completed / steps.length) * 100;
  }

  /**
   * Check if all approvals are complete
   */
  static allApprovalsComplete(steps: ApprovalStep[]): boolean {
    return steps.every((s) => s.status !== 'pending');
  }
}
