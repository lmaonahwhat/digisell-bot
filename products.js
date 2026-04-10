const productsData = [
  {
    id: 1,
    service: "spotify",
    months: 1,
    name: "Spotify Premium Individual 1 месяц",
    price: 250,
    discount: "-20%",
    img: "./img_products/Spotify_1M_IND.png",
    description:
      "Spotify Premium Individual — это полный контроль над вашей музыкой без ограничений.\n\n" +
      "Преимущества подписки:\n" +
      "• Слушайте музыку без рекламных пауз.\n" +
      "• Скачивайте треки и слушайте их офлайн где угодно.\n" +
      "• Включайте любой трек сразу (без режима перемешивания).\n" +
      "• Неограниченное количество пропусков песен.\n" +
      "• Максимальное качество звука (320 кбит/с).\n\n",
  },

  {
    id: 2,
    service: "spotify",
    months: 1,
    name: "Spotify Premium DUO 1 месяц",
    price: 350,
    discount: "-15%",
    img: "./img_products/Spotify_1M_IND.png",
    description:
      "Spotify Premium Duo — подписка для двоих. У каждого свой аккаунт, свои плейлисты и свои рекомендации.\n\n" +
      "Преимущества Duo:\n" +
      "• Два отдельных Premium-аккаунта по выгодной цене.\n" +
      "• Плейлист Duo Mix — общая подборка на основе вкусов обоих слушателей.\n" +
      "• Музыка без рекламы и в офлайн-режиме на обоих устройствах.\n" +
      "• Максимальное качество звука (320 кбит/с).\n\n",
  },

  {
    id: 3,
    service: "spotify",
    months: 3,
    name: "Spotify Premium Individual 3 месяца",
    price: 700,
    discount: "-15%",
    img: "./img_products/Spotify_3M_IND.png",
    description:
      "Spotify Premium Individual — это полный контроль над вашей музыкой без ограничений.\n\n" +
      "Преимущества подписки:\n" +
      "• Слушайте музыку без рекламных пауз.\n" +
      "• Скачивайте треки и слушайте их офлайн где угодно.\n" +
      "• Включайте любой трек сразу (без режима перемешивания).\n" +
      "• Неограниченное количество пропусков песен.\n" +
      "• Максимальное качество звука (320 кбит/с).\n\n",
  },

  {
    id: 4,
    service: "spotify",
    months: 3,
    name: "Spotify Premium DUO 3 месяца",
    price: 1100,
    discount: "-20%",
    img: "./img_products/Spotify_3M_IND.png",
    description:
      "Spotify Premium Duo — подписка для двоих. У каждого свой аккаунт, свои плейлисты и свои рекомендации.\n\n" +
      "Преимущества Duo:\n" +
      "• Два отдельных Premium-аккаунта по выгодной цене.\n" +
      "• Плейлист Duo Mix — общая подборка на основе вкусов обоих слушателей.\n" +
      "• Музыка без рекламы и в офлайн-режиме на обоих устройствах.\n" +
      "• Максимальное качество звука (320 кбит/с).\n\n",
  },

  {
    id: 5,
    service: "spotify",
    months: 6,
    name: "Spotify Premium Individual 6 месяцев",
    price: 1500,
    discount: "-15%",
    img: "./img_products/Spotify_6M_IND.png",
    description:
      "Spotify Premium Individual — это полный контроль над вашей музыкой без ограничений.\n\n" +
      "Преимущества подписки:\n" +
      "• Слушайте музыку без рекламных пауз.\n" +
      "• Скачивайте треки и слушайте их офлайн где угодно.\n" +
      "• Включайте любой трек сразу (без режима перемешивания).\n" +
      "• Неограниченное количество пропусков песен.\n" +
      "• Максимальное качество звука (320 кбит/с).\n\n",
  },

  {
    id: 6,
    service: "spotify",
    months: 6,
    name: "Spotify Premium DUO 6 месяцев",
    price: 1800,
    discount: "-10%",
    img: "./img_products/Spotify_6M_IND.png",
    description:
      "Spotify Premium Duo — подписка для двоих. У каждого свой аккаунт, свои плейлисты и свои рекомендации.\n\n" +
      "Преимущества Duo:\n" +
      "• Два отдельных Premium-аккаунта по выгодной цене.\n" +
      "• Плейлист Duo Mix — общая подборка на основе вкусов обоих слушателей.\n" +
      "• Музыка без рекламы и в офлайн-режиме на обоих устройствах.\n" +
      "• Максимальное качество звука (320 кбит/с).\n\n",
  },

  {
    id: 7,
    service: "spotify",
    months: 12,
    name: "Spotify Premium Individual 12 месяцев",
    price: 2400,
    discount: "-10%",
    img: "./img_products/Spotify_12M_IND.png",
    description:
      "Spotify Premium Individual — это полный контроль над вашей музыкой без ограничений.\n\n" +
      "Преимущества подписки:\n" +
      "• Слушайте музыку без рекламных пауз.\n" +
      "• Скачивайте треки и слушайте их офлайн где угодно.\n" +
      "• Включайте любой трек сразу (без режима перемешивания).\n" +
      "• Неограниченное количество пропусков песен.\n" +
      "• Максимальное качество звука (320 кбит/с).\n\n",
  },

  {
    id: 8,
    service: "spotify",
    months: 12,
    name: "Spotify Premium DUO 12 месяцев",
    price: 3300,
    discount: "-10%",
    img: "./img_products/Spotify_12M_IND.png",
    description:
      "Spotify Premium Duo — подписка для двоих. У каждого свой аккаунт, свои плейлисты и свои рекомендации.\n\n" +
      "Преимущества Duo:\n" +
      "• Два отдельных Premium-аккаунта по выгодной цене.\n" +
      "• Плейлист Duo Mix — общая подборка на основе вкусов обоих слушателей.\n" +
      "• Музыка без рекламы и в офлайн-режиме на обоих устройствах.\n" +
      "• Максимальное качество звука (320 кбит/с).\n\n",
  },

  {
    id: 9,
    service: "youtube",
    months: 1,
    name: "YouTube Premium 1 месяц",
    price: 700,
    discount: "-15%",
    img: "./img_products/YouTube_1M.png",
    description:
      "— Просмотр видео без рекламы\n— Фоновое воспроизведение (с заблокированным экраном)\n— Скачивание видео и просмотр офлайн\n— Доступ к YouTube Music Premium (миллионы треков)\n— Оригинальный контент YouTube Originals\n— Картинка в картинке (PiP) на мобильных устройствах\n— Максимальное качество битрейта (1080p Premium)",
  },

  {
    id: 10,
    service: "youtube",
    months: 12,
    name: "YouTube Premium 12 месяцев",
    price: 1900,
    discount: "-10%",
    img: "./img_products/YouTube_12M.png",
    description:
      "— Просмотр видео без рекламы\n— Фоновое воспроизведение (с заблокированным экраном)\n— Скачивание видео и просмотр офлайн\n— Доступ к YouTube Music Premium (миллионы треков)\n— Оригинальный контент YouTube Originals\n— Картинка в картинке (PiP) на мобильных устройствах\n— Максимальное качество битрейта (1080p Premium)",
  },

  {
    id: 11,
    service: "chatgpt",
    months: 1,
    name: "ChatGPT Plus 1 месяц",
    price: 600,
    discount: "-15%",
    img: "./img_products/ChatGPT_1M.png",
    description:
      "— Доступ к модели GPT-4o (самая умная и быстрая)\n— Генерация изображений через DALL-E 3\n— Анализ файлов, документов и таблиц\n— Голосовое общение в реальном времени\n— Доступ к кастомным GPT (магазин приложений)\n— Веб-поиск через Bing для свежих данных\n— Приоритетный доступ в часы пик",
  },

  {
    id: 12,
    service: "telegram",
    name: "Telegram Premium 3 месяца",
    price: 1300,
    discount: "-10%",
    img: "./img_products/Telegram_3M.jpg",
    description:
      "— Удвоение всех лимитов (1000 каналов, 20 папок)\n— Загрузка файлов до 4 ГБ\n— Ускоренная загрузка данных\n— Расшифровка голосовых сообщений в текст\n— Отключение встроенной рекламы\n— Уникальные реакции и стикеры\n— Эмодзи-статусы и значок подписчика\n— Активные видео-аватары",
  },
  {
    id: 13,
    service: "telegram",
    name: "Telegram Premium 6 месяцев",
    price: 1700,
    discount: "-6%",
    img: "./img_products/Telegram_6M.jpg",
    description:
      "— Удвоение всех лимитов (1000 каналов, 20 папок)\n— Загрузка файлов до 4 ГБ\n— Ускоренная загрузка данных\n— Расшифровка голосовых сообщений в текст\n— Отключение встроенной рекламы\n— Уникальные реакции и стикеры\n— Эмодзи-статусы и значок подписчика\n— Активные видео-аватары",
  },
  {
    id: 14,
    service: "telegram",
    name: "Telegram Premium 12 месяцев",
    price: 3000,
    discount: "-4%",
    img: "./img_products/Telegram_12M.jpg",
    description:
      "— Удвоение всех лимитов (1000 каналов, 20 папок)\n— Загрузка файлов до 4 ГБ\n— Ускоренная загрузка данных\n— Расшифровка голосовых сообщений в текст\n— Отключение встроенной рекламы\n— Уникальные реакции и стикеры\n— Эмодзи-статусы и значок подписчика\n— Активные видео-аватары",
  },

  // APPLE GIFT CARDS - RUSSIA (RUB)
  {
    id: 15,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 500 руб.",
    price: 800,
    discount: "-5%",
    img: "./img_products/APPLE_500RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },

  {
    id: 79,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 1000 руб.",
    price: 1500,
    discount: "-10%",
    img: "./img_products/APPLE_1000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },

  {
    id: 21,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 1500 руб.",
    price: 2200,
    discount: "-10%",
    img: "./img_products/APPLE_1500RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 23,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 2000 руб.",
    price: 3000,
    discount: "-10%",
    img: "./img_products/APPLE_2000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 24,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 3000 руб.",
    price: 4500,
    discount: "-10%",
    img: "./img_products/APPLE_3000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 26,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 4000 руб.",
    price: 6000,
    discount: "-10%",
    img: "./img_products/APPLE_4000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },

  {
    id: 80,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 5000 руб.",
    price: 7000,
    discount: "-15%",
    img: "./img_products/APPLE_5000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },

  {
    id: 28,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 6000 руб.",
    price: 8400,
    discount: "-15%",
    img: "./img_products/APPLE_6000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 29,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 7000 руб.",
    price: 8400,
    discount: "-15%",
    img: "./img_products/APPLE_7000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 30,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 8000 руб.",
    price: 9800,
    discount: "-15%",
    img: "./img_products/APPLE_8000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 31,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 9000 руб.",
    price: 12500,
    discount: "-15%",
    img: "./img_products/APPLE_9000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 32,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 10000 руб.",
    price: 14000,
    discount: "-15%",
    img: "./img_products/APPLE_10000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 34,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 15000 руб.",
    price: 21000,
    discount: "-15%",
    img: "./img_products/APPLE_15000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 36,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 20000 руб.",
    price: 28000,
    discount: "-15%",
    img: "./img_products/APPLE_20000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 37,
    service: "apple",
    currency: "RUB",
    name: "Apple Gift Card 25000 руб.",
    price: 32500,
    discount: "-20%",
    img: "./img_products/APPLE_25000RUB.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },

  // APPLE GIFT CARDS - TURKEY (TRY)
  {
    id: 41,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 50 TL",
    price: 160,
    discount: "-5%",
    img: "./img_products/APPLE_50TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 42,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 75 TL",
    price: 240,
    discount: "-5%",
    img: "./img_products/APPLE_75TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 43,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 100 TL",
    price: 320,
    discount: "-5%",
    img: "./img_products/APPLE_100TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 45,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 150 TL",
    price: 450,
    discount: "-10%",
    img: "./img_products/APPLE_150TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 47,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 200 TL",
    price: 600,
    discount: "-10%",
    img: "./img_products/APPLE_200TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 48,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 250 TL",
    price: 750,
    discount: "-10%",
    img: "./img_products/APPLE_250TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 49,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 300 TL",
    price: 900,
    discount: "-10%",
    img: "./img_products/APPLE_300TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 50,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 500 TL",
    price: 1450,
    discount: "-15%",
    img: "./img_products/APPLE_500TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 51,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 600 TL",
    price: 1740,
    discount: "-15%",
    img: "./img_products/APPLE_600TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 52,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 700 TL",
    price: 2000,
    discount: "-15%",
    img: "./img_products/APPLE_700TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 53,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 800 TL",
    price: 2300,
    discount: "-15%",
    img: "./img_products/APPLE_800TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 54,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 900 TL",
    price: 2600,
    discount: "-15%",
    img: "./img_products/APPLE_900TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 55,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 1000 TL",
    price: 2900,
    discount: "-15%",
    img: "./img_products/APPLE_1000TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 56,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 2000 TL",
    price: 5600,
    discount: "-20%",
    img: "./img_products/APPLE_2000TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 57,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 3000 TL",
    price: 8400,
    discount: "-20%",
    img: "./img_products/APPLE_3000TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 58,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 4000 TL",
    price: 11000,
    discount: "-20%",
    img: "./img_products/APPLE_4000TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 59,
    service: "apple",
    currency: "TRY",
    name: "Apple Gift Card 5000 TL",
    price: 14000,
    discount: "-20%",
    img: "./img_products/APPLE_5000TL.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },

  // APPLE GIFT CARDS - USA (USD)
  {
    id: 81,
    service: "apple",
    currency: "USD",
    name: "Apple Gift Card $2",
    price: 300,
    discount: "-5%",
    img: "./img_products/APPLE_2USD.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },

  {
    id: 62,
    service: "apple",
    currency: "USD",
    name: "Apple Gift Card $5",
    price: 750,
    discount: "-5%",
    img: "./img_products/APPLE_5USD.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },

  {
    id: 67,
    service: "apple",
    currency: "USD",
    name: "Apple Gift Card $10",
    price: 1300,
    discount: "-10%",
    img: "./img_products/APPLE_10USD.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 69,
    service: "apple",
    currency: "USD",
    name: "Apple Gift Card $20",
    price: 2600,
    discount: "-10%",
    img: "./img_products/APPLE_20USD.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },

  {
    id: 71,
    service: "apple",
    currency: "USD",
    name: "Apple Gift Card $30",
    price: 3900,
    discount: "-10%",
    img: "./img_products/APPLE_30USD.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 72,
    service: "apple",
    currency: "USD",
    name: "Apple Gift Card $40",
    price: 5200,
    discount: "-10%",
    img: "./img_products/APPLE_40USD.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
  {
    id: 73,
    service: "apple",
    currency: "USD",
    name: "Apple Gift Card $50",
    price: 6500,
    discount: "-10%",
    img: "./img_products/APPLE_50USD.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },

  {
    id: 78,
    service: "apple",
    currency: "USD",
    name: "Apple Gift Card $100",
    price: 12000,
    discount: "-15%",
    img: "./img_products/APPLE_100USD.png",
    description:
      "— Пополнение баланса Apple ID (App Store, iTunes, iCloud)\n— Оплата подписок (Apple Music, Apple TV+, Apple Arcade)\n— Покупка приложений и игр в App Store\n— Оплата дополнительного места в iCloud\n— Покупки внутри игр и приложений (донаты)\n— Покупка фильмов и книг в сервисах Apple\n— Без срока действия кода\n— Моментальная доставка после оплаты",
  },
];

// КУРСЫ ПОПОЛНЕНИЯ БАЛАНСА

const TOPUP_CONFIG = {
  RUB: {
    name: "Рубль",
    symbol: "₽",
    rate: 1.1,
    min: 100,
    presets: [500, 1000, 2500, 5000],
  },
  KZT: {
    name: "Тенге",
    symbol: "₸",
    rate: 0.2,
    min: 500,
    presets: [2500, 5000, 10000, 15000],
  },
  UAH: {
    name: "Гривна",
    symbol: "₴",
    rate: 2.2,
    min: 46,
    presets: [200, 500, 1000, 2000],
  },
  USD: {
    name: "Доллар",
    symbol: "$",
    rate: 90,
    min: 2,
    presets: [5, 10, 20, 50],
  },
};

// НАСТРОЙКИ ДЛЯ РАЗДЕЛА ЗВЕЗД
const STARS_CONFIG = {
  rate: 1.7, // Цена за 1 звезду (1.7 ₽)
  min: 100, // Минимальное количество
  presets: [100, 250, 500, 1000], // 4 удобные кнопки
};

// БАННЕРЫ РАСПРОДАЖ

const steamOffers = [
  {
    id: "spring-sale",
    isActive: true, // Для отображения - true/false
    title: "Весенняя распродажа",
    img: "https://example.com/spring.jpg",
    category: "spring-sale",
  },
  {
    id: "summer-sale",
    isActive: false,
    title: "Летняя распродажа",
    img: "https://example.com/summer.jpg",
    category: "summer-sale",
  },
  {
    id: "autumn-sale",
    isActive: false,
    title: "Осенняя распродажа",
    img: "https://example.com/autumn.jpg",
    category: "autumn-sale",
  },
  {
    id: "winter-sale",
    isActive: false,
    title: "Зимняя распродажа",
    img: "https://example.com/winter.jpg",
    category: "winter-sale",
  },
  {
    id: "next-fest",
    isActive: false,
    title: "Играм быть",
    img: "./img/banners/next_fest.jpg",
    category: "next-fest",
  },
  {
    id: "scream-fest",
    isActive: false,
    title: "Страхи в Steam",
    img: "./img/banners/scream_fest.jpg",
    category: "scream-fest",
  },
  {
    id: "black-friday",
    isActive: false,
    title: "Чёрная пятница",
    img: "./img/banners/black_friday.jpg",
    category: "black-friday",
  },
  {
    id: "digisell-weekly",
    isActive: true,
    title: "Скидки недели от DigiSell",
    img: "./img/banners/weekly_deals.jpg",
    category: "digisell-weekly",
  },
];

const steamGames = [
  {
    id: 239140,
    slug: "dying-light",
    name: "Dying Light",
    img: "./img/steam/dying-light.jpg",
    categories: ["open-world", "survival", "digisell-weekly"],
    editionName: "Standard",
    prices: {
      RU: { amount: 298, oldAmount: 1488, discount: "-80%" },
      KZ: { amount: 298, oldAmount: 1488, discount: "-80%" },
      UA: { amount: 166, oldAmount: 838, discount: "-80%" },
      IN: { amount: 323, oldAmount: 1619, discount: "-80%" },
      TR: { amount: 346, oldAmount: 1728, discount: "-80%" }
    },
    description: "Зомби-экшен в открытом мире.",
    delivery: "Вход на аккаунт продавца / активация по инструкции",
    editions: []
  }
];
