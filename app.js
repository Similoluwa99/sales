/**
 * Apex Sales Analytics Dashboard
 * Pure Vanilla JavaScript
 * Zero external libraries & No CSS variables
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Storage Keys & Theme Configuration
  // --------------------------------------------------------------------------
  const STORAGE_KEY = 'apex_sales_data_v1';
  const THEME_STORAGE_KEY = 'apex_sales_theme_pref';

  function isDarkMode() {
    return document.documentElement.classList.contains('dark-mode') || document.body.classList.contains('dark-mode');
  }

  // Dynamic Theme Colors for Canvas Charts (Zero CSS variables)
  function getThemeColors() {
    const isDark = isDarkMode();
    return {
      primary: isDark ? '#818cf8' : '#4f46e5',
      primaryLight: isDark ? 'rgba(129, 140, 248, 0.25)' : 'rgba(79, 70, 229, 0.15)',
      primaryGradientStart: isDark ? 'rgba(129, 140, 248, 0.45)' : 'rgba(79, 70, 229, 0.35)',
      primaryGradientEnd: 'rgba(129, 140, 248, 0.0)',
      secondary: isDark ? '#22d3ee' : '#0891b2',
      secondaryLight: isDark ? 'rgba(34, 211, 238, 0.25)' : 'rgba(8, 145, 178, 0.15)',
      emerald: '#10b981',
      amber: '#f59e0b',
      purple: '#8b5cf6',
      pink: '#ec4899',
      slate: '#64748b',
      gridLine: isDark ? '#334155' : '#e2e8f0',
      textMuted: isDark ? '#94a3b8' : '#64748b',
      textDark: isDark ? '#f8fafc' : '#0f172a',
      trackBg: isDark ? '#0f172a' : '#f1f5f9',
      categoryPalette: isDark ? [
        '#818cf8', // Indigo
        '#22d3ee', // Cyan
        '#34d399', // Emerald
        '#fbbf24', // Amber
        '#c084fc'  // Purple
      ] : [
        '#4f46e5', // Electronics
        '#0891b2', // Software & SaaS
        '#10b981', // Apparel & Fashion
        '#f59e0b', // Home & Office
        '#8b5cf6'  // Professional Services
      ]
    };
  }

  // --------------------------------------------------------------------------
  // Seed Data Generator
  // --------------------------------------------------------------------------
  function generateSeedData() {
    const categories = [
      'Electronics',
      'Software & SaaS',
      'Apparel & Fashion',
      'Home & Office',
      'Professional Services'
    ];

    const products = {
      'Electronics': [
        { name: 'UltraHD 4K Monitor 27"', price: 449.99 },
        { name: 'Wireless Noise-Cancelling Headphones', price: 279.00 },
        { name: 'Ergonomic Mechanical Keyboard', price: 159.50 },
        { name: 'USB-C Thunderbolt 4 Dock', price: 189.00 },
        { name: 'Smart Home Security Hub', price: 129.99 }
      ],
      'Software & SaaS': [
        { name: 'Annual Enterprise Cloud Seat', price: 1200.00 },
        { name: 'Pro Developer Toolkit License', price: 349.00 },
        { name: 'Data Visualization Add-on', price: 199.00 },
        { name: 'Security Audit & Compliance Suite', price: 850.00 },
        { name: 'Team Collaboration Subscription', price: 240.00 }
      ],
      'Apparel & Fashion': [
        { name: 'Merino Wool Executive Blazer', price: 295.00 },
        { name: 'All-Weather Commuter Jacket', price: 185.00 },
        { name: 'Classic Leather Briefcase', price: 245.00 },
        { name: 'Organic Cotton Polo Pack', price: 95.00 }
      ],
      'Home & Office': [
        { name: 'Adjustable Standing Desk 60"', price: 620.00 },
        { name: 'Ergonomic Lumbar Mesh Chair', price: 480.00 },
        { name: 'Dual Monitor Heavy-Duty Arm', price: 115.00 },
        { name: 'Acoustic Soundproofing Panels', price: 140.00 }
      ],
      'Professional Services': [
        { name: 'Architecture Review Consultation', price: 1500.00 },
        { name: 'Custom Integration Setup (10 hrs)', price: 1850.00 },
        { name: 'Staff Training & Onboarding Workshop', price: 950.00 },
        { name: 'Performance Optimization Audit', price: 1200.00 }
      ]
    };

    const customers = [
      { name: 'Sarah Jenkins', email: 's.jenkins@acme.org' },
      { name: 'David Chen', email: 'd.chen@apextech.io' },
      { name: 'Elena Rostova', email: 'elena@novacapital.com' },
      { name: 'Marcus Vance', email: 'marcus@vancegroup.co' },
      { name: 'Chloe Dubois', email: 'chloe@atelierdubois.fr' },
      { name: 'Liam O’Connor', email: 'liam@emeraldanalytics.ie' },
      { name: 'Priya Sharma', email: 'priya@satyamsolutions.in' },
      { name: 'Mateo Rossi', email: 'mateo@rossiventures.it' },
      { name: 'Sofia Lindqvist', email: 'sofia@nordicdesign.se' },
      { name: 'James Wilson', email: 'j.wilson@summitworks.net' },
      { name: 'Aaliyah Khan', email: 'akhan@horizonmedia.ae' },
      { name: 'Lucas Silva', email: 'lucas@paulista.br' },
      { name: 'Hannah Becker', email: 'h.becker@berlindynamics.de' },
      { name: 'Takeshi Yamada', email: 'yamada@tokyosystems.jp' },
      { name: 'Isabella Gomez', email: 'isabella@solarix.es' }
    ];

    const regions = ['North America', 'Europe', 'Asia-Pacific', 'Latin America', 'Middle East & Africa'];
    const paymentMethods = ['Credit Card', 'PayPal', 'Stripe', 'Bank Transfer', 'Apple Pay'];
    const statuses = ['Completed', 'Completed', 'Completed', 'Completed', 'Pending', 'Refunded'];

    const items = [];
    let counter = 1001;

    // Generate historical transactions spread over past 60 days
    const baseDate = new Date(); // current system date

    for (let dayOffset = 58; dayOffset >= 0; dayOffset--) {
      // 0 to 3 transactions per day
      const count = (dayOffset % 7 === 0 || dayOffset % 7 === 6) ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 3) + 1;

      for (let k = 0; k < count; k++) {
        const itemDate = new Date(baseDate);
        itemDate.setDate(baseDate.getDate() - dayOffset);

        const category = categories[Math.floor(Math.random() * categories.length)];
        const categoryProducts = products[category];
        const product = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
        const customer = customers[Math.floor(Math.random() * customers.length)];
        const region = regions[Math.floor(Math.random() * regions.length)];
        const payment = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        const quantity = Math.random() > 0.8 ? 2 : 1;
        const totalAmount = parseFloat((product.price * quantity).toFixed(2));

        items.push({
          id: `ORD-${counter++}`,
          date: itemDate.toISOString().split('T')[0],
          customer: customer.name,
          email: customer.email,
          product: product.name,
          category: category,
          amount: totalAmount,
          quantity: quantity,
          paymentMethod: payment,
          region: region,
          status: status
        });
      }
    }

    return items;
  }

  // --------------------------------------------------------------------------
  // Application State
  // --------------------------------------------------------------------------
  const state = {
    transactions: [],
    filters: {
      timeRange: '30d',
      category: 'all',
      status: 'all',
      search: ''
    },
    sort: {
      column: 'date',
      direction: 'desc'
    },
    pagination: {
      page: 1,
      rowsPerPage: 10
    },
    charts: {
      activeMetric: 'revenue', // 'revenue' | 'orders' | 'both'
      trendHoverIndex: -1,
      donutHoverIndex: -1
    },
    editingTransactionId: null,
    deletingTransactionId: null
  };

  // --------------------------------------------------------------------------
  // Theme Management (Light / Dark Mode with Persistence)
  // --------------------------------------------------------------------------
  function initTheme() {
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    } catch (e) {}

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme, false);

    // Watch for OS theme changes if user has not explicitly stored preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        try {
          if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            applyTheme(e.matches ? 'dark' : 'light', true);
          }
        } catch (err) {}
      });
    }
  }

  function applyTheme(theme, redraw = true) {
    const isDark = theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.remove('dark-mode');
    }

    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) {
      const tooltip = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      toggleBtn.setAttribute('title', tooltip);
      toggleBtn.setAttribute('aria-label', tooltip);
    }

    if (redraw) {
      const currentPeriodItems = filterByTimeRange(state.transactions, state.filters.timeRange);
      renderTrendChart(currentPeriodItems);
      renderCategoryChart(currentPeriodItems);
      renderRegionChart(currentPeriodItems);
    }
  }

  function toggleTheme() {
    const isDark = isDarkMode();
    const newTheme = isDark ? 'light' : 'dark';
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {}
    applyTheme(newTheme, true);
    showToast(`${newTheme === 'dark' ? 'Dark' : 'Light'} mode enabled.`, 'info');
  }

  // --------------------------------------------------------------------------
  // Storage Helpers
  // --------------------------------------------------------------------------
  function loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          state.transactions = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn('Failed to parse localStorage data, generating demo data', e);
    }
    // Seed and persist initial data
    state.transactions = generateSeedData();
    saveData();
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
    } catch (e) {
      showToast('Storage error: unable to save changes.', 'error');
    }
  }

  // --------------------------------------------------------------------------
  // Date Filtering & Window Math
  // --------------------------------------------------------------------------
  function getDateRangeBoundaries(timeRangeKey) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    let startDate = new Date(today);
    let prevPeriodStart = new Date(today);
    let prevPeriodEnd = new Date(today);

    switch (timeRangeKey) {
      case '7d': {
        startDate.setDate(today.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);

        prevPeriodEnd = new Date(startDate);
        prevPeriodEnd.setMilliseconds(-1);

        prevPeriodStart = new Date(prevPeriodEnd);
        prevPeriodStart.setDate(prevPeriodEnd.getDate() - 6);
        prevPeriodStart.setHours(0, 0, 0, 0);
        break;
      }
      case '30d': {
        startDate.setDate(today.getDate() - 29);
        startDate.setHours(0, 0, 0, 0);

        prevPeriodEnd = new Date(startDate);
        prevPeriodEnd.setMilliseconds(-1);

        prevPeriodStart = new Date(prevPeriodEnd);
        prevPeriodStart.setDate(prevPeriodEnd.getDate() - 29);
        prevPeriodStart.setHours(0, 0, 0, 0);
        break;
      }
      case '90d': {
        startDate.setDate(today.getDate() - 89);
        startDate.setHours(0, 0, 0, 0);

        prevPeriodEnd = new Date(startDate);
        prevPeriodEnd.setMilliseconds(-1);

        prevPeriodStart = new Date(prevPeriodEnd);
        prevPeriodStart.setDate(prevPeriodEnd.getDate() - 89);
        prevPeriodStart.setHours(0, 0, 0, 0);
        break;
      }
      case 'this-month': {
        startDate = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);

        prevPeriodEnd = new Date(startDate);
        prevPeriodEnd.setMilliseconds(-1);

        prevPeriodStart = new Date(prevPeriodEnd.getFullYear(), prevPeriodEnd.getMonth(), 1, 0, 0, 0, 0);
        break;
      }
      case 'this-year': {
        startDate = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);

        prevPeriodEnd = new Date(startDate);
        prevPeriodEnd.setMilliseconds(-1);

        prevPeriodStart = new Date(today.getFullYear() - 1, 0, 1, 0, 0, 0, 0);
        break;
      }
      case 'all':
      default: {
        startDate = new Date(2000, 0, 1);
        prevPeriodStart = null;
        prevPeriodEnd = null;
        break;
      }
    }

    return {
      currentStart: startDate,
      currentEnd: today,
      prevStart: prevPeriodStart,
      prevEnd: prevPeriodEnd
    };
  }

  function filterByTimeRange(list, rangeKey) {
    if (rangeKey === 'all') return list;
    const { currentStart, currentEnd } = getDateRangeBoundaries(rangeKey);
    return list.filter(item => {
      const itemDate = new Date(item.date + 'T12:00:00');
      return itemDate >= currentStart && itemDate <= currentEnd;
    });
  }

  function getPrevPeriodTransactions(rangeKey) {
    if (rangeKey === 'all') return [];
    const { prevStart, prevEnd } = getDateRangeBoundaries(rangeKey);
    if (!prevStart || !prevEnd) return [];
    return state.transactions.filter(item => {
      const itemDate = new Date(item.date + 'T12:00:00');
      return itemDate >= prevStart && itemDate <= prevEnd;
    });
  }

  // --------------------------------------------------------------------------
  // Formatting Utilities
  // --------------------------------------------------------------------------
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  function formatCompactNumber(number) {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(number);
  }

  function formatDateDisplay(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  function formatShortDate(dateString) {
    if (!dateString) return '';
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  // --------------------------------------------------------------------------
  // Toast Notifications
  // --------------------------------------------------------------------------
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';
    } else {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
    }

    toast.innerHTML = `${iconSvg}<span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.25s ease-out';
      setTimeout(() => toast.remove(), 250);
    }, 3500);
  }

  function escapeHtml(string) {
    if (!string) return '';
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --------------------------------------------------------------------------
  // Analytics & KPI Computation
  // --------------------------------------------------------------------------
  function updateKPIs(currentPeriodItems, prevPeriodItems) {
    // Current period metrics
    const currentCompleted = currentPeriodItems.filter(i => i.status === 'Completed');
    const currentRevenue = currentCompleted.reduce((sum, i) => sum + i.amount, 0);
    const currentOrdersCount = currentPeriodItems.length;
    const currentAOV = currentCompleted.length > 0 ? currentRevenue / currentCompleted.length : 0;
    const currentFulfillmentRate = currentOrdersCount > 0 ? (currentCompleted.length / currentOrdersCount) * 100 : 0;

    // Previous period metrics
    const prevCompleted = prevPeriodItems.filter(i => i.status === 'Completed');
    const prevRevenue = prevCompleted.reduce((sum, i) => sum + i.amount, 0);
    const prevOrdersCount = prevPeriodItems.length;
    const prevAOV = prevCompleted.length > 0 ? prevRevenue / prevCompleted.length : 0;

    // DOM Elements
    document.getElementById('kpiRevenue').textContent = formatCurrency(currentRevenue);
    document.getElementById('kpiOrders').textContent = currentOrdersCount.toLocaleString();
    document.getElementById('kpiAov').textContent = formatCurrency(currentAOV);
    document.getElementById('kpiFulfillmentRate').textContent = currentFulfillmentRate.toFixed(1) + '%';
    document.getElementById('kpiFulfillmentSub').textContent = `${currentCompleted.length} completed / ${currentOrdersCount} total`;

    // Calculate percentage trends
    applyTrendBadge('kpiRevenueTrend', 'kpiRevenueTrendVal', currentRevenue, prevRevenue);
    applyTrendBadge('kpiOrdersTrend', 'kpiOrdersTrendVal', currentOrdersCount, prevOrdersCount);
    applyTrendBadge('kpiAovTrend', 'kpiAovTrendVal', currentAOV, prevAOV);

    // Insights Banner
    updateInsights(currentPeriodItems);
  }

  function applyTrendBadge(pillId, valId, current, prev) {
    const pill = document.getElementById(pillId);
    const val = document.getElementById(valId);
    if (!pill || !val) return;

    if (!prev || prev === 0) {
      pill.className = 'kpi-trend trend-neutral';
      val.textContent = current > 0 ? '+100%' : '0.0%';
      return;
    }

    const diff = current - prev;
    const percentChange = (diff / prev) * 100;
    const sign = percentChange > 0 ? '+' : '';

    if (percentChange > 0) {
      pill.className = 'kpi-trend trend-positive';
      pill.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
        <span id="${valId}">${sign}${percentChange.toFixed(1)}%</span>
      `;
    } else if (percentChange < 0) {
      pill.className = 'kpi-trend trend-negative';
      pill.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>
        <span id="${valId}">${percentChange.toFixed(1)}%</span>
      `;
    } else {
      pill.className = 'kpi-trend trend-neutral';
      pill.innerHTML = `<span id="${valId}">0.0%</span>`;
    }
  }

  function updateInsights(items) {
    if (items.length === 0) {
      document.getElementById('insightTopCategory').textContent = '--';
      document.getElementById('insightTopRegion').textContent = '--';
      document.getElementById('insightTopPayment').textContent = '--';
      document.getElementById('insightHighestSale').textContent = '$0.00';
      return;
    }

    // Category revenue sum
    const catRevenue = {};
    const regRevenue = {};
    const payCounts = {};
    let maxSale = 0;

    items.forEach(item => {
      if (item.status === 'Completed') {
        catRevenue[item.category] = (catRevenue[item.category] || 0) + item.amount;
        regRevenue[item.region] = (regRevenue[item.region] || 0) + item.amount;
        if (item.amount > maxSale) maxSale = item.amount;
      }
      payCounts[item.paymentMethod] = (payCounts[item.paymentMethod] || 0) + 1;
    });

    const topCategory = Object.keys(catRevenue).sort((a, b) => catRevenue[b] - catRevenue[a])[0] || '--';
    const topRegion = Object.keys(regRevenue).sort((a, b) => regRevenue[b] - regRevenue[a])[0] || '--';
    const topPayment = Object.keys(payCounts).sort((a, b) => payCounts[b] - payCounts[a])[0] || '--';

    document.getElementById('insightTopCategory').textContent = topCategory;
    document.getElementById('insightTopRegion').textContent = topRegion;
    document.getElementById('insightTopPayment').textContent = topPayment;
    document.getElementById('insightHighestSale').textContent = formatCurrency(maxSale);
  }

  // --------------------------------------------------------------------------
  // Canvas Helper: Retina / HiDPI Display Scaling
  // --------------------------------------------------------------------------
  function setupCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, width, height };
  }

  // --------------------------------------------------------------------------
  // Chart 1: Revenue & Volume Line/Area Trend Chart
  // --------------------------------------------------------------------------
  let trendChartData = [];

  function renderTrendChart(items) {
    const canvas = document.getElementById('trendChartCanvas');
    if (!canvas) return;

    const { ctx, width, height } = setupCanvas(canvas);
    ctx.clearRect(0, 0, width, height);

    const colors = getThemeColors();

    if (items.length === 0) {
      drawEmptyChartText(ctx, width, height, 'No transaction data available for this timeframe');
      trendChartData = [];
      return;
    }

    // Group items by date
    const dateMap = {};
    items.forEach(item => {
      if (!dateMap[item.date]) {
        dateMap[item.date] = { date: item.date, revenue: 0, orders: 0 };
      }
      dateMap[item.date].orders += 1;
      if (item.status === 'Completed') {
        dateMap[item.date].revenue += item.amount;
      }
    });

    // Sort chronologically
    const sortedDates = Object.keys(dateMap).sort();
    trendChartData = sortedDates.map(d => dateMap[d]);

    if (trendChartData.length === 1) {
      // Duplicate single point so line can render nicely
      trendChartData.unshift({
        date: '',
        revenue: trendChartData[0].revenue,
        orders: trendChartData[0].orders
      });
    }

    // Layout margins
    const padding = { top: 20, right: 30, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Max values
    const maxRevenue = Math.max(...trendChartData.map(d => d.revenue), 100);
    const maxOrders = Math.max(...trendChartData.map(d => d.orders), 5);

    // Nice Y-axis ceiling
    const niceRevenueMax = Math.ceil(maxRevenue * 1.15);
    const niceOrdersMax = Math.ceil(maxOrders * 1.2);

    const activeMetric = state.charts.activeMetric;

    // Draw horizontal grid lines & labels
    const gridRows = 5;
    ctx.strokeStyle = colors.gridLine;
    ctx.lineWidth = 1;
    ctx.fillStyle = colors.textMuted;
    ctx.font = '11px -apple-system, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i <= gridRows; i++) {
      const y = padding.top + (chartHeight / gridRows) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      const revVal = niceRevenueMax * (1 - i / gridRows);
      ctx.fillText('$' + formatCompactNumber(revVal), padding.left - 10, y);
    }

    // Compute coordinate points
    const points = trendChartData.map((d, index) => {
      const x = padding.left + (chartWidth / (trendChartData.length - 1)) * index;
      const yRevenue = padding.top + chartHeight - (d.revenue / niceRevenueMax) * chartHeight;
      const yOrders = padding.top + chartHeight - (d.orders / niceOrdersMax) * chartHeight;
      return { x, yRevenue, yOrders, ...d };
    });

    // Draw X-axis labels (show at reasonable intervals)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const step = Math.max(1, Math.floor(trendChartData.length / 7));

    points.forEach((p, index) => {
      if (index % step === 0 || index === points.length - 1) {
        if (p.date) {
          ctx.fillText(formatShortDate(p.date), p.x, height - padding.bottom + 10);
        }
      }
    });

    // 1. Draw Revenue Area & Line
    if (activeMetric === 'revenue' || activeMetric === 'both') {
      // Area Fill
      const grad = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
      grad.addColorStop(0, colors.primaryGradientStart);
      grad.addColorStop(1, colors.primaryGradientEnd);

      ctx.beginPath();
      ctx.moveTo(points[0].x, height - padding.bottom);
      ctx.lineTo(points[0].x, points[0].yRevenue);

      for (let i = 1; i < points.length; i++) {
        const xc = (points[i].x + points[i - 1].x) / 2;
        const yc = (points[i].yRevenue + points[i - 1].yRevenue) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].yRevenue, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].yRevenue);
      ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Stroke Line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].yRevenue);
      for (let i = 1; i < points.length; i++) {
        const xc = (points[i].x + points[i - 1].x) / 2;
        const yc = (points[i].yRevenue + points[i - 1].yRevenue) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].yRevenue, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].yRevenue);
      ctx.strokeStyle = colors.primary;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Points dots
      points.forEach((p, idx) => {
        ctx.beginPath();
        ctx.arc(p.x, p.yRevenue, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    // 2. Draw Orders Volume Line (if selected)
    if (activeMetric === 'orders' || activeMetric === 'both') {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].yOrders);
      for (let i = 1; i < points.length; i++) {
        const xc = (points[i].x + points[i - 1].x) / 2;
        const yc = (points[i].yOrders + points[i - 1].yOrders) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].yOrders, xc, yc);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].yOrders);
      ctx.strokeStyle = colors.secondary;
      ctx.lineWidth = activeMetric === 'both' ? 2 : 3;
      if (activeMetric === 'both') {
        ctx.setLineDash([5, 4]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      points.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.yOrders, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = colors.secondary;
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    // Render Hover Indicator if user is hovering
    if (state.charts.trendHoverIndex >= 0 && state.charts.trendHoverIndex < points.length) {
      const hp = points[state.charts.trendHoverIndex];

      // Vertical guideline
      ctx.beginPath();
      ctx.moveTo(hp.x, padding.top);
      ctx.lineTo(hp.x, height - padding.bottom);
      ctx.strokeStyle = colors.textMuted;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Highlight target point circle
      if (activeMetric === 'revenue' || activeMetric === 'both') {
        ctx.beginPath();
        ctx.arc(hp.x, hp.yRevenue, 6, 0, Math.PI * 2);
        ctx.fillStyle = colors.primary;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      if (activeMetric === 'orders' || activeMetric === 'both') {
        ctx.beginPath();
        ctx.arc(hp.x, hp.yOrders, 6, 0, Math.PI * 2);
        ctx.fillStyle = colors.secondary;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }

  // --------------------------------------------------------------------------
  // Chart 2: Category Donut Chart
  // --------------------------------------------------------------------------
  let donutChartSegments = [];

  function renderCategoryChart(items) {
    const canvas = document.getElementById('categoryChartCanvas');
    if (!canvas) return;

    const { ctx, width, height } = setupCanvas(canvas);
    ctx.clearRect(0, 0, width, height);

    const colors = getThemeColors();

    const completed = items.filter(i => i.status === 'Completed');
    if (completed.length === 0) {
      drawEmptyChartText(ctx, width, height, 'No completed sales in this period');
      donutChartSegments = [];
      document.getElementById('categoryLegend').innerHTML = '';
      return;
    }

    // Aggregate category revenue
    const catMap = {};
    let totalCompletedRev = 0;

    completed.forEach(item => {
      catMap[item.category] = (catMap[item.category] || 0) + item.amount;
      totalCompletedRev += item.amount;
    });

    const categories = Object.keys(catMap).sort((a, b) => catMap[b] - catMap[a]);

    // Donut Geometry
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(width, height) / 2 - 16;
    const innerRadius = outerRadius * 0.65;

    let currentAngle = -Math.PI / 2;
    donutChartSegments = [];

    categories.forEach((cat, index) => {
      const amount = catMap[cat];
      const sliceAngle = (amount / totalCompletedRev) * (Math.PI * 2);
      const color = colors.categoryPalette[index % colors.categoryPalette.length];
      const isHovered = state.charts.donutHoverIndex === index;

      const segOuter = isHovered ? outerRadius + 6 : outerRadius;

      // Draw arc slice
      ctx.beginPath();
      ctx.arc(centerX, centerY, segOuter, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Store segment angles for hover detection
      donutChartSegments.push({
        category: cat,
        amount: amount,
        percentage: ((amount / totalCompletedRev) * 100).toFixed(1),
        startAngle: currentAngle,
        endAngle: currentAngle + sliceAngle,
        color: color,
        index: index
      });

      currentAngle += sliceAngle;
    });

    // Center Label: Total Revenue
    ctx.fillStyle = colors.textMuted;
    ctx.font = '11px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TOTAL SALES', centerX, centerY - 10);

    ctx.fillStyle = colors.textDark;
    ctx.font = 'bold 15px -apple-system, sans-serif';
    ctx.fillText('$' + formatCompactNumber(totalCompletedRev), centerX, centerY + 10);

    // Build Legend HTML
    renderCategoryLegend(donutChartSegments);
  }

  function renderCategoryLegend(segments) {
    const container = document.getElementById('categoryLegend');
    if (!container) return;

    container.innerHTML = segments.map(seg => `
      <div class="legend-item">
        <span class="legend-color-dot" style="background-color: ${seg.color};"></span>
        <span>${escapeHtml(seg.category)} (${seg.percentage}%)</span>
      </div>
    `).join('');
  }

  // --------------------------------------------------------------------------
  // Chart 3: Regional Performance Bar Chart
  // --------------------------------------------------------------------------
  function renderRegionChart(items) {
    const canvas = document.getElementById('regionChartCanvas');
    if (!canvas) return;

    const { ctx, width, height } = setupCanvas(canvas);
    ctx.clearRect(0, 0, width, height);

    const colors = getThemeColors();

    const completed = items.filter(i => i.status === 'Completed');
    if (completed.length === 0) {
      drawEmptyChartText(ctx, width, height, 'No completed sales in this period');
      document.getElementById('regionList').innerHTML = '';
      return;
    }

    const regMap = {};
    let totalRev = 0;
    completed.forEach(item => {
      regMap[item.region] = (regMap[item.region] || 0) + item.amount;
      totalRev += item.amount;
    });

    const regions = Object.keys(regMap).sort((a, b) => regMap[b] - regMap[a]);
    const maxRegRev = Math.max(...Object.values(regMap), 1);

    const padding = { top: 16, right: 24, bottom: 20, left: 120 };
    const barAreaWidth = width - padding.left - padding.right;
    const barHeight = 22;
    const gap = (height - padding.top - padding.bottom - (regions.length * barHeight)) / (regions.length > 1 ? regions.length - 1 : 1);

    regions.forEach((region, i) => {
      const amount = regMap[region];
      const y = padding.top + i * (barHeight + gap);
      const barWidth = Math.max(6, (amount / maxRegRev) * barAreaWidth);

      // Label (Region Name)
      ctx.fillStyle = colors.textDark;
      ctx.font = '500 12px -apple-system, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(region, padding.left - 12, y + barHeight / 2);

      // Background Track
      ctx.fillStyle = colors.trackBg;
      drawRoundedRect(ctx, padding.left, y, barAreaWidth, barHeight, 6);
      ctx.fill();

      // Progress Bar
      ctx.fillStyle = colors.primary;
      drawRoundedRect(ctx, padding.left, y, barWidth, barHeight, 6);
      ctx.fill();

      // Value text on right
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px -apple-system, sans-serif';
      ctx.textAlign = 'right';
      if (barWidth > 70) {
        ctx.fillText(formatCurrency(amount), padding.left + barWidth - 8, y + barHeight / 2);
      } else {
        ctx.fillStyle = colors.textDark;
        ctx.textAlign = 'left';
        ctx.fillText(formatCurrency(amount), padding.left + barWidth + 8, y + barHeight / 2);
      }
    });

    // Populate region list below
    const regionListEl = document.getElementById('regionList');
    if (regionListEl) {
      regionListEl.innerHTML = regions.map(reg => {
        const amt = regMap[reg];
        const pct = ((amt / totalRev) * 100).toFixed(1);
        return `
          <div class="region-item">
            <span class="region-name">${escapeHtml(reg)}</span>
            <span class="region-value">${formatCurrency(amt)} <span style="font-weight: normal; color: #64748b; font-size: 12px;">(${pct}%)</span></span>
          </div>
        `;
      }).join('');
    }
  }

  function drawEmptyChartText(ctx, width, height, text) {
    ctx.fillStyle = getThemeColors().textMuted;
    ctx.font = '13px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
  }

  function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // --------------------------------------------------------------------------
  // Interactive Chart Tooltips & Hover
  // --------------------------------------------------------------------------
  function setupChartInteractions() {
    // Trend Chart Tooltip
    const trendCanvas = document.getElementById('trendChartCanvas');
    const trendTooltip = document.getElementById('trendChartTooltip');

    if (trendCanvas && trendTooltip) {
      trendCanvas.addEventListener('mousemove', (e) => {
        if (trendChartData.length === 0) return;

        const rect = trendCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const padding = { top: 20, right: 30, bottom: 40, left: 60 };
        const chartWidth = rect.width - padding.left - padding.right;

        // Find closest point
        let closestIndex = -1;
        let minDistance = Infinity;

        trendChartData.forEach((d, index) => {
          const ptX = padding.left + (chartWidth / (trendChartData.length - 1)) * index;
          const dist = Math.abs(mouseX - ptX);
          if (dist < minDistance) {
            minDistance = dist;
            closestIndex = index;
          }
        });

        if (closestIndex >= 0 && minDistance < 40) {
          state.charts.trendHoverIndex = closestIndex;
          const item = trendChartData[closestIndex];

          trendTooltip.innerHTML = `
            <strong>${formatDateDisplay(item.date)}</strong><br>
            Revenue: <span style="color: #818cf8; font-weight: bold;">${formatCurrency(item.revenue)}</span><br>
            Orders: <span style="color: #22d3ee; font-weight: bold;">${item.orders}</span>
          `;

          const ptX = padding.left + (chartWidth / (trendChartData.length - 1)) * closestIndex;
          trendTooltip.style.left = `${Math.min(rect.width - 160, Math.max(10, ptX - 70))}px`;
          trendTooltip.style.top = '30px';
          trendTooltip.classList.add('visible');

          // Trigger smooth redraw
          renderTrendChart(filterByTimeRange(state.transactions, state.filters.timeRange));
        } else {
          hideTrendTooltip();
        }
      });

      trendCanvas.addEventListener('mouseleave', hideTrendTooltip);
    }

    function hideTrendTooltip() {
      if (state.charts.trendHoverIndex !== -1) {
        state.charts.trendHoverIndex = -1;
        trendTooltip.classList.remove('visible');
        renderTrendChart(filterByTimeRange(state.transactions, state.filters.timeRange));
      }
    }

    // Category Donut Tooltip
    const donutCanvas = document.getElementById('categoryChartCanvas');
    const donutTooltip = document.getElementById('categoryChartTooltip');

    if (donutCanvas && donutTooltip) {
      donutCanvas.addEventListener('mousemove', (e) => {
        if (donutChartSegments.length === 0) return;

        const rect = donutCanvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const outerRadius = Math.min(rect.width, rect.height) / 2 - 16;
        const innerRadius = outerRadius * 0.65;

        if (dist >= innerRadius && dist <= outerRadius + 8) {
          let angle = Math.atan2(dy, dx);
          // Normalize angle to match segment range (-PI/2 to 3*PI/2)
          if (angle < -Math.PI / 2) {
            angle += Math.PI * 2;
          }

          const matchedSeg = donutChartSegments.find(seg => angle >= seg.startAngle && angle < seg.endAngle);

          if (matchedSeg) {
            state.charts.donutHoverIndex = matchedSeg.index;
            donutTooltip.innerHTML = `
              <strong>${escapeHtml(matchedSeg.category)}</strong><br>
              Sales: <span style="color: #818cf8; font-weight: bold;">${formatCurrency(matchedSeg.amount)}</span><br>
              Share: <span style="color: #10b981; font-weight: bold;">${matchedSeg.percentage}%</span>
            `;
            donutTooltip.style.left = `${Math.min(rect.width - 150, Math.max(10, mouseX + 12))}px`;
            donutTooltip.style.top = `${Math.min(rect.height - 70, Math.max(10, mouseY - 40))}px`;
            donutTooltip.classList.add('visible');

            renderCategoryChart(filterByTimeRange(state.transactions, state.filters.timeRange));
            return;
          }
        }

        hideDonutTooltip();
      });

      donutCanvas.addEventListener('mouseleave', hideDonutTooltip);
    }

    function hideDonutTooltip() {
      if (state.charts.donutHoverIndex !== -1) {
        state.charts.donutHoverIndex = -1;
        donutTooltip.classList.remove('visible');
        renderCategoryChart(filterByTimeRange(state.transactions, state.filters.timeRange));
      }
    }
  }

  // --------------------------------------------------------------------------
  // Table Filtering, Sorting & Pagination
  // --------------------------------------------------------------------------
  function getFilteredTransactions() {
    let result = filterByTimeRange(state.transactions, state.filters.timeRange);

    // Filter by Category
    if (state.filters.category !== 'all') {
      result = result.filter(item => item.category === state.filters.category);
    }

    // Filter by Status
    if (state.filters.status !== 'all') {
      result = result.filter(item => item.status === state.filters.status);
    }

    // Filter by Search Query
    const query = state.filters.search.trim().toLowerCase();
    if (query) {
      result = result.filter(item => {
        return (
          item.id.toLowerCase().includes(query) ||
          item.customer.toLowerCase().includes(query) ||
          (item.email && item.email.toLowerCase().includes(query)) ||
          item.product.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.region.toLowerCase().includes(query)
        );
      });
    }

    // Sorting
    const { column, direction } = state.sort;
    result.sort((a, b) => {
      let valA = a[column];
      let valB = b[column];

      if (column === 'amount') {
        return direction === 'asc' ? valA - valB : valB - valA;
      }
      if (column === 'date') {
        const dateA = new Date(valA).getTime();
        const dateB = new Date(valB).getTime();
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      valA = (valA || '').toString().toLowerCase();
      valB = (valB || '').toString().toLowerCase();

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }

  function renderTable() {
    const tableBody = document.getElementById('salesTableBody');
    const emptyState = document.getElementById('tableEmptyState');
    const totalCountBadge = document.getElementById('tableTotalCount');
    if (!tableBody) return;

    const filtered = getFilteredTransactions();
    totalCountBadge.textContent = `${filtered.length} records`;

    if (filtered.length === 0) {
      tableBody.innerHTML = '';
      emptyState.style.display = 'flex';
      renderPagination(0, 0, 0);
      return;
    }

    emptyState.style.display = 'none';

    // Pagination math
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / state.pagination.rowsPerPage);
    if (state.pagination.page > totalPages) {
      state.pagination.page = Math.max(1, totalPages);
    }

    const startIndex = (state.pagination.page - 1) * state.pagination.rowsPerPage;
    const endIndex = Math.min(startIndex + state.pagination.rowsPerPage, totalItems);
    const pageItems = filtered.slice(startIndex, endIndex);

    tableBody.innerHTML = pageItems.map(item => {
      let statusClass = 'status-completed';
      if (item.status === 'Pending') statusClass = 'status-pending';
      if (item.status === 'Refunded') statusClass = 'status-refunded';

      return `
        <tr>
          <td class="order-id-cell">${escapeHtml(item.id)}</td>
          <td>${formatDateDisplay(item.date)}</td>
          <td>
            <div class="customer-cell">
              <span class="customer-name">${escapeHtml(item.customer)}</span>
              ${item.email ? `<span class="customer-email">${escapeHtml(item.email)}</span>` : ''}
            </div>
          </td>
          <td>
            <span style="font-weight: 500;">${escapeHtml(item.product)}</span>
            ${item.quantity > 1 ? `<span style="color: #64748b; font-size: 11px;"> (Qty: ${item.quantity})</span>` : ''}
          </td>
          <td><span class="badge badge-neutral">${escapeHtml(item.category)}</span></td>
          <td class="text-right amount-cell">${formatCurrency(item.amount)}</td>
          <td><span style="color: #475569; font-size: 12px;">${escapeHtml(item.paymentMethod)}</span></td>
          <td>
            <span class="status-pill ${statusClass}">
              ${escapeHtml(item.status)}
            </span>
          </td>
          <td class="text-center">
            <div class="table-actions-group">
              <button class="action-icon-btn edit-btn" data-id="${item.id}" title="Edit sale">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
              <button class="action-icon-btn btn-delete delete-btn" data-id="${item.id}" title="Delete sale">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    renderPagination(startIndex + 1, endIndex, totalItems);
    updateSortHeaders();
  }

  function renderPagination(start, end, total) {
    document.getElementById('paginationStart').textContent = total > 0 ? start : 0;
    document.getElementById('paginationEnd').textContent = end;
    document.getElementById('paginationTotal').textContent = total;

    const container = document.getElementById('paginationPages');
    if (!container) return;

    if (total === 0) {
      container.innerHTML = '';
      return;
    }

    const totalPages = Math.ceil(total / state.pagination.rowsPerPage);
    const currentPage = state.pagination.page;

    let html = `
      <button class="page-btn prev-page-btn" ${currentPage === 1 ? 'disabled' : ''} title="Previous page">
        &lsaquo;
      </button>
    `;

    // Window of pages
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      html += `<button class="page-btn" data-page="1">1</button>`;
      if (startPage > 2) html += `<span style="padding: 4px; color: #94a3b8;">...</span>`;
    }

    for (let p = startPage; p <= endPage; p++) {
      html += `<button class="page-btn ${p === currentPage ? 'active' : ''}" data-page="${p}">${p}</button>`;
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += `<span style="padding: 4px; color: #94a3b8;">...</span>`;
      html += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
    }

    html += `
      <button class="page-btn next-page-btn" ${currentPage === totalPages ? 'disabled' : ''} title="Next page">
        &rsaquo;
      </button>
    `;

    container.innerHTML = html;
  }

  function updateSortHeaders() {
    const headers = document.querySelectorAll('th.sortable');
    headers.forEach(th => {
      const col = th.getAttribute('data-sort');
      th.classList.remove('sort-asc', 'sort-desc');
      if (col === state.sort.column) {
        th.classList.add(state.sort.direction === 'asc' ? 'sort-asc' : 'sort-desc');
      }
    });
  }

  // --------------------------------------------------------------------------
  // Full Refresh Orchestrator
  // --------------------------------------------------------------------------
  function refreshAll() {
    const currentPeriodItems = filterByTimeRange(state.transactions, state.filters.timeRange);
    const prevPeriodItems = getPrevPeriodTransactions(state.filters.timeRange);

    updateKPIs(currentPeriodItems, prevPeriodItems);
    renderTrendChart(currentPeriodItems);
    renderCategoryChart(currentPeriodItems);
    renderRegionChart(currentPeriodItems);
    renderTable();
  }

  // --------------------------------------------------------------------------
  // Modal Management (Add / Edit / Delete)
  // --------------------------------------------------------------------------
  function openAddTransactionModal() {
    state.editingTransactionId = null;
    document.getElementById('modalTitle').textContent = 'New Sales Transaction';
    document.getElementById('transactionForm').reset();
    document.getElementById('formTransactionId').value = '';

    // Default to today
    document.getElementById('formDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('formQuantity').value = 1;
    document.getElementById('formStatus').value = 'Completed';

    document.getElementById('transactionModal').classList.add('show');
  }

  function openEditTransactionModal(id) {
    const item = state.transactions.find(t => t.id === id);
    if (!item) return;

    state.editingTransactionId = id;
    document.getElementById('modalTitle').textContent = `Edit Transaction (${item.id})`;
    document.getElementById('formTransactionId').value = item.id;
    document.getElementById('formCustomer').value = item.customer;
    document.getElementById('formEmail').value = item.email || '';
    document.getElementById('formProduct').value = item.product;
    document.getElementById('formCategory').value = item.category;
    document.getElementById('formAmount').value = item.amount;
    document.getElementById('formQuantity').value = item.quantity || 1;
    document.getElementById('formPayment').value = item.paymentMethod;
    document.getElementById('formRegion').value = item.region;
    document.getElementById('formStatus').value = item.status;
    document.getElementById('formDate').value = item.date;

    document.getElementById('transactionModal').classList.add('show');
  }

  function closeTransactionModal() {
    document.getElementById('transactionModal').classList.remove('show');
    state.editingTransactionId = null;
  }

  function handleTransactionFormSubmit(e) {
    e.preventDefault();

    const customer = document.getElementById('formCustomer').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const product = document.getElementById('formProduct').value.trim();
    const category = document.getElementById('formCategory').value;
    const amount = parseFloat(document.getElementById('formAmount').value);
    const quantity = parseInt(document.getElementById('formQuantity').value, 10) || 1;
    const paymentMethod = document.getElementById('formPayment').value;
    const region = document.getElementById('formRegion').value;
    const status = document.getElementById('formStatus').value;
    const date = document.getElementById('formDate').value;

    if (!customer || !product || isNaN(amount) || amount <= 0 || !date) {
      showToast('Please fill in all required fields accurately.', 'error');
      return;
    }

    if (state.editingTransactionId) {
      // Update existing
      const index = state.transactions.findIndex(t => t.id === state.editingTransactionId);
      if (index !== -1) {
        state.transactions[index] = {
          ...state.transactions[index],
          customer,
          email,
          product,
          category,
          amount,
          quantity,
          paymentMethod,
          region,
          status,
          date
        };
        saveData();
        refreshAll();
        closeTransactionModal();
        showToast(`Transaction ${state.editingTransactionId} updated successfully.`, 'success');
      }
    } else {
      // Create new
      const nextIdNum = state.transactions.reduce((max, t) => {
        const num = parseInt(t.id.replace('ORD-', ''), 10);
        return !isNaN(num) && num > max ? num : max;
      }, 1000) + 1;

      const newTransaction = {
        id: `ORD-${nextIdNum}`,
        date,
        customer,
        email,
        product,
        category,
        amount,
        quantity,
        paymentMethod,
        region,
        status
      };

      state.transactions.unshift(newTransaction);
      saveData();
      refreshAll();
      closeTransactionModal();
      showToast(`Transaction ${newTransaction.id} recorded successfully!`, 'success');
    }
  }

  function openDeleteConfirmModal(id) {
    state.deletingTransactionId = id;
    document.getElementById('deleteOrderNumber').textContent = id;
    document.getElementById('deleteModal').classList.add('show');
  }

  function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('show');
    state.deletingTransactionId = null;
  }

  function confirmDelete() {
    if (!state.deletingTransactionId) return;
    const id = state.deletingTransactionId;
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveData();
    refreshAll();
    closeDeleteModal();
    showToast(`Transaction ${id} deleted.`, 'info');
  }

  // --------------------------------------------------------------------------
  // Data Export & Import Handlers
  // --------------------------------------------------------------------------
  function exportToCsv() {
    if (state.transactions.length === 0) {
      showToast('No transaction data to export.', 'error');
      return;
    }

    const headers = ['Order ID', 'Date', 'Customer', 'Email', 'Product', 'Category', 'Amount', 'Quantity', 'Payment Method', 'Region', 'Status'];
    const rows = state.transactions.map(t => [
      t.id,
      t.date,
      `"${(t.customer || '').replace(/"/g, '""')}"`,
      `"${(t.email || '').replace(/"/g, '""')}"`,
      `"${(t.product || '').replace(/"/g, '""')}"`,
      `"${(t.category || '').replace(/"/g, '""')}"`,
      t.amount.toFixed(2),
      t.quantity || 1,
      `"${(t.paymentMethod || '').replace(/"/g, '""')}"`,
      `"${(t.region || '').replace(/"/g, '""')}"`,
      t.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `apex_sales_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Sales data exported as CSV.', 'success');
    document.getElementById('exportMenu').classList.remove('show');
  }

  function exportToJson() {
    if (state.transactions.length === 0) {
      showToast('No transaction data to export.', 'error');
      return;
    }

    const jsonString = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.transactions, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonString);
    link.setAttribute('download', `apex_sales_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Sales data backup exported as JSON.', 'success');
    document.getElementById('exportMenu').classList.remove('show');
  }

  function importFromJson(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported) && imported.length > 0 && imported[0].id && imported[0].amount !== undefined) {
          state.transactions = imported;
          saveData();
          refreshAll();
          showToast(`Successfully imported ${imported.length} transactions.`, 'success');
        } else {
          showToast('Invalid backup file format.', 'error');
        }
      } catch (err) {
        showToast('Failed to parse JSON file.', 'error');
      }
      e.target.value = '';
      document.getElementById('exportMenu').classList.remove('show');
    };
    reader.readAsText(file);
  }

  function resetToDemoData() {
    if (confirm('Reset all sales data to the default demonstration dataset? Any custom additions will be cleared.')) {
      state.transactions = generateSeedData();
      saveData();
      state.pagination.page = 1;
      refreshAll();
      showToast('Dashboard reset to demo dataset.', 'info');
      document.getElementById('exportMenu').classList.remove('show');
    }
  }

  // --------------------------------------------------------------------------
  // Event Listeners Initialization
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // Time Range Selector
    const timeRangeSelect = document.getElementById('timeRangeSelect');
    if (timeRangeSelect) {
      timeRangeSelect.addEventListener('change', (e) => {
        state.filters.timeRange = e.target.value;
        state.pagination.page = 1;
        refreshAll();
      });
    }

    // Metric Toggle Buttons (Trend Chart)
    const metricPills = document.querySelectorAll('.pill-toggle-group .pill-btn');
    metricPills.forEach(btn => {
      btn.addEventListener('click', () => {
        metricPills.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.charts.activeMetric = btn.getAttribute('data-metric');
        renderTrendChart(filterByTimeRange(state.transactions, state.filters.timeRange));
      });
    });

    // Add Sale Modal Trigger
    const addBtn = document.getElementById('addTransactionBtn');
    if (addBtn) {
      addBtn.addEventListener('click', openAddTransactionModal);
    }

    // Modal Close Buttons
    document.getElementById('closeModalBtn').addEventListener('click', closeTransactionModal);
    document.getElementById('cancelModalBtn').addEventListener('click', closeTransactionModal);
    document.getElementById('transactionForm').addEventListener('submit', handleTransactionFormSubmit);

    // Delete Modal Actions
    document.getElementById('closeDeleteModalBtn').addEventListener('click', closeDeleteModal);
    document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);
    document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDelete);

    // Export Dropdown
    const exportDropdownBtn = document.getElementById('exportDropdownBtn');
    const exportMenu = document.getElementById('exportMenu');
    if (exportDropdownBtn && exportMenu) {
      exportDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        exportMenu.classList.toggle('show');
      });

      document.addEventListener('click', () => {
        exportMenu.classList.remove('show');
      });

      exportMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    document.getElementById('exportCsvBtn').addEventListener('click', exportToCsv);
    document.getElementById('exportJsonBtn').addEventListener('click', exportToJson);
    document.getElementById('importJsonInput').addEventListener('change', importFromJson);
    document.getElementById('resetDemoBtn').addEventListener('click', resetToDemoData);

    // Table Search & Clear
    const searchInput = document.getElementById('tableSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.filters.search = e.target.value;
        state.pagination.page = 1;
        clearSearchBtn.style.display = e.target.value ? 'block' : 'none';
        renderTable();
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        state.filters.search = '';
        clearSearchBtn.style.display = 'none';
        state.pagination.page = 1;
        renderTable();
      });
    }

    // Table Category Filter
    document.getElementById('filterCategory').addEventListener('change', (e) => {
      state.filters.category = e.target.value;
      state.pagination.page = 1;
      renderTable();
    });

    // Table Status Filter
    document.getElementById('filterStatus').addEventListener('change', (e) => {
      state.filters.status = e.target.value;
      state.pagination.page = 1;
      renderTable();
    });

    // Empty State Reset Button
    document.getElementById('emptyResetFiltersBtn').addEventListener('click', () => {
      state.filters.category = 'all';
      state.filters.status = 'all';
      state.filters.search = '';
      document.getElementById('filterCategory').value = 'all';
      document.getElementById('filterStatus').value = 'all';
      if (searchInput) searchInput.value = '';
      if (clearSearchBtn) clearSearchBtn.style.display = 'none';
      state.pagination.page = 1;
      renderTable();
    });

    // Table Sorting Headers
    const sortHeaders = document.querySelectorAll('th.sortable');
    sortHeaders.forEach(th => {
      th.addEventListener('click', () => {
        const col = th.getAttribute('data-sort');
        if (state.sort.column === col) {
          state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc';
        } else {
          state.sort.column = col;
          state.sort.direction = col === 'amount' || col === 'date' ? 'desc' : 'asc';
        }
        renderTable();
      });
    });

    // Rows Per Page Select
    document.getElementById('rowsPerPageSelect').addEventListener('change', (e) => {
      state.pagination.rowsPerPage = parseInt(e.target.value, 10);
      state.pagination.page = 1;
      renderTable();
    });

    // Delegated Table Action Buttons (Edit & Delete)
    const tableBody = document.getElementById('salesTableBody');
    if (tableBody) {
      tableBody.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-btn');
        if (editBtn) {
          const id = editBtn.getAttribute('data-id');
          openEditTransactionModal(id);
          return;
        }

        const deleteBtn = e.target.closest('.delete-btn');
        if (deleteBtn) {
          const id = deleteBtn.getAttribute('data-id');
          openDeleteConfirmModal(id);
          return;
        }
      });
    }

    // Delegated Pagination Buttons
    const paginationPages = document.getElementById('paginationPages');
    if (paginationPages) {
      paginationPages.addEventListener('click', (e) => {
        const pageBtn = e.target.closest('.page-btn');
        if (!pageBtn || pageBtn.disabled) return;

        if (pageBtn.classList.contains('prev-page-btn')) {
          if (state.pagination.page > 1) {
            state.pagination.page--;
            renderTable();
          }
          return;
        }

        if (pageBtn.classList.contains('next-page-btn')) {
          const filtered = getFilteredTransactions();
          const totalPages = Math.ceil(filtered.length / state.pagination.rowsPerPage);
          if (state.pagination.page < totalPages) {
            state.pagination.page++;
            renderTable();
          }
          return;
        }

        const targetPage = parseInt(pageBtn.getAttribute('data-page'), 10);
        if (!isNaN(targetPage)) {
          state.pagination.page = targetPage;
          renderTable();
        }
      });
    }

    // Window Resize Observer for Canvas Charts
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const currentPeriodItems = filterByTimeRange(state.transactions, state.filters.timeRange);
        renderTrendChart(currentPeriodItems);
        renderCategoryChart(currentPeriodItems);
        renderRegionChart(currentPeriodItems);
      }, 150);
    });

    // Setup Canvas Chart Hover Tooltips
    setupChartInteractions();

    // Theme Toggle Button
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }
  }

  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  function init() {
    initTheme();
    loadData();
    setupEventListeners();
    refreshAll();
  }

  // Run on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

