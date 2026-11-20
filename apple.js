 (() => {
  const menuItems = [
    {
      id: "m1",
      name: "Vodiy Double Smash Burger",
      category: "burger",
      price: 44000,
      prepMin: 12,
      desc: "Ikki qavatli mol go‘shti kotleti, cheddar pishloq, tuzlangan bodring va maxsus sous.",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m2",
      name: "Andijon Spicy Chicken Burger",
      category: "burger",
      price: 36000,
      prepMin: 10,
      desc: "Qarsildoq tovuq filesi, aysberg karam, jalapeno va achchiq-shirin sous.",
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m3",
      name: "Grill Beef Lavash Roll",
      category: "roll",
      price: 34000,
      prepMin: 9,
      desc: "Yumshoq lavashda panjara qilingan mol go‘shti, pomidor, piyoz va oq sous.",
      img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m4",
      name: "Cheese Crispy Twister",
      category: "roll",
      price: 31000,
      prepMin: 8,
      desc: "Qarsildoq tovuq bo‘laklari, eritilgan pishloq va xushbo‘y ko‘katlar.",
      img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m5",
      name: "Crispy Wings (6 dona)",
      category: "crispy",
      price: 38000,
      prepMin: 14,
      desc: "Oltin rangda qovurilgan qarsildoq tovuq qanotchalari + dip sous.",
      img: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m6",
      name: "Fri Kartoshka (Katta)",
      category: "crispy",
      price: 18000,
      prepMin: 6,
      desc: "Tashqarisi qarsildoq, ichi yumshoq tabiiy kartoshka bo‘laklari.",
      img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m7",
      name: "Muzdek Limonad & Berry",
      category: "drink",
      price: 16000,
      prepMin: 3,
      desc: "Tabiiy limon, yalpiz va rezavor mevalardan tayyorlangan tetiklantiruvchi ichimlik.",
      img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "m8",
      name: "Shokoladli Milkshake",
      category: "drink",
      price: 22000,
      prepMin: 5,
      desc: "Quyuq va kremli kakao-kokteyl, ustida ko‘pikli krem bilan.",
      img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const storeItems = [
    {
      id: "s1",
      name: "Family Party Box (4 kishilik)",
      price: 148000,
      prepMin: 18,
      desc: "2 ta Smash Burger, 2 ta Lavash Roll, 8 ta Crispy Wings, 2 ta katta Fri va 4 ta ichimlik.",
      img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "s2",
      name: "Vodiy Souslar To‘plami (4x250ml)",
      price: 54000,
      prepMin: 4,
      desc: "Firma Sarimsoqli, Achchiq Jalapeno, BBQ Smoky va Pishloqli sous bankalari.",
      img: "https://images.unsplash.com/photo-1472476474098-e545d349ff32?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "s3",
      name: "Vodiy Crunch Hoodie (Unisex)",
      price: 185000,
      prepMin: 5,
      desc: "100% paxtali issiq xudi — do‘konimizning maxsus kolleksiyasidan.",
      img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "s4",
      name: "Termo Tushlik Sumkasi (Insulated)",
      price: 95000,
      prepMin: 5,
      desc: "Taom va ichimliklarni yo‘lda issiq yoki salqin saqlovchi mustahkam sumka.",
      img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const allProducts = [...menuItems, ...storeItems];

  let activeCategory = "all";
  let searchQuery = "";
  let cart = [];
  let deliveryMode = "delivery"; // "delivery" | "pickup"

  const foodGrid = document.getElementById("foodGrid");
  const storeGrid = document.getElementById("storeGrid");
  const cartDrawer = document.getElementById("cartDrawer");
  const backdrop = document.getElementById("backdrop");
  const checkoutModal = document.getElementById("checkoutModal");

  const formatSum = (num) => `${Number(num).toLocaleString("ru-RU").replace(/,/g, " ")} so‘m`;

  function createCardHTML(item) {
    return `
      <article class="product-card">
        <div class="product-img-wrap">
          <img src="${item.img}" alt="${item.name}" loading="lazy" />
          <span class="prep-chip">⏱ ${item.prepMin} daqiqa</span>
        </div>
        <div class="product-body">
          <h3 class="product-title">${item.name}</h3>
          <p class="product-desc">${item.desc}</p>
          <div class="product-foot">
            <span class="product-price">${formatSum(item.price)}</span>
            <button class="add-btn" data-add-id="${item.id}">+ Savatga</button>
          </div>
        </div>
      </article>
    `;
  }

  function renderCatalogs() {
    const q = searchQuery.trim().toLowerCase();
    const filteredMenu = menuItems.filter((item) => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      const matchSearch =
        !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    const filteredStore = storeItems.filter(
      (item) => !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    );

    foodGrid.innerHTML = filteredMenu.length
      ? filteredMenu.map(createCardHTML).join("")
      : `<p style="color:#52525b;">So‘rov bo‘yicha taom topilmadi.</p>`;

    storeGrid.innerHTML = filteredStore.length
      ? filteredStore.map(createCardHTML).join("")
      : `<p style="color:#52525b;">So‘rov bo‘yicha do‘kon mahsuloti topilmadi.</p>`;
  }

  function getDeliveryFee(subtotal) {
    if (deliveryMode === "pickup" || subtotal === 0) return 0;
    if (subtotal >= 120000) return 0; // 120 000 so'mdan yuqori bepul
    const selectedOpt = document.getElementById("districtSelect").selectedOptions[0];
    return Number(selectedOpt?.dataset.fee || 12000);
  }

  function getEstimatedPrepMinutes() {
    if (!cart.length) return 0;
    const maxPrep = Math.max(...cart.map((i) => i.prepMin));
    const extraLoad = Math.min(8, (cart.reduce((s, i) => s + i.qty, 0) - 1) * 2);
    const transit = deliveryMode === "delivery" ? 12 : 0;
    return maxPrep + Math.max(0, extraLoad) + transit;
  }

  function renderCart() {
    const count = cart.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const fee = getDeliveryFee(subtotal);
    const total = subtotal + fee;
    const eta = getEstimatedPrepMinutes();

    document.getElementById("cartCount").textContent = String(count);
    document.getElementById("subtotalVal").textContent = formatSum(subtotal);
    document.getElementById("deliveryFeeVal").textContent =
      deliveryMode === "pickup" ? "0 so‘m (Olib ketish)" : subtotal >= 120000 && subtotal > 0 ? "Bepul (120k+)" : formatSum(fee);
    document.getElementById("totalVal").textContent = formatSum(total);
    document.getElementById("prepEstimateText").textContent =
      count > 0
        ? `Taxminiy tayyor/yetkazish vaqti: ~${eta} daqiqa`
        : "Tayyorlanish vaqti: ~0 daqiqa";

    const cartItemsEl = document.getElementById("cartItems");
    if (!cart.length) {
      cartItemsEl.innerHTML = `<p style="color:#52525b;font-size:14px;padding:16px 0;">Savatchangiz hozircha bo‘sh. Menyu yoki do‘kondan mahsulot qo‘shing.</p>`;
      return;
    }

    cartItemsEl.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-row">
          <div>
            <strong style="font-size:14px;">${item.name}</strong><br />
            <small style="color:#52525b;">⏱ ${item.prepMin} daq • ${formatSum(item.price)}</small>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" data-action="dec" data-id="${item.id}">-</button>
            <span style="font-weight:700;min-width:18px;text-align:center;">${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
          </div>
        </div>
      `
      )
      .join("");
  }

  function addToCart(id) {
    const product = allProducts.find((p) => p.id === id);
    if (!product) return;
    const found = cart.find((i) => i.id === id);
    if (found) found.qty += 1;
    else cart.push({ ...product, qty: 1 });
    renderCart();
  }

  function openCart() {
    cartDrawer.classList.add("open");
    backdrop.classList.add("open");
  }

  function closeOverlays() {
    cartDrawer.classList.remove("open");
    checkoutModal.classList.remove("open");
    backdrop.classList.remove("open");
    document.getElementById("navMenu").classList.remove("open");
  }

  // Event delegation for add buttons
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-id]");
    if (addBtn) {
      addToCart(addBtn.dataset.addId);
      openCart();
    }
  });

  // Category tabs
  document.getElementById("categoryTabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".tab-btn");
    if (!btn) return;
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderCatalogs();
  });

  // Search input
  document.getElementById("searchInput").addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderCatalogs();
  });

  // Cart qty controls
  document.getElementById("cartItems").addEventListener("click", (e) => {
    const btn = e.target.closest(".qty-btn");
    if (!btn) return;
    const item = cart.find((i) => i.id === btn.dataset.id);
    if (!item) return;
    if (btn.dataset.action === "inc") item.qty += 1;
    if (btn.dataset.action === "dec") item.qty -= 1;
    cart = cart.filter((i) => i.qty > 0);
    renderCart();
  });

  // Delivery vs Pickup
  document.querySelectorAll(".mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      deliveryMode = btn.dataset.mode;
      document.getElementById("districtBox").style.display =
        deliveryMode === "delivery" ? "block" : "none";
      document.getElementById("addressField").style.display =
        deliveryMode === "delivery" ? "block" : "none";
      renderCart();
    });
  });

  document.getElementById("districtSelect").addEventListener("change", renderCart);
  document.getElementById("openCartBtn").addEventListener("click", openCart);
  document.getElementById("closeCartBtn").addEventListener("click", closeOverlays);
  backdrop.addEventListener("click", closeOverlays);

  // Mobile burger
  document.getElementById("burgerBtn").addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("open");
  });

  // Checkout Modal
  const checkoutForm = document.getElementById("checkoutForm");
  const orderSuccessBox = document.getElementById("orderSuccessBox");

  document.getElementById("openCheckoutBtn").addEventListener("click", () => {
    if (!cart.length) {
      alert("Avval savatchaga kamida bitta mahsulot qo‘shing!");
      return;
    }
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const total = subtotal + getDeliveryFee(subtotal);
    const eta = getEstimatedPrepMinutes();

    checkoutForm.hidden = false;
    orderSuccessBox.hidden = true;
    document.getElementById("checkoutSummaryText").textContent = `Jami: ${formatSum(total)} • Taxminiy vaqt: ~${eta} daqiqa`;

    cartDrawer.classList.remove("open");
    checkoutModal.classList.add("open");
    backdrop.classList.add("open");
  });

  document.getElementById("closeCheckoutBtn").addEventListener("click", closeOverlays);
  document.getElementById("doneOrderBtn").addEventListener("click", closeOverlays);

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const district = document.getElementById("districtSelect").value;
    const addr = document.getElementById("customerAddress").value.trim();
    const eta = getEstimatedPrepMinutes();

    const modeText =
      deliveryMode === "delivery"
        ? `Yetkazib berish (Andijon — ${district}${addr ? ", " + addr : ""})`
        : "Olib ketish (Andijon, Bobur shoh ko‘chasi, 42)";

    checkoutForm.hidden = true;
    orderSuccessBox.hidden = false;
    document.getElementById("orderConfirmDetails").textContent =
      `Hurmatli ${name} (${phone}), buyurtmangiz qabul qilindi. ${modeText}. Taxminiy tayyor/yetkazish vaqti: ~${eta} daqiqa.`;

    cart = [];
    renderCart();
    checkoutForm.reset();
  });

  renderCatalogs();
  renderCart();
})();