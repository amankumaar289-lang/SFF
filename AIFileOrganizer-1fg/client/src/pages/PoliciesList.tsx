import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import type { GeneratedPolicy, Organization } from '@shared/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Eye } from 'lucide-react';

type PolicyWithOrganization = GeneratedPolicy & {
  organization?: Organization;
};

export default function PoliciesList() {
  const { data: policies = [], isLoading } = useQuery<GeneratedPolicy[]>({
    queryKey: ['/api/generated-policies'],
  });

  const { data: organizations = [] } = useQuery<Organization[]>({
    queryKey: ['/api/organizations'],
  });

  const policiesWithOrgs: PolicyWithOrganization[] = policies.map(policy => ({
    ...policy,
    organization: organizations.find(org => org.id === policy.organizationId),
  }));

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground" data-testid="text-loading">Loading policies...</p>
      </div>
    );
  }

  if (policies.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2" data-testid="text-empty-title">No Policies Generated Yet</h2>
        <p className="text-muted-foreground mb-6" data-testid="text-empty-description">
          Start by creating your first accounting policy
        </p>
        <Link href="/wizard">
          <Button data-testid="button-create-first">
            <FileText className="h-4 w-4 mr-2" />
            Create Policy
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" data-testid="text-policies-title">Generated Policies</h1>
          <p className="text-muted-foreground" data-testid="text-policies-count">
            {policies.length} {policies.length === 1 ? 'policy' : 'policies'} generated
          </p>
        </div>
        <Link href="/wizard">
          <Button data-testid="button-create-new-policy">
            <FileText className="h-4 w-4 mr-2" />
            Create New Policy
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {policiesWithOrgs.map(policy => (
          <Card key={policy.id} data-testid={`card-policy-${policy.id}`}>
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span className="flex-1" data-testid={`text-policy-org-${policy.id}`}>
                  {policy.organization?.name || `Organization #${policy.organizationId}`}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${
                  policy.status === 'approved' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`} data-testid={`text-status-${policy.id}`}>
                  {policy.status}
                </span>
              </CardTitle>
              <CardDescription data-testid={`text-date-${policy.id}`}>
                Generated on {new Date(policy.generatedDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="text-muted-foreground" data-testid={`text-sections-${policy.id}`}>
                    {policy.selectedSections.length} {policy.selectedSections.length === 1 ? 'section' : 'sections'} included
                  </p>
                  {policy.organization && (
                    <p className="text-muted-foreground mt-1" data-testid={`text-type-${policy.id}`}>
                      {policy.organization.accountingType === 'budget' ? 'Budget Accounting' : 'Business Accounting'}
                    </p>
                  )}
                </div>
                <Link href={`/policies/${policy.id}`}>
                  <Button variant="outline" className="w-full" data-testid={`button-view-${policy.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Policy
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
