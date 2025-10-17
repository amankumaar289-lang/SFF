import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import type { GeneratedPolicy, Organization, PolicySection } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Printer, FileText } from 'lucide-react';

type PolicyDetailResponse = GeneratedPolicy & {
  organization: Organization;
  sections: PolicySection[];
};

export default function PolicyView() {
  const params = useParams<{ id: string }>();
  const policyId = params.id ? parseInt(params.id) : 0;

  const { data: policy, isLoading, error } = useQuery<PolicyDetailResponse>({
    queryKey: ['/api/generated-policies', policyId],
    enabled: policyId > 0,
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground" data-testid="text-loading">Loading policy...</p>
      </div>
    );
  }

  if (error || !policy) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2" data-testid="text-error-title">Policy Not Found</h2>
        <p className="text-muted-foreground mb-6" data-testid="text-error-description">
          The policy you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/policies">
          <Button data-testid="button-back-list">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Policies
          </Button>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Placeholder for download functionality
    alert('Download functionality will be implemented');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link href="/policies">
          <Button variant="outline" data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Policies
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint} data-testid="button-print">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload} data-testid="button-download">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-3" data-testid="text-policy-title">
                Accounting Policy Document
              </CardTitle>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Organization</p>
                  <p className="font-medium mt-1" data-testid="text-org-name">{policy.organization.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Generated Date</p>
                  <p className="font-medium mt-1" data-testid="text-generated-date">
                    {new Date(policy.generatedDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">INN</p>
                  <p className="font-medium mt-1" data-testid="text-inn">{policy.organization.inn}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">KPP</p>
                  <p className="font-medium mt-1" data-testid="text-kpp">{policy.organization.kpp}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Accounting Type</p>
                  <p className="font-medium mt-1" data-testid="text-accounting-type">
                    {policy.organization.accountingType === 'budget' ? 'Budget Accounting' : 'Business Accounting'}
                  </p>
                </div>
                {policy.organization.industry && (
                  <div>
                    <p className="text-muted-foreground">Industry</p>
                    <p className="font-medium mt-1" data-testid="text-industry">{policy.organization.industry}</p>
                  </div>
                )}
                <div className="col-span-2">
                  <p className="text-muted-foreground">Centralized Office</p>
                  <p className="font-medium mt-1" data-testid="text-centralized-office">
                    {policy.organization.centralizedOffice}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="mt-1">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      policy.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`} data-testid="text-status">
                      {policy.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle data-testid="text-sections-title">Policy Sections</CardTitle>
          <p className="text-sm text-muted-foreground" data-testid="text-sections-count">
            {policy.sections.length} {policy.sections.length === 1 ? 'section' : 'sections'} included
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {policy.sections.map((section, index) => (
              <div key={section.id} className="border-b pb-6 last:border-b-0 last:pb-0" data-testid={`section-${section.id}`}>
                <h3 className="text-lg font-semibold mb-3" data-testid={`text-section-title-${section.id}`}>
                  {section.sectionNumber} {section.title}
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap" data-testid={`text-section-content-${section.id}`}>
                    {section.content}
                  </p>
                </div>
                {section.industrySpecific && (
                  <div className="mt-3">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded" data-testid={`text-industry-specific-${section.id}`}>
                      Industry Specific
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
