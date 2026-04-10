function closePromoView() {
  // 1. Находим все блоки
  const promoContainer = document.getElementById("promo-view-container");
  const promoCarousel = document.getElementById("steam-promo-carousel");
  const categoriesHome = document.getElementById("steam-categories-container");
  const searchBar = document.querySelector(".search-container-steam");

  // 2. Прячем контейнер акции
  if (promoContainer) {
    promoContainer.style.display = "none";
  }

  // 3. Возвращаем главные элементы интерфейса
  if (promoCarousel) {
    promoCarousel.style.setProperty("display", "flex", "important");
  }
  if (categoriesHome) {
    categoriesHome.style.display = "block";
  }
  if (searchBar) {
    searchBar.style.display = "block";
  }

  // 4. Очищаем поиск, если он был активен
  const searchInput = document.getElementById("steam-search-input");
  if (searchInput) searchInput.value = "";

  const gamesGrid = document.getElementById("steam-games-display");
  if (gamesGrid) gamesGrid.style.display = "none";

  // 5. Обновляем ленты, чтобы подгрузились актуальные данные
  if (typeof renderSteamHome === "function") renderSteamHome();

  window.scrollTo(0, 0);
}

document.addEventListener(
  "click",
  function (e) {
    const steamBtn = e.target.closest('[onclick*="steam-games"]');

    // Если нажали на кнопку Steam
    if (steamBtn) {
      // Если регион еще не выбран — показываем модалку
      if (!window.currentSteamRegion) {
        e.preventDefault();
        e.stopImmediatePropagation();

        const modal = document.getElementById("steam-region-modal");
        if (modal) {
          modal.style.setProperty("display", "flex", "important");
          modal.style.setProperty("visibility", "visible", "important");
          modal.style.setProperty("opacity", "1", "important");
          modal.style.pointerEvents = "all";
        }
      }
    }
  },
  true,
);

// ==========================================
// 1. ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И СЛОВАРЬ
// ==========================================
window.currentSteamRegion = null;
let currentOpenedGameId = null;
let shouldRestoreSteamGamePage = false;

const regionFullNames = {
  RU: "Россия",
  KZ: "Казахстан",
  UA: "Украина",
  TR: "Турция",
  IN: "Индия",
};

// ==========================================
// 2. ВЫБОР РЕГИОНА И НАВИГАЦИЯ
// ==========================================

window.setSteamRegion = function (region) {
  // 1. Устанавливаем регион
  window.currentSteamRegion = region;

  // 2. Скрываем модалку выбора региона
  const modal = document.getElementById("steam-region-modal");
  if (modal) {
    modal.style.setProperty("display", "none", "important");
    modal.style.visibility = "hidden";
    modal.style.opacity = "0";
  }

  // 3. СБРОС СОСТОЯНИЯ ЭКРАНА (Чтобы не висела старая акция)
  const promoContainer = document.getElementById("promo-view-container");
  const categoriesHome = document.getElementById("steam-categories-container");
  const gamesGrid = document.getElementById("steam-games-display");
  const promoCarousel = document.getElementById("steam-promo-carousel");
  const searchBar = document.querySelector(".search-container-steam");

  if (promoContainer) promoContainer.style.display = "none";
  if (gamesGrid) gamesGrid.style.display = "none";
  if (categoriesHome) categoriesHome.style.display = "block";
  if (searchBar) searchBar.style.display = "block";
  if (promoCarousel) {
    promoCarousel.style.setProperty("display", "flex", "important");
  }

  // 4. Переход на страницу Steam
  if (typeof goToPage === "function") {
    goToPage("steam-games", "Steam", "Игры");
  }

  // 5. Отрисовываем свежие данные под новый регион
  if (typeof renderSteamBanners === "function") renderSteamBanners();
  if (typeof renderSteamHome === "function") renderSteamHome();

  window.scrollTo(0, 0);
};

window.goToSteamAccounts = function () {
  const modal = document.getElementById("steam-region-modal");
  if (modal) {
    modal.style.setProperty("display", "none", "important");
    modal.style.visibility = "hidden";
  }
  window.currentSteamRegion = "NONE";
  goToPage("steam-accounts", "Steam", "Аккаунты");
};

window.closeSteamModalAndGo = function (url) {
  const modal = document.getElementById("steam-region-modal");
  if (modal) {
    modal.style.setProperty("display", "none", "important");
  }
  window.location.href = url;
};

// ==========================================
// 3. ОТРИСОВКА STEAM (БАННЕРЫ, КАТЕГОРИИ, СЕТКИ)
// ==========================================

function renderSteamBanners() {
  const container = document.getElementById("steam-promo-carousel");
  if (!container) return;

  container.innerHTML = "";

  if (typeof steamOffers === "undefined" || steamOffers.length === 0) {
    container.style.display = "none";
    return;
  }

  const activeOffers = steamOffers.filter((offer) => offer.isActive);

  if (activeOffers.length === 0) {
    container.style.display = "none";
    return;
  }

  container.style.display = "flex";
  container.innerHTML = activeOffers
    .map(
      (offer) => `
            <div class="promo-banner" 
                 style="background-image: url('${offer.img}');"
                 onclick="filterByPromo('${offer.category}')">
                <div class="promo-info">
                    <div class="promo-title">${offer.title}</div>
                </div>
            </div>
        `,
    )
    .join("");

  if (activeOffers.length > 1) {
    initPromoScroll(container);
  }
}

function renderSteamHome() {
  const container = document.getElementById("steam-categories-container");
  if (!container || !window.currentSteamRegion) return;

  const reg = window.currentSteamRegion;
  const sections = [
    { title: "Лидеры продаж", key: "Лидеры продаж" },
    { title: "Новинки", key: "Новинки" },
    { title: "Предзаказ", key: "Предзаказ" },
    { title: "Скидки недели", key: "digisell-weekly" },
  ];

  let finalHTML = "";
  sections.forEach((sec) => {
    const filtered = steamGames.filter(
      (g) => g.categories && g.categories.includes(sec.key),
    );
    if (filtered.length > 0) {
      finalHTML += `
                <div class="steam-category-section">
                    <h2 class="steam-category-title" style="display: block !important;">${sec.title}</h2>
                    <div class="steam-cards-row">
                        ${filtered.map((p) => renderSteamCardHTML(p, reg)).join("")}
                    </div>
                </div>`;
    }
  });
  container.innerHTML = finalHTML;
}

// ГЛАВНАЯ КАРТОЧКА: Теперь открывает openSteamGamePage
function renderSteamCardHTML(p, reg) {
  const priceData = p.prices ? p.prices[reg] || p.prices["RU"] : null;
  if (!priceData) return "";

  return `
    <div class="apple-card-mini" onclick="openSteamGamePage(${p.id})">
        <div class="apple-card-img-wrapper">
            <img src="${p.img}" alt="${p.name}">
        </div>
        <div class="apple-card-info">
            <div class="apple-card-price-row">
                <span class="price">${priceData.amount} ₽</span>
                ${priceData.discount ? `<span class="discount">${priceData.discount}</span>` : ""}
            </div>
            <div class="name">${p.name}</div>
        </div>
    </div>`;
}

function renderSteamGrid(gamesList, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const reg = window.currentSteamRegion || "RU";

  container.innerHTML = gamesList
    .map((p) => renderSteamCardHTML(p, reg))
    .join("");
  container.style.display = "grid";
  container.style.gridTemplateColumns = "repeat(2, 1fr)";
  container.style.gap = "15px";
  container.style.paddingBottom = "100px";
}

// ==========================================
// 4. ПОИСК И ФИЛЬТРЫ
// ==========================================

function handleSteamSearch() {
  const input = document.getElementById("steam-search-input");
  const query = input ? input.value.toLowerCase().trim() : "";

  const gamesGrid = document.getElementById("steam-games-display");
  const promoCarousel = document.getElementById("steam-promo-carousel");
  const promoContainer = document.getElementById("promo-view-container");
  const categoriesHome = document.getElementById("steam-categories-container");

  if (query.length > 0) {
    if (promoCarousel)
      promoCarousel.style.setProperty("display", "none", "important");
    if (promoContainer) promoContainer.style.display = "none";
    if (categoriesHome) categoriesHome.style.display = "none";

    const filtered = steamGames.filter((game) =>
      game.name.toLowerCase().includes(query),
    );

    if (filtered.length > 0) {
      gamesGrid.style.display = "grid";
      renderSteamGrid(filtered, "steam-games-display");
    } else {
      gamesGrid.innerHTML = `<div class="empty-msg" style="text-align:center; color:gray; padding:20px;">Ничего не найдено</div>`;
      gamesGrid.style.display = "block";
    }
  } else {
    if (gamesGrid) {
      gamesGrid.innerHTML = "";
      gamesGrid.style.display = "none";
    }
    if (promoContainer) promoContainer.style.display = "none";
    if (promoCarousel) {
      promoCarousel.style.setProperty("display", "flex", "important");
      renderSteamBanners();
    }
    if (categoriesHome) {
      categoriesHome.style.display = "block";
      renderSteamHome();
    }
  }
}

function filterByPromo(category) {
  const promoCarousel = document.getElementById("steam-promo-carousel");
  const promoContainer = document.getElementById("promo-view-container");
  const categoriesHome = document.getElementById("steam-categories-container");
  const searchBar = document.querySelector(".search-container-steam");
  const titleElement = document.getElementById("promo-view-title");

  // Скрываем всё лишнее
  if (promoCarousel)
    promoCarousel.style.setProperty("display", "none", "important");
  if (categoriesHome) categoriesHome.style.display = "none";
  if (searchBar) searchBar.style.display = "none";

  // Показываем блок акции
  if (promoContainer) promoContainer.style.display = "block";

  // Устанавливаем заголовок акции
  const offer =
    typeof steamOffers !== "undefined"
      ? steamOffers.find((o) => o.category === category)
      : null;
  if (titleElement) titleElement.innerText = offer ? offer.title : "Акция";

  // Рендерим сетку игр
  const filtered = steamGames.filter((game) =>
    (game.categories || []).includes(category),
  );
  renderSteamGrid(filtered, "promo-games-grid");

  window.scrollTo(0, 0);
}

// ==========================================
// 5. ПОЛНОЭКРАННАЯ КАРТОЧКА ИГРЫ
// ==========================================

function openSteamGamePage(gameId) {
  const game = steamGames.find((g) => g.id === Number(gameId));
  if (!game) return;

  currentOpenedGameId = gameId;
  const reg = window.currentSteamRegion || "RU";
  const page = document.getElementById("steam-game-page");

  // 1. Заполняем фон и заголовок
  const bgEl = document.getElementById("game-pg-bg");
  if (bgEl) bgEl.style.backgroundImage = `url('${game.img}')`;
  document.getElementById("game-pg-title").innerText = `${game.name}`;

  // 2.1 СПОСОБ ПОЛУЧЕНИЯ (НОВОЕ)
  const giftRegions = ["RU", "KZ", "UA"];
  const isGift = giftRegions.includes(reg);
  const deliveryBox = document.getElementById("game-pg-delivery-box");

  if (deliveryBox) {
    const deliveryText = isGift
      ? "Подарком на ваш аккаунт"
      : "Со входом в аккаунт";
    const statusClass = isGift ? "status-gift" : "status-login";

    deliveryBox.innerHTML = `<div class="delivery-status ${statusClass}">${deliveryText}</div>`;
  }

  // 2.2 ЦЕНА И СКИДКА
  const priceData = game.prices[reg] || game.prices["RU"];
  const priceContainer = document.getElementById("game-pg-price");
  if (priceData) {
    priceContainer.innerHTML = `
        <span class="current-price">${priceData.amount} ₽</span>
        ${priceData.discount ? `<span class="discount">${priceData.discount}</span>` : ""}
    `;
  }

  // 3. Избранное
  const favBtn = document.getElementById("game-pg-fav-btn");
  if (favBtn) {
    // Если ID игры есть в массиве favorites, добавляем класс active
    if (favorites.includes(Number(gameId))) {
      favBtn.classList.add("is-active");
    } else {
      favBtn.classList.remove("is-active");
    }
  }

  // 4. Издания
  const editionsBox = document.getElementById("game-pg-editions");
  if (editionsBox) {
    editionsBox.innerHTML = "";
    if (game.editions) {
      game.editions.forEach((eid) => {
        const eGame = steamGames.find((g) => g.id === eid);
        if (eGame) {
          const isActive = eGame.id === game.id ? "active" : "";
          const ePrice = (eGame.prices[reg] || eGame.prices["RU"]).amount;
          editionsBox.innerHTML += `
            <div class="edition-item ${isActive}" onclick="openSteamGamePage(${eGame.id})">
              <span>${eGame.editionName || "Standard Edition"}</span>
              <b>${ePrice} ₽</b>
            </div>`;
        }
      });
    }
  }

  // 5. DLC
  const dlcBox = document.getElementById("game-pg-dlc");
  if (dlcBox) {
    const dlcList = steamGames.filter(
      (g) => g.categories && g.categories.includes(`DLC-${game.id}`),
    );
    dlcBox.innerHTML =
      dlcList.length > 0
        ? dlcList.map((dlc) => renderSteamCardHTML(dlc, reg)).join("")
        : '<p style="color:#555; padding: 10px;">Дополнений не найдено</p>';
  }

  page.style.display = "block";
  page.scrollTop = 0;
  document.body.style.overflow = "hidden";
}

function closeSteamGamePage() {
  const page = document.getElementById("steam-game-page");
  shouldRestoreSteamGamePage = false;

  if (page) {
    page.style.setProperty("display", "none", "important");
  }

  document.body.style.overflow = "auto";
  document.body.style.height = "auto";
}

document.addEventListener("click", function (e) {
  const isMenuClick = e.target.closest("#bottom-menu");

  if (isMenuClick) {
    const gamePage = document.getElementById("steam-game-page");

    if (gamePage && gamePage.style.display !== "none") {
      shouldRestoreSteamGamePage = true;
      gamePage.style.setProperty("display", "none", "important");
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }
}); // ВАЖНО: здесь НЕТ параметра true

function handleGameFavClick() {
  const gameId = Number(currentOpenedGameId);
  const btn = document.getElementById("game-pg-fav-btn");
  if (!btn) return;

  const icon = btn.querySelector("i");
  const index = favorites.indexOf(gameId);

  if (index === -1) {
    favorites.push(gameId);
    btn.classList.add("is-active");
    if (icon) {
      icon.classList.remove("fa-regular");
      icon.classList.add("fa-solid");
    }
  } else {
    favorites.splice(index, 1);
    btn.classList.remove("is-active");
    if (icon) {
      icon.classList.remove("fa-solid");
      icon.classList.add("fa-regular");
    }
  }

  localStorage.setItem("favs", JSON.stringify(favorites));
  updateBadges();

  if (typeof renderProducts === "function") renderProducts();
  if (typeof renderApplePage === "function") renderApplePage();
  if (typeof renderTelegramPage === "function") renderTelegramPage();
  if (typeof renderSteamHome === "function") renderSteamHome();

  if (window.lastSteamGames && window.lastSteamContainerId) {
    renderSteamGrid(window.lastSteamGames, window.lastSteamContainerId);
  }

  if (typeof renderFavorites === "function") {
    const favSearch = document.getElementById("fav-search");
    renderFavorites(favSearch ? favSearch.value : "");
  }

  const modalFavBtn = document.getElementById("modal-fav-btn");
  if (modalFavBtn) {
    modalFavBtn.classList.toggle("active-fav", favorites.includes(gameId));
  }
}

// ==========================================
// 6. ИНИЦИАЛИЗАЦИЯ И СЛУШАТЕЛИ
// ==========================================

function syncSteamData() {
  if (typeof steamGames !== "undefined" && Array.isArray(steamGames)) {
    steamGames.forEach((game) => {
      const gameId = Number(game.id);
      if (!productsData.find((p) => Number(p.id) === gameId)) {
        game.id = gameId;
        productsData.push(game);
      }
    });
  }
}
syncSteamData();

function initPromoScroll(container) {
  if (window.promoTimer) clearInterval(window.promoTimer);
  window.promoTimer = setInterval(() => {
    const banner = container.querySelector(".promo-banner");
    if (!banner) return;
    const step = banner.offsetWidth + 12;
    if (
      container.scrollLeft >=
      container.scrollWidth - container.clientWidth - 10
    ) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollBy({ left: step, behavior: "smooth" });
    }
  }, 5000);
}

let promoTimer = null;
// 1. Устанавливаем валюту по умолчанию (при первой загрузке страницы Apple)
window.currentAppleRegion = "RUB";

// 2. Функция переключения региона
window.selectAppleRegion = function (region) {
  window.currentAppleRegion = region;

  // Визуальное переключение кнопок
  document
    .querySelectorAll(".apple-tab")
    .forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.getElementById("btn-apple-" + region);
  if (activeBtn) activeBtn.classList.add("active");

  // Вызываем отрисовку
  renderApplePage();
};

function renderApplePage() {
  const container = document.getElementById("apple-products-grid");
  if (!container) return;

  const filtered = productsData.filter(
    (p) => p.service === "apple" && p.currency === window.currentAppleRegion,
  );

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty-msg">Нет товаров для этой валюты</div>`;
    return;
  }

  container.innerHTML = filtered
    .map((p) => {
      const isFav =
        typeof favorites !== "undefined" && favorites.includes(p.id);

      return `
            <div class="apple-card-mini" onclick="openProductModal(${p.id})">
                <div class="apple-card-img-wrapper">
                    <img src="${p.img}" alt="${p.name}">
                    <div class="action-icon ${isFav ? "active-fav" : ""}" 
                         onclick="event.stopPropagation(); toggleFavorite(${p.id}, event)">
                        <svg viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                    </div>
                </div>
                <div class="apple-card-info">
                    <div class="apple-card-price-row">
                        <span class="price">${p.price} ₽</span>
                        <span class="discount">${p.discount}</span>
                    </div>
                    <div class="name">${p.name}</div>
                </div>
            </div>
        `;
    })
    .join("");
}

// 1. Инициализация Telegram WebApp сразу
const tg = window.Telegram ? window.Telegram.WebApp : null;

if (tg) {
  tg.ready();
  tg.expand();

  // ОТКЛЮЧАЕМ СВАЙП ВНИЗ ДЛЯ ЗАКРЫТИЯ
  // Это позволит спокойно листать товары, не боясь, что бот свернется
  tg.isVerticalSwipesEnabled = false;

  tg.setHeaderColor("secondary_bg_color");
  tg.setBackgroundColor("bg_color");
}

let currentPath = { category: "", sub: "" };

function goToPage(pageId, categoryName, subName) {
  const gamePage = document.getElementById("steam-game-page");
  const isGameOpen = gamePage && getComputedStyle(gamePage).display !== "none";

  // Если открыта карточка игры и уходим во "временные" разделы,
  // просто скрываем карточку, но НЕ считаем это ручным закрытием
  if (isGameOpen && ["favorites-page", "cart-page"].includes(pageId)) {
    shouldRestoreSteamGamePage = true;
    gamePage.style.setProperty("display", "none", "important");
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  }

  // Если жмем на Steam, пока игра реально открыта — ничего не делаем
  if (pageId === "steam-games" && isGameOpen) {
    return;
  }

  // Если уходим в другой раздел, кроме временных, закрываем карточку окончательно
  if (
    pageId !== "steam-games" &&
    !["favorites-page", "cart-page"].includes(pageId)
  ) {
    if (typeof closeSteamGamePage === "function") {
      closeSteamGamePage();
    } else if (gamePage) {
      gamePage.style.setProperty("display", "none", "important");
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  }

  closeProductModal();
  const regionModal = document.getElementById("steam-region-modal");
  if (regionModal) {
    regionModal.style.setProperty("display", "none", "important");
  }

  const safePages = [
    "favorites-page",
    "cart-page",
    "steam-games",
    "steam-accounts",
  ];
  if (!safePages.includes(pageId)) {
    window.currentSteamRegion = null;
  }

  const menu = document.getElementById("bottom-menu");
  if (menu) menu.style.display = "flex";

  const mainContainer = document.querySelector(".container");
  if (mainContainer) mainContainer.style.display = "none";

  document
    .querySelectorAll(".content-section")
    .forEach((s) => (s.style.display = "none"));

  const target = document.getElementById(pageId);
  if (target) {
    target.style.display = "block";

    if (categoryName !== undefined) {
      currentPath.category = categoryName;
      currentPath.sub = subName || "";
      renderBreadcrumbs(target, pageId);
    }

    if (pageId === "steam-games" || pageId === "steam-accounts") {
      if (!window.currentSteamRegion) {
        if (regionModal) {
          regionModal.style.setProperty("display", "flex", "important");
        }
        const catHome = document.getElementById("steam-categories-container");
        if (catHome) catHome.style.display = "none";
        return;
      }

      if (pageId === "steam-games") {
        const catHome = document.getElementById("steam-categories-container");
        if (catHome) catHome.style.display = "block";

        const promo = document.getElementById("steam-promo-carousel");
        if (promo) promo.style.setProperty("display", "flex", "important");

        renderSteamBanners();
        renderSteamHome();

        if (shouldRestoreSteamGamePage && currentOpenedGameId) {
          setTimeout(() => {
            openSteamGamePage(currentOpenedGameId);
          }, 50);
        }
      }
    }

    if (pageId === "apple-page") renderApplePage();
    if (pageId === "spotify-page") renderDurations();
    if (pageId === "telegram-page") renderTelegramPage();

    if (!["favorites-page", "cart-page"].includes(pageId)) {
      window.lastCategory = pageId;
      window.lastCategoryName = categoryName;
      window.lastSubName = subName || "";
    }
  }

  updateBadges();
  window.scrollTo(0, 0);
}

function goHome() {
  closeProductModal();

  document
    .querySelectorAll(".content-section")
    .forEach((s) => (s.style.display = "none"));
  const container = document.querySelector(".container");
  if (container) container.style.display = "block";

  const menu = document.getElementById("bottom-menu");
  if (menu) menu.style.display = "none";

  updateBadges();
  setTimeout(updateBadges, 100); // Тот самый "костыль", который сработал
}

function renderBreadcrumbs(container, pageId) {
  const oldNav = container.querySelector(".breadcrumbs");
  if (oldNav) oldNav.remove();

  const navHtml = document.createElement("div");
  navHtml.className = "breadcrumbs";

  let html = `<span onclick="goHome()">Главная</span>`;

  if (currentPath.category) {
    const categoryMainId = pageId.split("-")[0] + "-page";
    const categoryAction = currentPath.sub
      ? `onclick="goToPage('${categoryMainId}', '${currentPath.category}')"`
      : "";
    html += ` <span class="sep">❯</span> <span ${categoryAction} class="${currentPath.sub ? "link" : ""}">${currentPath.category}</span>`;
  }

  if (currentPath.sub) {
    html += ` <span class="sep">❯</span> <span>${currentPath.sub}</span>`;
  }

  navHtml.innerHTML = html;
  container.prepend(navHtml);
}

// Конфиг подписок
const subConfig = {
  spotify: { months: [1, 3, 6, 12] },
  youtube: { months: [1, 12] },
  chatgpt: { months: [1] },
};

let selectedService = "spotify";
let selectedMonth = 1;

function selectService(service) {
  selectedService = service;
  document.querySelectorAll(".services .selector-item").forEach((el) => {
    el.classList.toggle("active", el.dataset.service === service);
  });
  renderDurations();
}

function renderDurations() {
  const container = document.getElementById("durations-row");
  if (!container) return;

  const months = subConfig[selectedService].months;
  if (!months.includes(selectedMonth)) {
    selectedMonth = months[0];
  }

  container.innerHTML = months
    .map(
      (m) => `
        <div class="selector-item ${m === selectedMonth ? "active" : ""}" 
             onclick="selectMonth(${m})">
            ${m} ${getMonthWord(m)}
        </div>
    `,
    )
    .join("");

  renderProducts();
}

function selectMonth(m) {
  selectedMonth = m;
  renderDurations();
}

function getMonthWord(n) {
  return "мес";
}

function renderProducts() {
  const display = document.getElementById("subs-products-display");
  if (!display) return;

  const filtered = productsData.filter(
    (p) => p.service === selectedService && p.months === selectedMonth,
  );

  if (filtered.length === 0) {
    display.innerHTML = `<div style="text-align:center; padding:40px; color:gray;">Товаров нет</div>`;
    return;
  }

  display.innerHTML = filtered
    .map((p) => {
      // Безопасная проверка избранного и корзины
      const isFav =
        typeof favorites !== "undefined" ? favorites.includes(p.id) : false;
      const inCart = typeof cart !== "undefined" ? cart.includes(p.id) : false;

      return `
            <div class="product-card" onclick="openProductModal(${p.id})">
                <img src="${p.img}" class="product-img" onerror="this.src='img_products/placeholder.png'">
                
                <div class="product-info">
                    <div class="product-name">${p.name}</div>
                    <div class="price-row" style="display: flex; align-items: center; gap: 8px;">
                        <div class="current-price">${p.price}₽</div>
                        ${
                          p.discount
                            ? `
                            <div class="discount-badge" style="
                                background: linear-gradient(45deg, #ff5f6d, #ffc371);
                                font-size: 12px;
                                padding: 2px 6px;
                                border-radius: 4px;
                                color: white;
                                font-weight: bold;
                                display: inline-block;
                            ">${p.discount}</div>
                        `
                            : ""
                        }
                    </div>
                </div>

                <div class="product-actions">
                    <button class="action-icon ${isFav ? "active-fav" : ""}" 
                            onclick="event.stopPropagation(); toggleFavorite(${p.id}, event)">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </button>
                    <button class="action-icon ${inCart ? "active-cart" : ""}" 
                            onclick="event.stopPropagation(); toggleCart(${p.id}, event)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    })
    .join("");
}

// Добавь эту вспомогательную функцию для динамических цветов плашек
function getServiceColor() {
  const colors = {
    spotify: "#1DB954",
    youtube: "#FF0000",
    chatgpt: "#444654",
  };
  return colors[selectedService] || "#fff";
}

// Анимации контактов
setTimeout(() => {
  const ct = document.querySelector(".contacts-text");
  if (ct) {
    ct.style.opacity = "1";
    ct.style.transform = "translateY(0)";
  }
}, 3000);

setTimeout(() => {
  document.querySelectorAll(".contact-btn").forEach((btn, index) => {
    setTimeout(() => {
      btn.style.opacity = "1";
      btn.style.transform = "translateY(0) scale(1)";
    }, index * 200);
  });
}, 3200);

let favorites = JSON.parse(localStorage.getItem("favs")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function toggleFavorite(id, event) {
  if (event) event.stopPropagation();

  const btn = event?.currentTarget?.closest(".action-icon, .fav-btn-top");
  const favId = Number(id);
  const index = favorites.indexOf(favId);

  if (index === -1) {
    favorites.push(favId);
    if (btn) btn.classList.add("active-fav");
  } else {
    favorites.splice(index, 1);
    if (btn) btn.classList.remove("active-fav");
  }

  localStorage.setItem("favs", JSON.stringify(favorites));
  updateBadges();

  if (typeof renderProducts === "function") renderProducts();
  if (typeof renderApplePage === "function") renderApplePage();
  if (typeof renderTelegramPage === "function") renderTelegramPage();

  if (window.lastSteamGames && window.lastSteamContainerId) {
    renderSteamGrid(window.lastSteamGames, window.lastSteamContainerId);
  }

  const favoritesDisplay = document.getElementById("favorites-display");
  if (favoritesDisplay && favoritesDisplay.offsetParent !== null) {
    const favSearch = document.getElementById("fav-search");
    renderFavorites(favSearch ? favSearch.value : "");
  }

  if (currentOpenedGameId && Number(currentOpenedGameId) === favId) {
    const gameFavBtn = document.getElementById("game-pg-fav-btn");
    if (gameFavBtn) {
      const isFav = favorites.includes(favId);
      gameFavBtn.classList.toggle("is-active", isFav);

      const icon = gameFavBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-solid", isFav);
        icon.classList.toggle("fa-regular", !isFav);
      }
    }
  }

  const modalFavBtn = document.getElementById("modal-fav-btn");
  if (modalFavBtn) {
    modalFavBtn.classList.toggle("active-fav", favorites.includes(favId));
  }
}

function toggleCart(id, event) {
  if (event) event.stopPropagation();

  const btn = event.currentTarget.closest(".action-icon");
  const index = cart.indexOf(id);

  if (index === -1) {
    cart.push(id);
    if (btn) btn.classList.add("active-cart"); // Красим сразу
  } else {
    cart.splice(index, 1);
    if (btn) btn.classList.remove("active-cart"); // Гасим сразу
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateBadges();
  renderProducts();

  // Если мы в корзине и товар удален
  if (
    document.getElementById("cart-page").style.display === "block" &&
    index !== -1
  ) {
    setTimeout(() => renderCart(), 300);
  }
}

function renderFavorites(filterQuery = "") {
  const display = document.getElementById("favorites-display");
  const searchContainer = document.getElementById("fav-search-container");
  if (!display) return;

  if (favorites.length === 0) {
    searchContainer.innerHTML = "";
    display.innerHTML = `<div class="empty-msg">Избранное пусто 🤍</div>`;
    return;
  }

  if (!searchContainer.innerHTML.trim()) {
    searchContainer.innerHTML = `
      <div class="search-wrapper">
        <input
          type="text"
          id="fav-search"
          class="search-input"
          placeholder="Поиск по избранному..."
          oninput="handleFavSearch(this.value)"
        />
      </div>
    `;
  }

  const filtered = productsData.filter(
    (p) =>
      favorites.includes(p.id) &&
      p.name.toLowerCase().includes(filterQuery.toLowerCase()),
  );

  if (filtered.length === 0) {
    display.innerHTML = `<div class="empty-msg">Ничего не найдено</div>`;
    return;
  }

  display.innerHTML = filtered.map((p) => createFavoriteCardHTML(p)).join("");
}

// Функция для отрисовки Корзины
function renderCart() {
  const display = document.getElementById("cart-display");
  if (!display) return;

  if (cart.length === 0) {
    display.innerHTML = `<div class="empty-msg">Здесь пока пусто</div>`;
    return;
  }

  const filtered = productsData.filter((p) => cart.includes(p.id));
  display.innerHTML = filtered.map((p) => createProductCardHTML(p)).join("");
  display.innerHTML = filtered.map((p) => createFavoriteCardHTML(p)).join("");
}

function createFavoriteCardHTML(p) {
  const isSteamGame = p.service === "steam" || p.prices;

  let price = p.price;
  let discount = p.discount || "";
  let subName = p.subName || "";

  if (isSteamGame) {
    const region = window.currentSteamRegion || "RU";
    const priceData = (p.prices && (p.prices[region] || p.prices.RU)) || null;

    price = priceData ? priceData.amount : "—";
    discount = priceData ? priceData.discount || "" : "";
    subName = regionFullNames[region]
      ? `Регион: ${regionFullNames[region]}`
      : "Steam";
  }

  const openAction = isSteamGame
    ? `openSteamGamePage(${p.id})`
    : `openProductModal(${p.id})`;

  const discountBadge = discount
    ? `<span class="fav-discount">${discount}</span>`
    : "";

  return `
    <div class="fav-card" id="fav-item-${p.id}" onclick="${openAction}">
      <div class="fav-card-image" style="background-image: url('${p.img}')">
        <div class="fav-card-actions">
          <button class="fav-delete-btn" onclick="event.stopPropagation(); toggleFavorite(${p.id}, event)">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2.5" fill="none">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="fav-card-info">
        <div class="fav-price-row">
          <span class="fav-price">${price}₽</span>
          ${discountBadge}
        </div>
        <div class="fav-name">${p.name}</div>
        ${subName ? `<div class="fav-subname">${subName}</div>` : ""}
      </div>
    </div>
  `;
}

// Обработчик поиска
function handleFavSearch(value) {
  renderFavorites(value);
}

// Обновляем функцию goToPage, чтобы она вызывала рендер
const oldGoToPage = goToPage;
goToPage = function (pageId, categoryName, subName) {
  oldGoToPage(pageId, categoryName, subName);
  if (pageId === "favorites-page") renderFavorites();
  if (pageId === "cart-page") renderCart();
};

function updateBadges() {
  // Просто считаем длину массивов (без фильтров по категориям)
  const favCount = favorites.length;
  const cartCount = cart.length;

  // 1. Нижнее меню (Избранное)
  const bFav = document.getElementById("fav-badge");
  if (bFav) {
    bFav.innerText = favCount;
    // Используем прямой стиль, чтобы избежать конфликтов с CSS
    bFav.style.display = favCount > 0 ? "flex" : "none";
  }

  // 2. Нижнее меню (Корзина)
  const bCart = document.getElementById("cart-badge");
  if (bCart) {
    bCart.innerText = cartCount;
    bCart.style.display = cartCount > 0 ? "flex" : "none";
  }

  // 3. Верхние виджеты (если они есть на текущем экране)
  const topFav = document.getElementById("top-fav-badge");
  if (topFav) topFav.innerText = favCount;

  const topFavWidget = document.getElementById("top-fav-widget");
  if (topFavWidget) {
    topFavWidget.style.display = favCount > 0 ? "flex" : "none";
  }

  const topCart = document.getElementById("top-cart-badge");
  if (topCart) topCart.innerText = cartCount;

  const topCartWidget = document.getElementById("top-cart-widget");
  if (topCartWidget) {
    topCartWidget.style.display = cartCount > 0 ? "flex" : "none";
  }
}

// Вызови эту функцию один раз при загрузке страницы, чтобы подтянуть данные из localStorage
window.addEventListener("DOMContentLoaded", updateBadges);

function removeWithAnimation(id, event) {
  if (event) event.stopPropagation();

  const card = document.getElementById(`fav-item-${id}`);
  if (card) {
    card.classList.add("fade-out"); // Запускаем анимацию

    // Ждем окончания анимации (300мс) перед удалением из данных
    setTimeout(() => {
      const index = favorites.indexOf(id);
      if (index !== -1) {
        favorites.splice(index, 1);
        localStorage.setItem("favs", JSON.stringify(favorites));
        updateBadges();
        renderFavorites(document.getElementById("fav-search")?.value || "");
        renderProducts(); // Обновляем сердечки в магазине
      }
    }, 300);
  }
}

function resumeContent() {
  if (window.lastCategory) {
    goToPage(window.lastCategory, window.lastCategoryName, window.lastSubName);

    if (
      shouldRestoreSteamGamePage &&
      window.lastCategory === "steam-games" &&
      currentOpenedGameId
    ) {
      setTimeout(() => {
        openSteamGamePage(currentOpenedGameId);
      }, 50);
    }
  } else {
    goHome();
  }
}

function toggleAccordion(header) {
  const item = header.parentElement;

  item.classList.toggle("active");
}

function toggleDropdown() {
  const select = document.getElementById("regionSelector");
  const options = document.getElementById("regionOptions");
  const isActive = select.classList.toggle("active");

  options.style.display = isActive ? "block" : "none";

  // Если открыли — прокручиваем экран, чтобы список был виден полностью
  if (isActive) {
    select.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function selectRegion(name) {
  // Устанавливаем название в триггер
  document.getElementById("selected-name").innerText = name;

  // Закрываем список
  toggleDropdown();

  // Показываем блок оплаты (цена 300 зашита в текст кнопки в HTML)
  document.getElementById("payment-block").style.display = "block";
}

// Закрытие списка при клике в любое другое место
window.addEventListener("click", function (e) {
  const select = document.getElementById("regionSelector");
  if (!select.contains(e.target)) {
    select.classList.remove("active");
    document.getElementById("regionOptions").style.display = "none";
  }
});

// Показать/скрыть подсказку
function toggleTooltip() {
  const box = document.getElementById("tooltip-text");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

// Выбор суммы
function selectAmount(element, value) {
  document
    .querySelectorAll(".amount-card")
    .forEach((card) => card.classList.remove("active"));
  element.classList.add("active");
  console.log("Выбрана сумма:", value);
}

function validateTopup() {
  const loginInput = document.getElementById("steam-login");
  // Очистка: только латиница, цифры и подчёркивание
  loginInput.value = loginInput.value.replace(/[^a-zA-Z0-9_]/g, "");

  // Вызываем общую проверку готовности
  checkTopupReady();
}

function openPopup() {
  document.getElementById("login-popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("login-popup").style.display = "none";
}

let currentCurrency = "RUB";

function changeCurrency(code) {
  currentCurrency = code;
  const symbolSpan = document.getElementById("current-currency-symbol");
  if (symbolSpan) symbolSpan.innerText = TOPUP_CONFIG[code].symbol;

  const list = document.getElementById("currency-list");
  if (list) list.style.display = "none";

  renderPresets();
  calculateTopup();
  checkTopupReady(); // Добавь эту строку здесь
}

// 1. Инициализация при загрузке (добавь это в конец файла)
document.addEventListener("DOMContentLoaded", () => {
  renderPresets(); // Рисуем кнопки для рубля сразу
});

function renderPresets() {
  const grid = document.getElementById("presets-grid");

  // 1. Сначала ПРОВЕРЯЕМ, нашли ли мы элемент
  if (!grid) {
    // Не пишем ошибку, просто тихо выходим, если мы не на той странице
    return;
  }

  // 2. Только если элемент есть, очищаем его
  grid.innerHTML = "";

  // 3. Проверяем наличие конфига для текущей валюты, чтобы не "упасть"
  if (!TOPUP_CONFIG[currentCurrency]) return;

  TOPUP_CONFIG[currentCurrency].presets.forEach((amount) => {
    const btn = document.createElement("div");
    btn.className = "preset-btn";
    btn.innerText = `${amount} ${TOPUP_CONFIG[currentCurrency].symbol}`;
    btn.onclick = () => {
      const input = document.getElementById("amount-input");
      if (input) {
        input.value = amount;
        calculateTopup();
      }
    };
    grid.appendChild(btn);
  });
}

function calculateTopup() {
  const input = document.getElementById("amount-input");
  const error = document.getElementById("amount-error");
  const display = document.getElementById("final-price-display");
  const totalSpan = document.getElementById("total-cost");

  const val = parseFloat(input.value) || 0;
  const config = TOPUP_CONFIG[currentCurrency];

  // Сбрасываем всё, если поле пустое
  if (!input.value || val === 0) {
    display.style.display = "none";
    error.style.display = "none";
    checkTopupReady(); // Обновляем статус кнопки
    return;
  }

  // Проверка на минимальную сумму
  if (val < config.min) {
    error.innerText = `Минимальная сумма: ${config.min} ${config.symbol}`;
    error.style.display = "block";
    display.style.display = "none";
  } else {
    error.style.display = "none";
    const total = Math.ceil(val * config.rate);
    totalSpan.innerText = total;
    display.style.display = "flex";
  }

  // Вызываем общую проверку готовности
  checkTopupReady();
}

function toggleCurrencyList() {
  const list = document.getElementById("currency-list");
  list.style.display = list.style.display === "block" ? "none" : "block";
}

renderPresets();

function checkTopupReady() {
  const loginInput = document.getElementById("steam-login");
  const amountInput = document.getElementById("amount-input");
  const payBlock = document.getElementById("topup-payment-block");

  if (!loginInput || !amountInput || !payBlock) return;

  const login = loginInput.value.trim();
  const amount = parseFloat(amountInput.value) || 0;
  const config = TOPUP_CONFIG[currentCurrency];

  // УСЛОВИЕ: Логин 3+ символа И сумма введена И сумма >= минимальной
  const isLoginOk = login.length >= 3;
  const isAmountOk = amountInput.value !== "" && amount >= config.min;

  if (isLoginOk && isAmountOk) {
    payBlock.style.display = "block";
  } else {
    payBlock.style.display = "none";
  }
}

function renderTelegramPage() {
  const container = document.getElementById("telegram-products-container");
  if (!container) return;

  // Фильтруем товары Телеграм из общего массива
  const tgProducts = productsData.filter((p) => p.service === "telegram");

  if (tgProducts.length === 0) {
    container.innerHTML = `<div class="empty-msg">Товары Telegram скоро появятся</div>`;
    return;
  }

  // Очищаем и создаем сетку
  container.innerHTML = "";
  let html = '<div class="tg-grid-container">';

  tgProducts.forEach((p) => {
    // Важно: принудительно проверяем избранное перед каждой отрисовкой
    const isFav = typeof favorites !== "undefined" && favorites.includes(p.id);

    html += `
      <div class="product-card" onclick="openProductModal(${p.id})">
          <div class="fav-btn-top ${isFav ? "active-fav" : ""}" 
               onclick="event.stopPropagation(); toggleFavorite(${p.id}, event)">
              <svg viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
          </div>

          <img src="${p.img}" class="product-img" alt="${p.name}">
          
          <div class="product-info">
              <div class="product-name" style="color:#fff; font-weight:600;">${p.name}</div>
              <div class="price-row" style="display:flex; align-items:center; gap:8px; margin-top:5px;">
                  <span class="current-price" style="color:#fff; font-weight:800;">${p.price} ₽</span>
                  
                  ${
                    p.discount
                      ? `
                  <span class="discount-badge" style="
                    background: linear-gradient(45deg, #ff5f6d, #ffc371); 
                    font-size: 12px; 
                    padding: 2px 6px; 
                    border-radius: 4px; 
                    color: white; 
                    font-weight: bold; 
                    display: inline-block !important;
                  ">
                    ${p.discount}
                  </span>`
                      : ""
                  }
              </div>
          </div>
      </div>`;
  });

  html += "</div>";
  container.innerHTML = html;
}

function switchTgTab(tab) {
  const bg = document.getElementById("tg-tab-bg");
  const pTab = document.getElementById("tab-premium");
  const sTab = document.getElementById("tab-stars");
  const pCont = document.getElementById("telegram-products-container");
  const sForm = document.getElementById("stars-form-container");

  if (tab === "stars") {
    bg.style.transform = "translateX(100%)";
    pTab.classList.remove("active");
    sTab.classList.add("active");
    pCont.style.display = "none";
    sForm.style.display = "block";
    calculateStars(); // Инициализация суммы для 100
  } else {
    bg.style.transform = "translateX(0%)";
    sTab.classList.remove("active");
    pTab.classList.add("active");
    sForm.style.display = "none";
    pCont.style.display = "block";
    renderTelegramPage();
  }
}

// Авто-подстановка @ и запрет русских букв
function handleStarsUser() {
  const input = document.getElementById("stars-username");
  let val = input.value;

  // Автоматическая @ в начало, если её нет
  if (!val.startsWith("@")) val = "@" + val;

  // Разрешаем только латиницу, цифры и нижнее подчеркивание
  input.value = "@" + val.substring(1).replace(/[^a-zA-Z0-9_]/g, "");

  checkStarsReady();
}

// Расчет суммы (1.7р * количество) с округлением
function calculateStars() {
  const input = document.getElementById("stars-amount-input");
  const error = document.getElementById("stars-error");
  const display = document.getElementById("stars-final-display");
  const totalSpan = document.getElementById("stars-total-cost");

  const val = parseInt(input.value) || 0;

  // Валидация минималки
  if (val < STARS_CONFIG.min) {
    error.innerText = `Минимальная сумма: ${STARS_CONFIG.min}`;
    error.style.display = "block";
    display.style.display = "none";
  } else {
    error.style.display = "none";
    // Считаем по твоему тарифу
    const total = Math.ceil(val * STARS_CONFIG.rate);
    totalSpan.innerText = total;
    display.style.display = "flex";
  }
  checkStarsReady();
}

// Показ синей кнопки оплаты
function checkStarsReady() {
  const user = document.getElementById("stars-username").value.trim();
  const amount =
    parseInt(document.getElementById("stars-amount-input").value) || 0;
  const payBlock = document.getElementById("stars-pay-block");

  // Юзернейм (минимум @ + 3 символа) и сумма >= 100
  if (user.length >= 4 && amount >= STARS_CONFIG.min) {
    payBlock.style.display = "block";
  } else {
    payBlock.style.display = "none";
  }
}

function switchTgTab(tab) {
  const bg = document.getElementById("tg-tab-bg");
  const pTab = document.getElementById("tab-premium");
  const sTab = document.getElementById("tab-stars");
  const pCont = document.getElementById("telegram-products-container");
  const sForm = document.getElementById("stars-form-container");

  if (tab === "stars") {
    // Двигаем вправо + меняем на ЖЕЛТЫЙ
    bg.style.transform = "translateX(100%)";
    bg.classList.add("stars-active");

    pTab.classList.remove("active");
    sTab.classList.add("active");
    pCont.style.display = "none";
    sForm.style.display = "block";

    renderStarsPresets();
    calculateStars();
  } else {
    // Двигаем влево + возвращаем СИНИЙ
    bg.style.transform = "translateX(0%)";
    bg.classList.remove("stars-active");

    sTab.classList.remove("active");
    pTab.classList.add("active");
    sForm.style.display = "none";
    pCont.style.display = "block";
    renderTelegramPage();
  }
}

function renderStarsPresets() {
  const grid = document.getElementById("stars-presets-grid");
  const amounts = [100, 250, 500, 1000];
  grid.innerHTML = "";
  amounts.forEach((amt) => {
    const btn = document.createElement("div");
    btn.className = "preset-btn";
    btn.innerText = amt + " ☆";
    btn.onclick = () => {
      document.getElementById("stars-amount-input").value = amt;
      calculateStars();
    };
    grid.appendChild(btn);
  });
}

function openProductModal(productId) {
  const product = productsData.find((p) => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("product-modal");
  if (!modal) return;

  // 1. Наполняем базовыми данными (картинка, имя, цена)
  const imgEl = document.getElementById("modal-img");
  if (imgEl) imgEl.src = product.img;

  const nameEl = document.getElementById("modal-name");
  if (nameEl) nameEl.innerText = product.name;

  const priceEl = document.getElementById("modal-price");
  if (priceEl) priceEl.innerText = product.price + " ₽";

  // 2. НАСТРОЙКА ИЗБРАННОГО (СЕРДЦЕ)
  const favBtn = document.getElementById("modal-fav-btn");
  if (favBtn) {
    // Проверяем, есть ли товар в избранном (используем глобальный массив favorites)
    const isFav =
      typeof favorites !== "undefined" && favorites.includes(product.id);

    // Устанавливаем корректный визуальный статус сразу при открытии
    favBtn.classList.toggle("active-fav", isFav);

    favBtn.onclick = (e) => {
      e.stopPropagation(); // Чтобы клик не улетел на слои ниже

      if (typeof toggleFavorite === "function") {
        toggleFavorite(product.id, e);

        // Переключаем класс для анимации цвета (из твоего CSS)
        favBtn.classList.toggle("active-fav");

        // Добавляем эффект пульсации при нажатии
        favBtn.style.transform = "scale(1.2)";
        setTimeout(() => {
          favBtn.style.transform = "scale(1)";
        }, 200);
      }
    };
  }

  // 3. НАСТРОЙКА КНОПКИ ОПИСАНИЯ
  const descBtn = document.getElementById("open-desc-btn");
  if (descBtn) {
    descBtn.style.display = "inline-block";
    descBtn.onclick = (e) => {
      e.preventDefault();
      if (typeof openFullDescription === "function") {
        openFullDescription(productId);
      }
    };
  }

  // 4. ЛОГИКА СКИДКИ
  const discEl = document.getElementById("modal-discount");
  if (discEl) {
    if (product.discount) {
      discEl.innerText = product.discount;
      discEl.style.display = "inline-block";
    } else {
      discEl.style.display = "none";
    }
  }

  // 5. КНОПКА ДОБАВЛЕНИЯ В КОРЗИНУ (ФУТЕР)
  const cartBtn = document.getElementById("modal-add-to-cart");
  if (cartBtn) {
    cartBtn.onclick = () => {
      if (typeof toggleCart === "function") {
        toggleCart(product.id);
      }
    };
  }

  // 6. СБРОС СКРОЛЛА И ПОКАЗ ОКНА
  const scrollContainer = modal.querySelector(".modal-scroll-container");
  if (scrollContainer) scrollContainer.scrollTop = 0;

  modal.style.display = "flex";
  requestAnimationFrame(() => {
    modal.classList.add("active");
  });

  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const modal = document.getElementById("product-modal");
  if (!modal) return;

  // Убираем класс active, чтобы сработал pointer-events: none
  modal.classList.remove("active");

  setTimeout(() => {
    if (!modal.classList.contains("active")) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  }, 400);
}

// ФУНКЦИЯ ОТКРЫТИЯ ВТОРОГО ОКНА
function openFullDescription(productId) {
  const product = productsData.find((p) => p.id === productId);
  const descModal = document.getElementById("description-modal");
  const descText = document.getElementById("full-description-text");

  if (!product || !descModal || !descText) {
    console.error(
      "Не удалось открыть описание: проверьте ID элементов или данные товара",
    );
    return;
  }

  // Вставляем текст (берем из поля description в products.js)
  descText.innerText =
    product.description || "Инструкции будут доступны сразу после оплаты.";

  descModal.style.display = "flex";

  // Сбрасываем скролл текста в начало
  const scrollArea = descModal.querySelector(".modal-scroll-container");
  if (scrollArea) scrollArea.scrollTop = 0;

  requestAnimationFrame(() => {
    descModal.classList.add("active");
  });
}

// ЗАКРЫТИЕ ВТОРОГО ОКНА
function closeDescriptionModal() {
  const descModal = document.getElementById("description-modal");
  if (!descModal) return;

  descModal.classList.remove("active");
  setTimeout(() => {
    descModal.style.display = "none";
  }, 400);
}

/**
 * Глобальное управление вводом и клавиатурой
 * Работает для всех разделов (Steam, Apple, Поиск и т.д.)
 */
function initGlobalInputManager() {
  // 1. Скрытие клавиатуры при клике/тапе на пустую область
  document.addEventListener(
    "touchstart",
    function (e) {
      const activeEl = document.activeElement;
      const isInput =
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable;

      // Если фокус сейчас на инпуте, а нажали МИМО него
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")
      ) {
        if (!isInput) {
          activeEl.blur(); // Прячем клавиатуру
        }
      }
    },
    { passive: true },
  );

  // 2. Скрытие клавиатуры при нажатии "Enter" (Search/Done) во всех инпутах
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA")
      ) {
        activeEl.blur(); // Прячем клавиатуру

        // Если это поиск в Steam, можно принудительно вызвать функцию поиска
        if (
          activeEl.id === "steam-search-input" &&
          typeof handleSteamSearch === "function"
        ) {
          handleSteamSearch();
        }
      }
    }
  });
}

// Запускаем менеджер сразу
initGlobalInputManager();

function isSteamGame(product) {
  return !!(product && product.prices && typeof product.prices === "object");
}

function getSteamRegionData(game) {
  if (!game || !game.prices) return null;

  const region = window.currentSteamRegion;

  if (region && game.prices[region]) {
    return game.prices[region];
  }

  const fallbackRegion = Object.keys(game.prices)[0];
  return fallbackRegion ? game.prices[fallbackRegion] : null;
}

function getFavoriteProductById(id) {
  const numericId = Number(id);

  const steamGame =
    typeof steamGames !== "undefined" &&
    Array.isArray(steamGames) &&
    steamGames.find((g) => Number(g.id) === numericId);

  if (steamGame) return steamGame;

  return productsData.find((p) => Number(p.id) === numericId) || null;
}

function getSteamGameById(gameId) {
  return steamGames.find((g) => Number(g.id) === Number(gameId));
}

function getSteamGamePrice(game) {
  const region = window.currentSteamRegion || "RU";
  if (!game || !game.prices) {
    return { amount: 0, oldAmount: 0, discount: "" };
  }
  return (
    game.prices[region] ||
    game.prices.RU || { amount: 0, oldAmount: 0, discount: "" }
  );
}

function getSteamEditions(baseGame) {
  if (!baseGame || !baseGame.groupId) return [];
  return steamGames.filter(
    (g) => g.groupId === baseGame.groupId && g.type === "game",
  );
}

function getSteamDlc(baseGame) {
  if (!baseGame) return [];
  return steamGames.filter(
    (g) => g.type === "dlc" && Number(g.parentGameId) === Number(baseGame.id),
  );
}

function formatRub(value) {
  return Number(value || 0).toLocaleString("ru-RU") + " ₽";
}

window.openSteamGamePage = function (gameId) {
  const game = getSteamGameById(gameId);
  if (!game) return;

  currentOpenedGameId = Number(game.id);

  const page = document.getElementById("steam-game-page");
  if (!page) return;

  const baseGame = game.groupId
    ? steamGames.find((g) => g.groupId === game.groupId && g.isBaseGame)
    : game;

  const editions = getSteamEditions(baseGame || game);
  const dlcs = getSteamDlc(baseGame || game);
  const price = getSteamGamePrice(game);

  const editionsHtml = editions
    .map((editionGame) => {
      const editionPrice = getSteamGamePrice(editionGame);
      const isActive = Number(editionGame.id) === Number(game.id);

      return `
        <button
          class="steam-edition-btn ${isActive ? "active" : ""}"
          onclick="openSteamGamePage(${editionGame.id})"
        >
          <span class="edition-name">${editionGame.shortName || editionGame.name}</span>
          <span class="edition-price">${formatRub(editionPrice.amount)}</span>
        </button>
      `;
    })
    .join("");

  const compositionHtml = (game.composition || [])
    .map((item) => `<li>${item}</li>`)
    .join("");

  const contentsHtml = (game.contents || [])
    .map((item) => `<li>${item}</li>`)
    .join("");

  const dlcHtml = dlcs.length
    ? dlcs
        .map((dlc) => {
          const dlcPrice = getSteamGamePrice(dlc);
          return `
            <div class="steam-dlc-card" onclick="openSteamGamePage(${dlc.id})">
              <img src="${dlc.img}" alt="${dlc.name}" class="steam-dlc-card__img">
              <div class="steam-dlc-card__body">
                <div class="steam-dlc-card__title">${dlc.shortName || dlc.name}</div>
                <div class="steam-dlc-card__price-row">
                  <span class="steam-dlc-card__price">${formatRub(dlcPrice.amount)}</span>
                  ${dlcPrice.discount ? `<span class="steam-dlc-card__discount">${dlcPrice.discount}</span>` : ""}
                </div>
              </div>
            </div>
          `;
        })
        .join("")
    : `<div class="steam-empty-note">Дополнений не найдено</div>`;

  page.innerHTML = `
    <div class="steam-game-page-inner">
      <button class="steam-game-close-btn" onclick="closeSteamGamePage()">✕</button>

      <div class="steam-game-hero">
        <img src="${game.img}" alt="${game.name}" class="steam-game-cover">

        <div class="steam-game-main">
          <div class="steam-game-region">
            Регион: ${regionFullNames[window.currentSteamRegion] || "Россия"}
          </div>

          <h1 class="steam-game-title">${game.name}</h1>

          ${
            game.badges?.length
              ? `<div class="steam-game-badges">
                  ${game.badges.map((badge) => `<span class="steam-game-badge">${badge}</span>`).join("")}
                </div>`
              : ""
          }

          <div class="steam-game-price-box">
            <div class="steam-game-price-main">
              <span class="steam-game-price-current">${formatRub(price.amount)}</span>
              ${price.oldAmount ? `<span class="steam-game-price-old">${formatRub(price.oldAmount)}</span>` : ""}
              ${price.discount ? `<span class="steam-game-price-discount">${price.discount}</span>` : ""}
            </div>
          </div>

          <div class="steam-game-actions">
            <button class="steam-buy-btn">Купить</button>
            <button class="steam-fav-btn" id="game-pg-fav-btn" onclick="handleGameFavClick()">
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
      </div>

      ${
        editions.length > 1
          ? `
          <section class="steam-game-section">
            <h3>Версии товара</h3>
            <div class="steam-editions-grid">
              ${editionsHtml}
            </div>
          </section>
        `
          : ""
      }

      ${
        game.description
          ? `
          <section class="steam-game-section">
            <h3>Описание</h3>
            <div class="steam-game-description">${game.description.replace(/\n/g, "<br>")}</div>
          </section>
        `
          : ""
      }

      ${
        compositionHtml
          ? `
          <section class="steam-game-section">
            <h3>Состав товара</h3>
            <ul class="steam-info-list">
              ${compositionHtml}
            </ul>
          </section>
        `
          : ""
      }

      ${
        contentsHtml
          ? `
          <section class="steam-game-section">
            <h3>Что входит</h3>
            <ul class="steam-info-list">
              ${contentsHtml}
            </ul>
          </section>
        `
          : ""
      }

      ${
        game.delivery
          ? `
          <section class="steam-game-section">
            <h3>${game.delivery.title || "Способ получения"}</h3>
            <div class="steam-game-delivery">${game.delivery.text || ""}</div>
          </section>
        `
          : ""
      }

      <section class="steam-game-section">
        <h3>DLC и дополнения</h3>
        <div class="steam-dlc-grid">
          ${dlcHtml}
        </div>
      </section>
    </div>
  `;

  page.style.display = "block";
  document.body.style.overflow = "hidden";
};
