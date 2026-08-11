export const DIGITAL_PRODUCT_TYPES = [
  'All',
  'Design System',
  'Backend Toolkit',
  'Dashboard',
  'Product Starter',
  'Workflow App',
  'Portal',
  'Mobile Kit',
  'AI Toolkit',
];

const digitalProductTemplates = [
  {
    title: 'Dome UI System',
    type: 'Design System',
    description: 'A polished component library for fast dashboards, portals, and product interfaces.',
    price: '$89',
    delivery: 'Instant access',
    highlight: 'React ready',
    stack: ['React', 'CSS', 'Tokens'],
    features: ['Reusable components', 'Responsive layouts', 'Theme variables', 'Documentation notes'],
  },
  {
    title: 'API Launch Kit',
    type: 'Backend Toolkit',
    description: 'Production-minded API starter with auth flows, clean resources, and developer docs.',
    price: '$129',
    delivery: 'Source files',
    highlight: 'REST + Docs',
    stack: ['Node', 'REST', 'Auth'],
    features: ['Clean route structure', 'Auth-ready patterns', 'Error handling', 'API docs shell'],
  },
  {
    title: 'Analytics Command Center',
    type: 'Dashboard',
    description: 'A focused analytics experience for KPIs, charts, usage signals, and team reports.',
    price: '$149',
    delivery: 'Deploy ready',
    highlight: 'Live metrics',
    stack: ['React', 'Charts', 'Reports'],
    features: ['KPI cards', 'Usage views', 'Report layout', 'Responsive data panels'],
  },
  {
    title: 'SaaS Starter Suite',
    type: 'Product Starter',
    description: 'Everything a modern SaaS MVP needs: pages, billing-ready structure, and clean UX.',
    price: '$199',
    delivery: 'Full template',
    highlight: 'MVP speed',
    stack: ['React', 'Routing', 'SaaS'],
    features: ['Marketing-free app shell', 'Product pages', 'Pricing-ready sections', 'Reusable screens'],
  },
  {
    title: 'Automation Hub',
    type: 'Workflow App',
    description: 'A sleek control panel for automations, triggers, integrations, and operational tasks.',
    price: '$119',
    delivery: 'Configurable',
    highlight: 'No busywork',
    stack: ['Workflows', 'Triggers', 'Logs'],
    features: ['Automation cards', 'Trigger states', 'Activity logs', 'Integration slots'],
  },
  {
    title: 'Client Portal Pro',
    type: 'Portal',
    description: 'A secure client workspace for files, project status, support requests, and approvals.',
    price: '$159',
    delivery: 'Customizable',
    highlight: 'Team friendly',
    stack: ['Portal', 'Files', 'Support'],
    features: ['Client dashboard', 'File sections', 'Approval views', 'Support request flow'],
  },
  {
    title: 'Mobile App Interface Kit',
    type: 'Mobile Kit',
    description: 'A mobile-first UI kit for onboarding, account screens, settings, and product flows.',
    price: '$99',
    delivery: 'Figma + code',
    highlight: 'App screens',
    stack: ['Mobile UI', 'React', 'Forms'],
    features: ['Onboarding screens', 'Account states', 'Form patterns', 'Compact navigation'],
  },
  {
    title: 'AI Assistant Console',
    type: 'AI Toolkit',
    description: 'A focused workspace for prompts, chat sessions, evaluations, and assistant settings.',
    price: '$179',
    delivery: 'Source files',
    highlight: 'AI ready',
    stack: ['AI UX', 'Prompts', 'Evals'],
    features: ['Prompt library', 'Session layout', 'Evaluation panels', 'Settings surface'],
  },
  {
    title: 'Ops Status Board',
    type: 'Dashboard',
    description: 'A calm operations board for incidents, uptime, service health, and release signals.',
    price: '$139',
    delivery: 'Deploy ready',
    highlight: 'Ops clarity',
    stack: ['Status', 'Monitoring', 'Teams'],
    features: ['Health indicators', 'Incident timeline', 'Release notes area', 'Team ownership blocks'],
  },
  {
    title: 'Commerce Admin Kit',
    type: 'Product Starter',
    description: 'A practical admin surface for orders, customers, product records, and support actions.',
    price: '$169',
    delivery: 'Full template',
    highlight: 'Admin flow',
    stack: ['Admin', 'Tables', 'Forms'],
    features: ['Order views', 'Customer records', 'Product editing', 'Support actions'],
  },
  {
    title: 'Integration Manager',
    type: 'Backend Toolkit',
    description: 'A starter for managing webhooks, API keys, provider status, and sync history.',
    price: '$149',
    delivery: 'Source files',
    highlight: 'Webhooks',
    stack: ['Webhooks', 'Keys', 'Sync'],
    features: ['Provider cards', 'Key states', 'Sync history', 'Webhook event layout'],
  },
  {
    title: 'Knowledge Portal',
    type: 'Portal',
    description: 'A structured documentation and resource portal for internal teams and clients.',
    price: '$109',
    delivery: 'Customizable',
    highlight: 'Docs hub',
    stack: ['Docs', 'Search', 'Teams'],
    features: ['Resource library', 'Category filters', 'Article layout', 'Team-ready navigation'],
  },
];

export const DIGITAL_PRODUCTS_API = 'https://dummyjson.com/products?limit=12';

const formatPrice = (price, fallback) => {
  if (typeof price !== 'number') {
    return fallback;
  }

  return `$${Math.max(79, Math.round(price / 8))}`;
};

export const buildDigitalProducts = (apiProducts = []) => {
  return digitalProductTemplates.map((template, index) => {
    const apiProduct = apiProducts[index] || {};

    return {
      id: index + 1,
      apiId: apiProduct.id,
      image: apiProduct.thumbnail || apiProduct.images?.[0] || '',
      rating: apiProduct.rating || 4.8,
      stock: apiProduct.stock || 24 + index * 3,
      ...template,
      price: formatPrice(apiProduct.price, template.price),
    };
  });
};
