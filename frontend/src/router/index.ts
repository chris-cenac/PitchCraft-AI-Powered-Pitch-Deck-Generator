// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import Landing from "@/pages/LandingView";
import FormView from "@/pages/FormView";
import DeckEditor from "@/pages/DeckEditor";
import MyDecks from "@/pages/MyDecks";
import HowItWorks from "@/pages/HowItWorks";

const routes = [
  { path: "/", component: Landing },
  { path: "/create", component: FormView },
  { path: "/view/:id", component: DeckEditor, props: true },
  { path: "/mydecks", component: MyDecks },
  { path: "/how-it-works", component: HowItWorks },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
