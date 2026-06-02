import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
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
import Works from "./pages/Works";

function Router() {
  // make sure to consider if you need authentication for certain routes
  // Service pages: /service/leak-repair, /service/remodel, /service/equipment, /service/new-construction, /service/sewer, /service/water-tap
  // Works pages: /works
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/leak-repair"} component={LeakRepair} />
      <Route path={"/bathroom-reform"} component={BathroomReform} />
      <Route path={"/new-construction"} component={NewConstructionPlumbing} />
      {/* Service pages */}
      <Route path={"/service/leak-repair"} component={LeakRepairService} />
      <Route path={"/service/remodel"} component={RemodelService} />
      <Route path={"/service/equipment"} component={EquipmentService} />
      <Route path={"/service/new-construction"} component={NewConstructionService} />
      <Route path={"/service/sewer"} component={SewerService} />
      <Route path={"/service/water-tap"} component={WaterTapService} />
      {/* Works pages */}
      <Route path={"/works"} component={Works} />
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
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
