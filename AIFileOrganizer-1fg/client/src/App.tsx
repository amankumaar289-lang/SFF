import { Route, Switch, Link, useLocation } from 'wouter';
import Home from '@/pages/Home';
import Wizard from '@/pages/Wizard';
import PoliciesList from '@/pages/PoliciesList';
import PolicyView from '@/pages/PolicyView';
import Presentation from '@/pages/Presentation';
import { FileText, List, Home as HomeIcon, Presentation as PresentationIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

function App() {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/" data-testid="link-home">
                <a className="flex items-center space-x-2 text-lg font-semibold">
                  <FileText className="h-6 w-6" />
                  <span>Accounting Policy Generator</span>
                </a>
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/wizard" data-testid="link-wizard">
                  <a className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location === '/wizard' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  )}>
                    <HomeIcon className="h-4 w-4" />
                    <span>Create Policy</span>
                  </a>
                </Link>
                <Link href="/policies" data-testid="link-policies">
                  <a className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location === '/policies' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  )}>
                    <List className="h-4 w-4" />
                    <span>View Policies</span>
                  </a>
                </Link>
                <Link href="/presentation" data-testid="link-presentation">
                  <a className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location === '/presentation' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                  )}>
                    <PresentationIcon className="h-4 w-4" />
                    <span>Presentation</span>
                  </a>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <Switch>
        <Route path="/presentation">
          <Presentation />
        </Route>
        <Route>
          <main className="container mx-auto px-4 py-8">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/wizard" component={Wizard} />
              <Route path="/policies" component={PoliciesList} />
              <Route path="/policies/:id" component={PolicyView} />
              <Route>
                <div className="text-center py-20">
                  <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                  <Link href="/" data-testid="link-back-home">
                    <a className="text-primary hover:underline">Go back to home</a>
                  </Link>
                </div>
              </Route>
            </Switch>
          </main>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
