import { createRouter, createWebHistory } from "vue-router";

// Import all views and components
import BroadCast1 from "@/components/broadcast/broadcast1.vue";
import BroadCast2 from "@/components/broadcast/broadcast2.vue";
import BroadCast3 from "@/components/broadcast/broadcast3.vue";
import ContActs1 from "@/components/contacts/contacts1.vue";
import ContActs2 from "@/components/contacts/contacts2.vue";
import AppIntegration from "@/components/integration/integration.vue";
import LoginPage from "@/components/login/login.vue";
import AIagent from "@/components/AIagent/AIagent.vue";
import BasicSignupPage from "@/components/signup/basic_signup.vue";
import DashboardView from "@/views/dashboardview.vue";
import MessageGenerator from "@/components/dashboard/MessageGenerator.vue";
import Profile from "@/views/profile.vue";
import Settings from "@/views/profileSettings.vue";
import ChatbotView from "@/components/chatbot/chatbotview.vue";
import CostAnalytics from "@/components/PurchaseHistory/CostDashboard.vue";
import Analytics from "@/components/analytics/Analytics.vue";
import TermsAndPrivacy from "@/views/TermsAndPrivacy.vue";

// -------------------- ROUTES -------------------- //
const routes = [
  // Public routes
  { path: "/", component: LoginPage },
  { path: "/signup", component: BasicSignupPage },
  { path: "/terms-and-privacy", component: TermsAndPrivacy, name: "TermsAndPrivacy" },

  // Protected dashboard routes
  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      { path: "/agent", component: AIagent, name: "AIagent" },
      { path: "/analytics/cost", component: CostAnalytics, name: "Costanalytics" },
      { path: "/analytics/conversations", component: Analytics, name: "DataAnalytics" },
      { path: "/broadcast/broadcast1", component: BroadCast1, name: "Broadcast1" },
      { path: "/broadcast/broadcast2", component: BroadCast2, name: "Broadcast2" },
      { path: "/broadcast/broadcast3", component: BroadCast3, name: "Broadcast3" },
      { path: "/contacts/contacts1", component: ContActs1, name: "Contacts1" },
      { path: "/contacts/contacts2", component: ContActs2, name: "Contacts2" },
      { path: "/integration/integration1", component: AppIntegration, name: "Integration1" },
      { path: "/profile", component: Profile, name: "Profile" },
      { path: "/settings", component: Settings, name: "Settings" },
      { path: "/chatbot/chatbotview", component: ChatbotView, name: "ChatbotView" },
      { path: "/dashboard/messagegenerator", component: MessageGenerator, name: "MessageGenerator" },
      { path: "", redirect: "/dashboard/messagegenerator" },
    ],
  },
];

// -------------------- ROUTER -------------------- //
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// -------------------- AUTH GUARD -------------------- //
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  // Only check token on protected routes
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      // No token: redirect to login
      console.warn("No token found, redirecting to login.");
      return next("/");
    }
    // For deployment, allow any non-empty token
    return next();
  }
  next();
});

export default router;
