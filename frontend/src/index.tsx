/* @refresh reload */
import { render } from "solid-js/web";
import { HashRouter, Route } from "@solidjs/router";
import App from "./App";
import { DiscoverView } from "./components/DiscoverView";
import { PassportView } from "./components/PassportView";
import { EventsView } from "./components/EventsView";
import { LeaderboardView } from "./components/LeaderboardView";
import { ShopView } from "./components/ShopView";
import { AboutView } from "./components/AboutView";
import { SettingsView } from "./components/SettingsView";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found");

render(
  () => (
    <HashRouter root={App}>
      <Route path="/" component={DiscoverView} />
      <Route path="/passport" component={PassportView} />
      <Route path="/events" component={EventsView} />
      <Route path="/leaderboard" component={LeaderboardView} />
      <Route path="/shop" component={ShopView} />
      <Route path="/about" component={AboutView} />
      <Route path="/settings" component={SettingsView} />
      <Route path="*" component={DiscoverView} />
    </HashRouter>
  ),
  root
);
