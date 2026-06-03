import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LoadingProvider, useLoading } from "./contexts/LoadingContext";
import Header from "./components/Header";
import GlobalLoading from "./components/GlobalLoading";
import Home from "./pages/Home";
import LeakRepair from "./pages/LeakRepair";
import BathroomReform from "./pages/BathroomReform";
import NewConstructionPlumbing from "./pages/NewConstructionPlumbing";
import LeakRepairService from "./pages/services/LeakRepairService";
import RemodelService from "./pages/services/RemodelService";
import EquipmentService from "./pages/services/EquipmentService";
import NewConstructionService from "./pages/services/NewConstructionService";
import SewerService from "./pages/services/SewerService";
import WaterTapService from "./pages/services/WaterTapService";
import DesignService from "./pages/services/DesignService";
import DesignProjects from "./pages/DesignProjects";
import Works from "./pages/Works";
import WorkDetail from "./pages/works/WorkDetail";
import WorksManagement from "./pages/admin/WorksManagement";
import DesignProjectsManagement from "./pages/admin/DesignProjectsManagement";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Breadcrumb from "./components/Breadcrumb";

function RouterContent() {
  const [location] = useLocation();
  const { showLoading, hideLoading } = useLoading();

  // ページ遷移時にローディングを表示
  useEffect(() => {
    showLoading();
    const timer = setTimeout(() => hideLoading(), 300);
    return () => clearTimeout(timer);
  }, [location, showLoading, hideLoading]);

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      {/* Legacy routes - redirect to new service pages */}
      <Route path={"/leak-repair"} component={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/service/leak-repair';
        }
        return null;
      }} />
      <Route path={"/bathroom-reform"} component={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/service/remodel';
        }
        return null;
      }} />
      <Route path={"/new-construction"} component={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/service/new-construction';
        }
        return null;
      }} />
      {/* Service pages */}
      <Route path={"/service/leak-repair"} component={LeakRepairService} />
      <Route path={"/service/remodel"} component={RemodelService} />
      <Route path={"/service/equipment"} component={EquipmentService} />
      <Route path={"/service/new-construction"} component={NewConstructionService} />
      <Route path={"/service/sewer"} component={SewerService} />
      <Route path={"/service/water-tap"} component={WaterTapService} />
      <Route path={"/design"} component={DesignService} />
      <Route path={"/design-projects"} component={DesignProjects} />
      {/* Works pages */}
      <Route path={"/works/:slug"} component={WorkDetail} />
      <Route path={"/works"} component={Works} />
      {/* Admin pages */}
      <Route path={"/admin/works"} component={WorksManagement} />
      <Route path={"/admin/design-projects"} component={DesignProjectsManagement} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <LoadingProvider>
          <TooltipProvider>
            <Toaster />
            <GlobalLoading />
            <Header />
            <Breadcrumb />
            <ScrollToTopButton />
            <RouterContent />
          </TooltipProvider>
        </LoadingProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
