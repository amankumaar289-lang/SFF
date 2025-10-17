import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation } from 'wouter';
import { insertGeneratedPolicySchema, insertOrganizationSchema } from '@shared/schema';
import type { Organization, PolicySection } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Select Organization', description: 'Choose or create an organization' },
  { id: 2, title: 'Review Sections', description: 'Applicable policy sections' },
  { id: 3, title: 'Select Sections', description: 'Choose which sections to include' },
  { id: 4, title: 'Preview & Generate', description: 'Review and create policy' },
];

type WizardState = {
  organizationId: number | null;
  selectedSections: number[];
  isNewOrganization: boolean;
};

const organizationFormSchema = insertOrganizationSchema.extend({
  name: z.string().min(1, 'Organization name is required'),
  inn: z.string().min(1, 'INN is required'),
  kpp: z.string().min(1, 'KPP is required'),
  accountingType: z.enum(['budget', 'accounting']),
  centralizedOffice: z.string().min(1, 'Centralized office is required'),
});

export default function Wizard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardState, setWizardState] = useState<WizardState>({
    organizationId: null,
    selectedSections: [],
    isNewOrganization: false,
  });

  const { data: organizations = [], isLoading: loadingOrgs } = useQuery<Organization[]>({
    queryKey: ['/api/organizations'],
  });

  const selectedOrg = organizations.find(org => org.id === wizardState.organizationId);

  const { data: allSections = [], isLoading: loadingSections } = useQuery<PolicySection[]>({
    queryKey: ['/api/policy-sections', selectedOrg?.accountingType, selectedOrg?.industry],
    enabled: !!selectedOrg,
  });

  const applicableSections = allSections.filter(section => {
    if (!selectedOrg) return false;
    
    const matchesAccountingType = 
      (selectedOrg.accountingType === 'budget' && section.budgetAccounting) ||
      (selectedOrg.accountingType === 'accounting' && section.businessAccounting);
    
    if (!section.industrySpecific) {
      return matchesAccountingType;
    }
    
    return matchesAccountingType && 
           section.industries?.includes(selectedOrg.industry || '') || false;
  });

  const selectedSectionDetails = applicableSections.filter(s => 
    wizardState.selectedSections.includes(s.id)
  );

  const orgForm = useForm<z.infer<typeof organizationFormSchema>>({
    resolver: zodResolver(organizationFormSchema),
    defaultValues: {
      name: '',
      inn: '',
      kpp: '',
      accountingType: 'accounting',
      industry: '',
      centralizedOffice: '',
    },
  });

  const createOrgMutation = useMutation({
    mutationFn: (data: z.infer<typeof organizationFormSchema>) =>
      apiRequest('/api/organizations', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (newOrg: Organization) => {
      queryClient.invalidateQueries({ queryKey: ['/api/organizations'] });
      setWizardState(prev => ({ ...prev, organizationId: newOrg.id, isNewOrganization: false }));
      setCurrentStep(2);
      toast({ title: 'Success', description: 'Organization created successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create organization', variant: 'destructive' });
    },
  });

  const createPolicyMutation = useMutation({
    mutationFn: (data: { organizationId: number; selectedSections: number[] }) =>
      apiRequest('/api/generated-policies', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          generatedDate: new Date().toISOString().split('T')[0],
          status: 'draft',
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/generated-policies'] });
      toast({ 
        title: 'Success!', 
        description: 'Policy generated successfully' 
      });
      setTimeout(() => setLocation('/policies'), 1500);
    },
    onError: () => {
      toast({ 
        title: 'Error', 
        description: 'Failed to generate policy', 
        variant: 'destructive' 
      });
    },
  });

  const handleNext = () => {
    if (currentStep === 1) {
      if (wizardState.isNewOrganization) {
        orgForm.handleSubmit((data) => createOrgMutation.mutate(data))();
      } else if (wizardState.organizationId) {
        setCurrentStep(2);
      } else {
        toast({ 
          title: 'Required', 
          description: 'Please select or create an organization', 
          variant: 'destructive' 
        });
      }
    } else if (currentStep === 2) {
      setWizardState(prev => ({ ...prev, selectedSections: applicableSections.map(s => s.id) }));
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (wizardState.selectedSections.length === 0) {
        toast({ 
          title: 'Required', 
          description: 'Please select at least one section', 
          variant: 'destructive' 
        });
      } else {
        setCurrentStep(4);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (wizardState.organizationId && wizardState.selectedSections.length > 0) {
      createPolicyMutation.mutate({
        organizationId: wizardState.organizationId,
        selectedSections: wizardState.selectedSections,
      });
    }
  };

  const toggleSection = (sectionId: number) => {
    setWizardState(prev => ({
      ...prev,
      selectedSections: prev.selectedSections.includes(sectionId)
        ? prev.selectedSections.filter(id => id !== sectionId)
        : [...prev.selectedSections, sectionId],
    }));
  };

  const progressValue = (currentStep / STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4" data-testid="text-wizard-title">
          Generate Accounting Policy
        </h1>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground" data-testid="text-step-indicator">
            <span>Step {currentStep} of {STEPS.length}</span>
            <span>{STEPS[currentStep - 1].title}</span>
          </div>
          <Progress value={progressValue} data-testid="progress-wizard" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle data-testid="text-step-title">{STEPS[currentStep - 1].title}</CardTitle>
          <CardDescription data-testid="text-step-description">
            {STEPS[currentStep - 1].description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Choose an option
                  </label>
                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant={!wizardState.isNewOrganization ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setWizardState(prev => ({ ...prev, isNewOrganization: false }))}
                      data-testid="button-select-existing"
                    >
                      Select Existing Organization
                    </Button>
                    <Button
                      type="button"
                      variant={wizardState.isNewOrganization ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setWizardState(prev => ({ ...prev, isNewOrganization: true, organizationId: null }))}
                      data-testid="button-create-new"
                    >
                      Create New Organization
                    </Button>
                  </div>
                </div>

                {!wizardState.isNewOrganization ? (
                  <div>
                    <label htmlFor="org-select" className="text-sm font-medium mb-2 block">
                      Select Organization
                    </label>
                    {loadingOrgs ? (
                      <div className="text-sm text-muted-foreground" data-testid="text-loading">Loading organizations...</div>
                    ) : (
                      <Select
                        id="org-select"
                        value={wizardState.organizationId?.toString() || ''}
                        onChange={(e) => setWizardState(prev => ({ 
                          ...prev, 
                          organizationId: e.target.value ? parseInt(e.target.value) : null 
                        }))}
                        data-testid="select-organization"
                      >
                        <SelectItem value="">Select an organization</SelectItem>
                        {organizations.map(org => (
                          <SelectItem key={org.id} value={org.id.toString()} data-testid={`option-org-${org.id}`}>
                            {org.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  </div>
                ) : (
                  <Form {...orgForm}>
                    <form className="space-y-4">
                      <FormField
                        control={orgForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Organization Name</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-org-name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={orgForm.control}
                        name="inn"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>INN</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-inn" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={orgForm.control}
                        name="kpp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>KPP</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-kpp" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={orgForm.control}
                        name="accountingType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Accounting Type</FormLabel>
                            <FormControl>
                              <Select {...field} data-testid="select-accounting-type">
                                <SelectItem value="accounting">Business Accounting</SelectItem>
                                <SelectItem value="budget">Budget Accounting</SelectItem>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={orgForm.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-industry" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={orgForm.control}
                        name="centralizedOffice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Centralized Office</FormLabel>
                            <FormControl>
                              <Input {...field} data-testid="input-centralized-office" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              {loadingSections ? (
                <div className="text-sm text-muted-foreground" data-testid="text-loading">Loading sections...</div>
              ) : applicableSections.length === 0 ? (
                <div className="text-sm text-muted-foreground" data-testid="text-no-sections">
                  No applicable sections found for this organization.
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground" data-testid="text-sections-count">
                    {applicableSections.length} applicable sections found for {selectedOrg?.name}
                  </p>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {applicableSections.map(section => (
                      <div key={section.id} className="border rounded-lg p-4" data-testid={`section-preview-${section.id}`}>
                        <h4 className="font-medium">{section.sectionNumber} - {section.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{section.content}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground" data-testid="text-select-sections">
                Select the sections you want to include in the policy
              </p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {applicableSections.map(section => (
                  <div key={section.id} className="flex items-start space-x-3 border rounded-lg p-4" data-testid={`section-item-${section.id}`}>
                    <Checkbox
                      checked={wizardState.selectedSections.includes(section.id)}
                      onChange={() => toggleSection(section.id)}
                      data-testid={`checkbox-section-${section.id}`}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{section.sectionNumber} - {section.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{section.content.substring(0, 100)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2" data-testid="text-org-name">Organization: {selectedOrg?.name}</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p data-testid="text-org-inn">INN: {selectedOrg?.inn}</p>
                  <p data-testid="text-org-kpp">KPP: {selectedOrg?.kpp}</p>
                  <p data-testid="text-org-type">Accounting Type: {selectedOrg?.accountingType}</p>
                  {selectedOrg?.industry && <p data-testid="text-org-industry">Industry: {selectedOrg.industry}</p>}
                  <p data-testid="text-org-office">Centralized Office: {selectedOrg?.centralizedOffice}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3" data-testid="text-selected-count">
                  Selected Sections ({wizardState.selectedSections.length})
                </h3>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {selectedSectionDetails.map(section => (
                    <div key={section.id} className="border rounded-lg p-4" data-testid={`preview-section-${section.id}`}>
                      <h4 className="font-medium">{section.sectionNumber} - {section.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          data-testid="button-previous"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={handleNext}
            disabled={createOrgMutation.isPending}
            data-testid="button-next"
          >
            {createOrgMutation.isPending ? 'Creating...' : 'Next'}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={createPolicyMutation.isPending}
            data-testid="button-generate"
          >
            {createPolicyMutation.isPending ? (
              'Generating...'
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Generate Policy
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
